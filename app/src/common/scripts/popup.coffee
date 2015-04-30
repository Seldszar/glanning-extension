do (document, $ = jQuery.noConflict(true), angular = window.angular, KangoAPI) ->
  "use strict"

  angular.module "glanning.popup", [
    "ui.router"
    "ng-context-menu"
    "glanning"
  ]
  .config [
    "$compileProvider"
    ($compileProvider) ->
      $compileProvider.aHrefSanitizationWhitelist /^\s*(https?|ftp|mailto|tel|file|chrome-extension):/
      $compileProvider.imgSrcSanitizationWhitelist /^\s*((https?|ftp|file|blob|chrome-extension):|data-image\/)/
  ]
  .config [
    "$stateProvider"
    "$urlRouterProvider"
    ($stateProvider, $urlRouterProvider) ->
      $urlRouterProvider.otherwise "/channels"

      $stateProvider
        .state "channels",
          url: "/channels"
          views:
            "@":
              templateUrl: "partials/channels.html"
              controller: [
                "$rootScope"
                "$scope"
                "Channels"
                ($rootScope, $scope, Channels) ->
                  $scope.channels = []

                  $scope.favorite = (channel) ->
                    Channels.favorite(channel).then (favorite) ->
                      channel.favorite = favorite

                  kango.addMessageListener "channel.favorite", (event) ->
                    result = event.data
                    _.assign _.findWhere($scope.channels, { id: result.id }), { favorite: result.favorite }
                    $scope.$apply()

                  Channels.find().then (channels) ->
                    $scope.channels = channels
              ]

        .state "schedules",
          url: "/schedules"
          views:
            "@":
              templateUrl: "partials/schedules/index.html"
              controller: [
                "$scope"
                "Channels"
                ($scope, Channels) ->
                  $scope.channels = []

                  Channels.find().then (channels) ->
                    $scope.channels = _.reject channels, (channel) ->
                      _.isEmpty channel.schedule
              ]

        .state "schedules.show",
          url: "/:id"
          views:
            "@":
              templateUrl: "partials/schedules/show.html"
              controller: [
                "$scope"
                "$stateParams"
                "Channels"
                ($scope, $stateParams, Channels) ->
                  $scope.channel = null

                  Channels.get($stateParams.id).then (channel) ->
                    $scope.channel = channel
              ]

        .state "settings",
          url: "/settings"
          views:
            "@":
              templateUrl: "partials/settings.html"

        .state "about",
          url: "/about"
          views:
            "@":
              templateUrl: "partials/about.html"
  ]
  .directive "openTab", [
    ->
      {
        restrict: "A"
        link: (scope, element, attr) ->
          element.on "click", (event) ->
            event.preventDefault()
            kango.browser.tabs.create
              url: if attr.openTab isnt "open-tab" then attr.openTab else attr.href
      }
  ]
  .directive "openTabIgnore", [
    ->
      {
        restrict: "A"
        link: (scope, element, attr) ->
          element.on "click", (event) ->
            event.stopImmediatePropagation()
      }
  ]
  .directive "extensionVersion", [
    ->
      {
        restrict: "A"
        template: kango.getExtensionInfo().version
      }
  ]
  .directive "currentDate", [
    "$filter"
    ($filter) ->
      {
        restrict: "A"
        template: (elem, attr) ->
          $filter("date") new Date(), attr.currentDate or "yyyy-MM-dd"
      }
  ]
  .controller "RootController", [
    "$scope"
    "$state"
    "Settings"
    ($scope, $state, Settings) ->
      $scope.$state = $state
      $scope.settings = {}

      Settings.get().then (settings) ->
        $scope.settings = settings

        $scope.$watch "settings", (value) ->
          Settings.set value
        , true
  ]
  .run [
    ->
      angular.element("img").unveil()
  ]

  KangoAPI.onReady ->
    angular.bootstrap document, ["glanning.popup"]

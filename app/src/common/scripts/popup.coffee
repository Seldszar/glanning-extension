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

                  $scope.share = (channel) ->
                    Channels.share channel

                  kango.addMessageListener "channel.favorite", (event) ->
                    result = event.data
                    _.assign _.findWhere($scope.channels, { _id: result._id }), { favorite: result.favorite }
                    $scope.$apply()

                  Channels.find().then (channels) ->
                    $scope.channels = channels
              ]

        .state "schedules",
          url: "/schedules/:type"
          abstract: true,
          views:
            "sub-menu":
              templateUrl: "partials/schedules/sub-menu.html"
              controller: [
                "$scope"
                "$stateParams"
                "Channels"
                ($scope, $stateParams, Channels) ->
                  $scope.channels = []

                  Channels.find({ type: $stateParams.type }).then (channels) ->
                    $scope.channels = channels
              ]

        .state "schedules.show",
          url: "/show/:id"
          views:
            "@":
              templateUrl: "partials/schedules/show.html"
              controller: [
                "$rootScope"
                "$scope"
                "$stateParams"
                "Schedules"
                ($rootScope, $scope, $stateParams, Schedules) ->
                  $scope.schedule = []

                  Schedules.get($stateParams.id).then (schedule) ->
                    $scope.schedule = schedule
              ]

        .state "infos",
          url: "/infos"
          abstract: true
          views:
            "sub-menu":
              templateUrl: "partials/infos/sub-menu.html"

        .state "infos.about",
          url: "/about"
          views:
            "@":
              templateUrl: "partials/infos/about.html"

        .state "infos.settings",
          url: "/settings"
          views:
            "@":
              templateUrl: "partials/infos/settings.html"
  ]
  .directive "openTab", [
    ->
      {
        restrict: "A"
        link: (scope, element, attr) ->
          element.on "click", (event) ->
            event.preventDefault()
            kango.browser.tabs.create
              url: attr.openTab or attr.href
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

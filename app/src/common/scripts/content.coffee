###!
// ==UserScript==
// @name GL'anning content script
// @namespace glanning
// @include *://www.jeuxvideo.com/gaming-live*
// @require scripts/lib/jquery.min.js
// @require scripts/lib/angular.min.js
// @require scripts/lib/i18n/angular-locale_fr-fr.js
// @require scripts/glanning.js
// ==/UserScript==
###

do (window, document, angular = window.angular) ->
  "use strict"

  kango.invokeAsync "glanning.settings.get", "overlay.enabled", (enabled) ->
    return unless enabled

    $head = angular.element "head"
    $body = angular.element "body"
    $container = angular.element ".content-live-chat"
    $player = $container.find ".col-md-8"
    $playerIframe = $player.find "iframe"
    $chat = $container.find ".col-md-4"

    $head.append("<link rel='stylesheet' href='#{kango.io.getResourceUrl(style)}'>") for style in [
      "styles/font-awesome.min.css"
      "styles/content.css"
    ]

    $body.attr
      "ng-controller": "RootController"
      "ng-class": "{ 'theater-mode': theaterMode }"

    $container.attr
      "ng-controller": "ChannelController"
      "ng-class": "{ 'right-collapsed': settings.rightCollapsed }"

    $chat.attr
      "ng-style": "{ 'width': settings.rightWidth }"

    $body
      .append "<div id='resizer-overlay'></div>"

    $player
      .append "
              <div id='channel-actions' class='btn-toolbar'>
                <div class='btn-group'>
                  <button class='btn btn-primary btn-icon' title='Mettre en favoris' ng-if='channel' ng-click='favorite()'><i class='fa' ng-class='{ \"fa-star-o\": !channel.favorite, \"fa-star\": channel.favorite }'></i></button>
                </div>
                <div class='btn-group'>
                  <button class='btn btn-primary btn-icon' ng-click='toggleTheaterMode()'>Mode théâtre</button>
                </div>
                <div class='btn-group'>
                  <button class='btn btn-primary btn-icon btn-link' title='Paramètres' ng-click='toggleSettings()'><i class='fa fa-cog'></i></button>
                  <div id='glanning-settings' ng-class='{ \"visible\": settingsVisible }'>
                    <div class='checkbox'>
                      <label>
                        <input type='checkbox' ng-model='settings.showChannelInfos' ng-disabled='!channel'>
                        <span>Afficher les informations de la chaîne</span>
                      </label>
                    </div>
                    <div class='form-group'>
                      <button class='btn btn-primary btn-block' title='Si votre lecteur ne se charge pas correctement, cliquez sur ce bouton pour effectuer un rafraîchissement forcé de celui-ci' ng-click='reloadPlayer()'>Recharger le lecteur</button>
                    </div>
                  </div>
                </div>
                <div class='pull-right btn-group' ng-if='channel'>
                  <button class='btn btn-icon' title='Partager sur Facebook' ng-click='share(\"facebook\")'><i class='fa fa-facebook'></i></button>
                  <button class='btn btn-icon' title='Partager sur Twitter' ng-click='share(\"twitter\")'><i class='fa fa-twitter'></i></button>
                  <button class='btn btn-icon' title='Partager sur Google+' ng-click='share(\"google-plus\")'><i class='fa fa-google-plus'></i></button>
                </div>
              </div>
              "
      .append "<a href='#' id='exit-theater-mode' ng-click='toggleTheaterMode()'>Quitter le mode théâtre</a>"
      .append "
              <dl id='current-event' ng-if='settings.showChannelInfos'>
                <dt>{{ ::channel.name }}</dt>
                <dd ng-if='channel.event'>{{ channel.event.begin | date:'shortTime' }} - {{ channel.event.end | date:'shortTime' }}: {{ channel.event.title }}</dd>
              </dl>
              "
      .append "<a href='#' id='right-close' ng-click='toggleRight()'><i class='fa' ng-class='{ \"fa-caret-right\": !settings.rightCollapsed, \"fa-caret-left\": settings.rightCollapsed }'></i></a>"

    $chat
      .prepend "<div id='right-resizer'></div>"

    angular.module "glanning.content", [
      "glanning"
    ]
    .controller "ChannelController", [
      "$scope"
      "Channels"
      ($scope, Channels) ->
        $scope.settingsVisible = false

        $scope.favorite = ->
          Channels.favorite($scope.channel).then (favorite) ->
            $scope.channel.favorite = favorite

        $scope.share = (type) ->
          Channels.share $scope.channel, type

        $scope.toggleRight = ->
          $scope.settings.rightCollapsed = !$scope.settings.rightCollapsed

        $scope.toggleSettings = ->
          $scope.settingsVisible = !$scope.settingsVisible

        $scope.reloadPlayer = ->
          $playerIframe.attr "src", $playerIframe.attr("src")

        $resizer = angular.element "#right-resizer"
        $resizerOverlay = angular.element "#resizer-overlay"
        rightWidth = null

        mousemove = (event) ->
          rightWidth = Math.min Math.max(Math.round($container.offset().left + $container.width() - event.pageX), 340), 540
          $scope.settings.rightWidth = rightWidth
          $scope.$apply()

        mouseup = (event) ->
          $resizerOverlay.hide()

          unless rightWidth?
            $scope.toggleRight()
            $scope.$apply()

          $document.off "mousemove", mousemove
          $document.off "mouseup", mouseup

        $resizer.on "mousedown", (event) ->
          event.preventDefault()
          $resizerOverlay.show()

          rightWidth = null

          $document.on "mousemove", mousemove
          $document.on "mouseup", mouseup

        $scope.$on "channelFound", ->
          kango.addMessageListener "channel.online", (event) ->
            result = event.data
            $scope.channel = result if result._id == $scope.channel._id
            $scope.$apply()

          kango.addMessageListener "channel.favorite", (event) ->
            result = event.data
            $scope.channel.favorite = result.favorite if result._id == $scope.channel._id
            $scope.$apply()
    ]
    .controller "RootController", [
      "$scope"
      "$location"
      "Settings"
      "Channels"
      ($scope, $location, Settings, Channels) ->
        $scope.channel = null
        $scope.theaterMode = false
        $scope.settings = {}

        Settings.get("overlay").then (value) ->
          $scope.settings = value

          $scope.$watch "settings", (value) ->
            Settings.set "overlay", value
          , true

        Channels.find({ url: $location.absUrl().replace($location.hash(), "") }).then (channels) ->
          channel = channels?[0]
          $scope.channel = channel
          $scope.$broadcast "channelFound", channel

        $scope.toggleTheaterMode = ->
          $scope.theaterMode = !$scope.theaterMode
    ]

    angular.bootstrap document, ["glanning.content"]

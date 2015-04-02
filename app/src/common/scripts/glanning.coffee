do (angular = window.angular) ->
  "use strict"

  angular.module "glanning", []
  .factory "Channels", [
    "$q"
    ($q) ->
      {
        find: (properties) ->
          deferred = $q.defer()
          kango.invokeAsync "glanning.channels", properties, deferred.resolve
          deferred.promise

        favorite: (channel) ->
          deferred = $q.defer()
          kango.invokeAsync "glanning.favorites.toggle", channel._id, deferred.resolve
          deferred.promise

        share: (channel, type = "twitter") ->
          switch type
            when "facebook"
              kango.browser.tabs.create
                url: "https://www.facebook.com/sharer/sharer.php?u=#{encodeURIComponent(channel.url)}"
            when "google-plus"
              kango.browser.tabs.create
                url: "https://plus.google.com/share?url=#{encodeURIComponent(channel.url)}"
            when "twitter"
              text = "Je regarde actuellement " + (if channel.event then "#{channel.event.title} sur " else "") + "#{channel.name} !"
              kango.browser.tabs.create
                url: "https://twitter.com/intent/tweet?text=#{encodeURIComponent(text)}&url=#{encodeURIComponent(channel.url)}&via=GamingLive"
      }
  ]
  .factory "Schedules", [
    "$q"
    ($q) ->
      {
        get: (channelId) ->
          deferred = $q.defer()
          kango.invokeAsync "glanning.schedule", channelId, deferred.resolve
          deferred.promise
      }
  ]
  .factory "Settings", [
    "$q"
    ($q) ->
      {
        get: (propertyPath, defaultValue) ->
          deferred = $q.defer()
          kango.invokeAsync "glanning.settings.get", propertyPath, defaultValue, deferred.resolve
          deferred.promise

        set: (propertyPath, value) ->
          deferred = $q.defer()
          kango.invokeAsync "glanning.settings.set", propertyPath, value, deferred.resolve
          deferred.promise
      }
  ]

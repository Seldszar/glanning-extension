do (window, kango) ->
  "use strict"

  ###
  Core
  ###
  do ->
    Glanning =
      baseUrl: "http://glanning.seldszar.fr/api/"

      config:
        refreshInterval: 60000
        soundAlreadyPlayed: false

      cache: []

      extend: (src) ->
        _.extend Glanning, src

    Glanning.api = (details, callback) ->
      if _.isString(details)
        details =
          url: details

      details.url = Glanning.baseUrl + details.url
      details = _.defaults details,
        method: "GET"
        async: true
        contentType: "json"

      kango.xhr.send details, (data) ->
        if data.status == 200
          callback null, data.response
        else
          callback data, null

    Glanning.log = ->
      try
        Array::unshift.call arguments, "[#{(new Date).toISOString()}]"
        kango.console.log Array::join.call(arguments, " ") if kango.console?

    window.glanning = window.Glanning = Glanning

  ###
  Initialization
  ###
  do ->
    init = ->
      setInterval ->
        Glanning.refresh()
      , Glanning.config.refreshInterval

      Glanning.refresh()

    Glanning.extend {init}

  ###
  Channels
  ###
  do ->
    refresh = ->
      Glanning.api
        url: "channels"
        params:
          filter: "%7B%22include%22%3A%5B%7B%22relation%22%3A%22schedule%22%2C%22scope%22%3A%7B%22today%22%3Atrue%7D%7D%2C%7B%22status%22%3A%5B%22event%22%2C%22source%22%5D%7D%5D%7D"
      , (err, data) ->
        Glanning.log "Retrieving data..."

        if !err && data
          count = 0
          channels = data

          _.map channels, (channel) ->

            last = _.findWhere Glanning.cache,
              id: channel.id

            lastStatus = last?.status or {}
            currentStatus = channel.status

            if currentStatus.online
              if last
                if not lastStatus.online
                  Glanning.log "Channel #{channel.name} is now on air."

                  Glanning.ui.showNotification channel
                else if currentStatus.event?.id isnt lastStatus.event?.id
                  oldEvent = lastStatus.event
                  newEvent = currentStatus.event

                  Glanning.log "Channel #{channel.name} had changed his emission from #{if oldEvent then oldEvent.name else '<none>'} to #{if oldEvent then oldEvent.name else '<none>'}."

                  Glanning.ui.showNotification channel if newEvent

              count++
            else
              if lastStatus.online
                Glanning.log "Channel #{channel.name} is now off air."

            Glanning.events.emit "channel.status", channel

          , channels

          Glanning.cache = channels
          Glanning.ui.updateBadge count
        else
          Glanning.log "Unable to retrieve data! (status code: #{err.status})"
          Glanning.ui.updateBadge null

    channels = (properties) ->
      _.map _.where(Glanning.cache or [], properties or {}), (channel) ->
        channel.favorite = Glanning.favorites.contains channel.id
        channel

    channel = (id) ->
      _.findWhere(Glanning.cache or [], { id: id })

    Glanning.extend {refresh, channels, channel}

  ###
  Favorites
  ###
  do ->
    favorites =
      all: ->
        Glanning.storage.getItem("favorites") or []

      contains: (id) ->
        _.contains @all(), id

      toggle: (id) ->
        favorites = @all()
        favorite = @contains id

        favorites = if favorite then _.without(favorites, id) else _.union(favorites, [id])
        favorite = not favorite

        Glanning.storage.setItem "favorites", favorites
        Glanning.events.emit "channel.favorite", {id, favorite}

        favorite

    Glanning.extend {favorites}

  ###
  Settings
  ###
  do ->
    settings =
      defaults:
        channels:
          showThumbnail: true
          smallThumbnail: false
          showEmission: true
          showOffline: false

        schedule:
          highlightCurrent: true

        notifications:
          enabled: true
          favoritesOnly: false
          playSound: false
          soundName: "ding"

        overlay:
          enabled: true
          rightCollapsed: false
          rightWidth: 340
          showChannelInfos: true

      all: ->
        _.defaults Glanning.storage.getItem("settings") or {}, @defaults

      get: (propertyPath, defaultValue) ->
        if _.isUndefined(propertyPath) then @all() else _.get @all(), propertyPath, defaultValue

      set: (propertyPath, value) ->
        settings = if _.isObject(propertyPath) then propertyPath else _.set @all(), propertyPath, value
        Glanning.storage.setItem "settings", settings

    Glanning.extend {settings}

  ###
  Storage
  ###
  do ->
    Glanning.extend {storage: kango.storage}

  ###
  User Interface
  ###
  do ->
    ui =
      playSound: (name) ->
        try
          sound = new Audio()
          sound.src = kango.io.getResourceUrl "audio/#{name}.mp3"
          sound.play()

      updateBadge: (value) ->
        if _.isNumber(value)
          kango.ui.browserButton.setBadgeBackgroundColor [208, 0, 24, 255]
          kango.ui.browserButton.setBadgeValue value
        else
          kango.ui.browserButton.setBadgeBackgroundColor [190, 190, 190, 230]
          kango.ui.browserButton.setBadgeValue "?"

      showNotification: (channel) ->
        settings = Glanning.settings.all()

        return if settings.notifications.favoritesOnly && !channel.favorite

        if settings.notifications.playSound && !Glanning.config.soundAlreadyPlayed
          @playSound settings.notifications.soundName
          Glanning.config.soundAlreadyPlayed = true

        return unless settings.notifications.enabled

        text = "est en cours de diffusion"
        text = "#{channel.status.event.name} #{text}" if channel.status.event

        kango.ui.notifications.show channel.name, text, kango.io.getResourceUrl("images/notification-icon.png"), ->
          kango.browser.tabs.create
            url: channel.url

    Glanning.extend {ui}

  ###
  Events
  ###
  do ->
    events =
      on: (name, callback) ->
        kango.addMessageListener name, callback

      off: (name, callback) ->
        kango.removeMessageListener name, callback

      emit: (name, data) ->
        kango.dispatchMessage name, data
        kango.browser.tabs.getAll (tabs) ->
          tab.dispatchMessage(name, data) for tab in tabs
          return

    Glanning.extend {events}

  ###
  Bootstrap
  ###
  Glanning.init()

do (window, kango) ->
  "use strict"

  ###
  Core
  ###
  do ->
    Glanning =
      baseUrl: "http://glanning.seldszar.fr:6458/api/"

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
        async: true,
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
      Glanning.api "channels", (err, data) ->
        Glanning.log "Retrieving data..."

        if !err && data
          count = 0
          channels = data.channels

          _.map channels, (channel) =>
            _.map channel.schedule, (event) ->
              event.isCurrent = Date.parse(event.begin) <= Date.now() < Date.parse(event.end)
            , channel.schedule

            last = _.findWhere Glanning.cache,
              _id: channel._id

            if channel.online
              if last?
                if !last.online
                  Glanning.log "Channel #{channel.name} is now on air."

                  Glanning.ui.showNotification channel
                  Glanning.events.emit "channel.online", channel
                else if !_.isEqual(channel.event, last.event)
                  oldEvent = last.event?.title or "<none>"
                  newEvent = channel.event?.title or "<none>"

                  Glanning.log "Channel #{channel.name} had changed his emission from #{oldEvent} to #{newEvent}."

                  Glanning.ui.showNotification channel
                  Glanning.events.emit "channel.online", channel

              count++
            else
              if last?.online
                Glanning.log "Channel #{channel.name} is now off air."

                Glanning.events.emit "channel.offline", channel

          , channels

          Glanning.cache = channels
          Glanning.ui.updateBadge count
        else
          Glanning.log "Unable to retrieve data!", "(status code: #{err.status})"
          Glanning.ui.updateBadge null

    channels = (properties) ->
      _.map _.where(Glanning.cache or [], properties or {}), (channel) ->
        channel.favorite = Glanning.favorites.contains channel._id
        channel

    schedule = (id) ->
      _.findWhere(Glanning.cache or [], { _id: id })?.schedule or []

    Glanning.extend {refresh, channels, schedule}

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

        Glanning.storage.setItem "favorites", favorites
        Glanning.events.emit "channel.favorite",
          _id: id
          favorite: !favorite

        !favorite

    Glanning.extend {favorites}

  ###
  Settings
  ###
  do ->
    settings =
      defaults:
        channels:
          showThumbnail: true
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
        _.deepDefault @all(), propertyPath, defaultValue

      set: (propertyPath, value) ->
        settings = @all()
        settings = if _.isObject(propertyPath) then propertyPath else _.deepSet(settings, propertyPath, value)

        Glanning.storage.setItem "settings", settings
        settings

    Glanning.extend {settings}

  ###
  Storage
  ###
  do ->
    {storage} = kango
    Glanning.extend {storage}

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

        if settings.notifications.playSound && !Glanning.config.soundAlreadyPlayed
          @playSound settings.notifications.soundName
          Glanning.config.soundAlreadyPlayed = true

        return unless settings.notifications.enabled
        return if settings.notifications.favoritesOnly && !channel.favorite

        text = "est en cours de diffusion"
        text = "#{channel.event.title} #{text}" if channel.event

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

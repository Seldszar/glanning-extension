function GamingLive() {
    var self = this;
    self.refresh();
    window.setInterval(function () {
        self.refresh();
    }, self._refreshTimeout);
}

GamingLive.prototype = {

    _refreshTimeout: 60 * 1000,
    _feedUrl: 'http://webtv.jeuxvideo.com/esi/webtv_jv_header.php',

    _thumbnails: {
        125: 'http://image.jeuxvideo.com/gaming-live/competitions/avatarcounterstrike.jpg',
        244: 'http://image.jeuxvideo.com/gaming-live/competitions/avatargaminglivetwitch.jpg',
        286: 'http://image.jeuxvideo.com/gaming-live/casters/alexclicktv-petite.jpg',
        298: 'http://image.jeuxvideo.com/gaming-live/casters/at0mium-petite.jpg',
        310: 'http://image.jeuxvideo.com/gaming-live/casters/aypierre-petite.jpg',
        351: 'http://image.jeuxvideo.com/gaming-live/casters/bill-silverlight-petite.jpg',
        353: 'http://image.jeuxvideo.com/gaming-live/casters/g-e2-petite.jpg',
        392: 'http://image.jeuxvideo.com/gaming-live/casters/kanon-petite.jpg',
        394: 'http://image.jeuxvideo.com/gaming-live/casters/ken-bogard-petite.jpg',
        452: 'http://image.jeuxvideo.com/gaming-live/casters/keno-et-yomo-petite.jpg',
        482: 'http://image.jeuxvideo.com/gaming-live/casters/keydeegamerboy-petite.jpg',
        491: 'http://image.jeuxvideo.com/gaming-live/casters/ldlc-petite.jpg',
        503: 'http://image.jeuxvideo.com/gaming-live/casters/makoz-petite.jpg',
        547: 'http://image.jeuxvideo.com/gaming-live/casters/memory-card-petite.jpg',
        621: 'http://image.jeuxvideo.com/gaming-live/casters/metatrone-petite.jpg',
        660: 'http://image.jeuxvideo.com/gaming-live/casters/mister-mv-petite.jpg',
        709: 'http://image.jeuxvideo.com/gaming-live/casters/sephyross-petite.jpg',
        724: 'http://image.jeuxvideo.com/gaming-live/casters/thaek-petite.jpg',
        725: 'http://image.jeuxvideo.com/gaming-live/casters/tod-petite.jpg',
        726: 'http://image.jeuxvideo.com/gaming-live/casters/videofus-petite.jpg',
        740: 'http://image.jeuxvideo.com/gaming-live/casters/xeleko-petite.jpg',
        754: 'http://image.jeuxvideo.com/gaming-live/casters/fildrong-petite.jpg',
        781: 'http://image.jeuxvideo.com/gaming-live/casters/hugo-petite.jpg',
        810: 'http://image.jeuxvideo.com/gaming-live/casters/necro-petite.jpg',
        818: 'http://image.jeuxvideo.com/gaming-live/casters/nyo-petite.jpg',
        833: 'http://image.jeuxvideo.com/gaming-live/casters/siphano-petite.jpg',
        844: 'http://image.jeuxvideo.com/gaming-live/casters/v0ja-petite.jpg',
        997: 'http://image.jeuxvideo.com/gaming-live/competitions/avatarlol.jpg',
        1439: 'http://image.jeuxvideo.com/gaming-live/casters/raph-petite.jpg',
        1454: 'http://image.jeuxvideo.com/gaming-live/casters/unsterbliicher-petite.jpg',
        1466: 'http://image.jeuxvideo.com/gaming-live/casters/ashton-petite.jpg',
        1493: 'http://image.jeuxvideo.com/gaming-live/casters/damdam-petite.jpg'
    },

    _data: [],

    _settings: {
        channels: {
            showThumbnail: true,
            showEmission: true,
            showOffline: false
        },
        schedule: {
            highlightCurrent: true
        },
        notifications: {
            enabled: true,
            favoritesOnly: false,
            playSound: false,
            soundName: 'ding'
        }
    },

    _soundAlreadyPlayed: false,

    _setOffline: function() {
        kango.ui.browserButton.setBadgeValue('?');
    },

    _setBadgeCount: function (count) {
        kango.ui.browserButton.setBadgeValue(count);
    },

    _sendNotification: function (channel) {
        var settings = this.getSettings();

        if (!settings.notifications.enabled) {
            return;
        }

        if (settings.notifications.favoritesOnly && !channel.is_favorite) {
            return;
        }

        if (settings.notifications.playSound && !this._soundAlreadyPlayed) {
            this._playSound(settings.notifications.soundName);
            this._soundAlreadyPlayed = true;
        }

        var notificationText = channel.titre + ' vient de commencer.';

        if (channel.emission) {
            notificationText = channel.emission.title + ' sur ' + notificationText;
        }

        kango.ui.notifications.show('GL\'anning', notificationText, 'img/notification-icon.png', function () {
            kango.browser.tabs.create({
                url: 'http://www.jeuxvideo.com' + channel.url
            });
        });
    },

    _playSound: function (name) {
        try {
            var sound = new Audio();
            sound.src = kango.io.getResourceUrl('audio/' + name + '.mp3');
            sound.play();
        } catch (e) {}
    },

    log: function () {
        Array.prototype.unshift.call(arguments, '[' + moment().format('HH:mm:ss.SSS') + ']');

        if (kango.console) {
            kango.console.log(Array.prototype.join.call(arguments, ' '));
        }
    },

    refresh: function () {
        var self = this;
        var details = {
            url: self._feedUrl,
            method: 'GET',
            async: true,
            contentType: 'json'
        };

        self._soundAlreadyPlayed = false;

        kango.xhr.send(details, function (data) {
            self.log('Retrieving data...');

            if (data.status == 200 && data.response != null) {
                var count = 0;
                var value = data.response;
                var data = [];

                self.log('Data retrieved.');
                self.log('Parsing data...');

                value.channels = _.toArray(value.channels);
                data = _.union(value.channels, value.streams);

                _.map(data, function (channel) {
                    if (channel.emission) {
                        channel.emission.start = moment(channel.emission.start, 'YYYY-MM-DD HH:mm:ss').toDate();
                        channel.emission.end = moment(channel.emission.end, 'YYYY-MM-DD HH:mm:ss').toDate();
                    }

                    _.map(channel.planning, function (event) {
                        event.start = moment(event.start).toDate();
                        event.end = moment(event.end).toDate();
                        event.is_current = _.isEqual(_.pick(channel.emission, 'start', 'end'), _.pick(event, 'start', 'end'));

                        return event;
                    }, channel.planning);

                    channel.thumbnail_url = self._thumbnails[channel.id_contenu];
                    channel.is_favorite = self.isFavorite(channel.id_contenu);

                    var last = _.findWhere(self._data, { id_contenu: channel.id_contenu });

                    if (channel.is_live) {
                        if (last) {
                            if (!last.is_live) {
                                self.log('Channel ' + channel.titre + ' is now on air.');

                                self._sendNotification(channel);
                            } else if (!_.isEqual(channel.emission, last.emission)) {
                                self.log('Channel ' + channel.titre + ' had changed his emission from ' + last.emission + ' to ' + channel.emission + '.');

                                self._sendNotification(channel);
                            }
                        }

                        count++;
                    } else {
                        if (last) {
                            if (last.is_live) {
                                self.log('Channel ' + channel.titre + ' is now off air.');
                            }
                        }
                    }

                    return channel;
                }, data);

                self.log('Parsing complete.');

                self._data = data;
                self._setBadgeCount(count);
            } else {
                self.log('Unable to retrieve data!', '(status code: ' + data.status + ')');

                self._setOffline();
            }
        });
    },

    getChannels: function () {
        return this._data || [];
    },

    getSchedule: function (id) {
        var channel = _.findWhere(this._data, { id_contenu: id }) || {};

        return channel['planning'] || [];
    },

    toggleFavorite: function (id) {
        var channel = _.findWhere(this._data, { id_contenu: id });

        if (channel) {
            var favorites = kango.storage.getItem('favorites') || [];
            var isFavorite = !channel.is_favorite;

            channel.is_favorite = isFavorite;
            favorites[channel.id_contenu] = isFavorite;

            kango.storage.setItem('favorites', favorites);

            return isFavorite;
        }

        return false;
    },

    isFavorite: function (id) {
        var favorites = kango.storage.getItem('favorites') || [];

        return !!favorites[id];
    },

    getSettings: function () {
        return _.defaults(kango.storage.getItem('settings') || {}, this._settings);
    },

    setSettings: function (settings) {
        kango.storage.setItem('settings', settings);
    }

};

var extension = new GamingLive();

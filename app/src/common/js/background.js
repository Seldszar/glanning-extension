(function () {
    'use strict';

    function GamingLive() {
        this.refresh();
    }

    GamingLive.prototype = {

        _baseUrl: 'http://www.jeuxvideo.com',

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
            1493: 'http://image.jeuxvideo.com/gaming-live/casters/damdam-petite.jpg',
            1520: 'http://image.jeuxvideo.com/gaming-live/casters/carolequintaine-petite.jpg',
            1532: 'http://image.jeuxvideo.com/gaming-live/casters/fanta-bob-petite.jpg',
            1558: 'http://image.jeuxvideo.com/gaming-live/casters/rryod-y-petite.jpg',
            1568: 'http://image.jeuxvideo.com/gaming-live/casters/kere-petite.jpg',
            1569: 'http://image.jeuxvideo.com/gaming-live/casters/maitrearmand-petite.jpg',
            1576: 'http://image.jeuxvideo.com/gaming-live/casters/misterteamot-petite.jpg',
            1583: 'http://image.jeuxvideo.com/gaming-live/casters/bejito-petite.jpg',
            1591: 'http://image.jeuxvideo.com/gaming-live/casters/blizzheart-petite.jpg',
            1617: 'http://image.jeuxvideo.com/gaming-live/casters/crawling-flesh-petite.jpg',
            1665: 'http://image.jeuxvideo.com/gaming-live/casters/ghabryel-darthcolette-petite.jpg',
            1673: 'http://image.jeuxvideo.com/gaming-live/casters/guzz-petite.jpg',
            1678: 'http://image.jeuxvideo.com/gaming-live/casters/gydias-petite.jpg',
            1698: 'http://image.jeuxvideo.com/gaming-live/casters/ikuzze-petite.jpg',
            1710: 'http://image.jeuxvideo.com/gaming-live/casters/laink-petite.jpg',
            1743: 'http://image.jeuxvideo.com/gaming-live/casters/lucasstv-petite.jpg',
            1751: 'http://image.jeuxvideo.com/gaming-live/casters/maximerobinet-petite.jpg',
            1761: 'http://image.jeuxvideo.com/gaming-live/casters/mrquarate-petite.jpg',
            1769: 'http://image.jeuxvideo.com/gaming-live/casters/mrshu-petite.jpg',
            1778: 'http://image.jeuxvideo.com/gaming-live/casters/pseudoless-petite.jpg',
            1779: 'http://image.jeuxvideo.com/gaming-live/casters/synahel-petite.jpg',
            1783: 'http://image.jeuxvideo.com/gaming-live/casters/terracid-petite.jpg',
            1813: 'http://image.jeuxvideo.com/gaming-live/casters/wankilstudio-petite.jpg',
            1818: 'http://image.jeuxvideo.com/gaming-live/competitions/avatarvsfighting.jpg',
            1825: 'http://image.jeuxvideo.com/gaming-live/competitions/avatarfifa14.jpg',
            1832: 'http://image.jeuxvideo.com/gaming-live/competitions/avatarcallofduty.jpg',
            1833: 'http://image.jeuxvideo.com/gaming-live/competitions/avatarstarcraft2.jpg',
            1834: 'http://image.jeuxvideo.com/gaming-live/competitions/smite-petite.jpg',
            1838: 'http://image.jeuxvideo.com/gaming-live/competitions/tv-dayone2-petite.jpg'
        },

        _error: null,
        _data: null,

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

        _setOffline: function () {
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

            kango.ui.notifications.show('GL\'anning', notificationText, kango.io.getResourceUrl('img/notification-icon.png'), function () {
                kango.browser.tabs.create({
                    url: channel.url
                });
            });
        },

        _playSound: function (name) {
            try {
                var sound = new Audio();
                sound.src = kango.io.getResourceUrl('audio/' + name + '.mp3');
                sound.play();
            } catch (ignore) {}
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

                if (data.status === 200 && data.response !== null) {
                    var count = 0;
                    var value = data.response;

                    self.log('Data retrieved.');
                    self.log('Parsing data...');

                    _.map(value.streams, function (channel) {
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

                        channel.url = self._baseUrl + channel.url;
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
                    }, value.streams);

                    self.log('Parsing complete.');

                    self._error = null;
                    self._data = value.streams;
                    self._setBadgeCount(count);
                } else {
                    self.log('Unable to retrieve data!', '(status code: ' + data.status + ')');

                    self._error = data;
                    self._data = null;
                    self._setOffline();
                }

                window.setTimeout(function () {
                    self.refresh();
                }, self._refreshTimeout * (self._error ? 1.5 : 1));
            });
        },

        getChannels: function (callback) {
            return callback(this._error, this._data || []);
        },

        getSchedule: function (id, callback) {
            var channel = _.findWhere(this._data, { id_contenu: id }) || {};

            return callback(this._error, channel.planning || []);
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

    window.extension = new GamingLive();

}());

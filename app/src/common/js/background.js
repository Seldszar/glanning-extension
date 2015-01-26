(function () {
    'use strict';

    function GamingLive() {
        var self = this;

        window.setInterval(function () {
            self.refresh();
        }, self._refreshTimeout);

        self.refresh();
    }

    GamingLive.prototype = {

        _refreshTimeout: 60 * 1000,

        _baseUrl: 'http://glanning.seldszar.fr:6458/api/',

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

        _updateBadge: function (value) {
            if (_.isNumber(value)) {
                kango.ui.browserButton.setBadgeBackgroundColor([208, 0, 24, 255]);
                kango.ui.browserButton.setBadgeValue(value);
            } else {
                kango.ui.browserButton.setBadgeBackgroundColor([190, 190, 190, 230]);
                kango.ui.browserButton.setBadgeValue('?');
            }
        },

        _sendNotification: function (channel) {
            var settings = this.getSettings();

            if (!settings.notifications.enabled) {
                return;
            }

            if (settings.notifications.favoritesOnly && !channel.isFavorite) {
                return;
            }

            if (channel.isIgnored) {
                return;
            }

            if (settings.notifications.playSound && !this._soundAlreadyPlayed) {
                this._playSound(settings.notifications.soundName);
                this._soundAlreadyPlayed = true;
            }

            var notificationText = channel.name + ' vient de commencer.';

            if (channel.event) {
                notificationText = channel.event.title + ' sur ' + notificationText;
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
            try {
                Array.prototype.unshift.call(arguments, (new Date()).toJSON() + ':');

                if (kango.console) {
                    kango.console.log(Array.prototype.join.call(arguments, ' '));
                }
            } catch (ignore) {}
        },

        refresh: function () {
            var self = this;
            var details = {
                url: self._baseUrl + 'channels',
                method: 'GET',
                async: true,
                contentType: 'json'
            };

            self._soundAlreadyPlayed = false;

            kango.xhr.send(details, function (data) {
                self.log('Retrieving data...');

                var response = data.response;

                if (data.status === 200 && !_.isNull(data.response)) {
                    var count = 0;
                    var channels = response.channels;

                    _.map(channels, function (channel) {
                        channel.isFavorite = self.isFavorite(channel._id);
                        channel.isIgnored = self.isIgnored(channel._id);

                        _.map(channel.schedule, function (event) {
                            event.isCurrent = Date.now() >= Date.parse(event.begin) && Date.now() <= Date.parse(event.end);
                        }, channel.schedule);

                        var last = _.find(self._data, { _id: channel._id });

                        if (channel.online) {
                            if (last) {
                                if (!last.online) {
                                    self.log('Channel ' + channel.name + ' is now on air.');

                                    self._sendNotification(channel);
                                } else if (!_.isEqual(channel.event, last.event)) {
                                    self.log('Channel ' + channel.name + ' had changed his emission from ' + (last.event ? last.event.title : 'none') + ' to ' + (channel.event ? channel.event.title : 'none') + '.');

                                    self._sendNotification(channel);
                                }
                            }

                            count++;
                        } else {
                            if (last && last.online) {
                                self.log('Channel ' + channel.name + ' is now off air.');
                            }
                        }
                    }, channels);

                    self._error = null;
                    self._data = channels;
                    self._updateBadge(count);
                } else {
                    self.log('Unable to retrieve data!', '(status code: ' + data.status + ')');

                    self._error = response;
                    self._updateBadge(null);
                }
            });
        },

        getChannels: function (properties) {
            return {
                error: this._error,
                channels: _.where(this._data || [], properties || null)
            };
        },

        getSchedule: function (id) {
            var channel = _.find(this._data, { _id: id }) || {};

            return {
                error: this._error,
                schedule: channel.schedule || []
            };
        },

        toggleFavorite: function (id) {
            var favorites = kango.storage.getItem('favorites') || [];
            var exists = _.contains(favorites, id);

            favorites = (exists ? _.without(favorites, id) : _.union(favorites, [id]));

            kango.storage.setItem('favorites', favorites);

            return !exists;
        },

        isIgnored: function (id) {
            var ignored = kango.storage.getItem('ignored') || [];

            return _.contains(ignored, id);
        },

        toggleIgnored: function (id) {
            var ignored = kango.storage.getItem('ignored') || [];
            var exists = _.contains(ignored, id);

            ignored = (exists ? _.without(ignored, id) : _.union(ignored, [id]));

            kango.storage.setItem('ignored', ignored);

            return !exists;
        },

        isFavorite: function (id) {
            var favorites = kango.storage.getItem('favorites') || [];

            return _.contains(favorites, id);
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

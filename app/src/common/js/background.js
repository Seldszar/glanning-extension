(function () {
    'use strict';

    function GamingLive() {
        this.refresh();
    }

    GamingLive.prototype = {

        _baseUrl: 'http://www.jeuxvideo.com',

        _refreshTimeout: 60 * 1000,
        _feedUrl: 'http://webtv.jeuxvideo.com/esi/webtv_jv_header.php',

        _overrides: {
            1: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1uf230',
                    chat: 'http://webirc.jeuxvideo.com:7778/#gaminglivetv1'
                },
                thumbnail_url: 'img/channels/1.jpg'
            },
            3: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1uf23n',
                    chat: 'http://webirc.jeuxvideo.com:7778/#gaminglivetv2'
                },
                thumbnail_url: 'img/channels/3.jpg'
            },
            6: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1uf24n',
                    chat: 'http://webirc.jeuxvideo.com:7778/#gaminglivetvdota2'
                },
                thumbnail_url: 'img/channels/6.jpg'
            },
            244: {
                url: 'http://www.twitch.tv/officiel_jvcom',
                links: {
                    video: 'http://www.twitch.tv/officiel_jvcom/popout',
                    chat: 'http://www.twitch.tv/officiel_jvcom/chat'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/competitions/avatargaminglivetwitch.jpg'
            },
            125: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1zsoax',
                    chat: 'http://webirc.jeuxvideo.com:7778/#'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/competitions/avatarcounterstrike.jpg'
            },
            286: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1ufhsr',
                    chat: 'http://webirc.jeuxvideo.com:7778/#alexclicktv'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/alexclicktv-petite.jpg'
            },
            298: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1zoz8m',
                    chat: 'http://webirc.jeuxvideo.com:7778/#at0mium'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/at0mium-petite.jpg'
            },
            310: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1ufh4i',
                    chat: 'http://webirc.jeuxvideo.com:7778/#aypierre'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/aypierre-petite.jpg'
            },
            351: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1ufh4u',
                    chat: 'http://webirc.jeuxvideo.com:7778/#billsilverlight'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/bill-silverlight-petite.jpg'
            },
            353: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1zp0b8',
                    chat: 'http://webirc.jeuxvideo.com:7778/#g-e2'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/g-e2-petite.jpg'
            },
            392: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1zp0sf',
                    chat: 'http://webirc.jeuxvideo.com:7778/#kanon'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/kanon-petite.jpg'
            },
            394: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1ufht5',
                    chat: 'http://webirc.jeuxvideo.com:7778/#kenbogard'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/ken-bogard-petite.jpg'
            },
            452: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1y2v29',
                    chat: 'http://webirc.jeuxvideo.com:7778/#kenoyomo'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/keno-et-yomo-petite.jpg'
            },
            482: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1zp28s',
                    chat: 'http://webirc.jeuxvideo.com:7778/#keydeegamerboy'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/keydeegamerboy-petite.jpg'
            },
            491: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x208h7s',
                    chat: 'http://webirc.jeuxvideo.com:7778/#ldlc'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/ldlc-petite.jpg'
            },
            503: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1ufh5k',
                    chat: 'http://webirc.jeuxvideo.com:7778/#makoz'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/makoz-petite.jpg'
            },
            547: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1zoyji',
                    chat: 'http://webirc.jeuxvideo.com:7778/#memory-card'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/memory-card-petite.jpg'
            },
            621: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1zp2kq',
                    chat: 'http://webirc.jeuxvideo.com:7778/#metatrone'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/metatrone-petite.jpg'
            },
            660: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1ufhtl',
                    chat: 'http://webirc.jeuxvideo.com:7778/#mistermv'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/mister-mv-petite.jpg'
            },
            709: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1zp2fh',
                    chat: 'http://webirc.jeuxvideo.com:7778/#sephyross'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/sephyross-petite.jpg'
            },
            724: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1ufh55',
                    chat: 'http://webirc.jeuxvideo.com:7778/#thaek'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/thaek-petite.jpg'
            },
            725: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1ufh5w',
                    chat: 'http://webirc.jeuxvideo.com:7778/#tod'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/tod-petite.jpg'
            },
            726: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1y2v1p',
                    chat: 'http://webirc.jeuxvideo.com:7778/#videofus'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/videofus-petite.jpg'
            },
            740: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1uf24z',
                    chat: 'http://webirc.jeuxvideo.com:7778/#xeleko'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/xeleko-petite.jpg'
            },
            754: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x24m4o4',
                    chat: 'http://webirc.jeuxvideo.com:7778/#fildrong'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/fildrong-petite.jpg'
            },
            781: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x24m53k',
                    chat: 'http://webirc.jeuxvideo.com:7778/#hugo'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/hugo-petite.jpg'
            },
            810: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x24m6vf',
                    chat: 'http://webirc.jeuxvideo.com:7778/#necro'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/necro-petite.jpg'
            },
            818: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x24m6bn',
                    chat: 'http://webirc.jeuxvideo.com:7778/#nyo'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/nyo-petite.jpg'
            },
            833: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x250279',
                    chat: 'http://webirc.jeuxvideo.com:7778/#siphano'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/siphano-petite.jpg'
            },
            844: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x24m5tv',
                    chat: 'http://webirc.jeuxvideo.com:7778/#v0ja'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/v0ja-petite.jpg'
            },
            997: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1zsofq',
                    chat: 'http://webirc.jeuxvideo.com:7778/#lol'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/competitions/avatarlol.jpg'
            },
            1439: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x24m2t0',
                    chat: 'http://webirc.jeuxvideo.com:7778/#raph'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/raph-petite.jpg'
            },
            1454: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x27ts33',
                    chat: 'http://webirc.jeuxvideo.com:7778/#unsterbliicher'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/unsterbliicher-petite.jpg'
            },
            1466: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x28a67q',
                    chat: 'http://webirc.jeuxvideo.com:7778/#ashton'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/ashton-petite.jpg'
            },
            1493: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x28a4lh',
                    chat: 'http://webirc.jeuxvideo.com:7778/#damdam'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/damdam-petite.jpg'
            },
            1494: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x29tfh3',
                    chat: 'http://webirc.jeuxvideo.com:7778/#retroinde'
                },
                thumbnail_url: 'img/channels/1494.jpg'
            },
            1509: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x29sx15',
                    chat: 'http://webirc.jeuxvideo.com:7778/#dayone'
                },
                thumbnail_url: 'img/channels/1509.jpg'
            },
            1520: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x29szz1',
                    chat: 'http://webirc.jeuxvideo.com:7778/#carolequintaine'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/carolequintaine-petite.jpg'
            },
            1532: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x27ts8d',
                    chat: 'http://webirc.jeuxvideo.com:7778/#fanta-bob'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/fanta-bob-petite.jpg'
            },
            1558: {
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/rryod-y-petite.jpg'
            },
            1568: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x29t1uu',
                    chat: 'http://webirc.jeuxvideo.com:7778/#kere'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/kere-petite.jpg'
            },
            1569: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x29t21x',
                    chat: 'http://webirc.jeuxvideo.com:7778/#maitrearmand'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/maitrearmand-petite.jpg'
            },
            1576: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x29t268',
                    chat: 'http://webirc.jeuxvideo.com:7778/#misterteamot'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/misterteamot-petite.jpg'
            },
            1583: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2al8if',
                    chat: 'http://webirc.jeuxvideo.com:7778/#bejito'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/bejito-petite.jpg'
            },
            1591: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2alac4',
                    chat: 'http://webirc.jeuxvideo.com:7778/#blizzheart'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/blizzheart-petite.jpg'
            },
            1617: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2alajt',
                    chat: 'http://webirc.jeuxvideo.com:7778/#crawlingflesh'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/crawling-flesh-petite.jpg'
            },
            1665: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2al8nl',
                    chat: 'http://webirc.jeuxvideo.com:7778/#GhabryelDarthColette'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/ghabryel-darthcolette-petite.jpg'
            },
            1673: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2aland',
                    chat: 'http://webirc.jeuxvideo.com:7778/#guzz'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/guzz-petite.jpg'
            },
            1678: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2ala5n',
                    chat: 'http://webirc.jeuxvideo.com:7778/#gydias'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/gydias-petite.jpg'
            },
            1698: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2alag6',
                    chat: 'http://webirc.jeuxvideo.com:7778/#ikuzze'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/ikuzze-petite.jpg'
            },
            1710: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2al9o0',
                    chat: 'http://webirc.jeuxvideo.com:7778/#laink'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/laink-petite.jpg'
            },
            1743: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2alajc',
                    chat: 'http://webirc.jeuxvideo.com:7778/#lucasstv'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/lucasstv-petite.jpg'
            },
            1751: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2al7zt',
                    chat: 'http://webirc.jeuxvideo.com:7778/#maximerobinet'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/maximerobinet-petite.jpg'
            },
            1761: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2al8rb',
                    chat: 'http://webirc.jeuxvideo.com:7778/#mrquarate'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/mrquarate-petite.jpg'
            },
            1769: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2al7ut',
                    chat: 'http://webirc.jeuxvideo.com:7778/#mrshu'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/mrshu-petite.jpg'
            },
            1778: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2al48i',
                    chat: 'http://webirc.jeuxvideo.com:7778/#pseudoless'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/pseudoless-petite.jpg'
            },
            1779: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2alcx5',
                    chat: 'http://webirc.jeuxvideo.com:7778/#synahel'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/synahel-petite.jpg'
            },
            1783: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2al9a2',
                    chat: 'http://webirc.jeuxvideo.com:7778/#terracid'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/terracid-petite.jpg'
            },
            1813: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2ala5s',
                    chat: 'http://webirc.jeuxvideo.com:7778/#wankilstudio'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/casters/wankilstudio-petite.jpg'
            },
            1818: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1zspfa',
                    chat: 'http://webirc.jeuxvideo.com:7778/#vsfighting'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/competitions/avatarvsfighting.jpg'
            },
            1825: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1zsp7j',
                    chat: 'http://webirc.jeuxvideo.com:7778/#fifa'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/competitions/avatarfifa14.jpg'
            },
            1832: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1zsoq1',
                    chat: 'http://webirc.jeuxvideo.com:7778/#callofduty'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/competitions/avatarcallofduty.jpg'
            },
            1833: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x1zso1s',
                    chat: 'http://webirc.jeuxvideo.com:7778/#starcraft2'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/competitions/avatarstarcraft2.jpg'
            },
            1834: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x267ait',
                    chat: 'http://webirc.jeuxvideo.com:7778/#smite'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/competitions/smite-petite.jpg'
            },
            1838: {
                links: {
                    video: 'http://www.dailymotion.com/embed/video/x2a0dql',
                    chat: 'http://webirc.jeuxvideo.com:7778/#dayone2'
                },
                thumbnail_url: 'http://image.jeuxvideo.com/gaming-live/competitions/tv-dayone2-petite.jpg'
            }
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
                        }, channel.planning);

                        channel.url = self._baseUrl + channel.url;
                        channel.is_favorite = self.isFavorite(channel.id_contenu);

                        channel = _.extend(channel, self._overrides[channel.id_contenu] || {});

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
                    }, value.streams);

                    self.log('Parsing complete.');

                    self._error = null;
                    self._data = value.streams;
                    self._updateBadge(count);
                } else {
                    self.log('Unable to retrieve data!', '(status code: ' + data.status + ')');

                    self._error = data;
                    self._updateBadge(null);
                }

                window.setTimeout(function () {
                    self.refresh();
                }, self._refreshTimeout);
            });
        },

        getChannels: function (properties) {
            return {
                error: this._error,
                channels: _.where(this._data || [], properties || {})
            };
        },

        getSchedule: function (id) {
            var channel = _.findWhere(this._data, { id_contenu: id }) || {};

            return {
                error: this._error,
                schedule: channel.planning || []
            };
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

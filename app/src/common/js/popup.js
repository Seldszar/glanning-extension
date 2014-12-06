(function () {
    'use strict';

    angular.module('popup', [
        'ui.router'
    ]).
        config(['$compileProvider', function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|chrome-extension):/);
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data-image\/)/);
        }]).
        config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/channels');
            $stateProvider.
                state('channels', {
                    url: '/channels',
                    views: {
                        '@': {
                            templateUrl: 'partials/channels.html',
                            controller: ['$scope', '$stateParams', 'Channels', function ($scope, $stateParams, Channels) {
                                $scope.channels = [];
                                Channels.all().then(function (channels) {
                                    $scope.channels = channels;
                                });
                                $scope.favorite = function (channel) {
                                    Channels.favorite(channel).then(function (result) {
                                        broadcast.is_favorite = result;
                                    });
                                };
                                $scope.share = function (channel) {
                                    Channels.share(channel);
                                };
                            }]
                        }
                    }
                }).
                state('schedule', {
                    url: '/schedule',
                    abstract: true,
                    views: {
                        'sub-menu': {
                            templateUrl: 'partials/schedule.sub-menu.html',
                            controller: ['$scope', 'Channels', function ($scope, Channels) {
                                $scope.channels = [];
                                Channels.all().then(function (channels) {
                                    $scope.channels = channels;
                                });
                            }]
                        }
                    }
                }).
                state('schedule.show', {
                    url: '/show/:id',
                    views: {
                        '@': {
                            templateUrl: 'partials/schedule.show.html',
                            controller: ['$scope', '$stateParams', 'Schedules', function ($scope, $stateParams, Schedules) {
                                $scope.schedule = [];
                                Schedules.get($stateParams.id).then(function (schedule) {
                                    $scope.schedule = schedule;
                                });
                            }]
                        }
                    }
                }).
                state('infos', {
                    url: '/infos',
                    abstract: true,
                    views: {
                        'sub-menu': {
                            templateUrl: 'partials/infos.sub-menu.html'
                        }
                    }
                }).
                state('infos.about', {
                    url: '/about',
                    views: {
                        '@': {
                            templateUrl: 'partials/infos.about.html'
                        }
                    }
                }).
                state('infos.settings', {
                    url: '/settings',
                    views: {
                        '@': {
                            templateUrl: 'partials/infos.settings.html'
                        }
                    }
                });
        }]).
        factory('Channels', ['$q', function ($q) {
            return {
                all: function () {
                    var deferred = $q.defer();
                    kango.invokeAsync('extension.getChannels', deferred.resolve);
                    return deferred.promise;
                },
                favorite: function (channel) {
                    var deferred = $q.defer();
                    kango.invokeAsync('extension.toggleFavorite', channel.id_contenu, deferred.resolve);
                    return deferred.promise;
                },
                share: function (channel) {
                    var text = 'Je regarde actuellement ';
                    if (channel.emission) {
                        text += channel.emission.title + ' sur ';
                    }
                    text += channel.titre + ' sur Gaming Live';
                    kango.browser.tabs.create({
                        url: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(channel.url)
                    });
                }
            };
        }]).
        factory('Schedules', ['$q', function ($q) {
            return {
                get: function (channelId) {
                    var deferred = $q.defer();
                    kango.invokeAsync('extension.getSchedule', channelId, deferred.resolve);
                    return deferred.promise;
                }
            };
        }]).
        factory('Settings', ['$q', function ($q) {
            return {
                all: function () {
                    var deferred = $q.defer();
                    kango.invokeAsync('extension.getSettings', deferred.resolve);
                    return deferred.promise;
                },
                save: function (value) {
                    kango.invokeAsync('extension.setSettings', value);
                }
            };
        }]).
        directive('openTab', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    element.on('click', function (event) {
                        event.preventDefault();
                        kango.browser.tabs.create({
                            url: attr.openTab || attr.href
                        });
                    });
                }
            };
        }).
        directive('openTabIgnore', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    element.on('click', function (event) {
                        event.stopImmediatePropagation();
                    });
                }
            };
        }).
        directive('extensionVersion', function () {
            return {
                restrict: 'A',
                template: kango.getExtensionInfo().version
            };
        }).
        run(['$rootScope', '$state', 'Settings', function ($rootScope, $state, Settings) {
            $rootScope.$state = $state;
            $rootScope.settings = {};
            Settings.all().then(function (settings) {
                $rootScope.settings = settings;
                $rootScope.$watch('settings', function (newVal) {
                    Settings.save(newVal);
                }, true);
            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                ga('send', 'pageview', $state.href(toState, toParams));
            });
        }]);

    KangoAPI.onReady(function () {
        angular.bootstrap(document, ['popup']);
    });

}());

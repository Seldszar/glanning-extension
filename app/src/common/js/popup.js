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
                            controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
                                $scope.channels = [];
                                kango.invokeAsync('extension.getChannels', function (channels) {
                                    $scope.$apply(function () {
                                        $scope.channels = channels;
                                    });
                                });
                                $scope.favorite = function (broadcast) {
                                    kango.invokeAsync('extension.toggleFavorite', broadcast.id_contenu, function (isFavorite) {
                                        $scope.$apply(function () {
                                            broadcast.is_favorite = isFavorite;
                                        });
                                    });
                                };
                                $scope.share = function (broadcast) {
                                    kango.browser.tabs.create({
                                        url: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('Je regarde actuellement ' + broadcast.titre + ' sur Gaming Live') + '&url=' + encodeURIComponent(broadcast.url)
                                    });
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
                            controller: ['$scope', function ($scope) {
                                $scope.channels = [];
                                kango.invokeAsync('extension.getChannels', function (channels) {
                                    $scope.$apply(function () {
                                        $scope.channels = channels;
                                    });
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
                            controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
                                $scope.schedule = [];
                                kango.invokeAsync('extension.getSchedule', $stateParams.id, function (schedule) {
                                    $scope.$apply(function () {
                                        $scope.schedule = schedule;
                                    });
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
        run(['$rootScope', '$state', function ($rootScope, $state) {
            $rootScope.$state = $state;
            $rootScope.settings = {};
            kango.invokeAsync('extension.getSettings', function (settings) {
                $rootScope.$apply(function () {
                    $rootScope.settings = settings;
                    $rootScope.$watch('settings', function (newVal) {
                        kango.invokeAsync('extension.setSettings', newVal);
                    }, true);
                });
            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                ga('send', 'pageview', $state.href(toState, toParams));
            });
        }]);

    KangoAPI.onReady(function () {
        angular.bootstrap(document, ['popup']);
    });

}());

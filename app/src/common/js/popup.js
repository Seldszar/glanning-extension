/**
 * Google Analytics.
 */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-36955511-5', 'auto');
ga('set', 'checkProtocolTask', function () {});

/**
 * Popup module.
 */
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
                    controller: ['$rootScope', '$scope', '$stateParams', function ($rootScope, $scope, $stateParams) {
                        $scope.channels = [];
                        $scope.refresh = function () {
                            kango.invokeAsync('extension.getChannels', function (channels) {
                                $scope.$apply(function () {
                                    $scope.channels = channels;
                                });
                            });
                        };
                        $scope.toggleFavorite = function (broadcast, event) {
                            event.stopImmediatePropagation();
                            kango.invokeAsync('extension.toggleFavorite', broadcast.id_contenu, function (isFavorite) {
                                $scope.$apply(function () {
                                    broadcast.is_favorite = isFavorite;
                                });
                            });
                        };
                        $scope.refresh();
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
                        $scope.refresh = function () {
                            kango.invokeAsync('extension.getChannels', function (channels) {
                                $scope.$apply(function () {
                                    $scope.channels = channels;
                                });
                            });
                        };
                        $scope.refresh();
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
                        $scope.refresh = function () {
                            kango.invokeAsync('extension.getSchedule', $stateParams.id, function (schedule) {
                                $scope.$apply(function () {
                                    $scope.schedule = schedule;
                                });
                            });
                        };
                        $scope.refresh();
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
    }
}).
run(['$rootScope', '$state', function ($rootScope, $state) {
    $rootScope.$state = $state;
    $rootScope.settings = {};
    KangoAPI.onReady(function () {
        kango.invokeAsync('extension.getSettings', function (settings) {
            $rootScope.$apply(function () {
                $rootScope.settings = settings;
                $rootScope.$watch('settings', function (newVal) {
                    kango.invokeAsync('extension.setSettings', newVal);
                }, true);
            });
        });
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        ga('send', 'pageview', $state.href(toState, toParams));
    });
}]);

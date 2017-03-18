angular.module('starter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })

    //首页模块    
    .state('tab.index', {
            url: '/index',
            views: {
                'tab-index': {
                    templateUrl: 'templates/tab-index.html',
                    controller: 'indexCtrl'
                }
            }
        })
        .state('tab.index-story', {
            url: '/index/:storyId',
            views: {
                'tab-index': {
                    templateUrl: 'templates/tab-index-story.html',
                    controller: 'indexStoryCtrl'
                }
            }
        })
    //主题日报模块
    .state('tab.theme', {
            url: '/theme',
            views: {
                'tab-theme': {
                    templateUrl: 'templates/tab-theme.html',
                    controller: 'themeCtrl'
                }
            }
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/index');

});
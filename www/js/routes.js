angular.module('starter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })

    .state('tab.index', {
        url: '/index',
        views: {
            'tab-index': {
                templateUrl: 'templates/tab-index.html',
                controller: 'IndexCtrl'
            }
        }
    })
    .state('tab.index-story', {
        url: '/index/123',
        views: {
            'tab-index': {
                templateUrl: 'templates/tab-index-story.html',
                controller: 'IndexStoryCtrl'
            }
        }
    })

    .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/tab-chats.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
   // $urlRouterProvider.otherwise('/tab/index');

});
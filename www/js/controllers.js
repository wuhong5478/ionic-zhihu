angular.module('starter.controllers', [])

.controller('IndexCtrl', function($scope, $http,$timeout) {


    $http({
        method: 'GET',
        url: 'http://localhost:3000/api/latestnews'
    }).then(function successCallback(response) {
         var data = response.data.data;
         console.log(data)
         $scope.topStories = data.top_stories;
         $scope.stories = data.stories;

         //swiper 插件这里需要页面上元素渲染出来后才能初始化
         $timeout(function(){
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoplay: 2500
            });      
         },500)
         
    }, function errorCallback(response) {
        // 请求失败执行代码
    });
})

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
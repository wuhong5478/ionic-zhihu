angular.module('starter.controllers', [])

.controller('IndexCtrl', function($scope, $http,$timeout) {
    //初始化数据
    $http({
        method: 'GET',
        url: 'http://zhihu.bood.in/readapi?uri=http://news-at.zhihu.com/api/4/news/latest'
    }).then(function successCallback(response) {
         var data = response.data;
         console.log(data)
         $scope.today = data.date;
         $scope.topStories = data.top_stories;
         $scope.stories = data.stories
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

    //ion-infinite-scrol 方法页面刚加载就会执行，用isFirstPage来控制进来时使其不执行。
    var isFirstPage = 0;
    $scope.loadMore = function(){
        isFirstPage++;
        if(isFirstPage<=1){
            $scope.$broadcast('scroll.infiniteScrollComplete');
            return; 
        }   
        $http({
            method: 'GET',
            url: 'http://zhihu.bood.in/readapi?uri=http://news.at.zhihu.com/api/4/news/before/20170316'
        }).then(function successCallback(response) {
             var data = response.data;
             console.log(data)
             $scope.stories = $scope.stories.concat(data.stories);
             $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function errorCallback(response) {
            // 请求失败执行代码
        });
    }

})
.controller('IndexStoryCtrl',function($scope){
    
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
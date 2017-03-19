angular.module('starter.themeCtrl', [])

.controller('themeCtrl', function($scope, $http) {
    $http({
        method: 'GET',
        url: 'http://zhihu.bood.in/readapi?uri=http://news-at.zhihu.com/api/4/themes'
    }).then(function successCallback(response) {
         console.log(response);
         $scope.themesData = response.data.others;
         
    }, function errorCallback(response) {
        // 请求失败执行代码
    });   
})
.controller('themeListCtrl', function($scope, $http,$state,$timeout) {
    var listId = $state.params.listId;    
    $timeout(function(){
        $http({
            method: 'GET',
            url: 'http://zhihu.bood.in/readapi?uri=http://news-at.zhihu.com/api/4/theme/'+listId
        }).then(function successCallback(response) {
             console.log(response);
             $scope.stories = response.data.stories;
             $scope.title = response.data.name;
             $scope.listId = listId
        }, function errorCallback(response) {
            // 请求失败执行代码
        });
    },300);
})

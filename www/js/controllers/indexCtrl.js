angular.module('starter.indexCtrl', [])

.controller('indexCtrl', function($scope, $http,$timeout) {
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
.controller('indexStoryCtrl',function($scope,$http,$state,$timeout){
    var storyId = $state.params.storyId;
    
    //为保证页面流畅度，进入页面300毫秒后再请求数据
    $timeout(function(){
        $http({
            method: 'GET',
            url: 'http://zhihu.bood.in/readapi?uri=http://news-at.zhihu.com/api/4/news/'+storyId
        }).then(function successCallback(response) {
            var data = response.data;
            $scope.cssLink = data.css[0];
            $scope.title = data.title;
            //处理接口返回的html字符串，在指定位置插入字符串
            var inserHtml,arrHtml,oldHtml;
            if(data.image){
                inserHtml = '<img src="'+data.image+'">';
                arrHtml = data.body.split('<div class="img-place-holder">');
                oldHtml = arrHtml[0]+'<div class="img-place-holder">'+inserHtml+arrHtml[1];
            }else{
                oldHtml = data.body;
            } 
            
            //知乎图片防盗链，图片链接正则替换用别人的
            var newHtml= oldHtml.replace(/src=[\'\"]?([^\'\"]*)[\'\"]?/gi, function (img, imgUrl) {
                return 'src=http://zhihu.garychang.cn/tiny-pic?img='+imgUrl;
            });

            $timeout(function(){
               $scope.content = newHtml; 
            },100)
            

        }, function errorCallback(response) {
            // 请求失败执行代码
        });

    },300)
    

})

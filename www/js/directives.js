angular.module('starter.directives', [])
.directive('buttonGoback', function() {
    return {
        restrict: 'E',
        scope:{
            title:'='
        },
        template:'<div class="bar bar-header bar-positive">'+
                 '   <button class="button goback icon ion-chevron-left" style="width:30px;border:none;"></button>'+
                 '   <h1 class="title">{{title}}</h1>'+
                 '</div>',
        link: function(scope, element, attrs) {
            $(element).find('button').click(function(){
                window.history.go(-1);
            })
        }
    };
})
.directive('hideTabs',function($rootScope,$location){
    return {
        restrict:'AE',
        link:function($scope){
            $rootScope.hideTabs = 'tabs-item-hide';
            $scope.$on('$destroy',function(){
                var url = $location.path();                
                if( url=='/tab/theme' ||
                    url=='/tab/index' 
                ){
                   $rootScope.hideTabs = 'tabs-item-show'; 
                }
            })
        }
    }
})

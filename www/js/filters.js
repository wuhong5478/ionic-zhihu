angular.module('starter.filters', []).filter('imgSrc', function() {
    return function(input) {
        //知乎图片防盗链，借用下别人的管子哈哈
        return 'http://zhihu.garychang.cn/tiny-pic?img='+input;
    };
})
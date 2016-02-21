define(["compatible"], function (compatible) {
    //标记滚动条是否在滚动
    var scrolling = false;
    //返回顶部的函数
    var backToTop = function () {
        if (scrolling) {
            return;
        }
        
        scrolling = true;
        var getScroll = compatible.compatibleGetScroll();
        var scrollToTop;
        if(getScroll !== undefined) {
            scrollToTop = getScroll.scrollTop;
        } else {
            scrolling = false;
            return;
        }
        
        var time = setInterval(function() {
            scrollToTop -= Math.ceil(scrollToTop * 0.05);
            if(scrollToTop === 0 || scrollToTop < 0) {
                getScroll.scrollTop = 0;
                scrolling = false;
                clearTimeout(time);
            }
            getScroll.scrollTop = scrollToTop;
        }, 10);
    };
    return {
        backToTop: backToTop
    };
    
});
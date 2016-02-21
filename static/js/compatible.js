//兼容chrome IE
define( function (){
    var compatibleGetScroll = function () {
        var getScroll;
        if(document.body.scrollTop === 0 & document.documentElement.scrollTop === 0) {
            return;
        } else if(document.body.scrollTop !== 0) {
            getScroll = document.body;
        } else if(document.documentElement.scrollTop !== 0) {
            getScroll = document.documentElement;
        }
        return getScroll;
    };
    return {
        compatibleGetScroll: compatibleGetScroll
    };
});

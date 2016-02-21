define(["compatible"], function (compatible) {
    //获得订单列表头的位置信息
    var getMyOrderHeaderPos = function (){
        var myOrderHeader = document.getElementById("my-order-header");
        var scroll = compatible.compatibleGetScroll();
        var rect = myOrderHeader.getBoundingClientRect();
        var orderHeaderPos = {};
        if(scroll !== undefined) {
            orderHeaderPos.top = rect.top + scroll.scrollTop;
            orderHeaderPos.left = rect.left + scroll.scrollLeft;
        } else {
            orderHeaderPos.top = rect.top;
            orderHeaderPos.left = rect.left;
        }
        return orderHeaderPos;
    };
    //获取所点餐食的位置信息
    var getOrderItemPos = function (targetEle) {
        var rect = targetEle.getBoundingClientRect();
        var scroll = compatible.compatibleGetScroll();
        var orderItemPos = {};
        if(scroll !== undefined) {
            orderItemPos.top = rect.top + scroll.scrollTop;
            orderItemPos.left = rect.left + scroll.scrollLeft;
        } else {
            orderItemPos.top = rect.top;
            orderItemPos.left = rect.left;
        }
        return orderItemPos;
    };
    //
    var orderListChange = function (targetEle){
    
    };
    return {
        getMyOrderHeaderPos: getMyOrderHeaderPos,
        getOrderItemPos: getOrderItemPos,
        orderListChange: orderListChange
    };
});


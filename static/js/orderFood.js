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
        var name = targetEle.getAttribute("data-name");
        var price = targetEle.getAttribute("data-price");
        var orderList = document.getElementById("my-order-list");
        var itemNodes = orderList.childNodes;
        //判断当前添加的item是否已在订单中存在，如果存在，则只用加数量
        for(var i = 1; i< itemNodes.length; i++) {
            if(itemNodes[i].nodeName == "DIV" && itemNodes[i].getAttribute("data-name") == name) {
                var itemNum = itemNodes[i].getAttribute("data-number");
                itemNum = parseFloat(itemNum) + 1;
                itemNodes[i].setAttribute("data-number", itemNum);
                var itemNumDis = itemNodes[i].getElementsByClassName("itemNumDis")[0];
                itemNumDis.innerHTML = itemNum;
                var itemPrDis = itemNodes[i].getElementsByClassName("itemPrDis")[0];
                itemPrice.innerHTML = parseFloat(price) * parseFloat(itemNum);
                return;
            }
        }
        //当前添加的item没有存在在订单中时，新建itemList
        var orderItem = document.createElement("div");
        orderItem.setAttribute("data-name", name);
        orderItem.setAttribute("data-number", 1);
        var itemName = document.createElement("span");
        var itemNumber = document.createElement("span");
        var itemPrice = document.createElement("span");
        itemName.setAttribute("class", "itemNamDis");
        itemName.innerHTML = name;
        itemPrice.setAttribute("class", "itemPrDis");
        itemPrice.innerHTML = price;
        itemNumber.setAttribute("class", "itemNumDis");
        itemNumber.innerHTML = 1;
        orderItem.appendChild(itemName);
        orderItem.appendChild(itemNumber);
        orderItem.appendChild(itemPrice);
        orderList.appendChild(orderItem);
    };
    return {
        getMyOrderHeaderPos: getMyOrderHeaderPos,
        getOrderItemPos: getOrderItemPos,
        orderListChange: orderListChange
    };
});


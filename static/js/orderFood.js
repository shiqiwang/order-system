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
    
    //计算总价
    function calculateGross() {
        //总价
        var gross = 0;
        var priceLi = document.getElementsByClassName("itemPrDis");
        for(var i = 0; i < priceLi.length; i++) {
            gross = gross + parseFloat(priceLi[i].innerHTML);
        }
        return gross;
    }
    
    //总价栏
    function addGrossList(price) {
        var grossList = document.createElement("div");
        grossList.setAttribute("id", "grossList");
        var grossName = document.createElement("span");
        grossName.innerHTML = "总价：";
        var gross = document.createElement("span");
        gross.setAttribute("id", "gross");
        gross.innerHTML = price;
        grossList.appendChild(grossName);
        grossList.appendChild(gross);
        var orderList = document.getElementById("my-order-list");
        orderList.appendChild(grossList);
    }
    
    //当点了第一个东西以后，要出现的类似副标题的东西
    function addSidehead() {
        var sidehead = document.createElement("div");
        sidehead.setAttribute("id", "sidehead");
        var name = document.createElement("span");
        name.innerHTML = "菜品";
        name.setAttribute("id", "sideheadName");
        var num = document.createElement("span");
        num.innerHTML = "数量";
        num.setAttribute("id", "sideheadNum");
        var price = document.createElement("span");
        price.innerHTML = "价格";
        price.setAttribute("id", "sideheadPrice");
        sidehead.appendChild(name);
        sidehead.appendChild(num);
        sidehead.appendChild(price);
        var orderList = document.getElementById("my-order-list");
        orderList.appendChild(sidehead);
    }
    
    //点餐时，改变list中的项
    var orderListChange = function (targetEle){
        var grossList = document.getElementById("grossList");
        var name = targetEle.getAttribute("data-name");
        var price = targetEle.getAttribute("data-price");
        var orderList = document.getElementById("my-order-list");
        var itemNodes = orderList.childNodes;
        //判断当前添加的item是否已在订单中存在，如果存在，则只用加数量
        for(var i = 0; i< itemNodes.length; i++) {
            if(itemNodes[i].nodeName == "DIV" && itemNodes[i].getAttribute("data-name") == name) {
                var itemNum = itemNodes[i].getAttribute("data-number");
                itemNum = parseFloat(itemNum) + 1;
                itemNodes[i].setAttribute("data-number", itemNum);
                var itemNumDis = itemNodes[i].getElementsByClassName("itemNumDis")[0];
                itemNumDis.innerHTML = itemNum;
                var itemPrDis = itemNodes[i].getElementsByClassName("itemPrDis")[0];
                itemPrDis.innerHTML = parseFloat(price) * parseFloat(itemNum);
                orderList.removeChild(grossList);
                addGrossList(calculateGross());
                return;
            }
        }
        //当客户点的还是第一个时，加上副标题，即出现 菜品、数量、价格栏
        var itemLen = document.getElementsByClassName("orderItem").length;
        if(itemLen == 0) {
            addSidehead();
        }
        //当前添加的item没有存在在订单中时，新建itemList
        var orderItem = document.createElement("div");
        orderItem.setAttribute("data-name", name);
        orderItem.setAttribute("data-number", 1);
        orderItem.setAttribute("class", "orderItem");
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
        
        //如果客户点的还是第一个时，增加总价栏, 没有时 删除前一个总价栏再append
        if(itemLen == 0) {
            addGrossList(calculateGross()); 
        } else if(itemLen > 0) {
            orderList.removeChild(grossList);
            addGrossList(calculateGross());
        }
    };
    
    return {
        getMyOrderHeaderPos: getMyOrderHeaderPos,
        getOrderItemPos: getOrderItemPos,
        orderListChange: orderListChange
    };
});


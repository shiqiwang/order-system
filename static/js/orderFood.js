define(["compatible"], function (compatible) {
    //一直要用到这个orderList
    var orderList = document.getElementById("my-order-list");
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
        var submitButton = document.createElement("span");
        submitButton.setAttribute("id", "submitButton");
        submitButton.innerHTML = "下单";
        grossList.appendChild(grossName);
        grossList.appendChild(gross);
        grossList.appendChild(submitButton);
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
        orderList.appendChild(sidehead);
    }
    
    //获取点击的项的信息
    function getItemInfo(targetEle) {
        var name = targetEle.getAttribute("data-name");
        var price = targetEle.getAttribute("data-price");
        var itemInfo = {
            itemName: name,
            itemPrice: price
        };
        return itemInfo;
    }
    
    // 增加orderItem外层div的函数
    function buildListBody() {
        var listBody = document.createElement("div");
        listBody.setAttribute("id", "listBody");
        orderList.appendChild(listBody);
    }
    
    //当订单列表中不存在用户所点击的项，新建订单项
    function buildNewOrderItem(name, price) {
        var listBod = document.getElementById("listBody");
        var orderItem = document.createElement("div");
        orderItem.setAttribute("data-name", name);
        orderItem.setAttribute("data-number", 1);
        orderItem.setAttribute("unit-price", price);
        orderItem.setAttribute("class", "orderItem");
        var itemName = document.createElement("span");
        var itemNumber = document.createElement("span");
        var itemPrice = document.createElement("span");
        var subIcon = document.createElement("img");
        var addIcon = document.createElement("img");
        subIcon.setAttribute("class", "subIcon");
        addIcon.setAttribute("class", "addIcon");
        subIcon.setAttribute("src", "../image/order-list-sub.png");
        addIcon.setAttribute("src", "../image/order-list-add.png");
        subIcon.addEventListener("click", function(event) {
            itemNumChange(event.target);
        });
        addIcon.addEventListener("click", function(event){
            itemNumChange(event.target);
        });
        itemName.setAttribute("class", "itemNamDis");
        itemName.innerHTML = name;
        itemPrice.setAttribute("class", "itemPrDis");
        itemPrice.innerHTML = price;
        itemNumber.setAttribute("class", "itemNumDis");
        itemNumber.innerHTML = 1;
        orderItem.appendChild(itemName);
        orderItem.appendChild(subIcon);
        orderItem.appendChild(itemNumber);
        orderItem.appendChild(addIcon);
        orderItem.appendChild(itemPrice);
        listBod.appendChild(orderItem);
    } 
    
    //订单中存在的项 只是增加数量和价格
    function alreadyExitItem(ele, price, name, grossList) {
        if(ele != null) {
            var itemNodes = ele.childNodes;
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
                    return true;
                }
            }
        }
    }
    
    //滚动条的出现
    function scrollDis(ele) {
        ele.style.height = 280 + "px";
        ele.style.overflowY = "auto";
    }
    
    var itemNumChange = function (targetEle){
        var targetParent = targetEle.parentNode;
        var unitPr = parseFloat(targetParent.getAttribute("unit-price"));
        var itemNum = parseFloat(targetParent.getAttribute("data-number"));
        var itemNumDis = targetParent.querySelectorAll(".itemNumDis")[0];
        var itemPrDis = targetParent.querySelectorAll(".itemPrDis")[0];
        var orderItemLen = document.getElementsByClassName("orderItem").length;
        var gross = document.getElementById("gross");
        var grossMoney = parseFloat(gross.innerHTML);
        var listBody = document.getElementById("listBody");
        var newItemNum;
        if(targetEle.getAttribute("class") == "subIcon") {
            newItemNum = itemNum - 1; 
            gross.innerHTML = grossMoney - unitPr;
        } else {
            newItemNum = itemNum + 1;
            gross.innerHTML = grossMoney + unitPr;
        }
        var itemGross = unitPr * newItemNum;
        //数量为0时，删除这一项订单
        if(newItemNum == 0) {
            var targetAncestor = targetParent.parentNode;
            targetAncestor.removeChild(targetParent);
            //当一个东西都没有的时候，要记得把总价和副标题栏也删了
            if(orderItemLen == 1) {
                var sideHead = document.getElementById("sidehead");
                var grossList = document.getElementById("grossList");
                orderList.removeChild(sideHead);
                orderList.removeChild(listBody);
                orderList.removeChild(grossList);
            }
            if(orderItemLen < 7 || orderItemLen == 7) {
                listBody.style.height = "auto";
            }
        } else {
            targetParent.setAttribute("data-number", newItemNum);
            itemNumDis.innerHTML = newItemNum;
            itemPrDis.innerHTML = itemGross;
        }
    };
    
    
    
    //点餐时，改变list中的项
    var orderListChange = function (targetEle){
        var grossList = document.getElementById("grossList");
        var targetItem = getItemInfo(targetEle);
        var name = targetItem.itemName;
        var price = targetItem.itemPrice;
        //当客户点的还是第一个时，加上副标题，即出现 菜品、数量、价格栏
        var itemLen = document.getElementsByClassName("orderItem").length;
        if(itemLen == 0) {
            addSidehead();
            //在所有item外再加一层div是为了滚动条的出现更加自然
            buildListBody();
        }
        var listBod = document.getElementById("listBody");
        //如果itemLen大于7则出现滚动条
        if(itemLen > 6) {
            scrollDis(listBod);
        }
        //只是数量和价格增加
        var exit = alreadyExitItem(listBod, price, name, grossList);
        if(exit == true) {
            return;
        }
        //等会儿新建的函数在这里调用
        buildNewOrderItem(name, price);
        //如果客户点的还是第一个时，增加总价栏, 没有时 删除前一个总价栏再append
        if(itemLen == 0) {
            addGrossList(calculateGross()); 
        } else if(itemLen > 0) {
            orderList.removeChild(grossList);
            addGrossList(calculateGross());
        }
    };
    
    return {
        orderListChange: orderListChange,
        itemNumChange: itemNumChange
    };
});


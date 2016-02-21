define(["colorChange", "orderFood", "backToTop"], function (colorChange, orderFood, backToTop){
    //参数为id的点击事件
    var addEveListenerId = function (EleId) {
        var Ele = document.getElementById(EleId);
        if(EleId=="main-bar-navigation-header" || EleId=="main-bar-navigation-category") {
            Ele.addEventListener("click", function(event) {
                colorChange.changeColor(event.target, Ele);
            });    
        } else if( EleId == "rollback-to-top") {
            Ele.addEventListener("click", function() {
                backToTop.backToTop();
            });
        }
    
    };
    //参数为class的点击事件
    var addEveListenerClass = function (EleClass) {
        var Eles = document.getElementsByClassName(EleClass);
        for(var i = 0; i < Eles.length; i++) {
            if(EleClass === "add-icon") {
                Eles[i].addEventListener("click", function(event){
                    orderFood.orderListChange(event.target);
                });
            }
        }
    };
    return {
        addEveListenerId: addEveListenerId,
        addEveListenerClass: addEveListenerClass
    };
});

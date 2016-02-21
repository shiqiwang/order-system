//点击时，文字颜色发生改变的函数
define(function (){
    var changeColor = function (targetEle, parentEle){
        var eles = parentEle.childNodes;
        if(targetEle !== parentEle) {
            for(var i = 0; i < eles.length; i++) {
                if(eles[i].nodeName == "A") {
                    eles[i].id = "";        
                } 
            }
            targetEle.id= parentEle.id + "-selected";
        }    
    };
    return {
        changeColor: changeColor
    };
});

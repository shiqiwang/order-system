define(["getByIdOrClass"], function (getByIdOrClass) {
    // var inlet = document.createElement("script");
    // inlet.setAttribute("src", "clickEffect.js");
    // document.body.appendChild(inlet);

    //给正栏导航部分菜单添加"点击则颜色改变"事件
    //回滚的点击事件
    getByIdOrClass.addEveListenerId("main-bar-navigation-header");
    getByIdOrClass.addEveListenerId("main-bar-navigation-category");
    getByIdOrClass.addEveListenerId("rollback-to-top");
    //点餐效果
    getByIdOrClass.addEveListenerClass("add-icon");
    getByIdOrClass.addEveListenerClass("subIcon");
    getByIdOrClass.addEveListenerClass("addIcon");
});

var MENU_INITIALIZE = false;

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var menuItem1 = new cc.MenuItemFont("Play", play);

        var menu = new cc.Menu(menuItem1);
        menu.alignItemsVerticallyWithPadding(50);
        
        this.addChild(menu);

        return true;
    }
});

var play = function() {
    var scene = new GameScreenScene();
    cc.director.pushScene(scene);
}

var goBack = function() {
    SCENE1_INITIALIZE = false;
    cc.director.popScene();
}

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        if(!MENU_INITIALIZE){
            MENU_INITIALIZE = true;
            var layer = new HelloWorldLayer();
            this.addChild(layer);
        }
    }
});
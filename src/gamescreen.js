var GAME_SCENE_INITIALIZE = false;
var sceneNo = 1;
var maxScenes = 5;
var count = 0;

var GameScreenLayer = cc.LayerColor.extend({
    sprite:null,
    text:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;

        var topDisplayText = new ccui.Text();
        topDisplayText.attr({
            string: "Game Screen",
            fontName: "Arial",
            fontSize: 32,
            x: size.width / 2.0,
            y: size.height / 2.0 + 200
        });
        this.addChild(topDisplayText);

        // getNavBtns.call(this);

        // if(cc.sys.capabilities.hasOwnProperty("touches")){
        //     cc.eventManager.addListener({
        //         event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //         onTouchBegan: function(touch, event){
        //             cc.log(touch.getLocationX());
        //             return true;
        //         }
        //     }, this);
        // }
        
        // if(cc.sys.capabilities.hasOwnProperty("mouse")){
        //     cc.eventManager.addListener({
        //         event: cc.EventListener.MOUSE,
        //         onMouseDown: function(event){
        //             if(event.getButton() == cc.EventMouse.BUTTON_LEFT){
        //                 count++;
        //                 clickCount.string = count;
        //             }
        //         }
        //     }, this);
        // }

        // var finishBtn = new cc.LabelTTF("Finish", "Arial", 20);

        // finishBtn.x = size.width / 2;
        // finishBtn.y = size.height / 2 - 100;
        // this.addChild(finishBtn);      

        var layout = new ccui.Layout();
        layout.setContentSize(size.width * 0.1, size.height * 0.08);
        layout.setBackGroundColor(cc.color.GREEN);
        layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        layout.setBackGroundColorOpacity(100);
        layout.setPosition(size.width/2, size.height/2 - 200);
        layout.setAnchorPoint(0.5, 0.5);
        layout.setTag(12);
        this.addChild(layout);

        var button = new ccui.Button()
        button.titleText = "Finish";
        button.titleFontSize = 25;
        button.setPosition(layout.width / 2.0, layout.height / 2.0);
        button.addTouchEventListener(this.touchEvent, this);
        layout.addChild(button);

        return true;
    },
    touchEvent: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                // this._topDisplayLabel.setString("Touch Down");
                var scene = new ResultScreenLayerScene();
                cc.director.pushScene(scene);
                cc.log("touch down");
                break;

            case ccui.Widget.TOUCH_MOVED:
                // this._topDisplayLabel.setString("Touch Move");
                cc.log("touch move");
                break;

            case ccui.Widget.TOUCH_ENDED:
                // this._topDisplayLabel.setString("Touch Up");
                // var layout = this._mainNode.getChildByTag(12);
                // layout.removeFromParent(true);
                cc.log("touch end");
                break;

            case ccui.Widget.TOUCH_CANCELED:
                // this._topDisplayLabel.setString("Touch Cancelled");
                cc.log("touch cancel");
                break;

            default:
                break;
        }
    }
});

function getNavBtns() {
    var backward = new cc.MenuItemImage(res.back_png, res.back_png, backFunc);
    var forward = new cc.MenuItemImage(res.forward_png, res.forward_png, forwardFunc);
    var buttonGroup = new cc.Menu(backward, forward);
    buttonGroup.y = 40;
    buttonGroup.alignItemsHorizontally();
    this.addChild(buttonGroup);
}

const backFunc = () => {
    if(sceneNo > 1){
        sceneNo--;
        // runDifferentScene();
    }
}

const forwardFunc = () => {
    if(sceneNo < maxScenes){
        sceneNo++;
        // runDifferentScene();
    }
}
 
var GameScreenScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        if(!GAME_SCENE_INITIALIZE){
            // GAME_SCENE_INITIALIZE = true;
            var layer = new GameScreenLayer();
            layer.setColor(cc.color("#472183"));
            this.addChild(layer);
        }
    }
});

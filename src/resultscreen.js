var RESULT_SCENE_INITIALIZE = false;

var ResultScreenLayer = cc.LayerColor.extend({
    sprite:null,
    text:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;

        var topDisplayText = new ccui.Text();
        topDisplayText.attr({
            string: "Win/Lose Game Over",
            fontName: "Arial",
            fontSize: 32,
            x: size.width / 2.0,
            y: size.height / 2.0 + 200
        });
        this.addChild(topDisplayText);

        var layout = new ccui.Layout();
        layout.setContentSize(size.width * 0.1, size.height * 0.08);
        layout.setBackGroundColor(cc.color.GREEN);
        layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        layout.setBackGroundColorOpacity(100);
        layout.setPosition(size.width/2, size.height/2);
        layout.setAnchorPoint(0.5, 0.5);
        layout.setTag(12);
        this.addChild(layout);

        var button = new ccui.Button()
        button.titleText = "Retry";
        button.titleFontSize = 25;
        button.setPosition(layout.width / 2.0, layout.height / 2.0);
        button.addTouchEventListener(this.touchEvent, this);
        layout.addChild(button);

        // this.sprite = new cc.Sprite(res.charac1_png);
        // this.sprite.attr({
        //     x: 20,
        //     y: size.height / 2
        // });
        // this.addChild(this.sprite, 0);
        
        // var spriteAction = new cc.MoveBy(5, cc.p(size.width / 2, 0));
        // this.sprite.runAction(spriteAction);

        // getNavBtns.call(this);

        return true;
    },
    touchEvent: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.director.popScene();
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
 
var ResultScreenLayerScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        if(!RESULT_SCENE_INITIALIZE){
            // RESULT_SCENE_INITIALIZE = true;
            var layer = new ResultScreenLayer();
            layer.setColor(cc.color("#472183"));
            this.addChild(layer);
        }
    }
});
 
var RESULT_SCENE_INITIALIZE = false;

var ResultScreenLayer = cc.LayerColor.extend({
	sprite: null,
	text: null,
	ctor: function () {
		this._super();

		var size = cc.winSize;

		var topDisplayText = new ccui.Text();
		topDisplayText.attr({
			string: "Game Over",
			fontName: "Arial",
			fontSize: 32,
			x: size.width / 2.0,
			y: size.height / 2.0 + 200
		});
		this.addChild(topDisplayText);

		var score_text = new ccui.Text();
		score_text.attr({
			string: "Total Score: " + score,
			fontName: "Arial",
			fontSize: 32,
			x: size.width / 2,
			y: size.height / 2
		});
		this.addChild(score_text);

		var layout = new ccui.Layout();
		layout.setContentSize(size.width * 0.1, size.height * 0.08);
		layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
		layout.setBackGroundColor(cc.color(button_color));
		layout.setBackGroundColorOpacity(100);
		layout.setPosition(size.width / 2, 200);
		layout.setAnchorPoint(0.5, 0.5);
		layout.setTag(12);
		this.addChild(layout);

		var button = new ccui.Button();
		button.titleText = "Retry";
		button.titleFontSize = 25;
		button.setPosition(layout.width / 2.0, layout.height / 2.0);
		button.addTouchEventListener(this.touchEvent, this);
		layout.addChild(button);

		return true;
	},
	touchEvent: function (sender, type) {
		if(type == ccui.Widget.TOUCH_BEGAN){
			score = 0;
			score_text.string = "Score " + score;
			cc.director.popScene();
		}
	}
});

var ResultScreenLayerScene = cc.Scene.extend({
	onEnter: function () {
		this._super();
		var layer = new ResultScreenLayer();
		layer.setColor(cc.color("#472183"));
		this.addChild(layer);
	}
});

var MENU_INITIALIZE = false;

var MenuLayer = cc.Layer.extend({
	sprite: null,
	ctor: function () {
		this._super();
		var size = cc.winSize;

		// var menuItem1 = new cc.MenuItemFont("Play", play);

		var title_screen = new cc.Sprite(res.title_screen_png);
		title_screen.setScale(1.35);
		title_screen.x = size.width / 2;
		title_screen.y = size.height / 2;
		this.addChild(title_screen, 0);

		var play_button = new ccui.Button(res.play_btn_png, res.play_btn_inv_png);
		play_button.setScale(1.35);
		play_button.x = size.width / 2 - 10;
		play_button.y = size.height / 2 - 167;
		play_button.setLocalZOrder(1);
		play_button.addTouchEventListener(this.play, this);
		this.addChild(play_button)
		// let button = new cc.MenuItemSprite(play_button, null, null, this.play, this);


		// var menu = new cc.Menu(menuItem1);
		// var menu = new cc.Menu(button);
		// menu.x = size.width / 2;
		// menu.y = size.height / 2 - 80;
		// menu.alignItemsVerticallyWithPadding(50);

		// this.addChild(menu);

		return true;
	},
	play: function (sender, type) {
		if(type == ccui.Widget.TOUCH_BEGAN){
			var scene = new GameScreenScene();
			cc.director.pushScene(scene);
		}
	}
});

var play = function () {
	var scene = new GameScreenScene();
	cc.director.pushScene(scene);
}

var goBack = function () {
	cc.director.popScene();
}

var FirstScene = cc.Scene.extend({
	onEnter: function () {
		this._super();
		if (!MENU_INITIALIZE) {
			MENU_INITIALIZE = true;
			var layer = new MenuLayer();
			this.addChild(layer);
		}
	}
});
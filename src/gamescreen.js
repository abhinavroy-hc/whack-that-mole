var GAME_INITIALIZE = false;
var music_playing = true;
var score = 0;
var mole_out_len = 35;
var mole_out_factor = 10;
var mole_speed = 0.7;
var button_color = "#0066ff";
var score_text = null;

var GameScreenLayer = cc.LayerColor.extend({
	volume_symbol: null,

	ctor: function () {
		this._super();

		var size = cc.winSize;

		cc.audioEngine.setEffectsVolume(0.1);

		// var top_display_text = new ccui.Text();
		// top_display_text.attr({
		// 	string: "Whack That Mole",
		// 	fontName: "Arial",
		// 	fontSize: 32,
		// 	x: size.width / 2.0,
		// 	y: size.height - 100
		// });
		// this.addChild(top_display_text);

		score_text = new ccui.Text();
		score_text.attr({
			string: "Score " + score,
			fontName: "Arial",
			fontSize: 32,
			x: size.width - 200,
			y: size.height - 100
		});
		this.addChild(score_text);

		var mole_sprites = [];

		var hole_locations = [
			[0, 0],
			[-100, -100],
			[-100, 100],
			[100, -100],
			[100, 100],
			[200, 0],
			[-200, 0]
		];
		
		for (var i = 0; i < hole_locations.length; i++) {
			var hole_back = new cc.Sprite(res.hole_back_png);
			hole_back.x = size.width / 2 + hole_locations[i][0];
			hole_back.y = size.height / 2 + hole_locations[i][1];
			this.addChild(hole_back, 0);

			var hole_front = new cc.Sprite(res.hole_front_png);
			hole_front.x = size.width / 2 + hole_locations[i][0];
			hole_front.y = size.height / 2 + hole_locations[i][1];
			this.addChild(hole_front, 2);

			var mole = new ccui.Button(res.mole_normal_png, res.mole_hit_png);
			mole.x = size.width / 2 + hole_locations[i][0];
			mole.y = size.height / 2 + hole_locations[i][1] - mole_out_len;
			mole.setLocalZOrder(1);
			this.addChild(mole);

			mole.addTouchEventListener(this.scoreFunc, this);
			mole.setEnabled(false);
			mole_sprites.push(mole);

			var hide = new cc.Sprite(res.green_png);
			hide.x = size.width / 2 + hole_locations[i][0];
			hide.y = size.height / 2 + hole_locations[i][1] - mole_out_len - 5;
			hide.setScale(0.2);
			this.addChild(hide, 3);

			// cc.eventManager.addListener({
			// 	event: cc.EventListener.MOUSE,
			// 	onMouseDown: function (event) {
			// 		event.stopPropagation();
			// 	}
			// }, hide);
		}
		
		this.schedule(function () {
			var rIdx = Math.floor(Math.random() * mole_sprites.length);

			var randomMole = mole_sprites[rIdx];

			var showAction = cc.callFunc(function() {
				randomMole.setEnabled(true);
				randomMole.setVisible(true);
			});

			var hideAction = cc.callFunc(function() {
				randomMole.setEnabled(false);
				randomMole.setVisible(false);
			});

			var mole_up = new cc.MoveBy(mole_speed, cc.p(0, mole_out_len + mole_out_factor));
			var mole_down = new cc.MoveBy(mole_speed, cc.p(0, -(mole_out_len + mole_out_factor)));
			var mole_sequence = new cc.Sequence(showAction, mole_up, mole_down, hideAction);
			randomMole.runAction(mole_sequence);

		}, (mole_speed * 2 + 0.5));

		var layout = new ccui.Layout();
		layout.setContentSize(size.width * 0.1, size.height * 0.08);
		layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
		layout.setBackGroundColor(cc.color(button_color));
		layout.setBackGroundColorOpacity(100);
		layout.setPosition(size.width / 2, 60);
		layout.setAnchorPoint(0.5, 0.5);
		layout.setTag(12);
		this.addChild(layout);

		var finishBtn = new ccui.Button();
		finishBtn.titleText = "Finish";
		finishBtn.titleFontSize = 25;
		finishBtn.setPosition(layout.width / 2.0, layout.height / 2.0);
		finishBtn.addTouchEventListener(this.finishBtnEvent, this);
		layout.addChild(finishBtn);

		cc.audioEngine.playMusic(res.level_music, true);
		cc.audioEngine.setMusicVolume(0.1);

		this.volume_symbol = new ccui.Button(res.volume_png, res.volume_png);
		this.volume_symbol.x = size.width - 80;
		this.volume_symbol.y = 60;
		this.volume_symbol.setScale(0.2);
		this.volume_symbol.setTag(1);
		this.volume_symbol.addTouchEventListener(this.volumeBtn, this);
		this.addChild(this.volume_symbol, 0);

		return true;
	},
	finishBtnEvent: function (sender, type) {
		if(type == ccui.Widget.TOUCH_BEGAN){
			var scene = new ResultScreenLayerScene();
			cc.director.pushScene(scene);
		}
	},
	volumeBtn: function (sender, type) {
		if(type == ccui.Widget.TOUCH_BEGAN){
			if (music_playing) {
				this.volume_symbol.loadTextures(res.mute_png, res.mute_png);
				cc.audioEngine.pauseMusic();
			}
			else {
				this.volume_symbol.loadTextures(res.volume_png, res.volume_png);
				cc.audioEngine.resumeMusic();
			}
			music_playing = !music_playing;
		}
	},
	scoreFunc: function (sender, type) {
		if(type == ccui.Widget.TOUCH_BEGAN){
			cc.audioEngine.playEffect(res.whack_sound);
			score++;
			score_text.string = "Score " + score;
		}
	}
});

var GameScreenScene = cc.Scene.extend({
	onEnter: function () {
		this._super();
		score = 0;
		if(!GAME_INITIALIZE){
			GAME_INITIALIZE = true;
			var layer = new GameScreenLayer();
			var purple = "#472183";
			var green  = "#059344";
			layer.setColor(cc.color(green));
			this.addChild(layer);
		}
	}
});

/* global cc, ccui, res, ResultScreenLayerScene */
var GAME_INITIALIZE = false;
var music_playing = true;
var score = 0;
var mole_out_len = 35;
var mole_out_factor = 10;
var mole_speed = 1.0;
var button_color = "#0066ff";
var score_text = null;
var topMargin = 80;
var timer = 0;
var timer_text = null;
var minutes = 0;
var seconds = 0;
var btn_width_factor = 0.1;
var btn_height_factor = 0.08;


var padStart = function (string, targetLength, padString) {
	'use strict';

  while (string.length < targetLength) {
    string = padString + string;
  }
  return string;
};

var GameScreenLayer = cc.LayerColor.extend({
	volume_symbol: null,

	ctor: function () {
		'use strict';

		this._super();

		var size = cc.winSize;

		cc.audioEngine.setEffectsVolume(0.1);

		var sky_layer = new cc.LayerGradient(cc.color(0, 0, 255), cc.color(255, 255, 255));
		sky_layer.setContentSize(cc.size(size.width, size.height / 4));
		sky_layer.x = 0;
		sky_layer.y = size.height / 2 + size.height / 4;
		this.addChild(sky_layer);

		var sky_layer2 = new cc.LayerGradient(cc.color(255, 255, 255), cc.color(255, 255, 255, 0));
		sky_layer2.setContentSize(cc.size(size.width, size.height / 4));
		sky_layer2.x = 0;
		sky_layer2.y = size.height / 2;
		this.addChild(sky_layer2);

		score_text = new ccui.Text();
		score_text.attr({
			string: "Score " + score,
			fontName: "Arial",
			fontSize: 32,
			x: size.width - 200,
			y: size.height - 100
		});
		score_text.setColor(cc.color(255, 255, 0, 255));
		this.addChild(score_text, 1);

		timer_text = new ccui.Text();
		timer_text.attr({
			string: "00 : 00",
			fontName: "Arial",
			fontSize: 32,
			x: size.width - 200,
			y: size.height - 50
		});
		timer_text.setColor(cc.color(255, 255, 0, 255));
		this.addChild(timer_text);

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
			hole_back.y = size.height / 2 + hole_locations[i][1] - topMargin;
			this.addChild(hole_back, 0);

			// var hole_front = new ccui.Button(res.hole_front_png, res.hole_front_png);
			// hole_front.x = size.width / 2 + hole_locations[i][0];
			// hole_front.y = size.height / 2 + hole_locations[i][1] - topMargin;
			// this.addChild(hole_front, 2);

			var hole_front = new cc.Sprite(res.hole_front_png);
			hole_front.x = size.width / 2 + hole_locations[i][0];
			hole_front.y = size.height / 2 + hole_locations[i][1] - topMargin;
			this.addChild(hole_front, 2);

			var mole = new ccui.Button(res.mole_normal_png, res.mole_hit_png);
			mole.x = size.width / 2 + hole_locations[i][0];
			mole.y = size.height / 2 + hole_locations[i][1] - mole_out_len - topMargin;
			mole.setLocalZOrder(1);
			this.addChild(mole);

			mole.addTouchEventListener(this.scoreFunc, this);
			mole.setEnabled(false);
			mole_sprites.push(mole);

			var hide = new ccui.Button(res.green_png, res.green_png);
			hide.x = size.width / 2 + hole_locations[i][0];
			hide.y = size.height / 2 + hole_locations[i][1] - mole_out_len - 5 - topMargin;
			hide.setScale(0.2);
			this.addChild(hide, 3);
		}
		
		this.schedule(function () {
			var rIdx = Math.floor(Math.random() * mole_sprites.length);

			var randomMole = mole_sprites[rIdx];

			var showAction = cc.callFunc(function() {
				randomMole.setEnabled(true);
			});

			var hideAction = cc.callFunc(function() {
				randomMole.setEnabled(false);
			});

			var mole_up = new cc.MoveBy(mole_speed, cc.p(0, mole_out_len + mole_out_factor));
			// var delay = new cc.delayTime(0.5);
			var mole_down = new cc.MoveBy(mole_speed, cc.p(0, -(mole_out_len + mole_out_factor)));
			var mole_sequence = new cc.Sequence(
				showAction, 
				mole_up, 
				// delay, 
				mole_down, 
				hideAction
			);
			randomMole.runAction(mole_sequence);

		}, mole_speed * 2 + 0.5);

		this.schedule(function() {
			timer++;
			minutes = Math.floor(timer / 60);
			seconds = Math.floor(timer % 60);
			timer_text.string = padStart(minutes + "", 2, '0') + " : " + padStart(seconds + "", 2, '0');
		}, 1);

		var btn_layout = new ccui.Layout();
		if(cc.sys.isMobile){
			btn_layout.setContentSize(size.height * btn_height_factor, size.width * btn_width_factor);
		}
		else{
			btn_layout.setContentSize(size.width * btn_width_factor, size.height * btn_height_factor);
		}
		btn_layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
		btn_layout.setBackGroundColor(cc.color(button_color));
		btn_layout.setBackGroundColorOpacity(100);
		btn_layout.setPosition(size.width / 2, 75);
		btn_layout.setAnchorPoint(0.5, 0.5);
		btn_layout.setTag(12);
		this.addChild(btn_layout);

		var finish_btn = new ccui.Button();
		finish_btn.titleText = "Finish";
		finish_btn.titleFontSize = 25;
		finish_btn.setPosition(btn_layout.width / 2.0, btn_layout.height / 2.0);
		finish_btn.addTouchEventListener(this.finish_btnEvent, this);
		btn_layout.addChild(finish_btn);

		this.volume_symbol = new ccui.Button(res.volume_png, res.volume_png);
		this.volume_symbol.x = size.width - 80;
		this.volume_symbol.y = 70;
		this.volume_symbol.setScale(0.2);
		this.volume_symbol.setTag(1);
		this.volume_symbol.addTouchEventListener(this.volumeBtn, this);
		this.addChild(this.volume_symbol, 0);

		return true;
	},
	
	finishBtnEvent: function (sender, type) {
		'use strict';

		if(type === ccui.Widget.TOUCH_BEGAN){
			var scene = new ResultScreenLayerScene();
			cc.director.pushScene(scene);
		}
	},

	volumeBtn: function (sender, type) {
		'use strict';

		if(type === ccui.Widget.TOUCH_BEGAN){
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
		'use strict';

		if(type === ccui.Widget.TOUCH_BEGAN){
			cc.audioEngine.playEffect(res.whack_sound);
			score++;
			if(mole_speed > 0.5 && mole_speed - parseInt(score / 10) * 0.1 > 0.2){
				mole_speed -= parseInt(score / 10) * 0.1;
			}
			score_text.string = "Score " + score;
		}
	}
});

/* exported GameScreenScene */
var GameScreenScene = cc.Scene.extend({
	onEnter: function () {
		'use strict';

		this._super();
		score = 0;
		if(!GAME_INITIALIZE){
			GAME_INITIALIZE = true;
			var layer = new GameScreenLayer();
			// var purple = "#472183";
			var green  = "#059344";
			layer.setColor(cc.color(green));
			this.addChild(layer);
		}
	}
});

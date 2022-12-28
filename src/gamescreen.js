/* global cc, ccui, res, ResultScreenLayerScene */
var GAME_INITIALIZE = false,
    music_playing = true,
    score = 0,
    mole_out_len = 35,
    mole_out_factor = 10,
    mole_speed = 1.0,
    button_color = '#0066ff',
    score_text = null,
    topMargin = 80,
    timer = 0,
    timer_text = null,
    minutes = 0,
    seconds = 0,
    btn_width_factor = 0.1,
    btn_height_factor = 0.08,
    mole_delay = 0.5,
    delay_dec_flag = 1,
    padStart,
    GameScreenLayer,
    GameScreenScene;

padStart = function (string, targetLength, padString) {
  'use strict';

  while (string.length < targetLength) {
    string = padString + string;
  }
  return string;
};

GameScreenLayer = cc.LayerColor.extend({
  volume_symbol: null,

  ctor: function () {
    'use strict';

    var size = cc.winSize,
        i,
        sky_layer,
        sky_layer2,
        mole_sprites = [],
        hole_locations = [
          [0, 0],
          [-100, -100],
          [-100, 100],
          [100, -100],
          [100, 100],
          [200, 0],
          [-200, 0]
        ],
        hole_back,
        hole_front,
        mole,
        hide,
        btn_layout,
        finish_btn;

    this._super();

    cc.audioEngine.setEffectsVolume(0.1);

    sky_layer =
      new cc.LayerGradient(
        cc.color(0, 0, 255),
        cc.color(255, 255, 255)
      );
    sky_layer.setContentSize(cc.size(size.width, size.height / 4));
    sky_layer.x = 0;
    sky_layer.y = size.height / 2 + size.height / 4;
    this.addChild(sky_layer);

    sky_layer2 =
      new cc.LayerGradient(
        cc.color(255, 255, 255),
        cc.color(255, 255, 255, 0)
      );
    sky_layer2.setContentSize(cc.size(size.width, size.height / 4));
    sky_layer2.x = 0;
    sky_layer2.y = size.height / 2;
    this.addChild(sky_layer2);

    score_text = new ccui.Text();
    score_text.attr({
      string: 'Score ' + score,
      fontName: 'Arial',
      fontSize: 32,
      x: size.width - 200,
      y: size.height - 100
    });
    score_text.setColor(cc.color(255, 255, 0, 255));
    this.addChild(score_text, 1);

    timer_text = new ccui.Text();
    timer_text.attr({
      string: '00 : 00',
      fontName: 'Arial',
      fontSize: 32,
      x: size.width - 200,
      y: size.height - 50
    });
    timer_text.setColor(cc.color(255, 255, 0, 255));
    this.addChild(timer_text);

    for (i = 0; i < hole_locations.length; i++) {
      hole_back = new cc.Sprite(res.hole_back_png);
      hole_back.x = size.width / 2 + hole_locations[i][0];
      hole_back.y = size.height / 2 + hole_locations[i][1] - topMargin;
      this.addChild(hole_back, 0);

      // var hole_front =
      //   new ccui.Button(
      //     res.hole_front_png,
      //     res.hole_front_png
      //   );
      // hole_front.x = size.width / 2 + hole_locations[i][0];
      // hole_front.y = size.height / 2 + hole_locations[i][1] - topMargin;
      // this.addChild(hole_front, 2);

      hole_front = new cc.Sprite(res.hole_front_png);
      hole_front.x = size.width / 2 + hole_locations[i][0];
      hole_front.y = size.height / 2 + hole_locations[i][1] - topMargin;
      this.addChild(hole_front, 2);

      mole = new ccui.Button(res.mole_normal_png, res.mole_hit_png);
      mole.x = size.width / 2 + hole_locations[i][0];
      mole.y =
        size.height / 2 +
        hole_locations[i][1] -
        mole_out_len - topMargin;
      mole.setLocalZOrder(1);
      this.addChild(mole);

      mole.addTouchEventListener(this.scoreFunc, this);
      mole.setEnabled(false);
      mole_sprites.push(mole);

      hide = new ccui.Button(res.green_png, res.green_png);
      hide.x = size.width / 2 + hole_locations[i][0];
      hide.y =
        size.height / 2 +
        hole_locations[i][1] -
        mole_out_len - 5 - topMargin;
      hide.setScale(0.2);
      this.addChild(hide, 3);
    }

    this.schedule(function () {
      var rIdx = Math.floor(Math.random() * mole_sprites.length),

          randomMole = mole_sprites[rIdx],

          showAction = cc.callFunc(function () {
            randomMole.setEnabled(true);
          }),

          hideAction = cc.callFunc(function () {
            randomMole.setEnabled(false);
          }),

          mole_up =
            new cc.MoveBy(
              mole_speed,
              cc.p(0, mole_out_len + mole_out_factor)
            ),
          delay =
            new cc.DelayTime(mole_delay),
          mole_down =
            new cc.MoveBy(
              mole_speed,
              cc.p(0, -(mole_out_len + mole_out_factor))
            ),

          mole_sequence = new cc.Sequence(
            showAction,
            mole_up,
            delay,
            mole_down,
            hideAction
          );

      randomMole.runAction(mole_sequence);
    }, mole_speed * 2 + mole_delay);

    this.schedule(function () {
      timer++;
      minutes = Math.floor(timer / 60);
      seconds = Math.floor(timer % 60);
      timer_text.string =
        padStart(minutes + '', 2, '0') + ' : ' + padStart(seconds + '', 2, '0');
    }, 1);

    btn_layout = new ccui.Layout();
    if (cc.sys.isMobile) {
      btn_layout.setContentSize(
        size.height * btn_height_factor,
        size.width * btn_width_factor
      );
    } else {
      btn_layout.setContentSize(
        size.width * btn_width_factor,
        size.height * btn_height_factor
      );
    }

    btn_layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
    btn_layout.setBackGroundColor(cc.color(button_color));
    btn_layout.setBackGroundColorOpacity(100);
    btn_layout.setPosition(size.width / 2, 75);
    btn_layout.setAnchorPoint(0.5, 0.5);
    btn_layout.setTag(12);
    this.addChild(btn_layout);

    finish_btn = new ccui.Button();
    finish_btn.titleText = 'Finish';
    finish_btn.titleFontSize = 25;
    finish_btn.setPosition(btn_layout.width / 2.0, btn_layout.height / 2.0);
    finish_btn.addTouchEventListener(this.finishBtnEvent, this);
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

    var scene;

    if (type === ccui.Widget.TOUCH_BEGAN) {
      scene = new ResultScreenLayerScene();
      cc.director.pushScene(scene);
    }
  },

  volumeBtn: function (sender, type) {
    'use strict';

    if (type === ccui.Widget.TOUCH_BEGAN) {
      if (music_playing) {
        this.volume_symbol.loadTextures(res.mute_png, res.mute_png);
        cc.audioEngine.pauseMusic();
      } else {
        this.volume_symbol.loadTextures(res.volume_png, res.volume_png);
        cc.audioEngine.resumeMusic();
      }

      music_playing = !music_playing;
    }
  },

  scoreFunc: function (sender, type) {
    'use strict';

    if (type === ccui.Widget.TOUCH_BEGAN) {
      cc.audioEngine.playEffect(res.whack_sound);
      score++;

      if (
        delay_dec_flag !== parseInt(score / 10) &&
        mole_delay > 0 && mole_delay - 0.1 >= 0
      ) {
        mole_delay -= 0.1;
        delay_dec_flag = parseInt(score / 10);
      }

      if (
        mole_speed > 0.5 &&
        mole_speed - parseInt(score / 10) * 0.1 > 0.2
      ) {
        mole_speed -= parseInt(score / 10) * 0.1;
      }

      score_text.string = 'Score ' + score;
    }
  }
});

/* exported GameScreenScene */
GameScreenScene = cc.Scene.extend({
  onEnter: function () {
    'use strict';

    var layer,
        green;

    this._super();
    score = 0;
    if (!GAME_INITIALIZE) {
      GAME_INITIALIZE = true;
      layer = new GameScreenLayer();
      green = '#059344';

      layer.setColor(cc.color(green));
      this.addChild(layer);
    }
  }
});

/* global cc, ccui, res, GameScreenScene */

var MENU_INITIALIZE = false,
    play_btn_h_factor = 123.703703704,
    FirstScene,
    MenuLayer;

MenuLayer = cc.Layer.extend({
  sprite: null,
  ctor: function () {
    'use strict';

    var size = cc.winSize,
        screenSize,
        scale_factor,
        title_screen,
        play_button;

    this._super();

    screenSize = cc.view.getFrameSize();

    // 243
    scale_factor = 1.35;
    if (cc.sys.isMobile) {
      scale_factor = screenSize.width / 543;
    }

    title_screen = new cc.Sprite(res.title_screen_png);
    title_screen.setScale(scale_factor);
    title_screen.x = size.width / 2;
    title_screen.y = size.height / 2;
    this.addChild(title_screen, 0);

    play_button = new ccui.Button(res.play_btn_png, res.play_btn_inv_png);
    play_button.setScale(scale_factor);
    play_button.x = size.width / 2 - 10;
    play_button.y = size.height / 2 - scale_factor * play_btn_h_factor;
    play_button.setLocalZOrder(1);
    play_button.addTouchEventListener(this.play, this);
    this.addChild(play_button);

    return true;
  },
  play: function (sender, type) {
    'use strict';

    var scene;

    if (type === ccui.Widget.TOUCH_BEGAN) {
      scene = new GameScreenScene();

      cc.director.pushScene(scene);
    }
  }
});

/* exported FirstScene */
FirstScene = cc.Scene.extend({
  onEnter: function () {
    'use strict';

    this._super();
    if (!MENU_INITIALIZE) {
      cc.audioEngine.playMusic(res.level_music, true);
      cc.audioEngine.setMusicVolume(0.1);
      MENU_INITIALIZE = true;

      this.addChild(new MenuLayer());
    }
  }
});

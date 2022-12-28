/* global cc, ccui, padStart, button_color,
btn_height_factor, btn_width_factor,score:true,
timer:true, minutes:true, seconds:true,
timer_text:true, score_text:true */

var ResultScreenLayer,
    ResultScreenLayerScene;

ResultScreenLayer = cc.LayerColor.extend({
  sprite: null,
  text: null,
  ctor: function () {
    'use strict';

    var size = cc.winSize,
        topDisplayText,
        score_text,
        btn_layout,
        retry_btn;

    this._super();

    topDisplayText = new ccui.Text();
    topDisplayText.attr({
      string: 'Game Over',
      fontName: 'Arial',
      fontSize: 32,
      x: size.width / 2.0,
      y: size.height / 2.0 + 200
    });
    this.addChild(topDisplayText);

    score_text = new ccui.Text();
    score_text.attr({
      string:
        'Total Score: ' +
        score +
        ' in ' +
        padStart(Math.floor(timer / 60) + '', 2, '0') +
        ' : ' +
        padStart(Math.floor(timer % 60) + '', 2, '0'),
      fontName: 'Arial',
      fontSize: 32,
      x: size.width / 2,
      y: size.height / 2
    });
    this.addChild(score_text);

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
    btn_layout.setPosition(size.width / 2, 200);
    btn_layout.setAnchorPoint(0.5, 0.5);
    btn_layout.setTag(12);
    this.addChild(btn_layout);

    retry_btn = new ccui.Button();
    retry_btn.titleText = 'Retry';
    retry_btn.titleFontSize = 25;
    retry_btn.setPosition(
      btn_layout.width / 2.0,
      btn_layout.height / 2.0
    );
    retry_btn.addTouchEventListener(this.touchEvent, this);
    btn_layout.addChild(retry_btn);

    return true;
  },
  touchEvent: function (sender, type) {
    'use strict';

    if (type === ccui.Widget.TOUCH_BEGAN) {
      score = 0;
      timer = 0;
      minutes = 0;
      seconds = 0;
      timer_text.string = '00 : 00';
      score_text.string = 'Score ' + score;
      cc.director.popScene();
    }
  }
});

/* exported ResultScreenLayerScene */
ResultScreenLayerScene = cc.Scene.extend({
  onEnter: function () {
    'use strict';

    var layer;

    this._super();
    layer = new ResultScreenLayer();
    layer.setColor(cc.color('#472183'));
    this.addChild(layer);
  }
});

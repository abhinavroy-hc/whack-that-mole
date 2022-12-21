/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var res = {
	hole_back_png: "res/images/hole_back.png",
	hole_front_png: "res/images/hole_front.png",
	mole_hit_png: "res/images/mole_hit.png",
	mole_normal_png: "res/images/mole_normal.png",
	title_screen_png: "res/images/title_screen.png",
	whack_sound: "res/sounds/effect/whack.mp3",
	level_music: "res/sounds/music/levelmusic.mp3",
	volume_png: "res/images/volume.png",
	mute_png: "res/images/mute.png",
	green_png: "res/images/green.png",
	play_btn_png: "res/images/playbtn.png",
	play_btn_inv_png: "res/images/playbtn_inv.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

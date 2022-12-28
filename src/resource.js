var res = {
  hole_back_png: 'res/images/hole_back.png',
  hole_front_png: 'res/images/hole_front.png',
  mole_hit_png: 'res/images/mole_hit.png',
  mole_normal_png: 'res/images/mole_normal.png',
  title_screen_png: 'res/images/title_screen.png',
  whack_sound: 'res/sounds/effect/whack.mp3',
  level_music: 'res/sounds/music/levelmusic.mp3',
  volume_png: 'res/images/volume.png',
  mute_png: 'res/images/mute.png',
  green_png: 'res/images/green.png',
  play_btn_png: 'res/images/playbtn.png',
  play_btn_inv_png: 'res/images/playbtn_inv.png'
},

g_resources = [],
i;

for (i in res) {
  g_resources.push(res[i]);
}

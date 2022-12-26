/* global document, cc, g_resources, FirstScene */

var game = {
    res: {
        data: {
            config: {
                portrait: {
                    orientation: 'portrait',
                    bound_width: 640,
                    bound_height: 960,
                    tablet: 0.8,
                    phablet: 0.9,
                    force_tablet: false
                },
                landscape: {
                    orientation: 'landscape',
                    bound_width: 960,
                    bound_height: 640,
                    tablet: 0.8,
                    phablet: 0.9,
                    force_tablet: false
                }
            }
        }
    }
};

cc.game.onStart = function(){
    'use strict';
    var sys = cc.sys;
    
    var portrait_style = game.res.data.config.portrait;
    // var landscape_style = game.res.data.config.landscape;
    
    if(!sys.isNative && document.getElementById("cocosLoading")){ //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));
    }

    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(sys.os === sys.OS_IOS ? true : false);

    // Disable auto full screen on baidu and wechat, you might also want to eliminate sys.BROWSER_TYPE_MOBILE_QQ
    if (sys.isMobile && 
        sys.browserType !== sys.BROWSER_TYPE_BAIDU &&
        sys.browserType !== sys.BROWSER_TYPE_WECHAT) {
        cc.view.enableAutoFullScreen(true);
        // cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);
        // cc.view.setDesignResolutionSize(portrait_style.bound_width, portrait_style.bound_height, cc.ResolutionPolicy.FIXED_WIDTH);
    }
    // else{
    //     cc.view.setOrientation(cc.ORIENTATION_LANDSCAPE);
    //     cc.view.setDesignResolutionSize(landscape_style.bound_width, landscape_style.bound_height, cc.ResolutionPolicy.SHOW_ALL);
    // }

    // Adjust viewport meta
    cc.view.adjustViewPort(true);

    cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);

    // Setup the resolution policy and design resolution size
    cc.view.setDesignResolutionSize(portrait_style.bound_width, portrait_style.bound_height, cc.ResolutionPolicy.FIXED_WIDTH);

    // Uncomment the following line to set a fixed orientation for your game
    // cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);

    // Setup the resolution policy and design resolution size
    // cc.view.setDesignResolutionSize(960, 640, cc.ResolutionPolicy.SHOW_ALL);

    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);

    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new FirstScene());
    }, this);
};
cc.game.run();
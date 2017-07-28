
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/experimental/experimental.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"libs/modules/dragonBones/dragonBones.js",
	"libs/modules/eui/eui.js",
	"polyfill/promise.js",
	"bin-debug/data/BaseData.js",
	"bin-debug/data/MainData.js",
	"bin-debug/mui/Component.js",
	"bin-debug/mui/UIBase.js",
	"bin-debug/input/Rocker.js",
	"bin-debug/game/GameConfig.js",
	"bin-debug/game/GameGlobal.js",
	"bin-debug/game/GameManager.js",
	"bin-debug/game/gameobject/Block.js",
	"bin-debug/game/gameobject/Bomb.js",
	"bin-debug/game/gameobject/Explore.js",
	"bin-debug/game/gameobject/Floor.js",
	"bin-debug/game/gameobject/Player.js",
	"bin-debug/game/MapManager.js",
	"bin-debug/game/MapRuntime.js",
	"bin-debug/input/InputManager.js",
	"bin-debug/input/KeyboardCarrier.js",
	"bin-debug/data/DataManager.js",
	"bin-debug/input/Rocker0721.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/module/Singleton.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/mui/Component/ComponentEnum.js",
	"bin-debug/mui/Component/GlobalBG.js",
	"bin-debug/mui/Component/ItemGrid.js",
	"bin-debug/mui/Dictionary.js",
	"bin-debug/mui/Manager.js",
	"bin-debug/mui/mui.js",
	"bin-debug/mui/UI/MainUI.js",
	"bin-debug/mui/UI/TouchUI.js",
	"bin-debug/mui/UI/UIEnum.js",
	"bin-debug/game/action/Movement.js",
	"bin-debug/ThemeAdapter.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};
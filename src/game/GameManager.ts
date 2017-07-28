class GameManager
{
    public static init(root:egret.Stage)
    {
        GameGlobal.MainStage = root;
        /*
        GameGlobal.MainStage.addEventListener(egret.Event.RESIZE,()=>{
            GameManager.setScaleMode();
        },this);
        */
        root.orientation = egret.OrientationMode.PORTRAIT;

        let gameStage = new egret.DisplayObjectContainer();
        GameGlobal.GameStage = gameStage;
        root.addChild(gameStage);

        let UIStage = mui.Manager.Instance;
        GameGlobal.UIStage = UIStage;
        root.addChild(UIStage);

        this.start();
    }

    public static start()
    {
        DataManager.Instance.Init(()=>{
            mui.Open(mui.UIEnum.MainUI);
            MapManager.Instance.SetupMap(1);
        });
    }

    public static setScaleMode()
    {
        GameGlobal.MainStage.scaleMode = this.getCurrentWindowScale()>GameConfig.DESIGN_SCALE?egret.StageScaleMode.FIXED_WIDTH:egret.StageScaleMode.FIXED_HEIGHT;
    }

    public static getCurrentWindowScale():number
    {
        return window.innerWidth/window.innerHeight;
    }
}
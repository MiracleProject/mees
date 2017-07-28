class InputManager extends egret.EventDispatcher
{
    private static _instance:InputManager;

    public static get Instance():InputManager
    {
        if(!this._instance)
        {
            this._instance = new InputManager();
            return this._instance;
        }
        return this._instance;
    }

    public PlayerRocker:Rocker =  new Rocker();//摇杆

    private _stage:egret.Stage;
    private _binder:egret.DisplayObjectContainer;
    private _touchArea:eui.Rect = new eui.Rect();//摇杆触控区域

    public constructor()
    {
        super();
    }

    public BindUI(stage:egret.Stage,binder:egret.DisplayObjectContainer)
    {
        this._stage = stage;
        this._binder = binder;
        this._touchArea.y = 200;
        this._touchArea.width = 600;
        this._touchArea.height = 1136 - 200;
        this._touchArea.alpha = 0;
        //this._touchArea.addEventListener(egret.Event.ADDED_TO_STAGE,this.onCreated,this);
        this._binder.addChildAt(this._touchArea,0);
        this.PlayerRocker.init(this._stage,this._binder,this._touchArea);
    }

    public Start()
    {
        this.PlayerRocker.start();
        this.PlayerRocker.addEventListener("rocker_move",this.onRockerMove, this);
        this.PlayerRocker.addEventListener("rocker_end",this.onRockerEnd, this);
        //this.PlayerRocker.addEventListener("rocker_start",this.onRockerStart, this);
    }

    public End()
    {
        this.PlayerRocker.stop();
        this.PlayerRocker.removeEventListener("rocker_move",this.onRockerMove, this);
        this.PlayerRocker.removeEventListener("rocker_end",this.onRockerEnd, this);
    }

    /*
    private onRockerStart()
    {
        this.PlayerRocker.State;
    }
    */

    private onRockerMove(e:egret.Event)
    {
        let dir =e.data;
        this.dispatchEventWith("input_move",false,dir);
    }

    private onRockerEnd()
    {
        this.dispatchEventWith("input_move",false,-1);
        this.dispatchEvent(new egret.Event("input_end"));
    }
}
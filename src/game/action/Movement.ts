class Movement extends egret.EventDispatcher
{
    private _targetPlayer:Player;
    private _currentDir:number;
    private _currentSpeed:number;

    constructor(player:Player)
    {
        super();
        this._targetPlayer = player;
        this._currentSpeed = player.MoveSpeed;
    }

    public Start()
    {
        GameGlobal.GameStage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        InputManager.Instance.addEventListener("input_move",this.onMove,this); 
        //InputManager.Instance.addEventListener("input_end",this.onTest,this);  
    }

    public End()
    {
        GameGlobal.GameStage.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame,this);
        InputManager.Instance.addEventListener("input_move",this.onMove,this);
    }

    private onMove(e:egret.Event)
    {
        let dir = e.data;
        this._currentDir = dir;
    }

    private onEnterFrame()
    {
        switch(this._currentDir)
        {
            case 0:
            case 1:
                this.onUp();
                return;
            case 4:
            case 5:
                this.onDown();
                return;
            case 6:
            case 7:
                this.onLeft();
                return;
            case 2:
            case 3:
                this.onRight();
                return;
        }
    }

    onUp()
    {
        this._targetPlayer.y-=this._currentSpeed;
        if(this._targetPlayer.y<0)
        {
            this._targetPlayer.y = 0;
        }
    }

    onDown()
    {
        this._targetPlayer.y+=this._currentSpeed;
        if(this._targetPlayer.y>9*60)
        {
            this._targetPlayer.y = 9*60;
        }
    }

    onLeft()
    {
        this._targetPlayer.x-=this._currentSpeed;
        if(this._targetPlayer.x<0)
        {
            this._targetPlayer.x = 0;
        }
    }

    onRight()
    {
        this._targetPlayer.x+=this._currentSpeed;
        if(this._targetPlayer.x>9*60)
        {
            this._targetPlayer.x = 9*60;
        }
    }
}
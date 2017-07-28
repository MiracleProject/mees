class Player extends egret.Sprite
{
    public MoveSpeed:number = 10;
    private _moveMent:Movement;

    public constructor()
    {
        super();
        this._moveMent = new Movement(this);
        this.initSelf();
        this.start();
    }

    private initSelf()
    {
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0xffffff,1);
        shp.graphics.drawRect(0,0,60,60);
        shp.graphics.endFill();
        this.addChild(shp);
    }

    private start()
    {
        this._moveMent.Start();
    }

    public SetBomb()
    {
        MapManager.Instance.SetBomb(this.x+30,this.y+30);
    }

    public ChangePosition()
    {
        
    }
}
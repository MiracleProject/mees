class Floor extends egret.Sprite
{
    public constructor(floorID:number)
    {
        super();
        this.initSelf();
    }

    private initSelf()
    {
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0x00ff00,1);
        shp.graphics.drawRect(1,1,58,58);
        shp.graphics.endFill();
        this.addChild(shp);
    }
}
class Explore extends egret.Sprite
{
    public constructor()
    {
        super();
        this.initSelf();
    }

    private initSelf()
    {
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0xff0000,1);
        shp.graphics.drawRect(0,0,60,60);
        shp.graphics.endFill();
        this.addChild(shp);
    }

    public Run()
    {
        let explore = this;
        setTimeout(()=>{
            MapManager.Instance.Delete(explore);
        },400);
    }
}
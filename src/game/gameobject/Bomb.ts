class Bomb extends egret.Sprite
{
    public Level:number=1;

    public constructor()
    {
        super();
        this.initSelf();
    }

    private initSelf()
    {
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0x000000,1);
        shp.graphics.drawRect(0,0,60,60);
        shp.graphics.endFill();
        this.addChild(shp);
    }

    public Run()
    {
        let bomb = this;
        setTimeout(function() {
            MapManager.Instance.BombExplore(bomb);
        }, 3000);
    }
}
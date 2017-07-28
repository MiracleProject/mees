class MapRuntime
{
    private _maxX:number;
    private _maxY:number;

    public constructor()
    {

    }

    public RegistBlock(x:number,y:number)
    {

    }

    public RegistBomb(x:number,y:number)
    {

    }

    public RegistCallback()
    {

    }

    public ReportPosition(x:number,y:number)
    {

    }

    public static GetCurrentPos(x:number,y:number):Array<number>
    {
        x = Math.floor(x/60);
        y = Math.floor(y/60);
        return [x,y]
    }
}
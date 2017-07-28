
class DataManager
{
    private static _instance:DataManager;

    public static get Instance():DataManager
    {
        if(!this._instance)
        {
            this._instance = new DataManager();
            return this._instance;
        }
        return this._instance;
    }

    private _dataList:Array<BaseData> = [];
    private _initCount:number = 0;
    private _initCallback:Function;

    public Init(initCallback:Function)
    {
        this._initCallback = initCallback;
        for(let key in this._dataList)
        {   
            this._dataList[key].Init();
        }
    }

    public ReportInit()
    {
        this._initCount++;
        console.log("[Data] Progress:"+this._initCount+"/"+this._dataList.length);
        if(this._initCount>=this._dataList.length)
        {
            this._initCallback();
            this.Start();
        }
    }

    public Start()
    {
        for(let key in this._dataList)
        {   
            this._dataList[key].Start();
        }
    }

    public static MainData:MainData = new MainData();

    constructor()
    {
        this._dataList.push(DataManager.MainData);
    }
}
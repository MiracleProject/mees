class MapManager
{   
    private static _instance:MapManager;

    public static get Instance():MapManager
    {
        if(!this._instance)
        {
            this._instance = new MapManager();
        }
        return this._instance;
    }

    private _currentMapID:number;
    private _currentMapType:string;

    private _mapRuntime:MapRuntime;
    private _BlockList:Block[][] = [];
    private _FloorList:Floor[][] = [];
    private _player:Player;

    private _tempMap:number[][] = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,1,0,1,0,1,0,1,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,1,0,1,0,1,0,1,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,1,0,1,0,1,0,1,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,1,0,1,0,1,0,1,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];

    public SetupMap(mapID:number)
    {
        this._currentMapID = mapID;
        //todo:配置地图信息
        this.initMap();
    }

    private initMap()
    {
        //runtime作为服务端接口
        this._mapRuntime = new MapRuntime();
        //todo:初始化地图
        
        //createMap
        this.createFloor();
        //createBlock
        this.createBlock();
        //createRole
        this.createPlayer();
        this.update();
    }

    private createFloor()
    {
        for (let n = 0; n < 10; n++) 
        {
            this._FloorList[n] = [];
            for (let m = 0; m < 10; m++)
            {
                let floor = new Floor(1);
                floor.x = n*60;
                floor.y = m*60;
                this._FloorList[n][m] = floor;
            }
        }
    }

    private createBlock()
    {
        for(let n in this._tempMap)
        {
            this._BlockList[n] = [];
            for(let m in this._tempMap[n])
            {
                let blockid = this._tempMap[n][m];
                if(!blockid)
                {
                    continue;
                }
                let block = new Block(blockid);
                block.x = parseInt(m)*60;
                block.y = parseInt(n)*60;
                this._BlockList[n][m] = block;
            }
        }
    }

    private createPlayer()
    {
        //todo:初始化角色
        let player = new Player();
        player.x=0;
        player.y=0;
        this._player = player;
    }

    private update()
    {
        let stage = GameGlobal.GameStage;
        for (let n = 0; n < 10; n++) {
            for (let m = 0; m < 10; m++) {
                stage.addChild(this._FloorList[n][m]);
            }
        }
        for (let n in this._BlockList) {
            for (let m in this._BlockList[n] ) {
                
                stage.addChild(this._BlockList[n][m]);
            }
        }
        stage.addChild(this._player);
    }

    public SetBomb(x:number,y:number)
    {   
        let bomb = new Bomb();
        //let pos = MapRuntime.GetCurrentPos(x,y);
        let pos = MapRuntime.GetCurrentPos(this._player.x,this._player.y);
        bomb.x = pos[0]*60;
        bomb.y = pos[1]*60;
        GameGlobal.GameStage.addChild(bomb);
        bomb.Run();
    }

    public BombExplore(bomb:Bomb)
    {  
        let pos = MapRuntime.GetCurrentPos(bomb.x,bomb.y);
        let explores :Array<Explore> =[];
        let explore = new Explore();
        explore.x = pos[0]*60;
        explore.y = pos[1]*60;
        explores.push(explore);
        for (let i = 0; i < bomb.Level; i++) {
            let offset = i+1;
            explore = new Explore();
            explore.x = pos[0] * 60;
            explore.y = (pos[1]-offset) * 60;
            explores.push(explore);
        }
        for (let i = 0; i < bomb.Level; i++) {
            let offset = i+1;
            explore = new Explore();
            explore.x = pos[0] * 60;
            explore.y = (pos[1]+offset) * 60;
            explores.push(explore);
        }
        for (let i = 0; i < bomb.Level; i++) {
            let offset = i+1;
            explore = new Explore();
            explore.x = (pos[0]-offset) * 60;
            explore.y = pos[1] * 60;
            explores.push(explore);
        }

        for (let i = 0; i < bomb.Level; i++) {
            let offset = i+1;
            explore = new Explore();
            explore.x = (pos[0]+offset) * 60;
            explore.y = pos[1] * 60;
            explores.push(explore);
        }

        for(let key in explores)
        {
            explore = explores[key];
            GameGlobal.GameStage.addChild(explores[key]);
            explore.Run();
        }
        this.Delete(bomb);

    }

    public Delete(obj:egret.Sprite)
    {
        GameGlobal.GameStage.removeChild(obj);
    }
}
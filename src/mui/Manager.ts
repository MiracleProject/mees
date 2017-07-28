namespace mui
{
    export enum LayerEnum
    {
        bottom,
        middle,
        top,
        touch,
        ex1,
        ex2,
        ex3,
    }

    export class Manager extends egret.DisplayObjectContainer
    {
        private static _instance:Manager;

        private _UIState:boolean;

        private _displayList:Array<UIBase> = [];
        
        public static get Instance():Manager
        {
            if(!this._instance)
            {
                this._instance = new Manager();
            }
            return this._instance;
        }

        public GetUI(UIType:UIEnum):UIBase
        {
            return Dictionary.GetUI(UIType);
        }

        public Get<T>(UIType:UIEnum):T
        {
            return Dictionary.Get<T>(UIType);
        }

        public Show(UIType:UIEnum,useAnime:boolean = false)
        {
            let UI = this.GetUI(UIType);
            let currentUI = this._displayList[UI.LayerType];
            if(currentUI&&currentUI.UIType == UI.UIType)
            {   
                return;
            }
            if(currentUI)
            {
                this.removeChild(currentUI)
            }
            //todo:可插入打开动画
            this._displayList[UI.LayerType] = UI;
            this.refresh();
        }

        public Close(UIType:UIEnum,useAnime:boolean = false)
        {
            let ui = this.GetUI(UIType);
            if(ui.parent===this)
            {
                //todo:可插入关闭动画
                this.removeChild(ui);
                this._displayList[ui.LayerType] = undefined;
                this.refresh();
            }
        }

        public CloseWithout(...UITypes:Array<UIEnum>)
        {
            for(let key1 in this._displayList)
            {
                let ui =this._displayList[key1];
                if(!ui)
                {
                    continue;
                }
                let needClose = true;
                for(let key2 in UITypes)
                {
                    if(UITypes[key2]==ui.UIType)
                    {
                        needClose = false;
                        break; 
                    }     
                }
                if(!needClose)
                {
                    continue;
                }
                this.removeChild(ui);
                this._displayList[key1] = undefined;
                
            }
            this.refresh();
        }

        public CloseLayer(LayerType:LayerEnum)
        {

        }

        public CloseLayerWithout(...LayerTypes:Array<LayerEnum>)
        {

        }

        private refresh()
        {
            for(let key in this._displayList)
            {
                let disobj = this._displayList[key];
                if(!disobj)
                {
                    continue;
                }
                this.addChild(disobj);
            }
        }
    }
}
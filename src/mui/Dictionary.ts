namespace mui
{
    export class Dictionary
    {
        private static _UIList:Array<any>=[];

        public static GetUI(UIType:UIEnum):UIBase
        {
            let ui =  this._UIList[UIType];
            if(!ui)
            {
                ui = Factory.CreateUI(UIType);
                this._UIList[UIType] = ui;
            }
            return ui;
        }

        public static Get<T>(UIType:UIEnum):T
        {
            let ui = this._UIList[UIType];
            if (!ui) 
            {
                ui = Factory.CreateUI(UIType);
                this._UIList[UIType] = ui;
            }
            return ui;
        }
    }

    class Factory
    {
        public static CreateUI(UIType:UIEnum):any
        {
            //todo:需要对UI资源进行再管理
            switch(UIType)
            {
                case UIEnum.MainUI:
                    return new MainUI(UIType,LayerEnum.bottom,"resource/skins/MainUI/MainSkin.exml");
                case UIEnum.TouchUI:
                    return new TouchUI(UIType,LayerEnum.touch,"resource/skins/Rocker/TouchPadSkin.exml");
            }
        }
    }
}
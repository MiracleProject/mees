
namespace mui
{
    export class UIBase extends eui.Component
    {
        public readonly UIType:UIEnum;
        public readonly LayerType:LayerEnum;
        private _initState:boolean = false;

        public constructor(UIType:UIEnum,layerType:LayerEnum,skinName:string)
        {   
            super();
            this.skinName = skinName;
            this.UIType = UIType;
            this.LayerType = layerType;
            this.AddListener()
        }

        private onSkinComplete()
        {
            console.log("UI: "+this.UIType+" 加载皮肤成功");
            this.removeEventListener(eui.UIEvent.COMPLETE,this.onSkinComplete,this);
            this.OnInit();
            this._initState = true;
            if(this.parent)
            {
                this.OnOpen();
            }
        }

        private onSkinComplete2()
        {
            console.log("UI: "+this.UIType+" 加载皮肤成功2");
        }

        private onAddToStage()
        {
            if(this._initState)
            {
                this.OnOpen();
            }
        }

        private onRemovedFormStage()
        {
            this.OnClose();
        }

        public OnInit()
        {

        }

        public OnOpen()
        {
            
        }

        public OnClose()
        {

        }

        public AddListener()
        {
            this.addEventListener(eui.UIEvent.COMPLETE,this.onSkinComplete,this);
            //this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.onSkinComplete2,this);
            this.addEventListener(eui.UIEvent.ADDED_TO_STAGE,this.onAddToStage,this);
            this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE,this.onRemovedFormStage,this);
        }

        public RemoveListener()
        {
            this.removeEventListener(eui.UIEvent.ADDED_TO_STAGE,this.onAddToStage,this);
            this.removeEventListener(eui.UIEvent.REMOVED_FROM_STAGE,this.onRemovedFormStage,this);
        }
    }

}
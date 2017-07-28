namespace mui
{
    export class ComponentBase extends eui.Component
    {
        //todo:skin预加载
        public static StateList:Array<boolean> =[];

        public static OnComplete(e:egret.Event)
        {
            let t = e.target;
            t.removeEventListener(eui.UIEvent.COMPLETE,ComponentBase.OnComplete,t);
            if(ComponentBase.StateList[t.ComponentName])
            {
                return;
            }
            ComponentBase.StateList[t.ComponentName] = true;
            t.OnComplete();
        }
        
        public ComponentName:string;

        constructor(componentName:string,skinName:string)
        {
            super();
            this.ComponentName =componentName;
            this.skinName = skinName;
            if(ComponentBase.StateList[componentName])
            {
                return;
            }
            this.addEventListener(eui.UIEvent.COMPLETE,ComponentBase.OnComplete,this);
        }

        public get SkinState():boolean
        {
            return ComponentBase.StateList[this.ComponentName];
        }

        public OnComplete()
        {
            
        }

        //todo:组件单例（如背景，等）
        private static _StaticComponentList:Array<any> =[];

        public static GetStaticComponent<T>(componentName:string,c:new ()=>T):T
        {
            if(!this._StaticComponentList[componentName])
            {
                this._StaticComponentList[componentName] = new c();
            }
            return this._StaticComponentList[componentName];
        }
    }

    export module Component
    {
        //todo:缓冲对象池（暂无需求）
    }
}
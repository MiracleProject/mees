namespace mui
{
    export class MainUI extends UIBase
    {
        public Btn_test:eui.Image;

        public Lab_up:eui.Label;
        public Lab_down:eui.Label;
        public Lab_left:eui.Label;
        public Lab_right:eui.Label;

        public PlayerRocker:Rocker;
        /*
        protected createChildren()
        {
            super.createChildren();
            console.log("createChildren:",this.Btn_test);
        }

        protected childrenCreated()
        {
            super.childrenCreated();
            console.log("childrenCreated:",this.Btn_test);
        }
        */
        public OnInit()
        {
            this.addChildAt(ComponentBase.GetStaticComponent<Component.GlobalBG>(ComponentEnum.GlobalBG,Component.GlobalBG),0);

        }

        public OnOpen()
        {
            this.Btn_test.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMessage,this);
        }

        public OnClose()
        {
            this.Btn_test.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onMessage,this);
        }

        private onMessage()
        {
        
            console.log("test success");
            MapManager.Instance.SetBomb(0,0);
        }
    }
}
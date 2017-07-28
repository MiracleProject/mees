namespace mui
{
    export class TouchUI extends UIBase
    {
        public touchArea: eui.Rect;
        public Btn_bomb: eui.Image;

        public OnInit()
        {
            InputManager.Instance.BindUI(GameGlobal.MainStage,this);//mui.Get<mui.TouchUI>(mui.UIEnum.TouchUI));
        }

        public OnOpen()
        {
            InputManager.Instance.Start();
            this.Btn_bomb.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMessage,this);
        }

        public OnClose()
        {
            InputManager.Instance.End();
            this.Btn_bomb.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onMessage,this);
        }

        private onMessage()
        {
            
        }
    }
}
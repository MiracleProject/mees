
class LoadingUI extends eui.Component {

    public static _instance:LoadingUI;

    public static get Instance():LoadingUI
    {
        if(!this._instance)
        {
            this._instance = new LoadingUI();
        }
        return this._instance;
    }

    public constructor() {
        super();
        this.skinName = "resource/skins/LoadingUI/LoadingSkin.exml";
    }

    public Rect_bg:eui.Rect;
    public Rect_loadBar:eui.Rect;
    public Lab_loadText:eui.Label;

    protected childrenCreated()
    {
        this.addEventListener(eui.UIEvent.COMPLETE,this.onSkinComplete,this);
    }

    private onSkinComplete()
    {
        this.removeEventListener(eui.UIEvent.COMPLETE,this.onSkinComplete,this);
        this.Rect_loadBar.scaleX = 0;
    }

    public setProgress(current:number, total:number):void 
    {
        this.Rect_loadBar.scaleX = current/total;
        this.Lab_loadText.text = `Loading...${current}/${total}`;
    }
}

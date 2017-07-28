
class Rocker extends eui.Component 
{
    public constructor() {
        super();
        this.skinName = "resource/skins/Rocker/RockerSkin.exml";
    }

    private ball: eui.Image;  //圆环
    private circle: eui.Image;//小球
    private arrow: eui.Image;//箭头

    private circleRadius: number = 0; //圆环半径
    private ballRadius: number = 0;   //小球半径
    private centerX: number = 0;      //中心点坐标
    private centerY: number = 0;
    private touchID: number;  //触摸ID
    private ballMoveRadius: number = 0;   //小球移动半径

    private state:boolean = false;//是否被正确按下
    private rockerContainer:egret.DisplayObjectContainer;//摇杆UI实例容器（大小需等于屏幕）
    private touchArea:egret.DisplayObjectContainer;//摇杆第一次按下触控对象
    private touchStage:egret.Stage;//摇杆移动检测对象

    //option
    private circleFollowable:boolean = true;//圆环是否跟随
    public set CircleFollowable(b:boolean)
    {
        this.circleFollowable = b;
    }
    private circleAutohide:boolean = true;//圆环是否自动隐藏
    public set CircleAutohide(b:boolean)
    {
        this.circleAutohide = b;
        if(b)
        {
            this.hide();     
        }
        else
        {
            this.x = this.defaultX;
            this.y = this.defaultY;
            this.ball.x = this.centerX;
            this.ball.y = this.centerY;
            if(!this.parent)
            {
                this.rockerContainer.addChild(this);
            }
        }
    }

    private defaultX:number = 320;
    private defaultY:number = 800;
    private ballMoveScale:number = 1.1;
    private noActionScale:number = 0.1;
    private arrowPositionList:Array<{x:number,y:number,rotation:number}> = [];
    private arrowOffset:number = 95 -24;

    public childrenCreated() {
        this.touchEnabled = false;
        this.touchChildren = false;
        //设置圆环偏移
        let circleOffset = -this.circle.y +2;
        //获取圆环和小球半径
        this.circleRadius = this.circle.height / 2;
        this.ballRadius = this.ball.height / 2;
        //获取中心点
        this.centerX = this.circleRadius;
        this.centerY = this.circleRadius;
        //设置锚点
        this.anchorOffsetX = this.circleRadius;
        this.anchorOffsetY = this.circleRadius;
        //设置小球初始位置
        this.ball.x = this.centerX;
        this.ball.y = this.centerY;
        //设置箭头配置
        this.arrow.visible = false;
        this.arrowPositionList = [
            {x:this.centerX,y:this.centerY-this.arrowOffset-circleOffset,rotation:0},
            {x:this.centerX,y:this.centerY-this.arrowOffset-circleOffset,rotation:0},
            {x:this.centerX+this.arrowOffset,y:this.centerY-circleOffset,rotation:90},
            {x:this.centerX+this.arrowOffset,y:this.centerY-circleOffset,rotation:90},
            {x:this.centerX,y:this.centerY+this.arrowOffset-circleOffset,rotation:180},
            {x:this.centerX,y:this.centerY+this.arrowOffset-circleOffset,rotation:180},
            {x:this.centerX-this.arrowOffset,y:this.centerY-circleOffset,rotation:270},
            {x:this.centerX-this.arrowOffset,y:this.centerY-circleOffset,rotation:270},
        ];

        this.ballMoveRadius = this.circleRadius * this.ballMoveScale - this.ballRadius;
        if(this.circleAutohide)
        {
            this.x = this.defaultX;
            this.y = this.defaultY;
            this.ball.x = this.centerX;
            this.ball.y = this.centerY;
            this.rockerContainer.addChild(this);
        }
    }

    //创建虚拟摇杆 注册监听舞台,UI父对象(UI父对象为UI移动范围)
    public init(touchStage:egret.Stage,rockerContainer:egret.DisplayObjectContainer,touchArea:egret.DisplayObjectContainer)
    {
        this.touchStage = touchStage;
        this.rockerContainer = rockerContainer;
        this.touchArea = touchArea;
    }

    //启动虚拟摇杆
    public start() {
        this.touchArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.touchStage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.touchStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        //this.touchStage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        this.touchStage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOut, this);
    }

    //停止虚拟摇杆
    public stop() {
        this.touchArea.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.touchStage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.touchStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        //this.touchStage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        this.touchStage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOut, this);
        this.hide();
    }

    //触摸开始，显示虚拟摇杆
    private onTouchBegin(e: egret.TouchEvent) {
        //e.preventDefault();
        if(this.circleAutohide)
        {
            if (this.parent) {
                return;
            }
            //可过滤坐标
            this.x = e.stageX;
            this.y = e.stageY;
            this.rockerContainer.addChild(this);
        }
        this.ball.x = this.centerX;
        this.ball.y = this.centerY;
        this.touchID = e.touchPointID;

        this.state = true;
        this.dispatchEvent(new egret.Event("rocker_start"));
    }

    //触摸结束，隐藏虚拟摇杆
    private onTouchEnd(e: egret.TouchEvent) {
        if (!this.state||this.touchID != e.touchPointID) {
            return;
        }
        if(this.circleAutohide)
        {
            this.hide();
        }
        else
        {
            this.x = this.defaultX;
            this.y = this.defaultY;
            this.ball.x = this.centerX;
            this.ball.y = this.centerY;
        }
        this.state = false;
        this.dispatchEvent(new egret.Event("rocker_end"));
    }

    //触摸移动，设置小球的位置
    private p1: egret.Point = new egret.Point();
    private p2: egret.Point = new egret.Point();
    private onTouchMove(e: egret.TouchEvent) {
        if (!this.state||this.touchID != e.touchPointID) {
            return;
        }
        //获取手指和虚拟摇杆的距离
        this.p1.x = this.x;
        this.p1.y = this.y;
        this.p2.x = e.stageX;
        this.p2.y = e.stageY;
        var dist = egret.Point.distance(this.p1, this.p2);
        var angle: number = Math.atan2(e.stageY - this.y, e.stageX - this.x);

        //手指距离在移动范围内
        if (dist <= this.ballMoveRadius) {
            this.ball.x = this.centerX + e.stageX - this.x;
            this.ball.y = this.centerY + e.stageY - this.y;
            //手指距离在圆环范围外
        } else {
            if(this.circleFollowable)
            {
                let offset = dist - this.ballMoveRadius;
                this.x += Math.cos(angle) * offset;
                this.y += Math.sin(angle) * offset;
            }
            this.ball.x = Math.cos(angle) * this.ballMoveRadius + this.centerX;
            this.ball.y = Math.sin(angle) * this.ballMoveRadius + this.centerY;
        }
        //派发事件
        let dir = this.convertAngle2dir(angle,dist);
        this.setArrow(dir);
        //this.dispatchEventWith("rocker_move", false, angle);
        this.dispatchEventWith("rocker_move", false, dir);
    }

    //把角度转化为方向
    private convertAngle2dir(angle:number,dist:number)
    {
        let dir = Math.floor((180/Math.PI*angle+135)/45);
        if(dir<0)
        {
            dir+=8;
        }
        if(dist<this.circleRadius*this.noActionScale)
        {
            dir = -1;
        }
        return dir;
    }

    private setArrow(dir:number)
    {
        if(dir==-1)
        {
            this.arrow.visible = false;
            return;
        }
        let pos = this.arrowPositionList[dir];
        this.arrow.x = pos.x;
        this.arrow.y = pos.y;
        this.arrow.rotation = pos.rotation;
        this.arrow.visible = true;
    }

    private onTouchCancel()
    {
        alert(1);
    }

    private onTouchOut()
    {
        if(!this.state)
        {
            return;
        }
        if(this.parent&&this.circleAutohide)
        {
            this.hide();
        }
        else if(!this.circleAutohide)
        {
            this.x = this.defaultX;
            this.y = this.defaultY;
            this.ball.x = this.centerX;
            this.ball.y = this.centerY;
        }
        this.arrow.visible=false;
        this.state = false;
        this.dispatchEvent(new egret.Event("rocker_end"));
    }

    private hide() {
        this.parent && this.parent.removeChild(this);
    }
}
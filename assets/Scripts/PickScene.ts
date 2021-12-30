// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameData from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    wheel: cc.Node = null;

    @property(cc.Node)
    prize1: cc.Node = null;
    @property(cc.Node)
    prize2: cc.Node = null;
    @property(cc.Node)
    prize3: cc.Node = null;
    @property(cc.Node)
    prize4: cc.Node = null;

    @property(sp.Skeleton)
    tiger: sp.Skeleton = null;

    @property(cc.Node)
    tigerGift: cc.Node = null;
    @property(cc.Node)
    wheelClone: cc.Node = null;

    @property(cc.Button)
    jumpbtn: cc.Button = null;

    jumptime = -1;

    protected onLoad(): void {
       cc.director.getPhysicsManager().enabled = true;
       cc.director.getPhysicsManager().gravity = cc.Vec2.ZERO;
    }

    start()
    {
        this.jumpbtn.node.on("click", ()=>this.onClick());
        this.prize1.getComponent(sp.Skeleton).animation = GameData.prizeBox;
        this.prize2.getComponent(sp.Skeleton).animation = GameData.prizeBox;
        this.prize3.getComponent(sp.Skeleton).animation = GameData.prizeBox;
        this.prize4.getComponent(sp.Skeleton).animation = GameData.prizeBox;
        this.tigerGift.getComponent(sp.Skeleton).animation = GameData.prizeBox;
    }

    onClick()
    {
        this.jumptime = 2.5;
        this.tiger.animation = "3jump";
    }



    update (dt) 
    {
        if(this.jumptime>=0)
        {
            this.jumptime -= dt;
            if(this.jumptime<=0)
            {
                this.tigerGift.active = true;
                cc.tween(this.tigerGift).to(0.3,{opacity:255}).start();
                this.tiger.animation = "4dile_gift_chopmat";
            }
            
            if(this.jumptime <=0.8)
            {
                this.wheelClone.active = true;
            }
        }

        this.wheel.angle += 75*dt;
        this.prize1.angle -=75*dt;
        this.prize2.angle -=75*dt;
        this.prize3.angle -=75*dt;
        this.prize4.angle -=75*dt;

        for(let i = 0; i<this.wheelClone.childrenCount; i++){
            let pos = this.wheel.children[i].convertToWorldSpaceAR(cc.Vec2.ZERO);
            pos = this.wheelClone.convertToNodeSpaceAR(pos);
            this.wheelClone.children[i].x = pos.x;
            this.wheelClone.children[i].y = pos.y;
            // this.wheelClone.children[i].angle = this.wheel.children[i].angle;
        }
    }
}

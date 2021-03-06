// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import APIController from "./APIController";
import AudioController from "./AudioController";
import GameData from "./GameData";
import largepopup from "./largepopup";

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

    @property(cc.Label)
    cooldown: cc.Label = null;

    @property(cc.Prefab)
    largePopup: cc.Prefab = null;

    @property(cc.Node)
    loading: cc.Node = null;

    @property(cc.Node)
    expiriedPopup: cc.Node = null;

    pauseTime: boolean = false;

    cooldownTime: number = 19;

    jumptime = -1;

    onExpiriedOkClick()
    {
        this.expiriedPopup.active = false;
        cc.director.loadScene("MainScene");
    }

    showPopupExpiried()
    {
        this.expiriedPopup.active = true;
    }

    protected onLoad(): void {
       cc.director.getPhysicsManager().enabled = true;
       cc.director.getPhysicsManager().gravity = cc.Vec2.ZERO;
    }

    decreseTimer()
    {
        if(!this.pauseTime)
            this.cooldown.string = this.cooldownTime-- + "s";
    }

    start()
    {
        this.schedule(this.decreseTimer, 1);
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
        this.jumpbtn.node.active = false;
    }



    update (dt) 
    {
        if(this.cooldown.string == "0s" && !this.pauseTime)
        {
            this.pauseTime = true;
            this.onClick();
        }

        if(this.jumptime>=0)
        {
            this.jumptime -= dt;
            if(this.jumptime<=0)
            {
                this.tigerGift.active = true;
                cc.tween(this.tigerGift).to(0.3,{opacity:255}).call(()=>this.showPrizePopup()).start();
                this.tiger.animation = "4dile_gift_chopmat";
                this.pauseTime = true;
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

    showPrizePopup()
    {
        let i = 0;
        if(i==0)
        {
            this.loading.active = true;
            APIController.roll((err,json)=>{
                this.loading.active = false;
                if(json["errorCode"] == 98)
                {
                    this.showPopupExpiried();
                    return;
                }
                if(json["data"]["code"] == "LUCKY")
                {
                    largepopup.type = 2;
                    GameData.huntTurn = json["data"]["total_turn"];
                    largepopup.voucherText = json["data"]["desc"];
                }
                else
                {
                    
                    GameData.APIList.forEach(APIelement => {
                        if(APIelement.code == json["data"]["code"])
                        {
                            largepopup.voucherType = APIelement.type;
                        }
                    });
                    largepopup.voucherText = json["data"]["desc"];
                    GameData.huntTurn = json["data"]["total_turn"];
                    largepopup.type = 0;
                }
                cc.find("AudioController").getComponent(AudioController).playFirework();
                let popup = cc.instantiate(this.largePopup);
                popup.children[1].scale = 0;
                cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
                popup.parent = cc.find("Canvas/PopUp");
            });
            
        }
        else if(i==1)
        {
            largepopup.type = 1;
            let popup = cc.instantiate(this.largePopup);
            popup.children[1].scale = 0;
            cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
            popup.parent = cc.find("Canvas/PopUp");
        }
        else
        {
            largepopup.type = 2;
            let popup = cc.instantiate(this.largePopup);
            popup.children[1].scale = 0;
            cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
            popup.parent = cc.find("Canvas/PopUp");
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import APIController from "./APIController";
import AudioController from "./AudioController";
import codeBox from "./codebox";
import GameData from "./GameData";
import largepopup from "./largepopup";
import smallpopup from "./Smallpopup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {

    public static Instance;

    @property([cc.Node])
    spawn: cc.Node[] = [];

    @property([cc.Node])
    tiger: cc.Node[] = [];

    @property(cc.Prefab)
    pig: cc.Prefab = null;

    @property(cc.Prefab)
    bird: cc.Prefab = null;

    @property(cc.Prefab)
    cat: cc.Prefab = null;

    @property(cc.Prefab)
    rabbit: cc.Prefab = null;

    @property(cc.Button)
    playBtn: cc.Button = null;

   

    @property(cc.Node)
    tigerComp: cc.Node = null;

    @property(cc.Node)
    tigerIdle: cc.Node = null;

    @property(cc.Node)
    buttons: cc.Node = null;

    @property(cc.Node)
    popupParent: cc.Node = null;

    @property(cc.Button)
    ruleBtn: cc.Button = null;

    @property(cc.Prefab)
    rulePopup: cc.Prefab = null;

    @property(cc.Button)
    historyBtn: cc.Button = null;

    @property(cc.Button)
    inviteBtn: cc.Button = null;

    @property(cc.Button)
    ivtConfirmBtn: cc.Button = null;

    @property(cc.Button)
    muteBtn: cc.Button = null;

    @property(cc.Button)
    unmuteBtn: cc.Button = null;

    @property(cc.Prefab)
    historyPopup: cc.Prefab = null;

    @property(cc.Button)
    shopBtn: cc.Button = null;

    @property(cc.Button)
    rankBtn: cc.Button = null;

    @property(cc.Prefab)
    rankPopup: cc.Prefab = null;

    @property(cc.Prefab)
    shopPopup: cc.Prefab = null;

    @property(cc.Button)
    giftListBtn: cc.Button = null;
    
    @property(cc.Button)
    share: cc.Button = null;

    @property(cc.Prefab)
    giftListPopup: cc.Prefab = null;

    @property(cc.Prefab)
    largepopup: cc.Prefab = null;

    @property(cc.Prefab)
    smallpopup: cc.Prefab = null;

    @property(cc.Label)
    cooldown: cc.Label = null;

    @property(cc.Label)
    huntTurn: cc.Label = null;

    @property(cc.Node)
    huntTurnComp: cc.Node = null;

    @property(cc.Node)
    timebox: cc.Node = null;

    @property(cc.Node)
    loadingIcon: cc.Node = null;

    @property(cc.Node)
    expiriedPopup: cc.Node = null;

    playing: boolean = false;

    pos: number[] = [-1,-1,-1,-1];

    timer: number[] = [-0.5,-0.5,-0.5,-0.5];

    cooldownTime: number = 59;

    protected onLoad(): void {
        MainScene.Instance = this;
    }

    start()
    {
        //APIController.getListVoucher
        this.playBtn.node.on("click", ()=>this.onPlayClick());
        this.rankBtn.node.on("click", ()=>this.onRankClick());
        this.ruleBtn.node.on("click", ()=>this.onRuleClick());  
        this.historyBtn.node.on("click", ()=>this.onHistoryClick());   
        this.shopBtn.node.on("click", ()=>this.onShopClick()); 
        this.giftListBtn.node.on("click", ()=>this.onGiftListClick());  
        this.inviteBtn.node.on("click", ()=>this.onInviteClick()); 
        this.ivtConfirmBtn.node.on("click", ()=>this.onIvtConfirmClick()); 
        this.muteBtn.node.on("click", ()=>{
            this.unmuteBtn.node.active = true;
            this.muteBtn.node.active = false;
            cc.audioEngine.pause(0);
        }); 
        this.unmuteBtn.node.on("click", ()=>{
            this.unmuteBtn.node.active = false;
            this.muteBtn.node.active = true;
            cc.audioEngine.resume(0);
        }); 
        this.share.node.on("click", ()=>{
            codeBox.copyTextToClipboard(GameData.link);
            smallpopup.type = 8;
            let popup = cc.instantiate(this.smallpopup);
            popup.children[1].scale = 0;
            cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
            popup.parent = this.popupParent;
        });
        GameData.generateData();   
        
    }

    showLoading(i: boolean)
    {
        this.loadingIcon.active = i;
    }

    onExpiriedOkClick()
    {
        this.expiriedPopup.active = false;
    }

    showPopupExpiried()
    {
        this.expiriedPopup.active = true;
    }

    onInviteClick()
    {
        smallpopup.type = 4;
        let popup = cc.instantiate(this.smallpopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = this.popupParent;
    }

    onIvtConfirmClick()
    {
        smallpopup.type = 5;
        let popup = cc.instantiate(this.smallpopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = this.popupParent;
        
    }

    decreseTimer()
    {
        this.cooldown.string = this.cooldownTime-- + "s";
    }

    onPlayClick()
    {
        if(GameData.huntTurn > 0)
        {
            this.huntTurnComp.active = false;
            //GameData.huntTurn--;
            this.playing = true;
            let TigerPos = this.getRandomInt(0,4);
            this.tiger[TigerPos].active = true;
            this.tiger[TigerPos].getComponentInChildren(sp.Skeleton).animation = "1dile_dung_saulung";
            this.buttons.active = false;
            //this.tigerIdle.active = false;
            cc.tween(this.tigerIdle).to(0.3,{opacity:0}).call(()=>this.tigerIdle.active = false).start();
            cc.tween(this.timebox).to(0.3,{opacity:255}).start();
            this.schedule(this.decreseTimer, 1);
        }
        else
        {
            smallpopup.type = 7;
            let popup = cc.instantiate(this.smallpopup);
            popup.children[1].scale = 0;
            cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
            popup.parent = cc.find("Canvas/PopUp");
        }
        
    }

    onRankClick()
    {
        this.showLoading(true);
        let popup = cc.instantiate(this.rankPopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = this.popupParent;
    }

    onRuleClick()
    {
        if(GameData.isAuthed)
        {
            this.showLoading(true);
            APIController.rule((err,json)=>{
                this.showLoading(false);
                GameData.rule = json["data"]["content"];
                let popup = cc.instantiate(this.rulePopup);
                popup.children[1].scale = 0;
                cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
                popup.parent = this.popupParent;
            });
        }    
    }

    onHistoryClick()
    {
        this.showLoading(true);
        let popup = cc.instantiate(this.historyPopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = this.popupParent;
    }

    onShopClick()
    {
        let popup = cc.instantiate(this.shopPopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = this.popupParent;
    }

    onGiftListClick()
    {
        let popup = cc.instantiate(this.giftListPopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = this.popupParent;
    }

    update(dt)
    {
        if(GameData.ivtconfirmed) this.ivtConfirmBtn.node.active = false;
        this.huntTurn.string = GameData.huntTurn + "";
        // if(GameData.huntTurn <= 0)
        // {
        //     this.playBtn.interactable = false;
        // }
        // else
        // {
        //     this.playBtn.interactable = true;
        // }
        if(this.cooldown.string == "0s")
            cc.director.loadScene("MainScene");
        if(this.playing)
        {           
            for(let i = 0; i<4;i++)
            {
                if(this.pos[i]==-1)
                {
                    this.pos[i] = this.getRandomInt(0,500);
                    switch(this.pos[i]) {
                        case 0: 
                        {
                            let node = cc.instantiate(this.pig);
                            node.getComponentInChildren(sp.Skeleton).animation = this.getRandomPrizeColor(i);
                            node.parent = this.spawn[i];
                            node.setPosition(0, 0,-10);
                            break;
                        }
                        case 1: 
                        {
                            let node = cc.instantiate(this.rabbit);
                            node.getComponentInChildren(sp.Skeleton).animation = this.getRandomPrizeColor(i);
                            node.parent = this.spawn[i];
                            node.setPosition(0, 0,-10);
                            break;
                        }
                        case 2: 
                        {
                            let node = cc.instantiate(this.cat);
                            node.getComponentInChildren(sp.Skeleton).animation = this.getRandomPrizeColor(i);
                            node.parent = this.spawn[i];
                            node.setPosition(0, 0,-10);
                            break;
                        }
                        case 3: 
                        {
                            let node = cc.instantiate(this.bird);
                            node.getComponentInChildren(sp.Skeleton).animation = this.getRandomPrizeColor(i);
                            node.parent = this.spawn[i];
                            node.setPosition(0, 0,-10);
                            break;
                        }
                        default: 
                        {
                            this.pos[i] = -1;
                        }
                            
                    }
                }
                else
                {
                    this.timer[i]-=dt;
                    if(this.timer[i]<=0.2)
                    {
                        cc.tween(this.spawn[i].children[0]).to(0.2,{opacity:0}).call(()=>this.spawn[i].destroyAllChildren()).start();                      
                    }
                    if(this.timer[i]<=0)
                    {
                        this.pos[i] = -1;
                        this.timer[i] = -0.5;
                    }
                }
            }
        }
        

    }
    
    
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    getRandomPrizeColor(i:number) : string
    {
        let prizeColor = this.getRandomInt(0,100);
        if(prizeColor == 0)
            {this.timer[i] = 0.5; return "idle3";}
            else if(prizeColor <= 19)
                    {this.timer[i] = 0.75; return "idle2";}
                    else if(prizeColor <= 54)
                            {this.timer[i] = 1; return "idle1";}
                            else {this.timer[i] = 1.5; return "idle4";}
        return "idle4";
    }

    showLargePopup(type: number)
    {
        largepopup.type = type;
        let popup = cc.instantiate(this.largepopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = this.popupParent;
    }

    showSmallPopup(type: number)
    {
        smallpopup.type = type;
        let popup = cc.instantiate(this.smallpopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = this.popupParent;
    }

    
}

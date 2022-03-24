// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AudioController from "./AudioController";
import GameData from "./GameData";

const {ccclass, property} = cc._decorator;

//cc.PhysicsManager.PTM_RATIO = 32 * 1000;

@ccclass
export default class CatchScene extends cc.Component {

    @property(cc.Button)
    catch: cc.Button = null;

    @property(sp.Skeleton)
    tiger: sp.Skeleton = null;

    @property(cc.Node)
    prey: cc.Node = null;

    @property(cc.Node)
    tigerNode: cc.Node = null;

    @property(cc.Node)
    heo: cc.Node = null;

    @property(cc.Node)
    tho: cc.Node = null;

    @property(cc.Node)
    chim: cc.Node = null;

    @property(cc.Node)
    meo: cc.Node = null;

    @property(cc.Node)
    giftHeo: cc.Node = null;

    @property(cc.Node)
    giftTho: cc.Node = null;

    @property(cc.Node)
    giftChim: cc.Node = null;

    @property(cc.Node)
    giftMeo: cc.Node = null;

    @property(cc.Node)
    giftRealNode: cc.Node = null;



    giftFake: cc.Node = null;

    running: boolean = false;
    catching: boolean = false;
    catchTimer: number = 1.3;
    jumpTimer: number = 1.8;
    convertTimer: number = 0.33;
    sceneTimer: number = 2.5;
    ended: boolean = false;

    onLoad()
    {
        let physic_mng = cc.director.getPhysicsManager();
        physic_mng.enabled = true;
        physic_mng.gravity = cc.v2(0,-5000);
        switch(GameData.prey)
        {
            case 0:
                {
                    this.giftFake = this.giftChim;
                    this.chim.active = true;
                    this.prey = this.chim;
                    break;
                }
            case 1:
                {
                    this.giftFake = this.giftHeo;
                    this.heo.active = true;
                    this.prey = this.heo;
                    break;
                }
            case 2:
                {
                    this.giftFake = this.giftMeo;
                    this.meo.active = true;
                    this.prey = this.meo;
                    break;
                }
            case 3:
                {
                    this.giftFake = this.giftTho;
                    this.tho.active = true;
                    this.prey = this.tho;
                    break;
                }
        }
        this.prey.getComponent(sp.Skeleton).animation = "1idle";
        this.giftFake.getComponent(sp.Skeleton).animation = GameData.prizeBox;
        this.giftRealNode.getComponent(sp.Skeleton).animation = GameData.prizeBox;
        
    }

    start()
    {
        this.catching = true;
        this.tiger.animation = "5grap";
        cc.find("AudioController").getComponent(AudioController).playTiger();
    }

    update(dt)
    {
        this.sceneTimer -= dt;
        
        if(this.sceneTimer <= 0.4 && this.tiger.animation != "5walk")
        {
            this.tiger.animation = "5walk";
        }

        if(this.sceneTimer<=0 && !this.ended)
        {
            this.ended = true;
            cc.tween(cc.find("Canvas/Black")).to(0.3,{opacity:255}).call(()=>cc.director.loadScene("PickScene")).start();
        }

        if(this.catching)
        {
            this.catchTimer-=dt;
            this.jumpTimer-=dt;
            if(this.catchTimer<=0)
            {
                this.tigerNode.x+=10;
                if(this.prey.getComponent(sp.Skeleton).animation != "2convert" && !this.running)
                {
                    cc.find("AudioController").getComponent(AudioController).playPrey();
                    this.prey.getComponent(sp.Skeleton).animation = "2convert";
                    this.giftFake.active = false;
                    this.giftRealNode.active = true;
                    this.giftRealNode.getComponent(cc.RigidBody).linearVelocity = cc.v2(-200,1300);
                }
                else
                {
                    this.convertTimer-=dt;
                    
                    if(this.convertTimer<=0)
                    {
                        //console.log("AA");
                        this.running = true;
                        
                        this.prey.getComponent(sp.Skeleton).animation = "3run";
                    }
                }
                
            }
            if(this.jumpTimer<=0)
            {
                this.catching = false;
                this.tiger.animation = "1dile_dung_chopmat";
            }
        }

        if(this.running && this.prey.getComponent(sp.Skeleton).animation == "3run")
        {
            this.chim.x+=8;
            this.heo.x+=8;
            this.tho.x+=8;
            this.meo.x+=8;
        }

        if(this.tiger.animation == "5walk")
        {
            this.tigerNode.x+=4;
        }
    }
}

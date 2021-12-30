// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Node])
    spawn: cc.Node[] = [];

    

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
    tiger: cc.Node = null;

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

    @property(cc.Prefab)
    historyPopup: cc.Prefab = null;

    @property(cc.Button)
    shopBtn: cc.Button = null;

    @property(cc.Prefab)
    shopPopup: cc.Prefab = null;

    @property(cc.Button)
    giftListBtn: cc.Button = null;

    @property(cc.Prefab)
    giftListPopup: cc.Prefab = null;

    playing: boolean = false;

    pos: number[] = [-1,-1,-1,-1];

    timer: number[] = [-0.5,-0.5,-0.5,-0.5];

    start()
    {
        this.playBtn.node.on("click", ()=>this.onPlayClick());
        this.ruleBtn.node.on("click", ()=>this.onRuleClick());  
        this.historyBtn.node.on("click", ()=>this.onHistoryClick());   
        this.shopBtn.node.on("click", ()=>this.onShopClick()); 
        this.giftListBtn.node.on("click", ()=>this.onGiftListClick());          
    }

    onPlayClick()
    {
        this.playing = true;
        this.tiger.active = true;
        this.tiger.getComponent(sp.Skeleton).animation = "1dile_dung_saulung";
        this.buttons.active = false;
        //this.tigerIdle.active = false;
        cc.tween(this.tigerIdle).to(0.3,{opacity:0}).call(()=>this.tigerIdle.active = false).start();
    }

    onRuleClick()
    {
        let popup = cc.instantiate(this.rulePopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = this.popupParent;
    }

    onHistoryClick()
    {
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
}
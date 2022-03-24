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

    @property(cc.Button)
    body: cc.Button = null;

    gift: string = null;

    start()
    {
        this.body.node.on("click", ()=>this.onClick());
        this.gift = this.node.getComponentInChildren(sp.Skeleton).animation;
    }

    onClick()
    {
        // console.log("Clicked "+this.node.name);
        // GameData.prey = 
        switch(this.node.name)
        {
            case "tho":
                {
                    //console.log("Clicked tho");
                    GameData.prey = 3;
                    GameData.prizeBox = this.gift;
                    break;
                }
            case "meo":
                {
                    //console.log("Clicked meo");
                    GameData.prey = 2;
                    GameData.prizeBox = this.gift;
                    break;
                }
            case "chim":
                {
                    //console.log("Clicked chim");
                    GameData.prey = 0;
                    GameData.prizeBox = this.gift;
                    break;
                }
            case "heo":
                {
                    //console.log("Clicked heo");
                    GameData.prey = 1;
                    GameData.prizeBox = this.gift;
                    break;
                }
        }

        cc.tween(cc.find("Canvas/Black")).to(0.3,{opacity:255}).call(()=>cc.director.loadScene("CatchScene")).start();

    }
}

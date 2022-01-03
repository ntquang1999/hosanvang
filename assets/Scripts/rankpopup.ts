import GameData from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Label])
    number: cc.Label[] = [];

    @property([cc.Label])
    count: cc.Label[] = [];

    @property(cc.Button)
    back: cc.Button = null;

    protected start(): void {
        for(let i =0;i<10;i++)
        {
            console.log("zz " + i);
            this.number[i].string = GameData.rankList[i].id;
            this.count[i].string = GameData.rankList[i].giftCount + "";
        }
        this.back.node.on("click", ()=>this.onBackClick());
    }

    onBackClick()
    {
        //this.node.children[2].opacity = 0;
        cc.tween(this.node.children[1]).to(0.3,{scale:0}, {easing: cc.easing.backIn}).call(()=>this.node.destroy()).start();     
    }
}
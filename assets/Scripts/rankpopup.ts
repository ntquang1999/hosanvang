import APIController from "./APIController";
import GameData from "./GameData";
import MainScene from "./MainScene";

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
        if(GameData.isAuthed)
        {
            APIController.rollHistory((err,json)=>{
                //GameData.rankList.length = 0;
                //console.log(json);
                let i = 0;
                json["data"]["gold_table_v3"].forEach(element => {
                    GameData.rankList[i] = {"id": "0" + element["username"].substring(2), "giftCount": element["point"]};
                    i++;
                });      
                for(let i =0;i<10;i++)
                {
                    {
                        this.number[i].string = GameData.rankList[i].id;
                        this.count[i].string = GameData.rankList[i].giftCount + "";
                    }   
                }
                cc.find("Canvas").getComponent(MainScene).showLoading(false);
            });
        }
        
        this.back.node.on("click", ()=>this.onBackClick());
    }

    onBackClick()
    {
        //this.node.children[2].opacity = 0;
        cc.tween(this.node.children[1]).to(0.3,{scale:0}, {easing: cc.easing.backIn}).call(()=>this.node.destroy()).start();     
    }
}
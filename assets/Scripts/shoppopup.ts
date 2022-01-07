import APIController from "./APIController";
import GameData from "./GameData";
import smallpopup from "./Smallpopup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    back: cc.Button = null;

    @property(cc.Button)
    item1: cc.Button = null;

    @property(cc.Button)
    item2: cc.Button = null;

    @property(cc.Button)
    item3: cc.Button = null;

    @property(cc.Button)
    item4: cc.Button = null;

    @property(cc.Label)
    point: cc.Label = null;

    @property(cc.Prefab)
    smallpopup: cc.Prefab = null;

    protected start(): void {
        this.back.node.on("click", ()=>this.onBackClick());
        this.item1.node.on("click", ()=>this.onItem1Click());
        this.item2.node.on("click", ()=>this.onItem2Click());
        this.item3.node.on("click", ()=>this.onItem3Click());
        this.item4.node.on("click", ()=>this.onItem4Click());
        
    }

    onBackClick()
    {
        APIController.getTurn(false);
        //this.node.children[2].opacity = 0;
        cc.tween(this.node.children[1]).to(0.3,{scale:0}, {easing: cc.easing.backIn}).call(()=>this.node.destroy()).start();     
    }

    onItem1Click()
    {
        //call api
        smallpopup.type = 3;
        //set type for success and error
        smallpopup.turn = 1;
        smallpopup.point = 200;
        smallpopup.item = 0;
        let popup = cc.instantiate(this.smallpopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = cc.find("Canvas/PopUp");
        //demo only

    }

    onItem2Click()
    {
        smallpopup.type = 3;
        smallpopup.turn = 5;
        smallpopup.point = smallpopup.turn*200;
        smallpopup.item = 1;
        let popup = cc.instantiate(this.smallpopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = cc.find("Canvas/PopUp");
        
    }

    onItem3Click()
    {
        smallpopup.type = 3;
        smallpopup.turn = 10;
        smallpopup.point = smallpopup.turn*200;
        smallpopup.item = 2;
        let popup = cc.instantiate(this.smallpopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = cc.find("Canvas/PopUp");
        
    }

    onItem4Click()
    {
        smallpopup.type = 3;
        smallpopup.turn = 20;
        smallpopup.point = smallpopup.turn*200;
        smallpopup.item = 3;
        let popup = cc.instantiate(this.smallpopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = cc.find("Canvas/PopUp");
        
    }

    protected update(dt: number): void {
        this.point.string = GameData.viettelPoint + "";
    }

}

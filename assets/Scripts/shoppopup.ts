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
        //this.node.children[2].opacity = 0;
        cc.tween(this.node.children[1]).to(0.3,{scale:0}, {easing: cc.easing.backIn}).call(()=>this.node.destroy()).start();     
    }

    onItem1Click()
    {
        smallpopup.type = 3;
        smallpopup.turn = 1;
        smallpopup.point = 20;
        smallpopup.item = 0;
        let popup = cc.instantiate(this.smallpopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = cc.find("Canvas/PopUp");
    }

    onItem2Click()
    {
        smallpopup.type = 3;
        smallpopup.turn = 5;
        smallpopup.point = 95;
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
        smallpopup.point = 190;
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
        smallpopup.point = 480;
        smallpopup.item = 3;
        let popup = cc.instantiate(this.smallpopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = cc.find("Canvas/PopUp");
    }

}

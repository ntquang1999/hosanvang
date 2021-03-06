import GameData from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    back: cc.Button = null;

    @property(cc.Label)
    sdt: cc.Label = null;

    protected start(): void {
        this.back.node.on("click", ()=>this.onBackClick());
        this.sdt.string = GameData.phoneNumber;
    }

    onBackClick()
    {
        //this.node.children[2].opacity = 0;
        cc.tween(this.node.children[1]).to(0.3,{scale:0}, {easing: cc.easing.backIn}).call(()=>this.node.destroy()).start();     
    }
}
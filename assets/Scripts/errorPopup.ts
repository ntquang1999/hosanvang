const {ccclass, property} = cc._decorator;

@ccclass
export default class connectError extends cc.Component {

    @property(cc.Button)
    ok: cc.Button = null;

    @property(cc.Button)
    back: cc.Button = null;

    protected start(): void {
        this.ok.node.on("click", ()=> this.onBackClick());
    }

    onBackClick()
    {
        cc.tween(this.node.children[1]).to(0.3,{scale:0}, {easing: cc.easing.backIn}).call(()=>cc.director.loadScene("LoadingScene")).start();      
    }

}
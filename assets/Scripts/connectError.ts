const {ccclass, property} = cc._decorator;

@ccclass
export default class connectError extends cc.Component {

    @property(cc.Node)
    popup: cc.Node = null;

    showError()
    {
        this.popup.active = true;
        this.popup.children[1].scale = 0;
        cc.tween(this.popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
    }

}
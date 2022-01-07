const {ccclass, property} = cc._decorator;

@ccclass
export default class CatchScene extends cc.Component {
    i: number = 2;
    protected update(dt: number): void {
        this.i -= dt;
        if(this.i<=0)
        {
            cc.director.loadScene("MainScene");
        }
    }
}
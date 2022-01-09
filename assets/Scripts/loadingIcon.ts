const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    icon: cc.Node = null;

    protected onLoad(): void {
        cc.game.addPersistRootNode(this.node);
    }
    protected update(dt: number): void {
        this.icon.angle += 200*dt;
    }
}
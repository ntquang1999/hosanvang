// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

@property(sp.Skeleton)
tiger: sp.Skeleton = null;

@property(cc.Button)
jumpBtn: cc.Button = null;
   
@property(cc.Node)
heo: cc.Node = null;

label: cc.Label = null;


start () 
{
    this.jumpBtn.node.on("click", ()=>this.onClick());
    this.label = this.jumpBtn.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label);
}

onClick()
{
    // if(this.label.string == "Jump")
    // {
    //     this.tiger.animation = "5grap";
    //     this.label.string = "Stop";
    // }
    // else
    // {
    //     this.tiger.animation = "1dile_dung_chopmat";
    //     this.label.string = "Jump";
    // }

    this.heo.getComponent(cc.Animation).play("fade");

}
    
}

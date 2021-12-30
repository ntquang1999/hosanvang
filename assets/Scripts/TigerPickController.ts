// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Node])
    prize: cc.Node[] = [];

    firstContact = true;
    

    onBeginContact(contact, selfCollider:cc.BoxCollider, otherCollider:cc.BoxCollider)
    {
        if(this.firstContact)
        {
            //console.log(otherCollider.tag-1);
            cc.tween(this.prize[otherCollider.tag-1]).to(0.2,{opacity:0}).call(()=>this.prize[otherCollider.tag-1].active = false).start();
            
            this.firstContact = false;
        }
        
    }
}

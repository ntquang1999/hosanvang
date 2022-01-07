import APIController from "./APIController";
import GameData from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class smallpopup extends cc.Component {

    @property(cc.Button)
    back: cc.Button = null;

    @property(cc.Button)
    ok: cc.Button = null;

    @property(cc.Node)
    error: cc.Node = null;
    
    @property(cc.Node)
    success: cc.Node = null;

    @property(cc.Label)
    successLB: cc.Label = null;

    @property(cc.Node)
    informCopied: cc.Node = null;

    @property(cc.Node)
    confirm: cc.Node = null;

    @property(cc.Node)
    invite: cc.Node = null;

    @property(cc.Node)
    ivtConfirm: cc.Node = null;

    @property([cc.Node])
    item: cc.Node[] = [];

    @property(cc.Label)
    confirmLB: cc.Label = null;


    static type: number = 0;
    static point: number = 95;
    static turn: number = 5;
    static item: number = 0;

    protected start(): void {
        this.back.node.on("click", ()=>this.onBackClick());
        this.ok.node.on("click", ()=>this.onOkClick());
    }

    onOkClick()
    {
        switch(smallpopup.type)
        {
            case 0:
                {
                    this.onBackClick();
                    break;
                }
            case 1:
                {
                    this.onBackClick();
                    break;
                }
            case 2:
                {
                    this.onBackClick();
                    break;
                }
            case 3:
                {
                    APIController.exchangePoint(smallpopup.turn+"", (err, json)=>{
                        cc.tween(this.node.children[1]).to(0.3,{scale:0}, {easing: cc.easing.backIn}).call(()=>{smallpopup.type = 1; cc.tween(this.node.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backIn}).start()}).start();
                        smallpopup.type = 1;
                    });                
                    break;
                }
            case 4:
                {
                    //call api lantoa
                    this.onBackClick();
                    break;
                }
            case 5:
                {
                    //call api xacnhan
                    this.onBackClick();
                    break;
                }
        }
    }

    onBackClick()
    {
        APIController.getPoint();
        //this.node.children[2].opacity = 0;
        cc.tween(this.node.children[1]).to(0.3,{scale:0}, {easing: cc.easing.backIn}).call(()=>this.node.destroy()).start();     
    }

    update(dt)
    {
        
        switch(smallpopup.type)
        {
            case 0:
                {
                    this.error.active = true;
                    break;
                }
            case 1:
                {
                    this.success.active = true;
                    this.confirm.active = false;
                    this.successLB.string = "Quý khách đã đổi thành công\n"
                    + smallpopup.point 
                    + " điểm viettel++ lấy " +smallpopup.turn+ " lượt quay";
                    break;
                }
             case 2:
                {
                    this.informCopied.active = true;
                    break;
                }
            case 3:
                {
                    this.item[smallpopup.item].active = true;

                    this.confirm.active = true;
                    this.confirmLB.string = "Quý khách có chắc chắn muốn đổi\n"
                    + smallpopup.point 
                    + " điểm viettel++ lấy " +smallpopup.turn+ " lượt quay";
                    break;
                }
            case 4:
                {
                    this.invite.active = true;
                    break;
                }   
            case 5:
                {
                    this.ivtConfirm.active = true;
                    break;
                }     
            
        }
    }
}
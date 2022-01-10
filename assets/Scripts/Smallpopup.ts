import APIController from "./APIController";
import GameData from "./GameData";
import MainScene from "./MainScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class smallpopup extends cc.Component {

    @property(cc.Button)
    back: cc.Button = null;

    @property(cc.Button)
    ok: cc.Button = null;

    @property(cc.Button)
    shop: cc.Button = null;

    @property(cc.Button)
    cancel: cc.Button = null;

    @property(cc.Node)
    error: cc.Node = null;
    
    @property(cc.Node)
    success: cc.Node = null;

    @property(cc.Label)
    successLB: cc.Label = null;

    @property(cc.Node)
    informCopied: cc.Node = null;

    @property(cc.Node)
    info: cc.Node = null;

    @property(cc.Node)
    outOfTurn: cc.Node = null;

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

    @property(cc.Label)
    sdtInviteLB: cc.Label = null;

    @property(cc.Label)
    sdtConfirmLB: cc.Label = null;

    @property(cc.Label)
    infoLB: cc.Label = null;

    static type: number = 0;
    static point: number = 95;
    static turn: number = 5;
    static item: number = 0;

    protected start(): void {
        this.back.node.on("click", ()=>this.onBackClick());
        this.ok.node.on("click", ()=>this.onOkClick());
        this.shop.node.on("click", ()=>this.onShopClick());
        this.cancel.node.on("click", ()=>this.onBackClick());
    }

    onShopClick()
    {
        
        cc.find("Canvas").getComponent(MainScene).showLoading(true);
        APIController.getPoint((err,json)=>{
            cc.find("Canvas").getComponent(MainScene).showLoading(false);
        });
        //this.node.children[2].opacity = 0;
        cc.tween(this.node.children[1]).to(0.3,{scale:0}, {easing: cc.easing.backIn}).call(()=>{this.node.destroy(); cc.find("Canvas").getComponent(MainScene).onShopClick();}).start();
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
                    cc.find("Canvas").getComponent(MainScene).showLoading(true);
                    APIController.exchangePoint(smallpopup.turn+"", (err, json)=>{
                        cc.find("Canvas").getComponent(MainScene).showLoading(false);
                        cc.tween(this.node.children[1]).to(0.3,{scale:0}, {easing: cc.easing.backIn}).call(()=>{smallpopup.type = 1; cc.tween(this.node.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backIn}).start()}).start();
                    });                
                    break;
                }
            case 4:
                {
                    let sdt: string;
                    if(this.sdtInviteLB.string.substring(0,2) == "84") 
                    {
                        sdt = this.sdtInviteLB.string;
                    }
                    else
                    {
                        sdt = "84" + this.sdtInviteLB.string.substring(1);
                    }
                    console.log(sdt);
                    cc.find("Canvas").getComponent(MainScene).showLoading(true);
                    APIController.invite(sdt, (err, json)=>{
                        cc.find("Canvas").getComponent(MainScene).showLoading(false);
                        cc.tween(this.node.children[1]).to(0.3,{scale:0}, {easing: cc.easing.backIn}).call(()=>{smallpopup.type = 6; cc.tween(this.node.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backIn}).start()}).start();
                        this.infoLB.string = json["message"];
                    }); 
                    break;
                }
            case 5:
                {
                    let sdt: string;
                    if(this.sdtInviteLB.string.substring(0,2) == "84") 
                    {
                        sdt = this.sdtInviteLB.string;
                    }
                    else
                    {
                        sdt = "84" + this.sdtConfirmLB.string.substring(1);
                    }
                    console.log(sdt);
                    cc.find("Canvas").getComponent(MainScene).showLoading(true);
                    APIController.confirmIvt(sdt, (err, json)=>{
                        cc.find("Canvas").getComponent(MainScene).showLoading(false);
                        cc.tween(this.node.children[1]).to(0.3,{scale:0}, {easing: cc.easing.backIn}).call(()=>{smallpopup.type = 6; cc.tween(this.node.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backIn}).start()}).start();
                        if(json["errorCode"] == 0) GameData.ivtconfirmed = true;
                        this.infoLB.string = json["message"];
                    }); 
                    break;
                }
            case 6:
                {
                    this.onBackClick();
                    break;
                }
        }
    }

    onBackClick()
    {
        cc.find("Canvas").getComponent(MainScene).showLoading(true);
        APIController.getPoint((err,json)=>{
            cc.find("Canvas").getComponent(MainScene).showLoading(false);
        });
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
            case 6:
                {
                    this.invite.active = false;
                    this.ivtConfirm.active = false;
                    this.info.active = true;
                    break;
                }    
            case 7:
                {
                    this.outOfTurn.active = true;
                    this.ok.node.active = false;
                    break;
                }      
            
        }
    }
}
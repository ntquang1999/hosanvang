const {ccclass, property} = cc._decorator;

@ccclass
export default class largepopup extends cc.Component {

    @property(cc.Button)
    back: cc.Button = null;

    @property(cc.Button)
    ok: cc.Button = null;

    @property(cc.Node)
    voucher: cc.Node = null;

    @property(cc.Node)
    ticket: cc.Node = null;

    @property(cc.Node)
    error: cc.Node = null;

    @property(cc.Node)
    empty: cc.Node = null;

    @property(cc.Label)
    voucherLB: cc.Label = null;

    @property(cc.Label)
    ticketLB: cc.Label = null;

    @property(cc.Label)
    emptyLB: cc.Label = null;

    static type: number = 0;
    static voucherText: string = "SHOPEE10K";
    static ticketText: string = "ABCDEFGAK47";
    static points: number = 10;

    protected start(): void {
        this.back.node.on("click", ()=>this.onBackClick());
        this.ok.node.on("click", ()=>this.onBackClick());
    }

    onBackClick()
    {
        //this.node.children[2].opacity = 0;
        cc.tween(this.node.children[1]).to(0.3,{scale:0}, {easing: cc.easing.backIn}).call(()=>this.cleanUp()).start();     
    }

    cleanUp()
    {
        if(largepopup.type != 3)
        {
            cc.tween(cc.find("Canvas/Black")).to(0.3,{opacity:255}).call(()=>cc.director.loadScene("MainScene")).start();
            
            this.node.destroy();
        }
        else this.node.destroy();
    }

    update(dt) {
        switch(largepopup.type)
        {
            case 0:
                {
                    this.voucher.active = true;
                    this.voucherLB.string = largepopup.voucherText;
                    break;
                }
            case 1:
                {
                    this.ticket.active = true;
                    break;
                }
            case 2:
                {
                    this.empty.active = true;
                    break;
                }
            case 3:
                {
                    this.error.active = true;
                    break;
                }
        }
    }
}
import APIController from "./APIController";
import historypopup from "./historypopup";
import smallpopup from "./Smallpopup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class codeBox extends cc.Component {

    @property(cc.Node)
    shopee: cc.Node = null;

    @property(cc.Node)
    tiki: cc.Node = null;

    @property(cc.Node)
    laz: cc.Node = null;

    @property(cc.Label)
    code: cc.Label = null;

    @property(cc.Label)
    time: cc.Label = null;

    @property(cc.Button)
    copyBtn: cc.Button = null;

    @property(cc.Button)
    receiveBtn: cc.Button = null;

    @property(cc.Prefab)
    smallpopup: cc.Prefab = null;

    @property([cc.Node])
    icon: cc.Node[] = [];


    id: number = 0;
    codetype: number = 0;
    codeString: string = "NULL";
    timeString: string = "NULL";
    voucherString: string = "NULL";
    status: number = 0;

    protected start(): void {

        this.copyBtn.node.on("click", ()=> this.onCopyClick());
        this.receiveBtn.node.on("click", ()=> this.onReceiveClick());
    }

    onReceiveClick()
    {
        APIController.getVoucher(this.id+"", (err,json)=>{
            cc.find("Canvas/PopUp/HistoryPopup").getComponent(historypopup).refreshData();
        });
    }


    onCopyClick()
    {
        smallpopup.type = 2;
        let popup = cc.instantiate(this.smallpopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = cc.find("Canvas/PopUp");
        codeBox.copyTextToClipboard(this.voucherString);
    }


    protected update(dt: number): void {
        if(this.status == 0)
        {
            this.receiveBtn.node.active = true;
            this.copyBtn.node.active = false;
        } else
        {
            this.receiveBtn.node.active = false;
            this.copyBtn.node.active = true;
        }
        this.code.string = this.codeString;
        this.time.string = this.timeString; 
        
        this.icon[this.codetype].active = true;
   
    }

    private static fallbackCopyTextToClipboard(text: string) {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    }

    static copyTextToClipboard(text: string) {
        if (!navigator.clipboard) {
            this.fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(function () {
            console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }
    

}

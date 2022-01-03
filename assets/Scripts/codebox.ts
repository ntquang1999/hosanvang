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

    @property(cc.Prefab)
    smallpopup: cc.Prefab = null;

    codetype: number = 0;
    codeString: string = "NULL";
    timeString: string = "NULL";

    protected start(): void {

        this.copyBtn.node.on("click", ()=> this.onCopyClick());
    }


    onCopyClick()
    {
        smallpopup.type = 2;
        let popup = cc.instantiate(this.smallpopup);
        popup.children[1].scale = 0;
        cc.tween(popup.children[1]).to(0.3,{scale:1}, {easing: cc.easing.backOut}).start();
        popup.parent = cc.find("Canvas/PopUp");
        codeBox.copyTextToClipboard(this.code.string);
    }


    protected update(dt: number): void {
        if(this.codetype == 0)
        {
            this.shopee.active = true;
            this.tiki.active = false;
            this.laz.active = false;
            this.code.string = this.codeString;
            this.time.string = this.timeString;
        } else 
        if(this.codetype == 1)
        {
            this.shopee.active = false;
            this.tiki.active = true;
            this.laz.active = false;
            this.code.string = this.codeString;
            this.time.string = this.timeString;
        } else
        if(this.codetype == 2)
        {
            this.shopee.active = false;
            this.tiki.active = false;
            this.laz.active = true;
            this.code.string = this.codeString;
            this.time.string = this.timeString;
        }


        
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

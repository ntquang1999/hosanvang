import codeBox from "./codebox";
import GameData from "./GameData";
import ticketBox from "./ticketbox";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    back: cc.Button = null;

    @property(cc.Prefab)
    codeBox: cc.Prefab = null;

    @property(cc.Prefab)
    ticketBox: cc.Prefab = null;

    @property(cc.Node)
    codeContentBox: cc.Node = null;

    @property(cc.Node)
    ticketContentBox: cc.Node = null;

    @property(cc.Button)
    codeBtn: cc.Button = null;

    @property(cc.Button)
    ticketBtn: cc.Button = null;

    @property(cc.Node)
    leftPanel: cc.Node = null;
    
    @property(cc.Node)
    rightPanel: cc.Node = null;

    protected onLoad(): void {
        let codeCount: number = GameData.codeList.length;
        let ticketCount: number = GameData.ticketList.length;
        for(let i = 0; i<codeCount;i++)
        {
            let node = cc.instantiate(this.codeBox);
            node.parent = this.codeContentBox;
            node.getComponent(codeBox).codetype = GameData.codeList[i].type;
            node.getComponent(codeBox).codeString = GameData.codeList[i].code;
            node.getComponent(codeBox).timeString = GameData.codeList[i].time;

            // let node2 = cc.instantiate(this.ticketBox);
            // node2.parent = this.ticketContentBox;
            // node2.getComponent(ticketBox).ticket.string = this.getRandomInt(1,1000)+ "MSZI"+this.getRandomInt(1,1000) +'AK47';
        }

        for(let i = 0; i<ticketCount;i++)
        {
            let node = cc.instantiate(this.ticketBox);
            node.parent = this.ticketContentBox;
            node.getComponent(ticketBox).ticket.string = GameData.ticketList[i].ticket;
            node.getComponent(ticketBox).time.string = GameData.ticketList[i].time;
        }
        
    }

    protected start(): void {
        this.back.node.on("click", ()=>this.onBackClick());
        this.codeBtn.node.on("click", ()=>this.onCodeClick());
        this.ticketBtn.node.on("click", ()=>this.onTicketClick());
    }

    onCodeClick()
    {
        this.leftPanel.active = true;
        this.rightPanel.active = false;
    }

    onTicketClick()
    {
        this.leftPanel.active = false;
        this.rightPanel.active = true;
    }

    onBackClick()
    {
        //this.node.children[2].opacity = 0;
        cc.tween(this.node.children[1]).to(0.3,{scale:0}, {easing: cc.easing.backIn}).call(()=>this.node.destroy()).start();     
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}

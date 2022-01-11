import APIController from "./APIController";
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

    @property(cc.Node)
    codeContentBox: cc.Node = null;
    
    protected onLoad(): void {
        
        this.refreshData();
        
    }

    refreshData()
    {
        GameData.codeList.length = 0;
        this.codeContentBox.destroyAllChildren();
        APIController.getListVoucher((err,json)=>{
            if(json["data"] != null)
            {
                GameData.phoneNumber = "0" + json["data"][0]["msisdn"].substring(2);
                json["data"].forEach(element => {
                    let type: number = 13;
                    let voucher: string = "NOTAVAILABLE";
                    //Set type via code
                    GameData.APIList.forEach(APIelement => {
                        if(APIelement.code == element["giftCode"])
                        {
                            type = APIelement.type;
                        }
                    });
                    if(element["status"] == 1)
                        voucher = element["voucherData"]["code"];
                    
                    GameData.codeList.push({"type": type,"code": element["giftName"],"time": this.timeConverter(element["winAt"]) +" "+ this.dateConverter(element["winAt"]), "status": element["status"], "voucher": voucher, "id": element["id"]});
                });
                let codeCount: number = GameData.codeList.length;
                for(let i = 0; i<codeCount;i++)
                {
                    let node = cc.instantiate(this.codeBox);
                    node.parent = this.codeContentBox;
                    node.getComponent(codeBox).codetype = GameData.codeList[i].type;
                    node.getComponent(codeBox).codeString = GameData.codeList[i].code;
                    node.getComponent(codeBox).timeString = GameData.codeList[i].time;
                    node.getComponent(codeBox).status = GameData.codeList[i].status;
                    node.getComponent(codeBox).voucherString = GameData.codeList[i].voucher;
                    node.getComponent(codeBox).id = GameData.codeList[i].id;
                }
                
            }
            cc.find("loading").active = false;
                
        });
    }

    protected start(): void {
        this.back.node.on("click", ()=>this.onBackClick());
    }

    onBackClick()
    {
        cc.tween(this.node.children[1]).to(0.3,{scale:0}, {easing: cc.easing.backIn}).call(()=>this.node.destroy()).start();     
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    timeConverter(time: string) : string
    {
        let year, month, day, hour, minute, second: string
        year = time.substring(0, 4);
        month = time.substring(4, 6);
        day = time.substring(6, 8);
        hour = time.substring(8, 10);
        minute = time.substring(10, 12);
        second = time.substring(12, 14);

        return hour + ":" + minute + ":" + second;
    }

    dateConverter(time: string) : string
    {
        let year, month, day, hour, minute, second: string
        year = time.substring(0, 4);
        month = time.substring(4, 6);
        day = time.substring(6, 8);
        hour = time.substring(8, 10);
        minute = time.substring(10, 12);
        second = time.substring(12, 14);
        return day + "/" + month + "/" + year;
    }
}

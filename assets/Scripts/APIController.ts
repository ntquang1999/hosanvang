import connectError from "./connectError";
import GameData from "./GameData";
import loading from "./loading";
import MainScene from "./MainScene";
import { Http } from "./Util.Http";

const { ccclass, property } = cc._decorator;

@ccclass
export default class APIController {
    static data: string = "";
    //static data: string = "2bmrcgxcc2kvartwn61635414941058";
    //static data: string = "2bmrcgxcc2kvarti821635414922369";
    static token: string = null;

    static urlParam(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.search);
        return (results !== null) ? results[1] || 0 : false;
    }

    static getData() {
        APIController.data = this.urlParam("data") + "";
        console.log(this.data);
    }

    static oauth(onFinished: (err: any, json: any) => void) {

        Http.post("https://apiv3.viettel.vn/cgvtapiv2/OAuth", { "data": this.data, "programCode": "HOVANG2022", "command": "OAuth" }, (err, json) => {
            if (!err) {
                //console.log("zzz");
                console.log(json);
                //console.log("not err");
                if (json == null) {
                    cc.find("Canvas").getComponent(connectError).showError();
                } else
                    if (json["errorCode"] == 0) {
                        //console.log(json);
                        this.token = json["data"]["accessToken"];
                        GameData.isAuthed = true;
                        onFinished(err, json);
                    }
                    else cc.find("Canvas").getComponent(connectError).showError();

            }
            else { cc.find("Canvas").getComponent(connectError).showError() }
        });
    }

    static getTurn(onFinished: (err: any, json: any) => void) {
        Http.post("https://apiv3.viettel.vn/cgvtapiv2/getTurn", { "programCode": "HOVANG2022", "command": "getTurn" }, (err, json) => {
            if (!err) {
                //console.log(json);
                if (json == null) {
                    cc.find("Canvas").getComponent(connectError).showError();
                } else
                    if (json["errorCode"] == 0) {
                        GameData.huntTurn = json["data"]["turn"];
                        onFinished(err, json);
                    }
                    else cc.find("Canvas").getComponent(connectError).showError();
            }
            else cc.find("Canvas").getComponent(connectError).showError();
        }, { "Authorization": "Bearer " + APIController.token });
    }

    static getSetting(onFinished: (err: any, json: any) => void) {
        Http.post("https://apiv3.viettel.vn/cgvtapiv2/getSetting", { "programCode": "HOVANG2022", "command": "getSetting" }, (err, json) => {
            if (!err) {
                //console.log(json);
                if (json == null) {
                    cc.find("Canvas").getComponent(connectError).showError();
                } else
                    if (json["errorCode"] == 0) {
                        GameData.link = json["data"]["link_share"];
                        onFinished(err, json);
                    }
                    else cc.find("Canvas").getComponent(connectError).showError();
            }
            else cc.find("Canvas").getComponent(connectError).showError();
        }, { "Authorization": "Bearer " + APIController.token });
    }

    static getPoint(onFinished: (err: any, json: any) => void) {
        Http.post("https://apiv3.viettel.vn/cgvtapiv2/getListCode", { "programCode": "HOVANG2022", "command": "getListCode" }, (err, json) => {
            if (!err) {
                //console.log(json);
                if (json == null) {
                    cc.find("Canvas").getComponent(connectError).showError();
                } else
                    if (json["errorCode"] == 0) {
                        GameData.viettelPoint = json["data"]["totalPoint"];
                        onFinished(err, json);
                    }
                    else cc.find("Canvas").getComponent(connectError).showError();
            }
            else cc.find("Canvas").getComponent(connectError).showError();
        }, { "Authorization": "Bearer " + APIController.token });
    }

    static exchangePoint(turn: string, onFinished: (err: any, json: any) => void) {
        Http.post("https://apiv3.viettel.vn/cgvtapiv2/exchangePoint", { "programCode": "HOVANG2022", "command": "exchangePoint", "total_code": turn, "is_code": "2" }, (err, json) => {
            if (!err) {
                if (json == null) {
                    cc.find("Canvas").getComponent(connectError).showError();
                } else
                    if (json["errorCode"] == 0) {
                        onFinished(err, json);
                    }
                    else cc.find("Canvas").getComponent(connectError).showError();
            }
            else cc.find("Canvas").getComponent(connectError).showError();
        }, { "Authorization": "Bearer " + APIController.token });
    }

    static roll(onFinished: (err: any, json: any) => void) {
        Http.post("https://apiv3.viettel.vn/cgvtapiv2/roll", { "data": this.data, "programCode": "HOVANG2022", "command": "roll" }, (err, json) => {
            if (!err) {
                console.log(json);
                if (json == null) {
                    cc.find("Canvas").getComponent(connectError).showError();
                } else
                    if (json["errorCode"] == 0) onFinished(err, json);
            }
            else cc.find("Canvas").getComponent(connectError).showError();
        }, { "Authorization": "Bearer " + APIController.token })
    }

    static rule(onFinished: (err: any, json: any) => void) {
        Http.post("https://apiv3.viettel.vn/cgvtapiv2/rule", { "data": this.data, "programCode": "HOVANG2022", "command": "rule" }, (err, json) => {
            if (!err) {
                //console.log(json);
                if (json == null) {
                    cc.find("Canvas").getComponent(connectError).showError();
                } else

                    if (json["errorCode"] == 0) onFinished(err, json);

            }
            else cc.find("Canvas").getComponent(connectError).showError();
        }, { "Authorization": "Bearer " + this.token })
    }

    static getListVoucher(onFinished: (err: any, json: any) => void) {
        Http.post("https://apiv3.viettel.vn/cgvtapiv2/getListGiftVoucher", { "programCode": "HOVANG2022", "command": "getListGiftVoucher" }, (err, json) => {
            if (!err) {
                console.log(json);  
                if (json == null) {
                    cc.find("Canvas").getComponent(connectError).showError();
                } else
                    if (json["errorCode"] == 0) onFinished(err, json);
            }
            else cc.find("Canvas").getComponent(connectError).showError();
        }, { "Authorization": "Bearer " + APIController.token });
    }

    static rollHistory(onFinished: (err: any, json: any) => void) {
        Http.post("https://apiv3.viettel.vn/cgvtapiv2/rollHistory", { "programCode": "HOVANG2022", "command": "rollHistory" }, (err, json) => {
            if (!err) {
                //console.log(json);
                if (json == null) {
                    cc.find("Canvas").getComponent(connectError).showError();
                } else
                    if (json["errorCode"] == 0) onFinished(err, json);
            }
            else cc.find("Canvas").getComponent(connectError).showError();
        }, { "Authorization": "Bearer " + APIController.token });
    }

    static getVoucher(id: string, onFinished: (err: any, json: any) => void) {
        Http.post("https://apiv3.viettel.vn/cgvtapiv2/getGiftVoucher", { "programCode": "HOVANG2022", "command": "registerGift", "id": id }, (err, json) => {
            if (!err) {
                //console.log(json);
                if (json == null) {
                    cc.find("Canvas").getComponent(connectError).showError();
                } else
                    onFinished(err, json);
            }
            else cc.find("Canvas").getComponent(connectError).showError();
        }, { "Authorization": "Bearer " + APIController.token });
    }

    static checkFirstTimeLogin(onFinished: (err: any, json: any) => void) {

        Http.post("https://apiv3.viettel.vn/cgvtapiv2/checkFirstTimeLogin",
            { "programCode": "HOVANG2022", "command": "checkFirstTimeLogin" },
            (err, json) => onFinished(err, json),
            { "Authorization": "Bearer " + APIController.token }
        );
    }

    static invite(sdt: string, onFinished: (err: any, json: any) => void) {
        Http.post("https://apiv3.viettel.vn/cgvtapiv2/addFriend", { "programCode": "HOVANG2022", "command": "addFriend", "frsMsisdn": sdt }, (err, json) => {
            if (!err) {
                if (json == null) {
                    cc.find("Canvas").getComponent(connectError).showError();
                } else
                    onFinished(err, json);
            }
            else cc.find("Canvas").getComponent(connectError).showError();
        }, { "Authorization": "Bearer " + APIController.token });
    }

    static confirmIvt(sdt: string, onFinished: (err: any, json: any) => void) {
        Http.post("https://apiv3.viettel.vn/cgvtapiv2/plusTurnV3", { "programCode": "HOVANG2022", "command": "plusTurnV3", "type": "2", "reason": "lantoa", "msisdn": sdt }, (err, json) => {
            if (!err) {
                if (json == null) {
                    cc.find("Canvas").getComponent(connectError).showError();
                } else
                    onFinished(err, json);
            }
            else cc.find("Canvas").getComponent(connectError).showError();
        }, { "Authorization": "Bearer " + APIController.token });
    }
}

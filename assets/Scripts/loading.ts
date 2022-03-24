import APIController from "./APIController";
import GameData from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CatchScene extends cc.Component {
    i: number = 2;
    loading: boolean = false;

    @property(cc.Node)
    error: cc.Node = null;
    protected start(): void {
        APIController.getData();
        APIController.oauth((err,json)=>{
            if(json["data"] != null)
                GameData.phoneNumber = "0" + json["data"]["id"].substring(2);
            console.log(GameData.phoneNumber);
            APIController.checkFirstTimeLogin(()=>{
                APIController.getTurn((err,json)=>{
                    APIController.getPoint((err,json)=>{
                        APIController.getSetting((err,json)=>{
                            APIController.getListVoucher((err,json)=>{
                                    GameData.getAPIData();
                                    cc.director.loadScene("MainScene");
                               
                            });
                        })
                    });
                }); 
            }); 
        });
    }
    protected update(dt: number): void {
        this.i -= dt;
        
    }

    showError()
    {
        this.error.active = true;
    }
}

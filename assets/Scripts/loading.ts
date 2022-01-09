import APIController from "./APIController";
import GameData from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CatchScene extends cc.Component {
    i: number = 2;
    loading: boolean = false;

    @property(cc.Node)
    error: cc.Node = null;
    protected update(dt: number): void {
        this.i -= dt;
        APIController.oauth((err,json)=>{
            APIController.getTurn((err,json)=>{
                APIController.getPoint((err,json)=>{
                    APIController.getListVoucher((err,json)=>{
                        GameData.phoneNumber = "0" + json["data"][0]["msisdn"].substring(2);
                        APIController.checkFirstTimeLogin();
                        if(this.i<=0 && !this.loading)
                        {
                            this.loading = true;
                            cc.director.loadScene("MainScene");
                        }
                       
                    });
                });
            });  
            
        });
    }

    showError()
    {
        this.error.active = true;
    }
}

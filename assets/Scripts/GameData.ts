import APIController from "./APIController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameData extends cc.Component {

    static viettelPoint: number = 5000;
    static huntTurn: number = 500;
    static prey: number = 3;
    static prizeBox: string = "idle1";
    static currentCode: string = null;
    static currentDesc: string = null;
    static isAuthed: boolean = false;
    static phoneNumber: string;

    static codeList: {type: number, code: string, time: string, status: number, voucher: string, id: number}[] = [];
    static ticketList: {ticket: string, time: string}[] = [];
    static rankList: {id: string, giftCount: number }[] = [];

    static generateData()
    {
        //GameData.codeList.push({"type": 1,"code": "TIKI100K","time":"1/1/2022"});
        

        GameData.rankList.push({"id": "Chưa xác định", "giftCount": 0});
        GameData.rankList.push({"id": "Chưa xác định", "giftCount": 0});
        GameData.rankList.push({"id": "Chưa xác định", "giftCount": 0});
        GameData.rankList.push({"id": "Chưa xác định", "giftCount": 0});
        GameData.rankList.push({"id": "Chưa xác định", "giftCount": 0});
        GameData.rankList.push({"id": "Chưa xác định", "giftCount": 0});
        GameData.rankList.push({"id": "Chưa xác định", "giftCount": 0});
        GameData.rankList.push({"id": "Chưa xác định", "giftCount": 0});
        GameData.rankList.push({"id": "Chưa xác định", "giftCount": 0});
        GameData.rankList.push({"id": "Chưa xác định", "giftCount": 0});

        
    }

    static getHistoryData()
    {
        
    }
}

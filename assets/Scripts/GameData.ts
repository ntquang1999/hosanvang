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
    static ivtconfirmed: boolean = false;
    static errorType: number = 0;
    static link: string = "";
    static rule: string = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.";

    static codeList: {type: number, code: string, time: string, status: number, voucher: string, id: number}[] = [];
    static ticketList: {ticket: string, time: string}[] = [];
    static rankList: {id: string, giftCount: number }[] = [];
    static APIList: {type: number, code: string, provider: string}[] = [];

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

    static getAPIData()
    {
        GameData.APIList.push({"type": 0, "code": "Game_VC100K_VinID", "provider": "VinID"});
        GameData.APIList.push({"type": 1, "code": "Game_VC100K_THEGIOIDIDONG", "provider": "THEGIOIDIDONG"});
        GameData.APIList.push({"type": 2, "code": "Game_VC100K_CANIFA", "provider": "Canifa"});
        GameData.APIList.push({"type": 3, "code": "Game_VC50K_LOTERIA", "provider": "Lotteria"});
        GameData.APIList.push({"type": 4, "code": "Game_VC50K_ALLEY", "provider": "Alley"});
        GameData.APIList.push({"type": 5, "code": "Game_VC50K_TOCOTOCO", "provider": "Tocotoco"});
        GameData.APIList.push({"type": 6, "code": "Game_VC50K_Shoppe", "provider": "Shoppe"});
        GameData.APIList.push({"type": 7, "code": "Game_VC50K_Tiki", "provider": "Tiki"});
        GameData.APIList.push({"type": 8, "code": "Game_VC50K_Lazada", "provider": "Lazada"});
        GameData.APIList.push({"type": 5, "code": "Game_VCGIAMGIA_Tocotoco_01", "provider": "Tocotoco"});
        GameData.APIList.push({"type": 5, "code": "Game_VCGIAMGIA_Tocotoco_02", "provider": "Tocotoco"});
        GameData.APIList.push({"type": 5, "code": "Game_VCGIAMGIA_Tocotoco_03", "provider": "Tocotoco"});
        GameData.APIList.push({"type": 2, "code": "Game_VCGIAMGIA_Canifa_01", "provider": "Canifa"});
        GameData.APIList.push({"type": 2, "code": "Game_VCGIAMGIA_Canifa_02", "provider": "Canifa"});
        GameData.APIList.push({"type": 3, "code": "Game_VCGIAMGIA_Canifa_03", "provider": "Canifa"});
        GameData.APIList.push({"type": 9, "code": "Game_VCGIAMGIA_VOSO_01", "provider": "VOSO"});
        GameData.APIList.push({"type": 9, "code": "Game_VCGIAMGIA_VOSO_02", "provider": "VOSO"});
        GameData.APIList.push({"type": 9, "code": "Game_VCGIAMGIA_VOSO_03", "provider": "VOSO"});
        GameData.APIList.push({"type": 9, "code": "Game_VCGIAMGIA_VOSO_04", "provider": "VOSO"});
        GameData.APIList.push({"type": 10, "code": "Game_VCGIAMGIA_ELMICH_01", "provider": "ELMICH"});
        GameData.APIList.push({"type": 10, "code": "Game_VCGIAMGIA_ELMICH_02", "provider": "ELMICH"});
        GameData.APIList.push({"type": 10, "code": "Game_VCGIAMGIA_ELMICH_03", "provider": "ELMICH"});
        GameData.APIList.push({"type": 11, "code": "Game_VCGIAMGIA_DOJI_01", "provider": "DOJI"});
        GameData.APIList.push({"type": 11, "code": "Game_VCGIAMGIA_DOJI_02", "provider": "DOJI"});
        GameData.APIList.push({"type": 11, "code": "Game_VCGIAMGIA_DOJI_03", "provider": "DOJI"});
        GameData.APIList.push({"type": 12, "code": "Game_VCGIAMGIA_ECOCARE_01", "provider": "ECOCARE"});
        GameData.APIList.push({"type": 12, "code": "Game_VCGIAMGIA_ECOCARE_02", "provider": "ECOCARE"});
        GameData.APIList.push({"type": 12, "code": "Game_VCGIAMGIA_ECOCARE_03", "provider": "ECOCARE"});
    }
}

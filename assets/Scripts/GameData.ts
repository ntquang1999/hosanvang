const {ccclass, property} = cc._decorator;

@ccclass
export default class GameData extends cc.Component {

    static viettelPoint: number = 5000;
    static huntTurn: number = 500;
    static prey: number = 3;
    static prizeBox: string = "idle1";

    static codeList: {type: number, code: string, time: string}[] = [];
    static ticketList: {ticket: string, time: string}[] = [];
    static rankList: {id: string, giftCount: number }[] = [];

    static generateData()
    {
        //GameData.viettelPoint = 5000;
        //GameData.huntTurn = 500;
        GameData.codeList.push({"type": 1,"code": "TIKI100K","time":"1/1/2022"});
        GameData.codeList.push({"type": 0,"code": "SHOPEE100K","time":"1/1/2022"});
        GameData.codeList.push({"type": 2,"code": "LAZADA100K","time":"1/1/2022"});
        GameData.codeList.push({"type": 1,"code": "TIKI500K","time":"1/1/2022"});
        GameData.codeList.push({"type": 2,"code": "LAZADA50K","time":"1/1/2022"});
        GameData.codeList.push({"type": 1,"code": "TIKI100K","time":"1/1/2022"});
        GameData.codeList.push({"type": 0,"code": "SHOPEE100K","time":"1/1/2022"});
        GameData.codeList.push({"type": 2,"code": "LAZADA100K","time":"1/1/2022"});
        GameData.codeList.push({"type": 1,"code": "TIKI500K","time":"1/1/2022"});
        GameData.codeList.push({"type": 2,"code": "LAZADA50K","time":"1/1/2022"});
        GameData.codeList.push({"type": 1,"code": "TIKI100K","time":"1/1/2022"});
        GameData.codeList.push({"type": 0,"code": "SHOPEE100K","time":"1/1/2022"});
        GameData.codeList.push({"type": 2,"code": "LAZADA100K","time":"1/1/2022"});
        GameData.codeList.push({"type": 1,"code": "TIKI500K","time":"1/1/2022"});
        GameData.codeList.push({"type": 2,"code": "LAZADA50K","time":"1/1/2022"});

        GameData.ticketList.push({"ticket": "KJGKJGDAKJDASS1","time":"1/1/2022"});
        GameData.ticketList.push({"ticket": "KJGKJGDAKJDASS2","time":"1/1/2022"});
        GameData.ticketList.push({"ticket": "KJGKJGDAKJDASS3","time":"1/1/2022"});
        GameData.ticketList.push({"ticket": "KJGKJGDAKJDASS4","time":"1/1/2022"});
        GameData.ticketList.push({"ticket": "KJGKJGDAKJDASS5","time":"1/1/2022"});
        GameData.ticketList.push({"ticket": "KJGKJGDAKJDASS6","time":"1/1/2022"});
        GameData.ticketList.push({"ticket": "KJGKJGDAKJDASS1","time":"1/1/2022"});
        GameData.ticketList.push({"ticket": "KJGKJGDAKJDASS2","time":"1/1/2022"});
        GameData.ticketList.push({"ticket": "KJGKJGDAKJDASS3","time":"1/1/2022"});
        GameData.ticketList.push({"ticket": "KJGKJGDAKJDASS4","time":"1/1/2022"});
        GameData.ticketList.push({"ticket": "KJGKJGDAKJDASS5","time":"1/1/2022"});
        GameData.ticketList.push({"ticket": "KJGKJGDAKJDASS6","time":"1/1/2022"});

        GameData.rankList.push({"id": "0914378238", "giftCount": 90});
        GameData.rankList.push({"id": "0914378238", "giftCount": 89});
        GameData.rankList.push({"id": "0914378238", "giftCount": 88});
        GameData.rankList.push({"id": "0914378238", "giftCount": 87});
        GameData.rankList.push({"id": "0914378238", "giftCount": 86});
        GameData.rankList.push({"id": "0914378238", "giftCount": 85});
        GameData.rankList.push({"id": "0914378238", "giftCount": 84});
        GameData.rankList.push({"id": "0914378238", "giftCount": 83});
        GameData.rankList.push({"id": "0914378238", "giftCount": 82});
        GameData.rankList.push({"id": "0914378238", "giftCount": 81});
        GameData.rankList.push({"id": "0914378238", "giftCount": 80});
        GameData.rankList.push({"id": "0914378238", "giftCount": 79});
        GameData.rankList.push({"id": "0914378238", "giftCount": 78});

        
    }
}

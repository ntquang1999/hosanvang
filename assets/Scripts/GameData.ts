const {ccclass, property} = cc._decorator;

@ccclass
export default class GameData extends cc.Component {

    static prey: number = 3;
    static prizeBox: string = "idle1";
}

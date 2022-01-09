const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioController extends cc.Component {
    @property(cc.AudioClip)
    bgmusic: cc.AudioClip = null;

    protected start(): void {
        
        cc.game.addPersistRootNode(this.node);
        
        cc.audioEngine.playMusic(this.bgmusic, true);
    }
        

}
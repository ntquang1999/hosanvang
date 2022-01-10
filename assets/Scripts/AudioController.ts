const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioController extends cc.Component {
    @property(cc.AudioClip)
    bgmusic: cc.AudioClip = null;

    @property(cc.AudioClip)
    tienghokeu: cc.AudioClip = null;

    @property(cc.AudioClip)
    tiengphaohoa: cc.AudioClip = null;

    @property(cc.AudioClip)
    tiengthube: cc.AudioClip = null;

    @property(cc.AudioSource)
    audioSource: cc.AudioSource = null;

    protected start(): void {
        
        cc.game.addPersistRootNode(this.node);
        
        cc.audioEngine.playMusic(this.bgmusic, true);
        cc.audioEngine.setVolume(0,0.4);
    }

    playTiger()
    {
        this.audioSource.clip = this.tienghokeu;
        this.audioSource.play();
    }

    playFirework()
    {
        this.audioSource.clip = this.tiengphaohoa;
        this.audioSource.play();
    }

    playPrey()
    {
        this.audioSource.clip = this.tiengthube;
        this.audioSource.play();
    }
        

}
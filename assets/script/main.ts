
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    background: cc.Sprite = null;

    @property(cc.Sprite)
    wheel: cc.Sprite = null;

    @property(cc.Label)
    score: cc.Label = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let buttonLocation = "Canvas/btn";
        let nodeButton = cc.find(buttonLocation).getComponent(cc.Button);

        nodeButton.node.on(cc.Node.EventType.TOUCH_START.toString(), this.onSpinClicked, this);
    }

    start () {

    }

    update (dt) {
        
        //console.log(`width: ${this.node.width}\theight: ${this.node.height}`);
        this.background.node.width = this.node.width;
        this.background.node.height = this.node.height;
    }

    onSpinClicked(event){
        let rnum = Math.round(Math.random() * (17 - 1) + 1);
        cc.log("Random num: ", rnum);

        let anim = this.wheel.getComponent(cc.Animation);
        let animName = 'wheel-' + rnum;
        anim.play(animName);
        
        let newScore = Number(this.score.string.split(' ')[1]) + rnum;
        this.score.string = 'Score: ' + newScore;
    }
}

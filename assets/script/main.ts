
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    background: cc.Sprite = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    start () {

    }

    update (dt) {
        console.log(`width: ${this.node.width}\theight: ${this.node.height}`);
        this.background.node.width = this.node.width;
        this.background.node.height = this.node.height;
    }
}

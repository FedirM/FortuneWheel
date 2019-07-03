
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    btn: cc.Button = null;

    @property(cc.Sprite)
    background: cc.Sprite = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.btn.node.on(cc.Node.EventType.TOUCH_START.toString(), this.onPlayClicked, this);
    }

    start () {

    }

    

    update(){
        this.background.node.width = this.node.width;
        this.background.node.height = this.node.height;
    }

    onPlayClicked(){
        cc.director.loadScene('main');
    }
}

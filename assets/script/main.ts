
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    background: cc.Sprite = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.EventListener.create({
        //     event: cc.EventListener.ACCELERATION,
        //     callback: function (acc, event) {
        //         cc.log('acc: ' + keyCode);
        //     }
        // });
        
    }

    start () {

    }

    update (dt) {
        if( this.background != null ){
            console.log(`Catch background img, curr delta: ${dt}`);
        }
    }
}

// import { setUserScore } from "../../server/db/db";
// import { read } from "fs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    background: cc.Sprite = null;

    @property(cc.Button)
    btn: cc.Button = null;

    @property(cc.Sprite)
    wheel: cc.Sprite = null;

    @property(cc.Label)
    score: cc.Label = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // let buttonLocation = "Canvas/btn";
        // let nodeButton = cc.find(buttonLocation).getComponent(cc.Button);

        this.btn.node.on(cc.Node.EventType.TOUCH_START.toString(), this.onSpinClicked, this);

        let req = cc.loader.getXMLHttpRequest();
        req.open("GET", 'localhost:3000/segments');
        req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		req.onreadystatechange = () => {
			if (req.readyState == 4 && req.response != undefined){
                JSON.parse(req.response).seg.forEach((elem, id) => {
                    let lbl = this.wheel.node.getChildByName('label-' + (id+1)).getComponent(cc.Label);
                    lbl.string = '' + elem;
                });
            }
        }
        req.send();
    }

    start () {

    }

    update (dt) {
        
        //console.log(`width: ${this.node.width}\theight: ${this.node.height}`);
        this.background.node.width = this.node.width;
        this.background.node.height = this.node.height;
    }

    onSpinClicked(event){
        if(this.btn != null){
            this.btn.interactable = false;
            // this.btn.enabled = false;
        }

        let request = cc.loader.getXMLHttpRequest();
        request.open("POST", "localhost:3000/spin", true);
		request.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		request.onreadystatechange = () => {
			if (request.readyState == 4 && request.response != undefined) {
                let rnum = Number(JSON.parse(request.response).rnum);
                cc.log("Curr rnum: ", rnum);
                
                let anim = this.wheel.getComponent(cc.Animation);
                let animName = 'wheel-' + rnum;
                anim.play(animName);

                this.updateScore();
			}
		};
		request.send();

        
    }

    updateScore(){
        let request = cc.loader.getXMLHttpRequest();
        request.open("GET", "localhost:3000/score", true);
		request.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		request.onreadystatechange = () => {
			if (request.readyState == 4 && request.response != undefined) {
                let resVal = Number(JSON.parse(request.response).score);
                cc.log("Curr score: ", resVal);
                if( resVal >= 1000 ){
                    if( resVal >= 1000000 ){
                        this.score.string = 'Score: ' + (resVal / 1000000) + 'm';
                    } else {
                        this.score.string = 'Score: ' + (resVal / 1000) + 'k';
                    }
                } else {
                    this.score.string = 'Score: ' + resVal;
                }
			}
		};
		request.send();
    }
}

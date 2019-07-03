const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    btn: cc.Button = null;


    AnimationFinished(){
        
        if(this.btn != null){
            this.btn.interactable = true;
        }
    }
}

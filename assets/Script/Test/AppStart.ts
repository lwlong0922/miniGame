import UIManager from "../UIFramework/UIManager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    start() {
        UIManager.getInstance().openUI('Login');
    }

    // update (dt) {}
}

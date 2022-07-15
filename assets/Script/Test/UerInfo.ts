import UIBase from "../framework/UIBase";
import { UserData } from "../../cfg/UIDefineCfg";
const { ccclass, property } = cc._decorator;

@ccclass
export default class UserInfo extends UIBase {

    onInit(params?: any) {
        //this.getComp('UserInfo_LbUserName','Label').string = '大哥';

        this.addClickEvent('UserInfo_BtnBack', () => {
            this.openUI('Login', true);
        })

        this.addClickEvent('UserInfo_BtnAdd', () => {
            UserData.coin++;
        })

        this.addClickEvent('UserInfo_BtnReduce', () => {
            UserData.coin--;
        })

        // this.bindCb(UserData,'coin',(oldValue:any,newValue:any)=>{
        //     //刷新标签。
        //     this.getComp('UserInfo_LbCoin','Label').string = '金币:'+newValue;
        // })

        this.bindComp(UserData, 'coin', this.getComp('UserInfo_LbCoin', 'Label'), 'Label');
    }
    handleMsg(params: any) {
        // this.getComp('UserInfo_LbUserName','Label').string = params.name;
        // this.getComp('UserInfo_LbLevel','Label').string = params.level;
    }
    // func(params:any){
    //     this.getComp('UserInfo_LbUserName','Label').string = params.name;
    //     this.getComp('UserInfo_LbLevel','Label').string = params.level;
    // }
}

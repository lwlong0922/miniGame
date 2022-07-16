
import UIBase from "../framework/UIBase";
import {UserData} from "../../cfg/UserDataCfg";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Obj extends UIBase {
    private _userData:UserData = {
        name: "",
        icon: ""
    }

    // 初始化
    init(params?: any) {
        this.updateState();
        super.init(params)
    }

    // 吸收字段
    absorbField(name: string, value: any) {
        this._userData.name = value
        this.updateState(name)
    }

    // 查询字段
    queryField(name: string){
        return this._userData[name]
    }

    // 更新状态
    updateState(name?: string){
    }
}

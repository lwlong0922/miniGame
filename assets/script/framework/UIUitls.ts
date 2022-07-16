// UIUtils.ts
// create by liwl 2022/7/15
// ui 工具类，

import { CompType } from "../../cfg/UIDefineCfg";

let objFunc: any = {};
objFunc.onLabelRefresh = (comp: cc.Component, oldValue: any, newValue: any) => {
    (comp as cc.Label).string = newValue;
}

objFunc.onProgressRefresh = (comp: cc.Component, oldValue: any, newValue: any) => {
    (comp as cc.ProgressBar).progress = newValue;
}

let compCallBack: any = {
    Label: objFunc.onLabelRefresh,
    Progress: objFunc.onProgressRefresh
}

export class UIUtils {
    constructor() {
    }

    static onRefreshComp(oldValue: any, newValue: any, comp: cc.Component, typeName: string) {
        // if(comp instanceof cc.Label){
        //     let label  =<cc.Label>(comp);
        //     label.string = newValue;
        // }
        // else if(comp instanceof cc.ProgressBar){
        //     let bar = <cc.ProgressBar>(comp);
        //     bar.progress = newValue;
        // }
        let func = compCallBack[typeName];
        if (!func) {
            return;
        }
        // func(comp, oldValue, newValue);
    }
}



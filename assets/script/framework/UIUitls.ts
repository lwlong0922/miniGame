// UIUtils.ts
// create by liwl 2022/7/15
// ui 工具类，

import UIContianer from "./UIContianer";
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

    // 将需要关注的节点存放到 UIContianer 中
    static findNode(node: cc.Node, uiContainer: UIContianer): void {
        let arrKeys: Array<string> = uiContainer.getUIKeys();
        // 获取节点的名字，判断这个名字是否是以'_'
        let nodeName: string = node.name;
        let parentName = node.parent ? node.parent.name : '';
        if (nodeName.startsWith('_')) {
            // 存储要关注的节点
            uiContainer.addNode(parentName + node.name, node);
            // 遍历所有类型组件key
            for (let key of arrKeys) {
                //拿到每个组件类型
                let comType = CompType[key];
                // 通过节点获取这个类型的组件
                let comp = node.getComponent(comType);
                // 如果当前类型不存在，那么继续找下一个。
                if (!comp) {
                    continue;
                }

                // 组件，组件存储名字，组件类型名字
                let compName = parentName + node.name;// 存在相同名字的节点，不同父亲，存储冲突。  +父亲名字
                let compTypeName = key;
                uiContainer.addComp(comp, compName, compTypeName);
            }
        }

        // 拿到当前节点所有孩子。
        let children: cc.Node[] = node.children;
        for (let child of children) {
            this.findNode(child, uiContainer);
        }
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
        func(comp, oldValue, newValue);
    }
}



// UIBase.ts
// create by liwl 2022/7/15
// ui 的基类，所有自定义预制体的脚本都需要继承与此类

import UIContianer from "./UIContianer";
import { UIUtils } from "./UIUitls";
import UIManager from "./UIManager";
import UIWatcher from "./UIDep";
const { ccclass, property } = cc._decorator;

@ccclass
export default class UIBase extends cc.Component {
    private _ui: UIContianer = new UIContianer();

    private _name: string = '';
    private _arrWatcher: UIWatcher[] = [];
    get uiName() {
        return this._name;
    }
    set uiName(name) {
        this._name = name;
    }


    //第一次进来。
    init(params?: any) {
        //所有ui公共会使用的逻辑放到init，然后onInit具体到时候不同的派生类重写。
        UIUtils.findNode(this.node, this._ui);
        this.onInit(params);
    }

    //第一进来。
    onInit(params?: any) {
    }

    //每次进来。
    onEnter(params?: any) {
    }

    //每次退出
    onExit(params?: any) {
    }

    // 显示自己
    open(params?: any) {
        if (!this.node.active) {
            this.node.active = true;
        }
        this.onEnter(params);
    }

    // 隐藏自己
    close(params?: any) {
        if (this.node.active) {
            this.node.active = false;
        }
        this.onExit(params);
    }

    // 自己的显示状态
    isOpen(uiName: string, params?: any) {
        return UIManager.getInstance().isOpen(uiName, params);
    }

    // 打开某个ui
    openUI(uiName: string, isCloseSelf: boolean = false, layerName?: string, params?: any) {
        UIManager.getInstance().openUI(uiName, layerName, params);
        if (isCloseSelf) {
            this.closeSelf();
        }
    }

    // 关闭某个ui
    closeUI(uiName: string, params?: any) {
        UIManager.getInstance().closeUI(uiName, params);
    }

    // 关闭自己
    closeSelf() {
        this.closeUI(this._name);
    }

    // 发送消息
    sendMsg(uiName: string, msgName: string, ...rest) {
        UIManager.getInstance().sendMsg.apply(UIManager.getInstance(), arguments);
    }

    handleMsg(params: any) {

    }

    // 加载某个场景
    loadScene(sceneName: string) {
        UIManager.getInstance().loadScene(sceneName);
    }

    // 获取子节点
    getNode(nodeName: string) {
        return this._ui.getNode(nodeName);
    }

    // 获取子节点的脚本
    getComp(compName: string, typeName: string) {
        return this._ui.getComp(compName, typeName);
    }

    // 添加事件
    addEvent(eventName: string, name: string, cb: Function) {
        this._ui.addEvent(eventName, name, cb);
    }

    // 添加点击事件
    addClickEvent(btnName: string, cb: Function) {
        this.addEvent('click', btnName, cb);
    }

    // 绑定回调
    bindCb(data: Object, key: string, cb: Function, target?: any) {
        target = target || this;
        let watcher = new UIWatcher(data, key, cb, target);
        this._arrWatcher.push(watcher);
    }

    // 监听数据变化，执行对应的逻辑
    bindComp(data: Object, key: string, comp: cc.Component, typeName: string, target?: any) {
        target = target || this;
        let watcher = new UIWatcher(data, key, UIUtils.onRefreshComp, comp, typeName, target);
        this._arrWatcher.push(watcher);
    }

    onDestroy() {
        for (let watcher of this._arrWatcher) {
            watcher.removeSelf();
        }
        this._arrWatcher.length = 0;
    }

}

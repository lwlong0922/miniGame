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

    open(params?: any) {
        if (!this.node.active) {
            this.node.active = true;
        }
        this.onEnter(params);
    }

    close(params?: any) {
        if (this.node.active) {
            this.node.active = false;
        }
        this.onExit(params);
    }
    isOpen(uiName: string, params?: any) {
        return UIManager.getInstance().isOpen(uiName, params);
    }

    openUI(uiName: string, isCloseSelf: boolean = false, layerName?: string, params?: any) {
        UIManager.getInstance().openUI(uiName, layerName, params);
        if (isCloseSelf) {
            this.closeSelf();
        }
    }


    closeUI(uiName: string, params?: any) {
        UIManager.getInstance().closeUI(uiName, params);
    }


    closeSelf() {
        this.closeUI(this._name);
    }

    sendMsg(uiName: string, msgName: string, ...rest) {
        UIManager.getInstance().sendMsg.apply(UIManager.getInstance(), arguments);
    }


    handleMsg(params: any) {

    }

    loadScene(sceneName: string) {
        UIManager.getInstance().loadScene(sceneName);
    }
    getNode(nodeName: string) {

        return this._ui.getNode(nodeName);
    }

    getComp(compName: string, typeName: string) {

        return this._ui.getComp(compName, typeName);
    }


    addEvent(eventName: string, name: string, cb: Function) {
        this._ui.addEvent(eventName, name, cb);
    }


    addClickEvent(btnName: string, cb: Function) {
        this.addEvent('click', btnName, cb);
    }


    bindCb(data: Object, key: string, cb: Function, target?: any) {
        target = target || this;
        let watcher = new UIWatcher(data, key, cb, target);
        this._arrWatcher.push(watcher);
    }

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

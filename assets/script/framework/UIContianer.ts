// UIContianer.ts
// create by liwl 2022/7/15
// ui 容器，用于存储子节，方便获取

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIContianer {
    private _mapNode: Map<string, cc.Node> = new Map();
    private _mapLabel: Map<string, cc.Label> = new Map();
    private _mapButton: Map<string, cc.Button> = new Map();
    private _mapEditBox: Map<string, cc.EditBox> = new Map();
    private _mapProgess: Map<string, cc.ProgressBar> = new Map();
    private _mapPageView: Map<string, cc.PageView> = new Map();
    private _mapUI: any = null;

    constructor() {
        this._mapUI = {
            Label: this._mapLabel,
            Button: this._mapButton,
            EditBox: this._mapEditBox,
            Progress: this._mapProgess,
            Pageview: this._mapPageView
        }

    }

    getUIKeys() {
        return Object.keys(this._mapUI);
    }

    addNode(nodeName: string, node: cc.Node) {
        if (!node) {
            return;
        }
        this._mapNode.set(nodeName, node);
    }

    addComp(comp: cc.Component, compName: string, typeName: string): void {
        if (!comp || !compName.length || !typeName.length) {
            return;
        }
        this._mapUI[typeName].set(compName, comp);
    }
    getNode(nodeName: string) {
        if (!nodeName.length) {
            return null;
        }
        return this._mapNode.get(nodeName);
    }

    getComp(compName: string, typeName: string) {
        if (!compName.length || !typeName.length) {
            return null;
        }
        return this._mapUI[typeName].get(compName);
    }

    addEvent(eventName: string, name: string, cb: Function) {
        if (!cb) {
            return;
        }
        let node = this.getNode(name);
        if (!node) {
            return;
        }
        node.on(eventName, cb);
    }

}

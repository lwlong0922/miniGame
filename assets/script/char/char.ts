import obj from "./obj";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends obj {

    private _bmttomLayer: cc.Layout;
    private _middleLayer: cc.Layout;
    private _topLayer: cc.Layout;

    get BottomLayer() {
        return this._bmttomLayer;
    }
    get MiddleLayer() {
        return this._middleLayer;
    }
    get TopLayer() {
        return this._topLayer;
    }

    onInit(){
        this.absorbField('name', "hhh")
    }

    // 更新状态
    updateState(name?: string){
        if (name && name.length) {
            console.log('have name');
            return null;
        }
        console.log('no name');
    }

}

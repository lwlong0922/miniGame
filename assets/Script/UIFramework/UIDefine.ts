interface PathType {
    Login: string,
    UserInfo: string,
    LevelSelect: string,
    UIRoot: string,
    PopupWindow: string
}

interface UILayerType {
    Page: string,
    Widget: string,
    Window: string
}
export let UIPath = {
    Login: 'Prefab/UI/Login',
    UserInfo: 'Prefab/UI/UserInfo',
    LevelSelect: 'Prefab/UI/LevelSelect',
    UIRoot: 'Prefab/UI/UIRoot',
    PopupWindow: 'Prefab/UI/PopupWindow'
}


export let UILayer = {
    Page: 'UIPage',
    Widget: 'UIWidget',
    Window: 'UIWindow'
}

export let UserData = {
    coin: 0,
    userName: '王老五'
}








export let CompType: any = {
    Label: cc.Label,
    Button: cc.Button,
    EditBox: cc.EditBox,
    Progress: cc.ProgressBar,
    Pageview: cc.PageView
}



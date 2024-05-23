export class UIRegister {
    constructor() {
        this._uis = [];
        this.extensions = [];
    }
    registerExtension(name, fn) {
        if(this.extensions.find(_=>_.name == name)) return;
        this.extensions.push({name, fn});
    }
    get uis() {
        let uiList = this._uis;
        // let uiList2 = [];
        // for(const extension of this.extensions) {
        //     let ext = extension.fn();
        //     let uisInExtension = ext.getUIs ? ext.getUIs() : [];
        //     for(const ui of uisInExtension) {
        //         uiList2.push({
        //             id: ui.name,
        //             ui: ui.onOpen
        //         })
        //     }
        // }
        return [...uiList];
    }
    addUI(id, ui) {
        this._uis.push({id:id.split(':')[0],desc:id.split(':').slice(1).join(':'),ui});
    }
    open(id, player, ...args) {
        let ui = this.uis.find(_=>_.id.toLowerCase()===id.toLowerCase())
        if(ui) ui.ui(player, ...args);
    }
    generateUIName(version, ...paths) {
        return `Azalea${version}/${paths.map(_=>_.toLowerCase()).map(_=>`${_[0].toUpperCase()}${_.substring(1)}`)}`;
    }
}
export const uiManager = new UIRegister();
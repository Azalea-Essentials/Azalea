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
        return this._uis;
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
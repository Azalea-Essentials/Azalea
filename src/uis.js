export class UIRegister {
    constructor() {
        this.uis = [];
    }
    addUI(id, ui) {
        this.uis.push({id,ui});
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
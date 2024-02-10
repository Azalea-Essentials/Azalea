export class UIRegister {
  constructor() {
    this.uis = [];
  }
  addUI(id, ui) {
    this.uis.push({
      id,
      ui
    });
  }
  open(id, player, ...args) {
    let ui = this.uis.find(_ => _.id == id);
    if (ui) ui.ui(player, ...args);
  }
  addUI_V2() {}
}
export const uiManager = new UIRegister();
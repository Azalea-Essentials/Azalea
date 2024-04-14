import { DynamicPropertyDatabase } from "./dynamicPropertyDb";

class FormsV3Manager {
    #formsDb;
    constructor() {
        this.#formsDb = new DynamicPropertyDatabase("FormsV3");
    }
    getUITypes() {
        return ["List", "Grid", "Chest"]
    }
    /**
     * @typedef {Object} control
     * @property {number} type
     * @property {string?} title
     * @property {string?} icon
     * @property {string} id
     * @property {string} command
     * @property {string[]?} itemLore
     * @property {number?} itemAmount
     * @property {string?} itemName
     * @property {number?} row
     * @property {number?} column
     */
    /**
     * @typedef {Object} ui
     * @property {string} title
     * @property {string} id
     * @property {string} body
     * @property {string} tag
     * @property {number} type
     * @property {control[]} controls
     */
    /**
     * 
     * @returns {ui[]}
     */
    getUIs() {
        return this.#formsDb.get("Forms", []);
    }
    /**
     * @description Sets the UIs list.
     * @param {ui[]} list 
     */
    setUIs(list) {
        this.#formsDb.set("Forms", []);
    }
    /**
     * @description Creates a UI
     * @param {Object} uiOptions
     * @param {string} uiOptions.title
     * @param {string} uiOptions.body
     * @param {string} uiOptions.tag
     * @param {number} uiOptions.type
     * @returns {string}
     */
    createUI({title, body, tag, type}) {
        let uis = this.getUIs();
        let id = Date.now().toString()
        uis.push({
            title,
            body,
            tag,
            type,
            id,
            controls: []
        });
        this.setUIs(uis);
        return id;
    }
    /**
     * @description gets a UI by ID
     * @param {string} id 
     * @returns 
     */
    getUIById(id) {
        let index = this.getUIs().findIndex(_=>_.id == id)
        if(index < 0) return null;
        return [index, this.getUIs()[index]];
    }
    /**
     * @description adds a button. Works for both Grid UI and List UI
     * @param {string} id
     * @param {Object} button
     * @param {string} button.title
     * @param {string} button.icon
     * @param {string} button.command
     * @returns 
     */
    addButton(id, {title, icon, command}) {
        let ui = this.getUIById(id);
        if(!ui) return;
        if(ui[1].type > 1) return;
        let uis = this.getUIs();
        uis[ui[0]].controls.push({
            type: 0,
            title,
            icon,
            id: Date.now().toString(),
            command
        })
        this.setUIs(uis);
    }
    /**
     * @description Adds an item. Only works for chest UIs.
     * @param {string} id
     * @param {control} control - The item in the chest UI
    */
    addItem(id, {itemName, itemLore, itemAmount, row, column, icon}) {
        let ui = this.getUIById(id);
        if(!ui) return;
        if(ui[1].type > 1) return;
        let uis = this.getUIs();
        uis[ui[0]].controls.push({
            type: 1,
            itemName,
            itemLore,
            itemAmount,
            icon,
            row,
            column,
            id: Date.now().toString(),
            command
        })
        this.setUIs(uis);
    }
    /**
     * @description gets all controls in a ui
     * @param {string} id
     * @returns {control}
     */
    getControls(id) {
        let ui = this.getUIById(id);
        if(!ui) return null;
        return ui[1].controls;
    }
}

export const FormsAPI = new FormsV3Manager();
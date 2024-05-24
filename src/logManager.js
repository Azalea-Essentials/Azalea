import { DynamicPropertyDatabase } from "./dynamicPropertyDb";

class LogManager {
    constructor(table = "Logs") {
        this.logDB = new DynamicPropertyDatabase(table);
    }
    /**
     * 
     * @param {string} key 
     * @param {string} display 
     * @description Defines a category for the log UI
     */
    defineCategory(key, display) {
        let categories = this.logDB.get("CategoryTable", {});
        if(!categories) categories = {};
        categories[key] = display;
        this.logDB.set("CategoryTable", categories);
    }

    /**
     *
     * @returns {object[]}
     * @description Gets all categories.
     */
    getCategories() {
        let categories = this.logDB.get("CategoryTable", {});
        if(!categories) categories = {};
        return categories;
    }

    /**
     * @param {string} key 
     * @param {string} labelText 
     * @param {string} labelColor 
     * @description Defines a label for the log UI, like [BAN]
     */
    defineLabel(key, labelText, labelColor) {
        let labels = this.logDB.get("LabelTable", {});
        if(!labels) labels = {};
        labels[key] = {
            text: labelText,
            color: labelColor
        };
        this.logDB.set("LabelTable", labels);
    }

    /**
     *
     * @returns {object[]}
     * @description Gets all labels.
     */
    getLabels() {

        let labels = this.logDB.get("LabelTable", {});
        if(!labels) labels = {};
        return labels;
    }

    log(category, label, text, longText = null) {
        // Get the categories and labels.
        let categories = this.getCategories();
        let labels = this.getLabels();

        // If category or label is not found, stop the function from continuing.
        if(!categories[category] || !labels[label]) return console.warn("LABEL/CATEGORY NOT DEFINED");

        // Log it
        let logs = this.logDB.get(`Logs-${category}`, []);
        if(!logs) logs = [];
        logs.push({
            label, text, time: Date.now(), longText: longText ? longText : text
        })
        this.logDB.set(`Logs-${category}`, logs);
    }
}
export const logManager = new LogManager();
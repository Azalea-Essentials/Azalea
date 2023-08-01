import { commands } from './commands';

export class CommandBuilder {
    constructor(name) {
        this.name = name;
        this.data = {
            description: "No description",
            admin: false,
            cb_version: 2,
            category: "Uncategorized",
            onRun: (msg, args, theme, response)=> { response(`ERROR Looks like someone forgot to setup a callback!`) }
        }
    }
    callback(fn) {
        if(typeof fn !== "function") return this;
        this.data.onRun = fn;
        return this;
    }
    desc(text) {
        if(typeof fn !== "string") return this;
        this.data.description = text;
        return this;
    }
    category(text) {
        if(typeof fn !== "string") return this;
        this.data.category = text;
        return this;
    }
    requiresAdmin(bool) {
        if(typeof bool != "boolean") return this;
        this.data.admin = bool;
        return this;
    }
    register() {
        commands.addCommand(this.name, this.data);
    }
}
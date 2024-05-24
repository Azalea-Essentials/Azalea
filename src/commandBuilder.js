import { commands } from './commands';

export class CommandBuilder {
    constructor(name) {
        this.name = name;
        this.data = {
            description: "No description",
            admin: false,
            cb_version: 2,
            category: "Uncategorized",
            onRun: (_msg, _args, _theme, response)=> { response(`ERROR Looks like someone forgot to setup a callback!`) }
        }
    }
    callback(fn) {
        if(typeof fn !== "function") return this;
        this.data.onRun = fn;
        return this;
    }
    desc(text) {
        if(typeof text !== "string") return this;
        this.data.description = text;
        return this;
    }
    deprecated(bool = true) {
        this.data.deprecated = bool;
        return this;
    }
    aliases(list) {
        // if(typeof text !) return this;
        this.data.aliases = list;
        return this;
    }
    category(text) {
        if(typeof text !== "string") return this;
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
import { commands } from "../commands";
import { Database } from "../db";
import { isAdmin } from "../isAdmin";
commands.registerExtension("alias_manager")
commands.registerExtensionEvent("alias_manager", "get_commands", ()=>{
    return [
        {
            name: "alias",
            category: "Customization",
            aliases: ["aliases"],
            description: "Manage command aliases",
            admin: true,
            isDev: false,
            deprecated: false
        }
    ]
})
commands.registerExtensionEvent("alias_manager", "run_command", (msg, args, theme, response, commands, prefix, commandName, extensions)=>{
    let database = new Database("aliases");
    if(commandName == "alias" || commandName == "aliases") {
        if(!isAdmin(msg.sender)) {
            return false;
        }
        if(args.length) {
            if(args[0] == "add") {
                if(args.length < 3) {
                    response(`ERROR Please include alias and command name. Example: {{ALT}}${prefix}alias set marketplace shop{{RESET}}. This example will make {{ALT}}!marketplace {{RESET}}do the same thing as shop`)
                    return true;
                }
                let alias = args[1];
                let command = args[2];
                if(commands.find(_=>_.name == alias || _.aliases.includes(alias))) {
                    response("ERROR Alias can't be the name of an existing command.");
                    return true;
                }
                let command2 = commands.find(_=>_.name == command || _.aliases.includes(command));
                if(!command2) {
                    response(`ERROR Could not find command: {{ALT}}${prefix}${command}`);
                    return true;
                }
                database.set(alias, command2.name);
                response(`SUCCESS Set alias {{ALT}}${prefix}${alias}{{RESET}} to {{ALT}}${prefix}${command2.name}{{RESET}}`)
                return true;
            } else if(args[0] == "remove") {
                if(args.length < 2) return response(`ERROR Please include the alias name to remove. Example: {{ALT}}${prefix}alias remove marketplace`);
                let alias = args[1];
                if(!database.get(alias)) return response(`ERROR Alias {{ALT}}${prefix}${alias} {{RESET}}not found.`);
                database.hardDelete(alias);
                response(`SUCCESS Removed alias {{ALT}}${prefix}${alias}{{RESET}}.`);
                return true;
            } else {
                response(`ERROR Invalid arguments, type {{ALT}}${prefix}alias {{RESET}}to get help`)
                return true;
            }
        } else {
            let text = [
                `${theme.category}+----- ${theme.header ? theme.header : theme.command}Alias Help §r${theme.category}-----+`,
                `${prefix}alias add <alias> <command> §7: Add an alias`,
                `${prefix}alias remove <alias> §7: Remove an alias`
            ]
            response(`TEXT ${text.join('\n§r')}`);
            return true;
        }
    } else if(database.get(commandName)) {
        let commandToRun = database.get(commandName);
        let cmd = commands.find(_=>_.name == commandToRun || _.aliases.includes(commandToRun));
        if(cmd.cb_version == 1) {
            cmd.onRun(msg, args, theme, response, commands, prefix, commandName, extensions);

        } else {
            cmd.onRun({msg, args, theme, response, cmdsList: commands, prefix, command: commandName, extensions});

        }
        return true;

    }
})
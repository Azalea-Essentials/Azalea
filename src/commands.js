import {
    system,
    world,
} from '@minecraft/server';

import { Database } from './db';
import { isAdmin } from './isAdmin';
import { Theme } from './themes';
import translation from './translation';
import { DynamicPropertyDatabase } from './dynamicPropertyDb';
import { azalea } from './main';
// let l=0;
// import { combatLog } from './modules/combatLog';

// export class Commands {
//     // Creates a new instance of the service. This is the constructor that should be called by the service
//     constructor(themeMgr) {
//         this.themeMgr = themeMgr;
//         this._cmds = [];
//         this.middleware = [];
//         this.configDb = new Database("Config");
//     }
//     /**
//      * Adds a new command to the list of commands to be processed.
//      * @param {string} name - The name of the command.
//      * @param {object} data - An object containing the command data.
//      * @param {string} [data.description="No Description"] - The description of the command.
//      * @param {string} [data.category="Uncategorized"] - The category of the command.
//      * @param {string} [data.usage="No Usage Description"] - The usage description of the command.
//      * @param {string} [data.author="TRASH"] - The author of the command.
//      * @param {Function} data.onRun - The callback function to be executed when the command is run.
//      * @param {number} [data.cb_version=1] - The version of the callback function.
//      * @param {boolean} [data.admin=false] - Indicates if the command is for admin use only.
//      * @param {boolean} [data.isDev=false] - Indicates if the command is for development purposes.
//      * @param {Array} [data.aliases=[]] - An array of command aliases.
//      * @param {boolean} [data.private=false] - Indicates if the command is private.
//      */
//     addCommand(name, data) {
//     }
//     // Adds a middleware to the middleware stack. Middleware are invoked in the order they are added
//     use(fn) {
//         this.middleware.push(fn);
//     }
//     // Parses the result and returns it as a command response
//     parseResult(res, theme, sender) {
//         if (typeof res !== 'string') {
//             return;
//         }

//         const configDb = new Database("Config");
//         const resultType = res.split(' ')[0];
//         const resultMessage = res.substring(resultType.length + 1);

//         switch (resultType) {
//             case 'ERROR':
//                 const errorColor = configDb.get("Uwuify") === "true" ? theme.errorColor.replace(/l/g, "w").replace(/r/g, "w") : theme.errorColor;
//                 return [`${errorColor}§l[ERROR] §r§8» §7${resultMessage}`, `random.glass`];
//             case 'SUCCESS':
//                 const successColor = configDb.get("Uwuify") === "true" ? theme.successColor.replace(/l/g, "w").replace(/r/g, "w") : theme.successColor;
//                 return [`${successColor}§l[SUCCESS] §r§8» §7${resultMessage}`, `note.pling`];
//             case 'INFO':
//                 return [`${theme.infoColor}§l[INFO] §r§8» §7${resultMessage}`, `note.chime`];
//             case 'TEXT':
//                 const textMessage = resultMessage;
//                 return [textMessage, `note.iron_xylophone`];
//             case 'WARN':
//                 return [`${theme.warningColor}§l[WARNING] §r§8» §7${resultMessage}`, `note.guitar`];
//             case 'RESPONSE1':
//                 return [`§l[RESULT] §r§8» §r§7${resultMessage}`, `note.chime`];
//             case 'DEPRINFO':
//                 return [`§6§l[DEPRECATED] §r§8» §7${resultMessage}`]
//             default:
//                 return;
//         }
//     }
//     /**
//      * This method processes a command received from a user and executes the corresponding action based on the command.
//      * 
//      * @param {object} msg - The message object containing information about the command, such as the sender and the message content.
//      * @param {string} prefix - The prefix used to identify commands.
//      * @returns {void}
//      */
//     async run(msg, prefix) {
//         let config = new Database("Config");
//         let isDevEnvironment = config.get("DevEnvironment") == "true" ? true : false;

//         let scoreboardIdentity = msg.sender.scoreboardIdentity;
//         try {
//             system.run(() => {
//                 try {
//                     world.scoreboard.addObjective("themes", "§aPlayer Theme Data");
//                 } catch { }
//             })
//         } catch (e) { }
//         let themeScoreboard = world.scoreboard.getObjective("themes");
//         let score = 0;
//         try {
//             score = themeScoreboard.getScore(scoreboardIdentity) ?? 0;
//         } catch {
//             score = 0;
//         }
//         let theme = this.themeMgr.getTheme(score);
//         let middlewareCmds = [];
//         for (const middleware of this.middleware) {
//             let mCmds = middleware(true);
//             if (mCmds) middlewareCmds = [...middlewareCmds, ...mCmds];
//         }
//         let cmdsList = [...this._cmds, ...middlewareCmds];
//         if (!isDevEnvironment) cmdsList = cmdsList.filter(_ => _.isDev ? false : true);
//         let cmd = msg.message.substring(prefix.length).split(' ')[0].toLowerCase();
//         let args = msg.message.substring(prefix.length).split(' ').slice(1);
//         for (const middleware of this.middleware) {
//             let isSuccessful = middleware(false, cmd, msg, args, theme, (res) => {
//                 let res2 = this.parseResult(res, theme, msg.sender);
//                 let player = msg.sender;
//                 system.run(() => { player.playSound(res2[1], res2.length > 2 ? res2[2] : undefined) });
//                 msg.sender.sendMessage(res2[0]);
//             }, cmdsList, prefix);
//             if (isSuccessful) return;
//         }
//         if (!msg.message.startsWith(prefix)) return;
//         let cmdtoggles = world.scoreboard.getObjective("cmdtoggles");
//         if (!cmdtoggles) cmdtoggles = world.scoreboard.addObjective("cmdtoggles", "Command Toggles");
//         let cmdStatusP = cmdtoggles.getParticipants().find(_ => _.displayName == cmd);
//         let cmdStatus = cmdStatusP ? cmdtoggles.getScore(cmdStatusP) : 0;
//         let cmd2 = this._cmds.find(_ => _.name == cmd || _.aliases.includes(cmd));
//         if (!cmd2) {
//             let similarities = this._cmds.map(_ => {
//                 let a = _.name;
//                 let b = cmd;
//                 const mutualLength = (a.length > b.length) ? b.length : a.length;
//                 const similarityAt = 90;
//                 let matchCount = 0;
//                 for (let pointer = 0; pointer < mutualLength; pointer++) {
//                     if (a.substring(pointer, 1) === b.substring(pointer, 1)) {
//                         matchCount++;
//                     }
//                 }
//                 const similarity = (matchCount * 100) / mutualLength;
//                 return { similarity, name: a };
//             })
//             let largest = similarities.sort((a, b) => b.similarity - a.similarity)[0];
//             let triedCommand = largest.similarity > 80 ? largest.name : null
//             let res = this.parseResult(`ERROR Command not found!${triedCommand ? ` Did you mean §o§c${prefix}${triedCommand}` : ``}`, theme, msg.sender);
//             let player = msg.sender;
//             system.run(() => { player.playSound(res[1], res.length > 2 ? res[2] : undefined) });
//             return msg.sender.sendMessage(res[0]);
//         }
//         if (cmdStatus == 1 && !isAdmin(msg.sender)) return msg.sender.sendMessage("§cThis command is only for admins!");
//         if (cmdStatus == 2) return msg.sender.sendMessage("§cThis command is disabled!");
//         if (cmdStatus != 3 && cmd2.admin && !isAdmin(msg.sender)) return msg.sender.sendMessage("§cThis command requires admin!");
//         if (!isDevEnvironment && cmd2.isDev) return msg.sender.sendMessage("§cDevelopment Environment is disabled.");
//         if (cmd2.cb_version == 1) {
//             cmd2.onRun(msg, args, theme, (res) => {
//                 let res2 = this.parseResult(res, theme, msg.sender);
//                 let player = msg.sender;
//                 system.run(() => { player.playSound(res2[1], res2.length > 2 ? res2[2] : undefined) });
//                 msg.sender.sendMessage(res2[0]);
//             }, cmdsList, prefix, cmd);
//         } else {
//             cmd2.onRun({
//                 msg, args, theme, response: (res) => {
//                     let res2 = this.parseResult(res, theme, msg.sender);
//                     let player = msg.sender;
//                     system.run(() => { player.playSound(res2[1], res2.length > 2 ? res2[2] : undefined) });
//                     msg.sender.sendMessage(res2[0]);
//                 }, cmdsList, prefix, usedCommand: cmd
//             });
//         }
//     }
//     removeCommand(name) {
//         try {
//             this._cmds = this._cmds.filter(_ => _.name != name);
//         } catch { }
//     }
//     editCommandDescription(name, description) {
//         let index = this._cmds.findIndex(_ => _.name == name);
//         if (index < 0) return;
//         this._cmds[index].description = description;
//     }
//     editCommandCategory(name, category) {
//         let index = this._cmds.findIndex(_ => _.name == name);
//         if (index < 0) return;
//         this._cmds[index].category = category;
//     }
// }
class CommandExtensionManager {
    constructor() {
        this.$extensions = [];
        this.toggleDb = new Database("ExtensionConfig")
    }

    registerExtension(id) {
        if(this.$extensions.find((_=>_.id == id))) return;
        this.$extensions.push({
            id,
            events: {},
            data: {},
            disabled: this.toggleDb.get(id) ? this.toggleDb.get(id) == "disabled" ? true : false : false
        })
    }
    disableExtension(id) {
        let index = this.getExtensionIndexByID(id);
        if(index >= 0) {
            this.toggleDb.set(id, "disabled");
            this.$extensions[index].disabled = true;
        }
    }
    enableExtension(id) {
        let index = this.getExtensionIndexByID(id);
        if(index >= 0) {
            this.toggleDb.set(id, "enabled");
            this.$extensions[index].disabled = false;
        }
    }
    getExtensionIndexByID(id) {
        return this.$extensions.findIndex(extension => extension.id == id);
    }

    registerExtensionEvent(extensionID, eventName, func) {
        let index = this.getExtensionIndexByID(extensionID);
        this.$extensions[index].events[eventName] = func;
        if(eventName == "initialize") this.callExtensionEvent(extensionID, "initialize");
    }
    callExtensionEvent(extensionID, eventName, ...args) {
        let index = this.getExtensionIndexByID(extensionID);
        if(this.$extensions[index].disabled) return null;
        return this.$extensions[index].events[eventName](...args);
    }
    setTempVar(extensionID, key, val) {
        let index = this.getExtensionIndexByID(extensionID);
        this.$extensions[index].data[key] = val;
    }
    getTempVar(extensionID, key) {
        let index = this.getExtensionIndexByID(extensionID);
        return this.$extensions[index].data[key];
    }
    deleteTempVar(extensionID, key) {
        let index = this.getExtensionIndexByID(extensionID);
        delete this.$extensions[index].data[key];
    }
    setVar(extensionID, key, val) {
        let db = new DynamicPropertyDatabase(extensionID+"-EXTENSION");
        db.set(key, val);
    }
    getVar(extensionID, key) {
        let db = new DynamicPropertyDatabase(extensionID+"-EXTENSION");
        return db.get(key);
    }
    deleteVar(extensionID, key) {
        let db = new DynamicPropertyDatabase(extensionID+"-EXTENSION");
        db.delete(key);
    }

    callExtensionEvents(eventName, ...args) {
        let response = [];
        for(const extension of this.$extensions) {
            if(extension.disabled) continue;
            if(extension.events[eventName]) {
                response.push(extension.events[eventName](...args))
            }
        }
        return response;
    }
}
export class Commands extends CommandExtensionManager {
    constructor() {
        super();
        this.themeMgr = new Theme();
        this._cmds = [];
    }
    addCommand(name, data) {
        const {
            description = "No Description",
            category = "Uncategorized",
            usage = "No Usage Description",
            author = "TRASH",
            onRun,
            cb_version = 1,
            admin = false,
            isDev = false,
            deprecated = false,
            aliases = []
        } = data;

        this._cmds.push({
            name,
            description,
            category,
            usage,
            author,
            onRun,
            cb_version,
            admin: !!admin,
            isDev: !!isDev,
            aliases,
            private: data.private ? data.private : data.private,
            deprecated: !!deprecated
        });
    }
    run(msg, prefix) {
        system.run(()=>{
            let name = msg.message.substring(prefix.length).split(' ')[0];
            let silent = false;
            if(name.startsWith('*')) {
                name = name.substring(1);
                silent = true;
            }
            let args = msg.message.substring(prefix.length).split(' ').slice(1);
            let cmdsList = this._cmds;
            let extensionCmds = this.callExtensionEvents("get_commands");
            if(extensionCmds.length) {
                for(const extensionCommandsList of extensionCmds) {
                    if(!extensionCommandsList) continue;
                    cmdsList = [...cmdsList, ...extensionCommandsList]
                }
            }
            let cmd = this._cmds.find(_=>_.name == name || _.aliases.includes(name));
            let themeScoreboard = world.scoreboard.getObjective("themes");
            if(!themeScoreboard) themeScoreboard = world.scoreboard.addObjective("themes", "Themes");
            let themeScore = 0;
            try {
                themeScore = themeScoreboard.getScore(msg.sender.scoreboardIdentity);
            } catch {themeScore = 0};
            if(!themeScore) themeScore = 0;
            let theme = this.themeMgr.getTheme(themeScore);
            let combatLog = azalea.extensions.find(_=>_.namespace == "CombatLog")
            if(combatLog && combatLog.ext.combatLog.has(msg.sender.id)) return this.callExtensionEvent(
                "internal",
                "process_response",
                msg.sender,
                "ERROR You cant run commands while in combat",
                theme
            );

            if(cmd && cmd.isDev && !msg.sender.hasTag('devmode')) {
                this.callExtensionEvent(
                    "internal",
                    "process_response",
                    msg.sender,
                    "ERROR You need to do {{ALT}}/tag @s add devmode {{RESET}}to run this command",
                    theme
                );
                return;
            }
            let cmdStatusScoreboard = world.scoreboard.getObjective("cmdtoggles");
            if(!cmdStatusScoreboard) cmdStatusScoreboard = world.scoreboard.addObjective("cmdtoggles", "Command Toggles");
            let cmdStatus = 0;
            try {
                cmdStatus = cmdStatusScoreboard.getScore(name);
            } catch { cmdStatus = 0; }
            if(!cmdStatus) cmdStatus = 0;
            if (cmdStatus == 1 && !isAdmin(msg.sender)) {
                if(!silent) this.callExtensionEvent(
                    "internal",
                    "process_response",
                    msg.sender,
                    "ERROR You need to admin to run this command. Try doing {{ALT}}/tag @s add admin{{RESET}}.",
                    theme
                );
                return
            }
            if (cmdStatus == 2) {
                if(!silent) this.callExtensionEvent(
                    "internal",
                    "process_response",
                    msg.sender,
                    "ERROR This command has been disabled by the admins.",
                    theme
                );
                return;
            }
            if (cmd && cmdStatus != 3 && cmd.admin && !isAdmin(msg.sender)) {
                if(!silent) this.callExtensionEvent(
                    "internal",
                    "process_response",
                    msg.sender,
                    "ERROR You need to admin to run this command. Try doing {{ALT}}/tag @s add admin{{RESET}}.",
                    theme,
                    prefix
                );
                return;
            }
            let player = msg.sender;
            this.callExtensionEvents(`run_command:${name}`, msg, args, theme, (responseStr)=>{
                console.warn("S")
                system.run(()=>{
                    if(!silent) this.callExtensionEvent("internal", "process_response", player, responseStr, theme, prefix);

                })
            }, cmdsList, prefix, name, this.$extensions)
            let responsesFromExtensions = this.callExtensionEvents(`run_command`, msg, args, theme, (responseStr)=>{
                console.warn("S")
                system.run(()=>{
                    if(!silent) this.callExtensionEvent("internal", "process_response", player, responseStr, theme, prefix);

                })
            }, cmdsList, prefix, name, this.$extensions);
            if(cmd) {
                if(cmd.cb_version == 1) {
                    cmd.onRun(msg, args, theme, (responseStr)=>{
                        console.warn("S")
                        system.run(()=>{
                            if(!silent) this.callExtensionEvent("internal", "process_response", player, responseStr, theme, prefix);

                        })
                    }, cmdsList, prefix, name, this.$extensions)
    
                } else {
                    //msg, args, theme, response, cmdsList, prefix,
                    cmd.onRun({msg, args, theme, response: (responseStr)=>{
                        if(!silent) this.callExtensionEvent("internal", "process_response", msg.sender, responseStr, theme, prefix);
                    }, cmdsList, prefix, command: name, extensions: this.$extensions});
                    return;
                }
            } else {
                if(!responsesFromExtensions.includes(true)) {
                    if(!silent) this.callExtensionEvent(
                        "internal",
                        "process_response",
                        msg.sender,
                        "ERROR Command not found. Do {{ALT}}!cmds {{RESET}}to get a list of commands.",
                        theme
                    );
                }
            }
    
        })
    }
    use() {}
}
export const commands = new Commands();
commands.registerExtension("internal");
commands.registerExtensionEvent("internal", "parse_response_variables", (responseStr, prefix = "")=>{
    let response_type = responseStr.split(' ')[0].toLowerCase();
    let response_text = responseStr.split(' ').slice(1).join(' ');
    if(prefix) response_text = response_text.replaceAll('{{PREFIX}}', prefix);
    return { type: response_type, text: response_text }
})
commands.registerExtensionEvent("internal", "process_response", (player, responseStr, theme, prefix = "")=>{
    let response = commands.callExtensionEvent("internal", "parse_response_variables", responseStr, prefix);
    switch(response.type) {
        case 'text':
            player.sendMessage(response.text);
            player.playSound("note.pling", {
                "pitch": 1,
                "volume": 0.3
            })
            break;
        case 'info':
            player.sendMessage(`${theme.infoColor}§lINFO §r§l§8» §r§7${response.text.replaceAll('{{ALT}}', `§r${theme.infoColor}§o`).replaceAll('{{RESET}}', '§r§7')}`);
            player.playSound("note.pling", {
                "pitch": 1,
                "volume": 0.3
            })
            break;
        case 'error':
            player.sendMessage(`${theme.errorColor}§lERROR §r§l§8» §r§7${response.text.replaceAll('{{ALT}}', `§r${theme.errorColor}§o`).replaceAll('{{RESET}}', '§r§7')}`);
            player.playSound("random.glass", {
                "pitch": 1,
                "volume": 0.3
            })
            break;
        case 'warn':
            player.sendMessage(`${theme.warningColor}§lWARNING §r§l§8» §r§7${response.text.replaceAll('{{ALT}}', `§r${theme.warningColor}§o`).replaceAll('{{RESET}}', '§r§7')}`);
            player.playSound("random.glass", {
                "pitch": 1,
                "volume": 0.3
            })
            break;
        case 'success':
            player.sendMessage(`${theme.successColor}§lSUCCESS §r§l§8» §r§7${response.text.replaceAll('{{ALT}}', `§r${theme.successColor}§o`).replaceAll('{{RESET}}', '§r§7')}`);
            player.playSound("note.pling", {
                "pitch": 1.2,
                "volume": 0.3
            })
            break;
        case 'deprinfo':
            player.sendMessage(`§c§lDEPRECATED §r§l§8» §r§7${response.text}`);
            player.playSound("random.glass", {
                "pitch": 0.7,
                "volume": 0.3
            })
            break;
        case 'wait':
            player.playSound("note.pling", {
                "pitch": 1,
                "volume": 0.3
            })
            player.sendMessage(`§d§lWAIT §r§l§8» §r§7${response.text}`);
            break;
    }
});
commands.registerExtension("extension_store");
commands.registerExtension("translation");
commands.registerExtensionEvent("translation", "initialize", ()=>{
    commands.setTempVar("extension_store", "translation_file", translation);
})
commands.registerExtensionEvent("translation", "get_translation", (player)=>{
    let translationScoreboard = world.scoreboard.getObjective("translation");
    if(!translationScoreboard) translationScoreboard = world.scoreboard.addObjective("translation", "Preferred Languages");
    let score = 0;
    try {
        score = translationScoreboard.getScore(player.scoreboardIdentity);
    } catch { score = 0; }
    if(!score) score = 0;
    if(score >= translation.languages.length) score = translation.languages.length - 1;
    if(score < 0) score = 0;
    return translation[translation.languages[score].key];
})
// commands.themeMgr.addTheme({
//     name: "Default Azalea (newest)",
//     descriptionText: "new theme",
//     successColor: "§f",
//     errorColor: "§d",
//     infoColor: "§e",
//     darkSuccess: "§f",
//     darkError: "§r",
//     darkInfo: "§a",
//     defaultBracketColor: "§c",
//     defaultRankColor: "§q",
//     defaultNameColor: "§p",
//     defaultMessageColor: "§d",
//     barFull: "§6",
//     barEmpty: "§5",
//     barBracket: "§4",
//     category: "§3",
//     header: "§1",
//     footer: "§2",
//     footerAlt: "§o§2",
//     command: "§s",
//     description: "§b",
//     alias: "§n",
//     warningColor: "§m"
// })

commands.themeMgr.addTheme({
    name: "Default Azalea",
    descriptionText: "Default.",
    successColor: "§a",
    errorColor: "§c",
    infoColor: "§b",
    darkSuccess: "§2",
    darkError: "§4",
    darkInfo: "§9",
    defaultBracketColor: "§8",
    defaultRankColor: "§b",
    defaultNameColor: "§3",
    defaultMessageColor: "§7",
    barFull: "§a",
    barEmpty: "§c",
    barBracket: "§7",
    category: "§8",
    header: "§e",
    footer: "§f",
    footerAlt: "§o§7",
    command: "§a",
    description: "§7",
    alias: "§b",
    warningColor: "§e"
})

// commands.themeMgr.addTheme({
//     name: "Default Azalea (old)",
//     descriptionText: "Default.",
//     successColor: "§a",
//     errorColor: "§c",
//     infoColor: "§s",
//     darkSuccess: null,
//     darkError: null,
//     darkInfo: null,
//     defaultBracketColor: "§8",
//     defaultRankColor: "§d",
//     defaultNameColor: "§d",
//     defaultMessageColor: "§f",
//     barFull: "§q",
//     barEmpty: "§n",
//     barBracket: "§a",
//     category: "§8",
//     command: "§a",
//     description: "§7",
//     alias: "§h",
//     warningColor: "§e"
// })

// commands.themeMgr.addTheme({
//     name: "Discord Light Mode",
//     descriptionText: "Burns your eyes, and makes everything look the same",
//     successColor: "§f",
//     errorColor: "§f",
//     infoColor: "§f",
//     darkSuccess: null,
//     darkError: null,
//     darkInfo: null,
//     defaultBracketColor: "§f",
//     defaultRankColor: "§f",
//     defaultNameColor: "§f",
//     defaultMessageColor: "§f",
//     barFull: "§f",
//     barEmpty: "§f",
//     barBracket: "§f",
//     category: "§f",
//     command: "§f",
//     description: "§f",
//     alias: "§f",
//     warningColor: "§f"
// })

commands.themeMgr.addTheme({
    name: "Ocean",
    descriptionText: "Blue everywhere, sometimes green because minecraft doesnt have enough blue colors.",
    successColor: "§a",
    errorColor: "§m",
    infoColor: "§9",
    darkSuccess: null,
    darkError: null,
    darkInfo: null,
    defaultBracketColor: "§t",
    defaultRankColor: "§b",
    defaultNameColor: "§9",
    defaultMessageColor: "§h",
    barFull: "§3",
    barEmpty: "§t",
    barBracket: "§b",
    category: "§t",
    command: "§a",
    description: "§3",
    header: "§b",
    footer: "§f",
    footerAlt: "§o§b",
    alias: "§s",
    warningColor: "§g"
})

commands.themeMgr.addTheme({
    name: "Blood",
    descriptionText: "red",
    successColor: "§q",
    errorColor: "§m",
    infoColor: "§9",
    darkSuccess: null,
    darkError: null,
    darkInfo: null,
    defaultBracketColor: "§4",
    defaultRankColor: "§c",
    defaultNameColor: "§n",
    defaultMessageColor: "§m",
    barFull: "§4",
    barEmpty: "§8",
    barBracket: "§c",
    category: "§4",
    command: "§5",
    description: "§8",
    header: "§c",
    footer: "§7",
    footerAlt: "§o§c",
    alias: "§s",
    warningColor: "§g"
})

commands.themeMgr.addTheme({
    name: "Test",
    descriptionText: "red",
    successColor: "§a",
    errorColor: "§4",
    infoColor: "§3",
    darkSuccess: null,
    darkError: null,
    darkInfo: null,
    defaultBracketColor: "§4",
    defaultRankColor: "§c",
    defaultNameColor: "§n",
    defaultMessageColor: "§m",
    barFull: "§4",
    barEmpty: "§8",
    barBracket: "§c",
    category: "§6",
    command: "§c",
    description: "§7",
    header: "§d",
    footer: "§7",
    footerAlt: "§o§c",
    alias: "§s",
    warningColor: "§g"
})

commands.themeMgr.addTheme({
    name: "Minecraft",
    descriptionText: "Default-like minecraft command colors",
    successColor: "§a",
    errorColor: "§4",
    infoColor: "§3",
    darkSuccess: null,
    darkError: null,
    darkInfo: null,
    defaultBracketColor: "§f",
    defaultRankColor: "§e",
    defaultNameColor: "§a",
    defaultMessageColor: "§f",
    barFull: "§4",
    barEmpty: "§8",
    barBracket: "§c",
    category: "§2",
    command: "§e",
    description: "§r",
    header: "§2",
    footer: "§f",
    footerAlt: "§o§e",
    alias: "§s",
    warningColor: "§g"
})

commands.themeMgr.addTheme({
    "name": "A theme.",
    "descriptionText": "Theme.",
    "successColor": "§b",
    "errorColor": "§d",
    "infoColor": "§u",
    darkSuccess: null,
    darkError: null,
    darkInfo: null,
    "defaultBracketColor": "§d",
    "defaultRankColor": "§c",
    "defaultNameColor": "§e",
    "defaultMessageColor": "§h",
    "barFull": "§b",
    "barEmpty": "§d",
    "barBracket": "§9",
    "category": "§d",
    "command": "§9",
    "description": "§d",
    "alias": "§u",
    "warningColor": "§6"
})
commands.themeMgr.addTheme({
    "name": "ZSTheme",
    "descriptionText": "a",
    "successColor": "§2",
    "errorColor": "§4",
    "infoColor": "§b",
    darkSuccess: null,
    darkError: null,
    darkInfo: null,
    "defaultBracketColor": "§8",
    "defaultRankColor": "§8",
    "defaultNameColor": "§a",
    "defaultMessageColor": "§3",
    "barFull": "§a",
    "barEmpty": "§j",
    "barBracket": "§d",
    "category": "§9",
    "command": "§8",
    "description": "§2",
    "alias": "§h",
    "warningColor": "§c"
})

commands.themeMgr.addTheme({
    "name": "Grandpas ashes",
    "descriptionText": "what",
    "successColor": "§c",
    "errorColor": "§e",
    "infoColor": "§g",
    darkSuccess: null,
    darkError: null,
    darkInfo: null,
    "defaultBracketColor": "§c",
    "defaultRankColor": "§p",
    "defaultNameColor": "§g",
    "defaultMessageColor": "§e",
    "barFull": "§c",
    "barEmpty": "§e",
    "barBracket": "§j",
    "category": "§h",
    "command": "§j",
    "description": "§e",
    "alias": "§g",
    "warningColor": "§6"
})

commands.themeMgr.addTheme({
    name: "Random Theme",
    descriptionText: "a",
    successColor: "§a",
    errorColor: "§c",
    infoColor: "§b",
    darkSuccess: "§q",
    darkError: "§m",
    darkInfo: "§t",
    defaultBracketColor: "§8",
    defaultRankColor: "§6",
    defaultNameColor: "§c",
    defaultMessageColor: "§d",
    barFull: "§a",
    barEmpty: "§c",
    barBracket: "§7",
    category: "§8",
    header: "§a",
    command: "§d",
    description: "§f",
    alias: "§h",
    warningColor: "§g"
})
commands.themeMgr.addTheme({
    "name": "October 2023 Submission 1",
    "descriptionText": "Made by TRASH",
    "successColor": "§a",
    "errorColor": "§c",
    "infoColor": "§s",
    "defaultBracketColor": "§4",
    "defaultRankColor": "§5",
    "defaultNameColor": "§6",
    "defaultMessageColor": "§e",
    "barFull": "§c",
    "barEmpty": "§m",
    "barBracket": "§4",
    "category": "§6",
    "command": "§c",
    "description": "§5",
    "alias": "§6",
    "warningColor": "§p",
    "header": "§5"
})
commands.themeMgr.addTheme({
    "name": "LB Theme 1",
    "descriptionText": "Made by TRASH",
    "successColor": "§a",
    "errorColor": "§c",
    "infoColor": "§s",
    "defaultBracketColor": "§7",
    "defaultRankColor": "§a",
    "defaultNameColor": "§e",
    "defaultMessageColor": "§b",
    "barFull": "§c",
    "barEmpty": "§m",
    "barBracket": "§4",
    "category": "§8",
    "command": "§a",
    "description": "§7",
    "alias": "§6",
    "warningColor": "§p",
    "header": "§b"
})
commands.themeMgr.addTheme({
    "name": "LB Theme 2",
    "descriptionText": "Made by TRASH",
    "successColor": "§a",
    "errorColor": "§c",
    "infoColor": "§s",
    "defaultBracketColor": "§8",
    "defaultRankColor": "§b",
    "defaultNameColor": "§3",
    "defaultMessageColor": "§e",
    "barFull": "§c",
    "barEmpty": "§m",
    "barBracket": "§4",
    "category": "§c",
    "command": "§3",
    "description": "§6",
    "alias": "§6",
    "warningColor": "§p",
    "header": "§e"
})
commands.themeMgr.addTheme({
    "name": "Leaderboard Purple",
    "descriptionText": "A simple purple/green/yellow theme for leaderboards",
    "successColor": "§a",
    "errorColor": "§c",
    "infoColor": "§s",
    "defaultBracketColor": "§8",
    "defaultRankColor": "§u",
    "defaultNameColor": "§e",
    "defaultMessageColor": "§e",
    "leaderboardNumber": "§d",
    "leaderboardScore": "§a",
    "barFull": "§c",
    "barEmpty": "§m",
    "barBracket": "§4",
    "category": "§5",
    "command": "§d",
    "description": "§6",
    "alias": "§6",
    "warningColor": "§p",
    "header": "§d"
})
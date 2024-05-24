import { world } from '@minecraft/server';

import { commands } from '../../commands';
import { Database } from '../../db';
import { isAdmin } from '../../isAdmin';

export default function AddTagCmdManager() {
    // function reloadCmds() {
        // let tagCmdTable = new Database("TagCmdConfig");
    //     if(tagCmdTable.get("Cmds")) {
    //         let cmds = JSON.parse(tagCmdTable.get("Cmds") ? tagCmdTable.get("Cmds") : "[]");
    //         for(const cmd of cmds) {
    //             commands.removeCommand(cmd.name);
    //             commands.addCommand(cmd.name, {
    //                 description: cmd.description ? cmd.description : "Tagcmd Description",
    //                 category: cmd.category ? cmd.category : "Tagcmds",
    //                 onRun(msg,args,theme,response) {
    //                     if(args.length && args[0] == "/manage") {
    //                         if(args.length < 3) return response(`ERROR Must require 2 arguments, see !help ${cmd.name} for help`);
    //                         switch(args[1]) {
    //                             case "set-category":
    //                                 commands.editCommandCategory(cmd.name, args.slice(2).join(' '));
    //                                 let index = cmds.findIndex(_=>_.name==cmd.name);
    //                                 cmds[index].category = args.slice(2).join(' ');
    //                                 tagCmdTable.set("Cmds", JSON.stringify(cmds));
    //                                 response(`SUCCESS Command category changed!`);
    //                                 // cmds
    //                                 break;
    //                             case "set-description":
    //                                 commands.editCommandDescription(cmd.name, args.slice(2).join(' '));
    //                                 let index2 = cmds.findIndex(_=>_.name==cmd.name);
    //                                 cmds[index2].description = args.slice(2).join(' ');
    //                                 tagCmdTable.set("Cmds", JSON.stringify(cmds));
    //                                 response(`SUCCESS Command description changed!`);
    //                                 break;
    //                             default:
    //                                 return response(`ERROR Invalid management property! Valid properties: set-description, set-category`)
    //                         }
    //                         return;
    //                     }
    //                     let player = msg.sender;
    //                     let tag = cmd.tag;
    //                     system.run(function (){
    //                         player.addTag(tag);
    //                     })
    //                     // return response(`INFO Command successful`);
    //                 }
    //             })
    //         }
    //     }
    // }
    commands.use((isCheckingCommandsList, cmdName, msg, args, _theme, response)=>{
        try {
            let tagCmdTable = new Database("TagCmdConfig");
            let tagCmds = JSON.parse(tagCmdTable.get("Cmds") ? tagCmdTable.get("Cmds") : "[]");
            if(isCheckingCommandsList) {
                return tagCmds.map(_=>{
                    return {
                        name: _.name,
                        description: _.description ? _.description : "No description",
                        category: _.category ? _.category : "Uncategorized",
                        deprecated: true
                    }
                })
            }
            let tagcmd = tagCmds.find(_=>_.name == cmdName);
            let tagcmdIndex = tagCmds.findIndex(_=>_.name == cmdName);
            if(!tagcmd) return false;
            if(args.length) {
                if(args[0] == "/manage") {
                    if(!isAdmin(msg.sender)) {
                        response('ERROR You require admin to perform this action!');
                        return;
                    }
                    switch(args[1]) {
                        case "set-description":
                            tagCmds[tagcmdIndex].description = args.slice(2).join(' ');
                            tagCmdTable.set("Cmds", JSON.stringify(tagCmds));
                            break;
                        case "set-category":
                            tagCmds[tagcmdIndex].category = args.slice(2).join(' ');
                            tagCmdTable.set("Cmds", JSON.stringify(tagCmds));
                            break;
                        case "toggle-exec-other":
                            if(tagCmds[tagcmdIndex].execOther)
                                tagCmds[tagcmdIndex].execOther = false
                            else
                                tagCmds[tagcmdIndex].execOther = true
                            response(`SUCCESS Execute on other players mode ${tagCmds[tagcmdIndex].execOther ? "ENABLED" : "DISABLED"}`);
                            tagCmdTable.set("Cmds", JSON.stringify(tagCmds));
                            break;
                        default:
                            response(`ERROR Invalid config option!`);
                    }
                    return true;
                }
            }
            if(tagCmds[tagcmdIndex].execOther) {
                if(!args.length) {
                    response('ERROR Please include a player name!')
                    return true;
                }
                let playerName = args.join(' ');
                let player;
                for(const player2 of world.getPlayers()) {
                    if(player2.name.toLowerCase() == playerName.toLowerCase()) player = player2;
                }
                if(!player) {
                    response('ERROR Player not found! Make sure they are online and that you spelled the username correctly.');
                    return true;
                }
                try {
                    player.addTag(tagcmd.tag);
                } catch {}
                try {
                    msg.sender.addTag(`${tagcmd.tag}_sender`);
                } catch {}
            } else {
                msg.sender.addTag(`${tagcmd.tag}`);
            }
    
            return true;            
        } catch {
            return false;
        }

    })
    commands.addCommand("tagcmd", {
        description: "Create custom commands using commands",
        category: "Customization",
        usage: "\n!tagcmd add <name> <tag>\n!tagcmd remove <name>\n!tagcmd",
        admin: true,
        deprecated: true,
        onRun(msg, args, theme, response) {
            let tagCmdTable = new Database("TagCmdConfig");
            if(!tagCmdTable.get("Cmds")) {
                tagCmdTable.set("Cmds", JSON.stringify([{
                    name: "tagcmd-help",
                    description: "Get help with tagcmd when its done",
                    category: "Help Center",
                    tag: "azalea:tagcmd-help"
                }]))
            }
            if(!args.length) {
                let commands = JSON.parse(tagCmdTable.get("Cmds") ? tagCmdTable.get("Cmds") : "[]");
                let responseText = [];
                responseText.push(`${theme.category}<-=- ${theme.command}Tagcmd List ${theme.category}-=->`)
                for(const command of commands) {
                    responseText.push(`${theme.command}${command.name} ${theme.description}${command.description} ${theme.alias}${command.tag}`);
                }
                if(isAdmin(msg.sender)) {
                    responseText.push(``);
                    responseText.push(`${theme.description}To remove a command: ${theme.command}!tagcmd remove <name>`);
                    responseText.push(`${theme.description}To add a command: ${theme.command}!tagcmd add <name> <tag>`);
                }
                return response(`TEXT ${responseText.join('\n')}`);
            } else {
                // if(!isAdmin(msg.sender)) return response(`ERROR You need admin to do that!`)
                let tagCmds = JSON.parse(tagCmdTable.get("Cmds") ? tagCmdTable.get("Cmds") : "[]");
                switch(args[0]) {
                    case "add":
                        return response(`DEPRINFO This command is deprecated. You can't add any TagCMDs as of v1.0, and this command only exists for compatibility. Please use custom commands in admin panel from now on`)



                    case "remove":
                        if(args.length < 2) return response(`ERROR You must include a command name`)

                        let tagCmd = tagCmds.find(_=>_.name==args[1]);
                        if(!tagCmd) return response(`ERROR Command not found`)
                        // fuck it i will use filter
                        tagCmds = tagCmds.filter(_=>_.name != tagCmd.name);

                        tagCmdTable.set("Cmds", JSON.stringify(tagCmds));
                        
                        response(`SUCCESS Command removed!`)
                        break;
                    case "raw":
                        let cmdsRaw = JSON.stringify(JSON.parse(tagCmdTable.get("Cmds", "[]")), null, 2);
                        response(`TEXT ${cmdsRaw}`)
                        break;
                }
            }
        }
    })
}
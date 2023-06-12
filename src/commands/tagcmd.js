import { commands } from "../commands";
import { Database } from "../db";
import {world, system} from '@minecraft/server';
import { isAdmin } from "../isAdmin";
export default function AddTagCmdManager(commands) {
    world.afterEvents.worldInitialize.subscribe(()=>{
        let tagCmdTable = new Database("TagCmdConfig");
        if(tagCmdTable.get("Cmds")) {
            let cmds = JSON.parse(tagCmdTable.get("Cmds"));
            for(const cmd of cmds) {
                commands.addCommand(cmd.name, {
                    description: "Tagcmd Description",
                    category: "Tagcmds",
                    onRun(msg,args,theme,response) {
                        let player = msg.sender;
                        let tag = cmd.tag;
                        system.run(function (){
                            player.addTag(tag);
                        })
                        return response(`INFO Command successful`);
                    }
                })
            }
        }
    })
    commands.addCommand("tagcmd", {
        description: "Create custom commands using commands",
        category: "Management",
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
                let commands = JSON.parse(tagCmdTable.get("Cmds"));
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
                if(!isAdmin(msg.sender)) return response(`ERROR You need admin to do that!`)
                let tagCmds = JSON.parse(tagCmdTable.get("Cmds") ?? "[]");
                switch(args[0]) {
                    case "add":
                        if(args.length < 3) return response(`ERROR You must include a command name and tag name`)

                        tagCmds.push({
                            name: args[1],
                            tag: args[2],
                            description: "No description",
                            category: "Uncategorized"
                        })

                        tagCmdTable.set("Cmds",JSON.stringify(tagCmds));
                        let tagName = args[2]
                        commands.addCommand(args[1], {
                            description: "Tagcmd Description",
                            category: "Tagcmds",
                            onRun(msg,args,theme,response) {
                                let player = msg.sender;
                                let tag = tagName;
                                system.run(function (){
                                    player.addTag(tag);
                                })
                                return response(`INFO Command successful`);
                            }
                        })
                        response(`SUCCESS Command added!`)
                        break;
                    case "remove":
                        if(args.length < 2) return response(`ERROR You must include a command name`)

                        let tagCmd = tagCmds.find(_=>_.name==args[1]);
                        if(!tagCmd) return response(`ERROR Command not found`)
                        // fuck it i will use filter
                        tagCmds = tagCmds.filter(_=>_.name != tagCmd.name);

                        tagCmdTable.set("Cmds", JSON.stringify(tagCmds));

                        commands.removeCommand(tagCmd.name);

                        response(`SUCCESS Command removed!`)
                        break;
                }
            }
        }
    })
}
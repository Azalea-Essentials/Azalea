import { isAdmin } from "../../isAdmin";

export default function addHelpCommand(commands) {
    commands.addCommand("commands", {
        description: "Get some help",
        category: "Help Center",
        usage: "!help <command name | page>",
        aliases: ["?","cmds"],
        onRun(msg, args, theme, response, commands, prefix, usedCommand, useRevertedHelp = false) {
            console.warn("HELP")
            if(args && args.length && args[0] == "cmd-count") {
                response(`TEXT ${commands.length}`)
                return;
            }

            if(args.length && !/^\d+$/.test(args[0]) && args[0] != "-s") {
                let cmd2 = commands.find(_=>_.name == args[0]);
                if(!cmd2) return response(`ERROR Command not found!`);
                let text = [];
                text.push(`${theme.category}<-=- ${theme.header ? theme.header : theme.command}Command Help: ${cmd2.name} ${theme.category}-=->`)
                text.push(``);
                text.push(`${theme.command}Command Name ${theme.description}${cmd2.name}`)
                text.push(`${theme.command}Command Category ${theme.description}${cmd2.category}`)
                text.push(`${theme.command}Command Usage ${theme.description}${cmd2.usage}`);
                text.push(`${theme.command}Command Author ${theme.description}${cmd2.author ? cmd2.author : "TRASH"}`);
                return response(`TEXT ${text.join('\n')}`);
            }

            let commandsSort = commands.sort(function(a, b) {
                var textA = a.category.toUpperCase();
                var textB = b.category.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }).filter(_=>!_.private)


            let text = [];
            var arrays = [], size = 14;
            for (let i = 0; i < commandsSort.length; i += size)
               arrays.push(commandsSort.slice(i, i + size));

            let p = (args.length ? /^\d+$/.test(args[0]) ? parseInt(args[0]) : 1 : 1)-1;
            if(p < 0) return response(`ERROR Minimum page is 1`);
            if(p >= arrays.length) return response(`ERROR Maximum page is ${arrays.length}`)

            let categorizedCommands = arrays[p].reduce((acc, obj) => {
                const key = obj.category;
                acc[key] = acc[key] || [];
                acc[key].push(obj);
                return acc;
            }, {});
            for(const category of Object.keys(categorizedCommands)) {
                categorizedCommands[category] = categorizedCommands[category].sort(function(a, b) {
                    var textA = a.name.toUpperCase();
                    var textB = b.name.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                })
            }
            for(const category of Object.keys(categorizedCommands)) {
                // text.push(``)
                if(!args.includes("-s")) text.push(`${theme.category}+--- ${theme.header ? theme.header : theme.command}${category} §r${theme.category}---+`)
                for(const command of categorizedCommands[category]) {
                    if(command.admin && !isAdmin(msg.sender)) continue;
                    if(command.private) continue;
                    text.push(`${theme.category}> ${!command.deprecated ? theme.command : "§c"}${prefix}${command.name} ${theme.description}${command.description}${command.aliases && command.aliases.length ? ` §o${theme.alias}${command.aliases.join("§r"+theme.alias+", §o")}§r` : ``}${command.admin ? " \uE12A" : ""}${command.isDev ? " \uE12B" : ""}${command.deprecated ? " \uE12C" : ""}`);
                }
            }
            text.push(``)
            text.push(`${theme.footer}Help page ${theme.footerAlt}${p+1}/${arrays.length}§r${theme.footer}, use ${theme.footerAlt}${prefix}${usedCommand} <page> §r${theme.footer}to select another page`);
            text.push(`${theme.footer}Use ${theme.footerAlt}${prefix}${usedCommand} <command name> §r${theme.footer}to get help with a specific command`);
            if(useRevertedHelp) text.push(`${theme.footer}Do ${theme.footerAlt}${prefix}help revert §r${theme.footer}to go back, or ${theme.footerAlt}${prefix}guide §r${theme.footer}to use the new help menu`);
            response(`TEXT ${text.join('\n§r')}`);
        }
    })
}
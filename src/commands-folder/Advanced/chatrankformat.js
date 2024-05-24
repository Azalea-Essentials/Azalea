import { Database } from '../../db';

export default function addChatrankFormatCommand(commands) {
    commands.addCommand("chatformat",{
        description: "Change the format of chat ranks",
        category: "Customization",
        aliases: ["chatrankformat", "cformat", "#chat"],
        admin: true,
        azaleaVersion: "0.9",
        async onRun(msg, args, response) {
            if(!isAdmin(msg.sender, "chatoptions.edit")) return response(`ERROR You are missing the required permissions: chatoptions.edit`);
            let configDb = new Database("Config");
            if(!args.length) {
                let formatted = `${configDb.get("ChatrankFormat").replace(/\§/g,"§r&")}`;
                formatted = formatted.replace(/\#M/g,"§d#M§r")
                formatted = formatted.replace(/\#P/g,"§d#P§r")
                formatted = formatted.replace(/\#MC/g,"§d#MC§r")
                formatted = formatted.replace(/\#NC/g,"§d#NC§r")
                formatted = formatted.replace(/\#RC/g,"§d#RC§r")
                formatted = formatted.replace(/\#BC/g,"§d#BC§r")
                formatted = formatted.replace(/\#DRA/g,"§d#DRA§r");
                let funcStrings = [];
                let reg2 = /\#R\(([\s\S]*?)\)/g;
                let rankJoins = formatted.match(reg2);
                if(rankJoins && rankJoins.length) {
                    for(const rankJoin of rankJoins) {
                        let fRankJoin = `§b#R§a(§r${rankJoin.substring(3).slice(0,-1)}§r§a)`;
                        formatted = formatted.replace(rankJoin, fRankJoin)
                        funcStrings.push(fRankJoin);
                    }
                }
                return response(`TEXT Current chat rank format:\n${formatted}\n\n§rFUNCTION CALLS:\n${funcStrings.join('\n')}\n\n§rType !chatrankformat change <format> to change it!`);
            } else {
                if(args[0] == "change") {
                    configDb.set("ChatrankFormat", args.slice(1).join(' '));
                }
            }
        }
    })
}
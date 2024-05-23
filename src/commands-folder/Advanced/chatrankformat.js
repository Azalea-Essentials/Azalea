import { Database } from '../../db';

export default function addChatrankFormatCommand(commands) {
    commands.addCommand("chatformat",{
        description: "Change the format of chat ranks",
        category: "Customization",
        aliases: ["chatrankformat", "cformat", "#chat"],
        admin: true,
        azaleaVersion: "0.9",
        async onRun(msg, args, theme, response) {
            if(!isAdmin(msg.sender, "chatoptions.edit")) return response(`ERROR You are missing the required permissions: chatoptions.edit`);
            let configDb = new Database("Config");
            if(!args.length) {
                let formatted = `${configDb.get("ChatrankFormat").replace(/\§/g,"§r&")}`;
                // let reg1 = /\$\{([\s\S]*?)\}/g;
                // let vars = formatted.match(reg1);
                // if(vars && vars.length) {
                //     for(const variable of vars) {
                //         formatted = formatted.replace(variable, `§d\${§e${variable.substring(2).slice(0,-1)}§r§d}§r`);
                //     }
                // }
                // let reg2 = /\$([a-zA-Z]*?)\(([\s\S]*?)\)/g;
                // let funcs = formatted.match(reg2);
                // // // console.warn(funcs.join(', '))
                // let funcStrings = [];
                // if(funcs && funcs.length) {
                //     for(const func of funcs) {
                //         // console.warn(func[1]);
                //         let funcString = `§9$§b${func.match(/\$([\s\S]*?)\(/)[0].substring(1).slice(0,-1)}§a(${func.split('(').slice(1).join('(').slice(0,-1)}§r§a)`;
                //         formatted = formatted.replace(func, funcString);
                //         funcStrings.push(funcString);
                //     }
                // }
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
import { CommandBuilder } from '../commandBuilder';
import { Database } from '../db';
import {
  cacheId,
  getCachedId,
  getPlayerDb,
} from '../playerData';

export default function() {
    return;
    new CommandBuilder("mail")
        .category("Fun")
        .desc("Mail")
        .callback(({msg,args,theme,response})=>{
            if(!args.length) {
                cacheId(msg.sender);
                let playerDb = getPlayerDb(msg.sender);
                let mail = playerDb.get("Mail", []);
                let text = [];
                if(!mail.length) text.push(theme.errorColor+"You have no mail")
                else {
                    text.push(`${theme.category}<-=- ${theme.header ? theme.header : theme.command}Mail ${theme.category}-=->`);
                    for(const text2 of mail) {
                        text.push(`${theme.command}From ${theme.description}${text2.from} To ${text2.to}`);
                        text.push(`§f${text2.text}`);
                        text.push(`${theme.description}${text2.sentAt}`);
                        text.push(``);
                    }
                }
                response(`TEXT ${text.join('\n§r')}`)
            } else {
                if(args[0] == "send") {
                    let player = args[1];
                    let otherPlayerDbName = getCachedId(player);
                    if(!otherPlayerDbName) return response(`ERROR Player does not exist.`);
                    let otherPlayerDb = new Database(otherPlayerDbName);
                    let mail = otherPlayerDb.get("Mail", []);
                    let mailData = {
                        from: msg.sender.name,
                        text: args.slice(2).join(' '),
                        to: player,
                        sentAt: Date.now()
                    };
                    mail.push(mailData);
                    otherPlayerDb.set("Mail", mail);
                    let playerDb = getPlayerDb(msg.sender);
                    let mail2 = playerDb.get("Mail", []);
                    mail2.push(mailData);
                    playerDb.set("Mail", mail2);
                    return response(`SUCCESS Mail sent!`);
                } else if(args[0] == "clear") {
                    let playerDb = getPlayerDb(msg.sender);
                    playerDb.set("Mail", []);
                }
            }
        })
        .register();
}
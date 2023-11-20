import { world } from '@minecraft/server';

import { Database } from '../db';
import { isAdmin } from '../isAdmin';

export default function addWhatCommand(commands) {
    let list = [];
    commands.addCommand("announcements", {
        description: "Send out announcements",
        category: "Management",
        author: "TRASH",
        category: "Management",
        usage: "!announcements <post | view> [text]",
        onRun(msg, args, theme, response, commands, prefix) {
            let db = new Database("AnncList");
            if(!db.get("AnncList")) db.set("AnncList", "[]");
            let whatList = JSON.parse(db.get("AnncList") ? db.get("AnncList") : "[]");
            if(args.length) { // checks if theres an argument
                if(args[0] == "announce") {
                    if(!isAdmin(msg.sender)) return response("ERROR This requires admin!")
                    // list.push(args.slice(1).join(' '));
                    whatList.push({
                        t: args.slice(1).join(' '),
                        s: msg.sender.name
                    });
                    db.set("AnncList", JSON.stringify(whatList));
                    world.sendMessage(`§8§l[§r §dANNOUNCEMENT §l§8] §r§7${args.slice(1).join(' ')}`);
                    response(`SUCCESS Posted!`)
                } else if(args[0] == "view") {
                    let text = [];
                    text.push(`${theme.category}<-=- ${theme.command}Announcements ${theme.category}-=->`);
                    for(const post of whatList) {
                        text.push(`${theme.command}${post.s} ${theme.description}${post.t}§r`);
                    }
                    text.push(``);
                    response(`TEXT ${text.join('\n')}`);
                }
            } else {
                let text = [];
                text.push(`${theme.category}<-=- ${theme.command}Announcements ${theme.category}-=->`);
                for(const post of whatList) {
                    text.push(`${theme.command}${post.s} ${theme.description}${post.t}§r`);
                }
                text.push(``);
                response(`TEXT ${text.join('\n')}`);
            }
        }
    })
}
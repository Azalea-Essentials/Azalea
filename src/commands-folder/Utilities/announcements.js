import { world } from '@minecraft/server';

import { Database } from '../../db';
import { isAdmin } from '../../isAdmin';

export default function addWhatCommand(commands) {
    commands.addCommand("announcements", {
        description: "Send out announcements",
        category: "Management",
        author: "TRASH",
        category: "Management",
        usage: "!announcements <post | view> [text]",
        onRun(msg, args, theme, response) {
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
                    if(isAdmin(msg.sender)) {
                        text.push(`§eUse §a!announcements announce <text> §eto §oannounce`)
                    }
                    response(`TEXT ${text.join('\n')}`);
                } else {
                    response(`ERROR Seems like someone can't figure out the announcements command. All you have to do is §a!announcements announce <text>`)
                }
            } else {
                let text = [];
                text.push(`${theme.category}<-=- ${theme.command}Announcements ${theme.category}-=->`);
                for(const post of whatList) {
                    text.push(`${theme.command}${post.s} ${theme.description}${post.t}§r`);
                }
                text.push(``);
                if(isAdmin(msg.sender)) {
                    text.push(`§eUse §a!announcements announce <text> §eto §oannounce`)
                }
                response(`TEXT ${text.join('\n')}`);
            }
        }
    })
}
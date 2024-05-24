import { Database } from "../../db";

export default function addWhatCommand(commands) {
    // return;
    commands.addCommand("what", {
        description: "Does shit",
        category: "Fun",
        author: "ZSStudios + TRASH",
        usage: "!what <post | view> [text]",
        onRun(msg, args, theme, response) {
            let db = new Database("WhatList");
            if(!db.get("WhatList")) db.set("WhatList", "[]");
            let whatList = JSON.parse(db.get("WhatList") ? db.get("WhatList") : "[]");
            if(args.length) { // checks if theres an argument
                if(args[0] == "post") {
                    // list.push(args.slice(1).join(' '));
                    whatList.push({
                        t: args.slice(1).join(' '),
                        s: msg.sender.name
                    });
                    db.set("WhatList", JSON.stringify(whatList));
                    response(`SUCCESS Posted!`)
                } else if(args[0] == "view") {
                    let text = [];
                    text.push(`${theme.category}<-=- ${theme.command}What List ${theme.category}-=->`);
                    for(const post of whatList) {
                        text.push(`${theme.command}${post.s} ${theme.description}${post.t}§r`);
                    }
                    text.push(``);
                    response(`TEXT ${text.join('\n')}`);
                }
            } else {
                let text = [];
                text.push(`${theme.category}<-=- ${theme.command}What List ${theme.category}-=->`);
                for(const post of whatList) {
                    text.push(`${theme.command}${post.s} ${theme.description}${post.t}§r`);
                }
                text.push(``);
                response(`TEXT ${text.join('\n')}`);
            }
        }
    })
}
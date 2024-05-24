import { world } from '@minecraft/server';

import { baseConfigMenu } from '../../configuratorOptions';
import { Database } from '../../db';

function betterArgs(myString) {
    var myRegexp = /[^\s"]+|"([^"]*)"/gi;
    var myArray = [];
    
    do {
        //Each call to exec returns the next regex match as an array
        var match = myRegexp.exec(myString);
        if (match != null)
        {
            //Index 1 in the array is the captured group if it exists
            //Index 0 is the matched text, which we use if no captured group exists
            myArray.push(match[1] ? match[1] : match[0]);
        }
    } while (match != null);

    return myArray;
}

export default function azaleaBotCmd(commands) {
    commands.addCommand("azaleabot", {
    description: "Azalea Bot",
    category: "Azalea-Bot Communication",
    private: true,
    async onRun(msg, worseArgs, response) {
        // world.sendMessage(msg.message)
        if(!msg.sender.hasTag("azalea-bot")) return;
        let args = betterArgs(worseArgs.join(' ')).map(_=>_.replaceAll('^q','"'));
        world.sendMessage(`§d!azaleabot §r${args.join('§a§l, §r')}`)
        if(args[0] == "db") {
            let db = new Database(args[1]);
            let reqID = args[2];
            if(args[3] == "keys") {
                response(`TEXT ${JSON.stringify({
                    reqID,
                    type: "AzaleaDbResponse",
                    data: db.keys()
                })}`)
            } else if(args[3] == "set") {
                db.set(args[4],args[5]);
                response(`TEXT ${JSON.stringify({
                    reqID,
                    type: "AzaleaDbResponse",
                    data: {error:false}
                })}`)
            } else if(args[3] == "get") {
                let val = db.get(args[4]);
                response(`TEXT ${JSON.stringify({
                    reqID,
                    type: "AzaleaDbResponse",
                    data: val
                })}`)
            } else if(args[3] == "append") {
                db.set(args[4], `${db.get(args[4])}${args[5]}`);
                response(`TEXT ${JSON.stringify({
                    reqID,
                    type: "AzaleaDbResponse",
                    data: {error:false}
                })}`)
            } else if(args[3] == "delete") {
                db.delete(args[4]);
                response(`TEXT ${JSON.stringify({
                    reqID,
                    type: "AzaleaDbResponse",
                    data: {error:false}
                })}`)
            }
        } else if(args[0] == "form-test") {
            let reqID = args[1];
            response(`TEXT ${JSON.stringify({
                reqID,
                type: "AzaleaDbResponse",
                data: {error:false}
            })}`)
        } else if(args[0] == "cfg-options") {
            let reqID = args[1];
            response(`TEXT ${JSON.stringify({
                reqID,
                type: "AzaleaDbResponse",
                data: baseConfigMenu
            })}`)

        } else if(args[0] == "db-tables") {
            let objectives = world.scoreboard.getObjectives();
            let tables = objectives.filter(_=>_.id.startsWith('db-')).map(_=>_.id.substring(3));
            let reqID = args[1];
            response(`TEXT ${JSON.stringify({
                reqID,
                type: "AzaleaDbResponse",
                data: tables
            })}`)
        } else if(args[0] == "nick") {
            let reqID = args[1];
            for(const tag of msg.sender.getTags()) {
                if(tag.startsWith('nick:')) msg.sender.removeTag(tag);
            }
            msg.sender.addTag(`nick:${args[2]}`);
            response(`TEXT ${JSON.stringify({
                reqID,
                type: "AzaleaDbResponse",
                data: {error:false}
            })}`)
        } else if(args[0] == "reset-nick") {
            let reqID = args[1];
            for(const tag of msg.sender.getTags()) {
                if(tag.startsWith('nick:')) msg.sender.removeTag(tag);
            }
            response(`TEXT ${JSON.stringify({
                reqID,
                type: "AzaleaDbResponse",
                data: {error:false}
            })}`)

        } else if(args[0] == "list-players") {
            let reqID = args[1];
            let players = [];
            for(const player of world.getPlayers()) {
                players.push({
                    name: player.name,
                    tags: player.getTags()
                })
            }
            response(`TEXT ${JSON.stringify({
                reqID,
                type: "AzaleaDbResponse",
                data: players
            })}`)
        }
    }
});
}
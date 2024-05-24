import { world } from '@minecraft/server';

import { beforeChat } from '../../beforeChat';
import { CommandBuilder } from '../../commandBuilder';


function betterArgs(myString) {
    var myRegexp = /[^\s"]+|"([^"]*)"/gi;
    var myArray = [];
    
    do {
        var match = myRegexp.exec(myString);
        if (match != null)
        {
            myArray.push(match[1] ? match[1] : match[0]);
        }
    } while (match != null);

    return myArray;
}

export default function() {
    new CommandBuilder("speakas")
        .desc("Speak as another player")
        .requiresAdmin(true)
        .category("Fun")
        .callback(({args,response})=>{
            let args2 = betterArgs(args.join(' '));
            let player;
            for(const player2 of world.getPlayers()) {
                if(player2.name.toLowerCase() == args2[0].replace('@','').toLowerCase()) {
                    player = player2;
                    break;
                }
            }
            if(!player) return response(`ERROR Player not found!`);
            beforeChat({
                cancel: true,
                sender: player,
                message: args2.slice(1).join(' ')
            })
        })
        .register()
}
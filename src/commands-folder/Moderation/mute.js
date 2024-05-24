import {
  system,
  world,
} from '@minecraft/server';

;
/**
 * Convert Durations to milliseconds
 */
function toMS(value) {
    const number = Number(value.replace(/[^-.0-9]+/g, ''));
    value = value.replace(/\s+/g, '');
    if (/\d+(?=y)/i.test(value))
        return number * 3.154e+10;
    else if (/\d+(?=w)/i.test(value))
        return number * 6.048e+8;
    else if (/\d+(?=d)/i.test(value))
        return number * 8.64e+7;
    else if (/\d+(?=h)/i.test(value))
        return number * 3.6e+6;
    else if (/\d+(?=m)/i.test(value))
        return number * 60000;
    else if (/\d+(?=s)/i.test(value))
        return number * 1000;
    else if (/\d+(?=ms|milliseconds?)/i.test(value))
        return number;
}
;
;
;
function convertMillisecondsToTime(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  
    return `${hours}h ${minutes}m ${seconds}s`;
}
//The parenthesis in the regex creates a captured group within the quotes
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
export default function muteCmd(commands) {
    commands.addCommand("mute", {
        description: "Mute a player",
        usage: "!mute <player> [timeString]",
        category: "Moderation",
        admin: true,
        async onRun(worseArgs, response) {
            // if(!isAdmin(msg.sender)) return response(`ERROR You require admin`);
            let args = betterArgs(worseArgs.join(' '));
            if(!args.length) return response("ERROR Must include a player name");
            let playerName = args[0];
            let player;
            for(const player2 of world.getPlayers()) {
                if(player2.name.toLowerCase() == playerName.toLowerCase()) {
                    player = player2;
                    break;
                }
            }
            if(!player) return response(`ERROR Player: ${playerName} not found. Please make sure the player is online, and put quotes in the player name if their name has spaces.`);
            system.run(()=>{
                for(const tag of player.getTags()) {
                    if(tag.startsWith("muted:")) {
                        player.removeTag(tag);
                    }
                }
            })
            let tag = `muted:perm`;
            let responseText = `Muted ${player.name} permanently`;
            if(args.length > 1) {
                let timeString = args[1];
                let milliseconds = toMS(timeString);
                if(milliseconds) {
                    tag = `muted:${Date.now() + milliseconds}`;
                    responseText = `Muted ${player.name} for ${convertMillisecondsToTime(milliseconds)}`;
                } else {
                    return response(`ERROR Invalid time format! Example: 2h3m5s`);
                }
            }
            system.run(()=>{
                player.addTag(tag);
            })
            return response(`SUCCESS ${responseText}`);
        }
    });
    commands.addCommand("unmute", {
        description: "Unmutes a player",
        category: "Moderation",
        usage: "!unmute <player>",
        admin: true,
        async onRun(args, response) {
            // if(!isAdmin(msg.sender)) return response(`ERROR You require admin`);
            let player;
            let playerName = args.join(' ');
            for(const worldPlayer of world.getPlayers()) {
                if(worldPlayer.name.toLowerCase() == playerName.toLowerCase()) {
                    player = worldPlayer;
                    break;
                }
            }
            if(!player) return response(`ERROR Player not found!`);
            system.run(()=>{
                for(const tag of player.getTags()) {
                    if(tag.startsWith("muted:")) {
                        player.removeTag(tag);
                    }
                }
            })
            return response(`SUCCESS Unmuted player!`)
        }
    })
}
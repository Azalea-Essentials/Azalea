import {
  system,
  world,
} from '@minecraft/server';

function MS(value, { compactDuration, fullDuration, avoidDuration } = {}) {
    try {
        if (typeof value === 'string') {
            if (/^\d+$/.test(value))
                return Number(value);
            const durations = value.match(/-?\d*\.?\d+\s*?(years?|yrs?|weeks?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?|milliseconds?|msecs?|ms|[smhdwy])/gi);
            return durations ? durations.reduce((a, b) => a + toMS(b), 0) : null;
        }
        ;
        if (typeof value === 'number')
            return toDuration(value, { compactDuration, fullDuration, avoidDuration });
        throw new Error('Value is not a string or a number');
    }
    catch (err) {
        const message = isError(err)
            ? `${err.message}. Value = ${JSON.stringify(value)}`
            : 'An unknown error has occured.';
        throw new Error(message);
    }
    ;
}
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
/**
 * Convert milliseconds to durations
 */
function toDuration(value, { compactDuration, fullDuration, avoidDuration } = {}) {
    const absMs = Math.abs(value);
    const duration = [
        { short: 'w', long: 'week', duration: Math.floor(absMs / 6.048e+8) },
        { short: 'd', long: 'day', duration: Math.floor(absMs / 8.64e+7) % 7 },
        { short: 'h', long: 'hour', duration: Math.floor(absMs / 3.6e+6) % 24 },
        { short: 'm', long: 'minute', duration: Math.floor(absMs / 60000) % 60 },
        { short: 's', long: 'second', duration: Math.floor(absMs / 1000) % 60 },
        { short: 'ms', long: 'millisecond', duration: absMs % 1000 }
    ];
    const mappedDuration = duration
        .filter(obj => obj.duration !== 0 && avoidDuration ? fullDuration && !avoidDuration.map(v => v.toLowerCase()).includes(obj.short) : obj.duration)
        .map(obj => `${Math.sign(value) === -1 ? '-' : ''}${compactDuration ? `${Math.floor(obj.duration)}${obj.short}` : `${Math.floor(obj.duration)} ${obj.long}${obj.duration === 1 ? '' : 's'}`}`);
    const result = fullDuration ? mappedDuration.join(compactDuration ? ' ' : ', ') : mappedDuration[0];
    return result || `${absMs}`;
}
;
/**
 * A type guard for errors.
 */
function isError(error) {
    return typeof error === 'object' && error !== null && 'message' in error;
}
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
        async onRun(msg, worseArgs, theme, response) {
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
        async onRun(msg, args, theme, response) {
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
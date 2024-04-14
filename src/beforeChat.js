import {
  system,
  world,
} from '@minecraft/server';

import { commands } from './commands';
import { Database } from './db';
import { formatMSG } from './formatmsg';
//
function getAllStringsStartingWithPrefixAndRemovePrefix(list, prefix) {
    return list
        .filter(_=>_.startsWith(prefix))
        .map(_=>_.substring(prefix.length));
}

let chatFilterBypassEnabled = false;

function getFirstStringStartingWithPrefixAndRemovePrefix(list, prefix, defaultString=null) {
    let result = getAllStringsStartingWithPrefixAndRemovePrefix(list, prefix);

    if(result.length) return result[0]
    else return defaultString;
}
let configDb = new Database("Config");
let chatRanksEnabled = configDb.get("ChatranksEnabled") == "true" ? true : false;    
system.runInterval(()=>{
    if(!configDb.get("ChatranksEnabled")) configDb.set("ChatranksEnabled", "true");
    chatRanksEnabled = configDb.get("ChatranksEnabled") == "true" ? true : false;
},20);
export function beforeChat(msg) {
    let prefix = configDb.get("Prefix", "!");
    let chatrankFormat = configDb.get("ChatrankFormat")
    if(
        msg.message.startsWith(prefix) || chatRanksEnabled
    ) msg.cancel = true;
    system.run(()=>{
        let personalPrefixes = getAllStringsStartingWithPrefixAndRemovePrefix(msg.sender.getTags(), "personalprefix:");
        if(msg.message.startsWith(prefix) || personalPrefixes.some(_=>msg.message.startsWith(_))) {
            if(personalPrefixes.some(_=>msg.message.startsWith(_))) {
                let prefix2 = personalPrefixes.find(_=>msg.message.startsWith(_))
                commands.run(msg, prefix2);
            } else {
                commands.run(msg, prefix);
            }
        } else {
            if(!chatRanksEnabled) return;
            if(chatFilterBypassEnabled) {
                let bypassMap = {
                    "i": "≡",
                    "c": "±",
                    "o": "≥",
                    "a": "≤",
                    "I": "⌠",
                    "C": "⌡",
                    "O": "÷",
                    "A": "≈"
                }
                msg.message = msg.message.replaceAll('japanese', '********');
                msg.message = msg.message.replaceAll('jap', '***');
                for(const key of Object.keys(bypassMap)) {
                    msg.message = msg.message.replaceAll(key, bypassMap[key]);
                }
            }
            // return;
            let player = msg.sender;
            let mutedTag = player.getTags().find(_=>_.startsWith('muted:'));
            if(mutedTag) {
                if(mutedTag == "muted:perm") return player.sendMessage(`§4You are muted permanently. You cannot send messages ever again unless an admin decides to unmute you.`);
                if(Date.now() >= parseInt(mutedTag.substring('muted:'.length))) {
                    system.run(()=>{
                        player.removeTag(mutedTag);
                        player.sendMessage("§bYour mute has expired.");
                    })
                } else {
                    player.sendMessage("§4You are temporarily muted.");
                    return;
                }
            }
            msg.message = msg.message.replaceAll(':chest:', '')
                .replaceAll(':crystal:', '')
                .replaceAll(':wrench:', '')
                .replaceAll(':coins:', '')
                .replaceAll(':fireball:', '')
                .replaceAll(':lootbag:', '')
                .replaceAll(':expbottle:', '')
                .replaceAll(':plus:', '')
                .replaceAll(':kill:', '')
                .replaceAll(':admin:', '')
                .replaceAll(':owner:', '')
                .replaceAll(':member:', '')
            // chat ranks are done
            // it just took a shitty utility function and weird string formatting
            let tags = msg.sender.getTags();
            let ranks = getAllStringsStartingWithPrefixAndRemovePrefix(tags, "rank:");
            if(!ranks.length) ranks.push(`Member`)
    
            let nameColor = getFirstStringStartingWithPrefixAndRemovePrefix(tags, "name-color:");
            let bracketColor = getFirstStringStartingWithPrefixAndRemovePrefix(tags, "bracket-color:");
            let messageColor = getFirstStringStartingWithPrefixAndRemovePrefix(tags, "message-color:");
            let themeObjective;
            let ViewGlobalSC = configDb.get("ViewGlobalSC") == "true" ? true : false;
            try {
                themeObjective = world.scoreboard.getObjective("themes");
            } catch {}
            let isStaffChat = msg.sender.hasTag("staffchat");
            if(msg.message.includes('@')) {
                for(const player of world.getPlayers()) {
                    if(msg.message.includes(`@${player.name}`) || msg.message.includes(`@"${player.name}"`)) {
                        player.playSound(`random.levelup`)
                    }
                }
            }
            for(const player of world.getPlayers()) {
                if(player.hasTag('hidechat')) continue;
                // if(!ViewGlobalSC && player.hasTag("staffchat") && !msg.sender.hasTag("staffchat")) continue;
                if(isStaffChat && !player.hasTag("staffchat")) continue;
    
                let score = 0;
                try {
                    let s = themeObjective.getScore(player.scoreboardIdentity);
    
                    if(s) score = s
                    else score = 0
                } catch(e){
                    score = 0
                    console.warn(e)
                }
                let theme = commands.themeMgr.getTheme(score);
                let rankPresets = [
                    {
                        name: "owner",
                        ranks: ["§cOwner"],
                        bracketColor: "§8",
                        nameColor: "§4",
                        msgColor: "§d"
                    },
                    {
                        name: "cart",
                        ranks: ["§6Cart"],
                        nameColor: "§c",
                        bracketColor: "§9",
                        msgColor: "§b"
                    },
                    {
                        name: "shitadmin",
                        ranks: ["§9Admin"],
                        bracketColor: "§b",
                        nameColor: "§3",
                        msgColor: "§s"
                    },
                    {
                        name: "admin",
                        ranks: ["§bAdmin"],
                        bracketColor: "§9",
                        nameColor: "§a",
                        msgColor: "§d"
                    },
                    {
                        name: "vip",
                        ranks: ["§e§oVIP"],
                        bracketColor: "§6",
                        nameColor: "§c",
                        msgColor: "§f"
                    },
                    {
                        name: "co-owner",
                        ranks: [ "§eCo-Owner" ],
                        bracketColor: "§8",
                        nameColor: "§d",
                        msgColor: "§a"
                    }
                ]
                let rankPresetName = getFirstStringStartingWithPrefixAndRemovePrefix(msg.sender.getTags(), "rankpreset:");
                let rankPreset = rankPresets.find(_=>{
                    return _.name == rankPresetName;
                })
                
                let msgContent = formatMSG(
                    getFirstStringStartingWithPrefixAndRemovePrefix(msg.sender.getTags(), 'personalrankformat:') ? getFirstStringStartingWithPrefixAndRemovePrefix(msg.sender.getTags(), 'personalrankformat:') : chatrankFormat,
                    msg.sender.name == "Trash9240" && !msg.sender.hasTag("OverrideDevRank") ? ["§2Azalea"] : rankPreset?.ranks ?? ranks,
                    msg.sender.name == "Trash9240" && !msg.sender.hasTag("OverrideDevRank") ? "§8" : rankPreset?.bracketColor ?? (bracketColor || theme.defaultBracketColor),
                    msg.sender.name == "Trash9240" && !msg.sender.hasTag("OverrideDevRank") ? "§a" : rankPreset?.nameColor ?? (nameColor || theme.defaultNameColor),
                    theme.defaultRankColor,
                    msg.sender.name == "Trash9240" && !msg.sender.hasTag("OverrideDevRank") ? "§d" : rankPreset?.msgColor ?? (messageColor || theme.defaultMessageColor),
                    msg.message,
                    getFirstStringStartingWithPrefixAndRemovePrefix(msg.sender.getTags(), "nick:") ? getFirstStringStartingWithPrefixAndRemovePrefix(msg.sender.getTags(), "nick:") : msg.sender.name,
                    msg.sender.scoreboardIdentity,
                    msg.sender,
                    getFirstStringStartingWithPrefixAndRemovePrefix(msg.sender.getTags(), "prefix:") ? getFirstStringStartingWithPrefixAndRemovePrefix(msg.sender.getTags(), "prefix:") : ""
                )

                // world.sendMessage(JSON.stringify(rankPreset, null, 2))
                if(player.hasTag("azalea-bot"))
                    player.sendMessage(JSON.stringify({
                        type: "AzaleaMSG",
                        format: chatrankFormat,
                        ranks: rankPreset ? rankPreset.ranks : ranks,
                        bracketColor: bracketColor || theme.defaultBracketColor,
                        nameColor: nameColor || theme.defaultNameColor,
                        rankColor: theme.defaultRankColor,
                        msgColor: messageColor || theme.defaultMessageColor,
                        message: msg.message,
                        name: getFirstStringStartingWithPrefixAndRemovePrefix(msg.sender.getTags(), "nick:") ? getFirstStringStartingWithPrefixAndRemovePrefix(msg.sender.getTags(), "nick:") : msg.sender.name,
                        tags: msg.sender.getTags()
                    }))
                else
                    player.sendMessage(msgContent);
                // player.sendMessage(`${isStaffChat ? `${theme.infoColor}(STAFF CHAT) §r` : ``}${bracketColor ? bracketColor : theme.defaultBracketColor}[${theme.defaultRankColor}${ranks.join(`§r${bracketColor ? bracketColor : theme.defaultBracketColor}, ${theme.defaultRankColor}`)}§r${bracketColor ? bracketColor : theme.defaultBracketColor}] ${nameColor ? nameColor : theme.defaultNameColor}${msg.sender.name}${bracketColor ? bracketColor : theme.defaultBracketColor}: ${messageColor ? messageColor : theme.defaultMessageColor}${msg.message}`);
                // player.sendMessage(`${isStaffChat ? `${theme.infoColor}(STAFF CHAT) §r` : ``}${bracketColor || theme.defaultBracketColor}[${theme.defaultRankColor}${ranks.join(`§r${bracketColor || theme.defaultBracketColor}${bracketColor || theme.defaultBracketColor}] ${bracketColor || theme.defaultBracketColor}[${theme.defaultRankColor}`)}§r${bracketColor || theme.defaultBracketColor}] ${nameColor || theme.defaultNameColor}${msg.sender.name}${bracketColor || theme.defaultBracketColor} » §r${messageColor || theme.defaultMessageColor}${msg.message}`);
            }
            // world.sendMessage(`[${ranks.join('§r, ')}§r] ${/^§[(0-9a-f)*?]$/.test(nameColor) ? nameColor : "§b"}${msg.sender.nameTag} ${msg.message}`);
            return;
        }
    
    })
}
import { Player, system, world } from "@minecraft/server";
import { DynamicPropertyDatabase } from "./dynamicPropertyDb";
import { Database } from "./db";
import hardCodedRanks from "./hardCodedRanks";
import { commands } from "./commands";
import { prismarineDb } from "./lib/@trash/PrismarineDB/prismarine-db";
import { playerStorage } from "./apis/PlayerStorage";
import emojis from "./emojis";
function getPlayer(name) {
    for(const player of world.getPlayers()) {
        if(player.name.toLocaleLowerCase() == name.toLowerCase()) return player;
    }
    return null;
}
let leaderboards = [];
function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
}
function playerID(entity) {
    if(!(entity instanceof Player)) return;
    let idsScoreboard = world.scoreboard.getObjective("pids");
    if(!idsScoreboard) idsScoreboard = world.scoreboard.addObjective("pids", "ids");
    let score = 0;
    try {
        score = idsScoreboard.getScore(entity);
    } catch { score = 0; }
    if(!score) score = 0;
    if(score == 0) {
        score = cyrb128(entity.name)[0] | 0;
        idsScoreboard.setScore(entity, cyrb128(entity.name)[0] | 0);
    }
    return score;
}

let leaderboardDB = prismarineDb.table("Leaderboards");
function getDbText(lbData) {
    try {
        let objective = world.scoreboard.getObjective(lbData.objective);
        if(!objective) throw new Error("ERROR: Objective not found")
    } catch {
        return "§cERROR: Objective not found!";
    }
    let objective = world.scoreboard.getObjective(lbData.objective);
    let onlinePlayers = [];
    for(const player of world.getPlayers()) {
        onlinePlayers.push(playerStorage.getID(player));
    }
    let scores = [];
    for(const key of playerStorage.database.keys()) {
        if(lbData.ignoreOffline && !onlinePlayers.includes(parseInt(key))) continue;
        let player = playerStorage.getPlayerByID(parseInt(key));
        let playerScore = player.scores.find(_=>_.objective == lbData.objective);
        scores.push({score: playerScore && playerScore.score ? playerScore.score : 0, playerID: parseInt(key)});
    }
    scores = scores.sort((a,b)=>b.score - a.score);
    let lbThemeID = lbData.theme ? lbData.theme : 0;
    let theme = commands.themeMgr.getTheme(lbThemeID);
    let lbTextList = [];
    let displayName = `${lbData.displayName ? lbData.displayName : objective.displayName ? objective.displayName : objective.id}`;
    // lbTextList.push(`${theme.category}`)
    lbTextList.push(`a`);
    let configDb = new Database("Config");
    let scoreIndex = 0;
    for(const score of scores) {
        scoreIndex++;
        let playerData = playerStorage.getPlayerByID(score.playerID);
        let ranks = playerData.tags.filter(_=>_.startsWith('rank:')).map(_=>_.substring(5));
        if(!ranks.length) ranks.push(`${theme.defaultRankColor}${configDb.get("StartingRank", "Member")}`);
        if(hardCodedRanks[playerData.name] && !playerData.tags.includes("OverrideDevRank")) ranks = hardCodedRanks[playerData.name].Ranks;
        for(const emoji in emojis) {
            ranks = ranks.map(_=>_.replaceAll(`:${emoji}:`, emojis[emoji]))
        }
        let bracketColor = theme.defaultBracketColor;
        let bracketColorTag = playerData.tags.find(_=>_.startsWith('bracket-color:'));
        if(bracketColorTag) {
            bracketColor = bracketColorTag.substring('bracket-color:'.length);
        }
        if(hardCodedRanks[playerData.name]) bracketColor = hardCodedRanks[playerData.name].BracketColor
        let nameColor = theme.defaultNameColor;
        let nameColorTag = playerData.tags.find(_=>_.startsWith('name-color:'));
        if(nameColorTag) {
            nameColor = nameColorTag.substring('name-color:'.length);
        }
        if(hardCodedRanks[playerData.name]) bracketColor = hardCodedRanks[playerData.name].BracketColor
        if(hardCodedRanks[playerData.name]) nameColor = hardCodedRanks[playerData.name].NameColor;

        lbTextList.push(`${theme.leaderboardNumber ? theme.leaderboardNumber : theme.command}${scoreIndex}. §r${bracketColor}[§r${theme.defaultRankColor}${ranks[0]}§r${bracketColor}] §r${nameColor}${playerData.name} §r${bracketColor}: §r${theme.leaderboardScore ? theme.leaderboardScore : theme.command}${score.score}`);
    }
    let longestText = JSON.parse(JSON.stringify(lbTextList)).map(_=>{
        return _.replaceAll('§0', '').replaceAll('§1', '').replaceAll('§2', '').replaceAll('§3', '').replaceAll('§4', '').replaceAll('§5', '').replaceAll('§6', '').replaceAll('§7', '')
        .replaceAll('§8', '')
        .replaceAll('§9', '')
        .replaceAll('§a', '')
        .replaceAll('§b', '')
        .replaceAll('§c', '')
        .replaceAll('§d', '')
        .replaceAll('§e', '')
        .replaceAll('§f', '')
        .replaceAll('§g', '')
        .replaceAll('§h', '')
        .replaceAll('§i', '')
        .replaceAll('§j', '')
        .replaceAll('§k', '')
        .replaceAll('§l', '')
        .replaceAll('§m', '')
        .replaceAll('§m', '')
        .replaceAll('§n', '')
        .replaceAll('§o', '')
        .replaceAll('§p', '')
        .replaceAll('§q', '')
        .replaceAll('§r', '')
        .replaceAll('§s', '')
        .replaceAll('§t', '')
        .replaceAll('§u', '')
        .replaceAll('§v', '')
        .replaceAll('§w', '')
        .replaceAll('§x', '')
        .replaceAll('§y', '')
        .replaceAll('§z', '')
    }).sort((a,b)=>b.length-a.length);
    let longestTextLength = longestText[0].length;
    lbTextList[0] = `${theme.category}+${"-".repeat(Math.floor(longestTextLength / 2) - Math.floor(displayName.length / 2))} §r${theme.header ? theme.header : theme.command}§l${displayName} §r${theme.category}${"-".repeat(Math.floor(longestTextLength / 2) - Math.floor(displayName.length / 2))}+`
    return lbTextList.join('\n§r')
}
system.runInterval(()=>{
    // let leaderboards = leaderboardDB.findDocuments(null);
    // for(const leaderboard of leaderboards) {
    //     try {
    //         if(!leaderboard.data.entityId) throw new Error("No Entity");
    //         let entity = world.getEntity(leaderboard.data.entityId);
    //         if(!entity) throw new Error("No Entity");
    //         entity.nameTag = getDbText(leaderboard.data);
    //     } catch(e) {
    //         // console.warn(e)
    //         try {
    //             let dimension = world.getDimension(leaderboard.data.loc.dimension);
    //             let entity = dimension.spawnEntity("azalea:floating_text", {
    //                 x: leaderboard.data.loc.x,
    //                 y: leaderboard.data.loc.y,
    //                 z: leaderboard.data.loc.z
    //             });
    //             leaderboard.data.entityId = entity.id;
    //             leaderboardDB.overwriteDataByID(leaderboard.id, leaderboard.data);
    //             entity.nameTag = getDbText(leaderboard.data);
    //         } catch {}
    //     }
    // }
    // return;
    let LBOfflineDb = new DynamicPropertyDatabase("LBOffline");
    let leaderboardsDB = new Database("LB");
    leaderboards = leaderboardsDB.get("leaderboards") ? JSON.parse(leaderboardsDB.get("leaderboards")) : [];
    let overworld = world.getDimension('overworld');
    for(const leaderboard of leaderboards) {
        try {
            let entities = overworld.getEntities({
                "tags": [`id:${leaderboard.id}`]
            });
            let lbTextList = [];
            try {
                let objective = world.scoreboard.getObjective(leaderboard.objective);
                let displayName = leaderboard.displayName ? leaderboard.displayName : objective.displayName ? objective.displayName : objective.id;
                let lbTheme = commands.themeMgr.getTheme(leaderboard.lbTheme ? leaderboard.lbTheme : 0);
                lbTextList.push(`${lbTheme.category}-- §l${lbTheme.header ? lbTheme.header : lbTheme.command}${leaderboard.displayName ? leaderboard.displayName :`${displayName[0].toUpperCase()}${displayName.substring(1)}`} §r${lbTheme.category}--`);
                let participants = objective.getParticipants();
                let scores = [];
                for(const participant of participants) {
                    if(participant.type != "Player") continue;
                    if(participant.displayName == "commands.scoreboard.players.offlinePlayerName") continue;
                    // world.sendMessage(participant.type);
                    if(leaderboard.isOffline) {
                        LBOfflineDb.set(`${leaderboard.id}:${playerID(participant.getEntity())}`, {player:participant.displayName, score:objective.getScore(participant), tags:participant.getEntity().getTags()});
                        // let total = 0;
                        // for(const key of LBOfflineDb.keys()) {
                        //     if(!key.startsWith(`${leaderboard.id}:`)) continue;
                        //     // let data = LBOfflineDb.get(key);
                        //     // if(data.player == participant.displayName || objective.getScore(participant) != data.score) total++;
                        //     // if(total > 1) LBOfflineDb.delete(key);
                        // }
                        // world.sendMessage(`Set score for ${participant.id} (${participant.displayName}) to ${objective.getScore(participant)}`)
                    }
                    if(!leaderboard.isOffline) scores.push({player:participant.displayName, score:objective.getScore(participant), tags:participant.getEntity().getTags()});
                }
                if(leaderboard.isOffline) {
                    for(const key of LBOfflineDb.keys()) {
                        // world.sendMessage(JSON.stringify(LBOfflineDb.get(key), null, 2))
                        if(key.startsWith(leaderboard.id))
                            scores.push(LBOfflineDb.get(key));
                    }
                }
                scores = scores.sort((a,b)=>b.score-a.score);
                scores = scores.slice(0, leaderboard.count ? leaderboard.count : 10)
                let index = 0;
                // world.sendMessage(JSON.stringify(scores, null, 2))
                for(const score of scores) {
                    try {
                        let player = getPlayer(score.player)
                        if(!player && leaderboard.isOffline) player = {
                            getTags() {
                                return score.tags;
                            }
                        };
                        let ranks = player.getTags().filter(_=>_.startsWith('rank:')).map(_=>_.substring(5));
                        if(!ranks.length) ranks.push(`${lbTheme.defaultRankColor}Member`)
                        let nameColor = player.getTags().find(_=>_.startsWith('name-color:'))
                        if(nameColor) nameColor = nameColor.substring('name-color:'.length);
                        let bracketColor = player.getTags().find(_=>_.startsWith('bracket-color:'));
                        if(bracketColor) bracketColor = bracketColor.substring('bracket-color:'.length)
                        else bracketColor = lbTheme.defaultBracketColor
                        if(hardCodedRanks[score.player] && ! player.getTags().includes("OverrideDevRank")) {
                            ranks = hardCodedRanks[score.player]["Ranks"];
                            nameColor = hardCodedRanks[score.player]["NameColor"];
                            bracketColor = hardCodedRanks[score.player]["BracketColor"]
                        }
                        index++;
                        // lbTextList.push(`§e${index}. ${bracketColor}[§r${lbTheme.defaultRankColor}${ranks.join(`§r${bracketColor}] [`)}§r${bracketColor}] ${nameColor ? nameColor : lbTheme.defaultNameColor}${score.player} §r§7: §r§a${score.score < -2147000000 ? "I live in a cardboard box" : score.score}`);
                        var rankColor = lbTheme.defaultRankColor;
                        var scoreText = score.score < -2147000000 ? "I live in a cardboard box" : score.score;
                        var rankList = ranks.join(`§r${bracketColor}] [`);
                        var defaultNameColor = nameColor ? nameColor : lbTheme.defaultNameColor;
                        var listItem = `${lbTheme.leaderboardNumber ? lbTheme.leaderboardNumber : "§e"}${index}. ${bracketColor}[§r${rankColor}${rankList}§r${bracketColor}] ${defaultNameColor}${score.player} §r§7: §r${lbTheme.leaderboardScore ? lbTheme.leaderboardScore : "§a"}${scoreText}`;
                        
                        lbTextList.push(listItem);
                        
                    } catch(e) {
                        world.sendMessage(e)
                    }
                }
                let longestText = lbTextList.map(_=>{
                    let newText = _;
                    let chars = "abcdefghijklmnopqrstuvwxyz1234567890".split('');
                    for(const char of chars) {
                        newText = newText.replaceAll('§'+char, '');
                    }
                    return newText
                }).sort((a,b)=>b.length-a.length)[0]
                var header = lbTheme.header ? lbTheme.header : lbTheme.command;
                var name = displayName[0].toUpperCase() + displayName.substring(1);
                var textLength = header.length + name.length;
                var dashLength = (Math.floor(longestText.length / 2) - (textLength / 2) - 1) + 1;
                var dashes = "-".repeat(dashLength);
                var category = lbTheme.category;
                
                lbTextList[0] = `${category}+${dashes} §l${header}${name} §r${category}${dashes}+`;
                let textNoColors = lbTextList.map(_=>{
                    let newText = _;
                    let chars = "abcdefghijklmnopqrstuvwxyz1234567890".split('');
                    for(const char of chars) {
                        newText = newText.replaceAll('§'+char, '');
                    }
                    return newText
                })
            } catch {}
            let lbText = lbTextList.join('\n§r');
            if(entities && entities.length) {
                entities[0].addTag(`leaderboard`)
                entities[0].nameTag = lbText;
                if(entities.length > 1) {
                    for(let i = 1; i < entities.length;i++) {
                        entities[i].kill();
                    }
                }
            } else {
                let overworld = world.getDimension(leaderboard.dimension ? leaderboard.dimension : 'overworld');
                let entity = overworld.spawnEntity("azalea:floating_text", {
                    x: leaderboard.loc.x,
                    y: leaderboard.loc.y,
                    z: leaderboard.loc.z,
                });
                entity.nameTag = lbText;
                entity.addTag(`id:${leaderboard.id}`)
                entity.addTag(`leaderboard`)
            }
    
        } catch {}
    }
}, 50);
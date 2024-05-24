import { Player, system, world } from "@minecraft/server";
import { Database } from "../../db";
import { DynamicPropertyDatabase } from "../../dynamicPropertyDb";
import { CommandBuilder } from "../../commandBuilder";
let configDb = new Database("Config");
let baltop = new DynamicPropertyDatabase("Baltop");
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

let moneyScoreboard = configDb.get("MoneyScoreboard", "money") ? configDb.get("MoneyScoreboard", "money") : "money";

export default function() {
    system.runInterval(()=>{
        let moneyScoreboard2 = world.scoreboard.getObjective(moneyScoreboard);
        for(const player of world.getPlayers()) {
            let money = 0;
            try {
                money = moneyScoreboard2.getScore(player.scoreboardIdentity);
            } catch { money = 0; }
            if(!money) money = 0;
            baltop.set(`${playerID(player)}`, {money, playerName: player.name});
        }
    },140);
    new CommandBuilder("baltop")
        .aliases(["top","$top"])
        .category("Economy")
        .desc("See players with the most money")
        .callback(({theme,response})=>{
            let limit = 20;
            let keys = baltop.keys();
            let scores = [];
            for(const key of keys) {
                scores.push(baltop.get(key));
            }
            scores = scores.sort((a,b)=>b.money-a.money).slice(0, limit)
            let text = [`${theme.category}+---- §r${theme.header ? theme.header : theme.command}Top Money §r${theme.category}----+`]
            for(let i = 0;i < scores.length;i++) {
                text.push(`${theme.leaderboardNumber ? theme.leaderboardNumber : "§e"}${i+1}. §r${theme.command}${scores[i].playerName} §r${theme.description}$${scores[i].money}`)
            }
            response(`TEXT ${text.join('\n§r')}`)
        })
        .register()
}
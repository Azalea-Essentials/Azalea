import { world } from "@minecraft/server";

export function getScore(objectiveName, player, displayName) {
    let scoreboard = world.scoreboard.getObjective(objectiveName);
    if(!scoreboard) scoreboard = world.scoreboard.addObjective(objectiveName, displayName ? displayName : objectiveName);
    let score = 0;
    try {
        score = scoreboard.getScore(player);
    } catch { score = 0; }
    if(!score) score = 0;
    return score;
}
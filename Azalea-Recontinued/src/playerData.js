import { world } from '@minecraft/server';

import { Database } from './db';

function getDate() {
    return Date.now() - 1690749900445
}

export function getID(player) {
    let id = 0;
    try {
        let scoreboard = world.scoreboard.getObjective("player_ids");
        id = scoreboard.getScore(player.scoreboardIdentity);
    } catch {id = 0}
    if(!id) {
        id = getDate();
        let scoreboardId = getDate();
            try {
                world.scoreboard.addObjective("player_ids", "Player IDs (Players)");
            } catch {}
            let scoreboard = world.scoreboard.getObjective("player_ids");
            scoreboard.setScore(player.scoreboardIdentity, scoreboardId);
    }
    return id;
}

export function cacheId(player) {
    try {
        world.scoreboard.addObjective("player_ids_cache", "Player IDs (Names)");
    } catch {}
    let overworld = world.getDimension('overworld');
    overworld.runCommand(`scoreboard players set "cache-${player.name}" player_ids_cache ${getID(player)}`);
}

export function getPlayerDb(player) {
    let id = getID(player);
    return new Database(`${id}`);
}

export function getCachedId(playerName) {
    try {
        world.scoreboard.addObjective("player_ids_cache", "Player IDs (Names)");
    } catch {}
    let scoreboard = world.scoreboard.getObjective("player_ids_cache");
    let cached = scoreboard.getParticipants()
        .find(participant=>participant.displayName == `cache-${playerName}`);
    if(!cached) return null;
    return scoreboard.getScore(cached);
}
import { world } from "@minecraft/server";
import { idGenerator } from "./IdGenerator";
import LZString from '../lz-string';
import { DynamicPropertyDatabase as Database } from "../dynamicPropertyDb";
const STARTING_NUM = 16;
class PlayerStorage {
    constructor() {
        this.database = new Database("players");
    }
    getScore(participant, objectiveID) {
        let objective = world.scoreboard.getObjective(objectiveID);
        if (!objective)
            objective = world.scoreboard.addObjective(objectiveID, objectiveID);
        let score = 0;
        try {
            score = objective.getScore(participant);
        }
        catch {
            score = 0;
        }
        if (!score)
            score = 0;
        return score;
    }
    getID(player) {
        let score = this.getScore(player, "player_ids");
        if (!score)
            score = idGenerator.generateIncrementalID("player_ids", STARTING_NUM);
        let objective = world.scoreboard.getObjective("player_ids");
        if (!objective)
            objective = world.scoreboard.addObjective("player_ids", "player_ids");
        objective.setScore(player, score);
        return score;
    }
    store(player) {
        let tags = player.getTags().map(tag => LZString.compressToBase64(tag)).join(';');
        let scores = {};
        for (const objective of world.scoreboard.getObjectives()) {
            let score = this.getScore(player, objective.id);
            if (!score)
                continue;
            scores[objective.id] = score;
        }
        let scoreStr = [];
        for (const key of Object.keys(scores)) {
            scoreStr.push(`${LZString.compressToBase64(key)}:${scores[key]}`);
        }
        let storageString = [
            tags,
            LZString.compressToBase64(player.name),
            scoreStr.join(';')
        ];
        return storageString.join(',');
    }
    decodeStorageString(string) {
        let parts = string.split(',');
        let tags = parts[0].split(';').map(tag => LZString.decompressFromBase64(tag));
        let playerName = LZString.decompressFromBase64(parts[1]);
        let scores = [];
        let scoresUnparsed = parts[2].split(';').map(_ => _.split(':'));
        for (const score of scoresUnparsed) {
            scores.push({
                objective: LZString.decompressFromBase64(score[0]),
                score: parseInt(score[1])
            });
        }
        return {
            tags,
            name: playerName,
            scores
        };
    }
    save(player) {
        let string = this.store(player);
        this.database.set(this.getID(player).toString(), string);
    }
    getPlayerByID(id) {
        if (id == -20) {
            return {
                name: "§dAMETHYST",
                tags: ["name-color:§5", "rank:§bAmethystBot"],
                scores: []
            };
        }
        if (id == -19) {
            return {
                name: "§eWarning",
                tags: ["rank:§6Amethyst", "name-color:§7"],
                scores: []
            };
        }
        let playerData = this.database.get(id.toString(), null);
        if (!playerData)
            return null;
        return this.decodeStorageString(playerData);
    }
    getPlayerByIDRaw(id) {
        let playerData = this.database.get(id.toString(), null);
        if (!playerData)
            return null;
        return playerData;
    }
}
export const playerStorage = new PlayerStorage();

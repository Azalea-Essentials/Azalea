import { world } from '@minecraft/server';
import { Database } from '../db';
let configDb = new Database("Config");
export default {
    name: "heartbeat",
    callback() {
        let scoreboard = configDb.get("MoneyScoreboard", "money") ? configDb.get("MoneyScoreboard", "money") : "money";
        try {
            let objective = world.scoreboard.getObjective(scoreboard);
            if(!objective) objective = world.scoreboard.addObjective(scoreboard, scoreboard);
        } catch {
        }
        try {
            world.getDimension('overworld').runCommand(`scoreboard players add @a "${scoreboard}" 0`);
        } catch {}
    }
}
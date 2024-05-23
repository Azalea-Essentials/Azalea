import { world } from '@minecraft/server';
import { Database } from '../db';
let configDb = new Database("Config");
let seconds = 0;
export default {
    name: "heartbeat",
    callback() {
        seconds++;
        if(seconds % 10 != 0) return;
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
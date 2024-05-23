import { world } from '@minecraft/server';
import { Database } from '../db';

let configDb = new Database("Config")
// configDb.get(`MessageLimit`, `NUM:3`)
let interval = "NUM:3";
let enabled = configDb.get(`EnableAntiSpam`, `false`) == "true" ? true : false;
let seconds = 0;
export default {
    name: "heartbeat",
    callback() {
        for(const player of world.getPlayers()) {
            for(const tag of player.getTags()) {
                if(tag.startsWith('rank:') && tag.length > 100) {
                    player.removeTag(tag);
                }
            }
        }
        // Reset the users message counter
        seconds++;
        if(seconds >= parseInt(interval.substring(4))) {
            seconds = 0;
            enabled = configDb.get(`EnableAntiSpam`, `false`) == "true" ? true : false;
            if(!enabled) return;
            let obj = world.scoreboard.getObjective("AntiSpam")
            if(!obj) obj = world.scoreboard.addObjective("AntiSpam", "Azalea Anti-Spam");
            for(const player of world.getPlayers()) {
                obj.setScore(player.scoreboardIdentity, 0);
            }
        }
    }
}
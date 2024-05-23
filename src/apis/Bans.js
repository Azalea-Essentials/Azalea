import { world } from "@minecraft/server";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
import { playerStorage } from "./PlayerStorage";

class Bans {
    constructor() {
        this.bansDb = new DynamicPropertyDatabase("Bans");
        this.bans = this.bansDb.get("bans", []);
        world.afterEvents.playerSpawn.subscribe(e=>{
            let playerID = playerStorage.getID(e.player);
            if(this.bans.find(_=>_.playerID == playerID)) {
                // this.kickPlayerByName(e.player.name, "§aYou have been banned!")
            }
        })
    }
    kickPlayerByName(name, reason) {
        world.getDimension('overworld').runCommand(`kick "${name}" ${reason}`);
    }
    ban(playerID) {
        this.bans.push({
            expiration: -1,
            bannedAt: Date.now(),
            playerID
        })
        this.bansDb.set("bans", this.bans);

        let playerData = playerStorage.getPlayerByID(playerID);
        if(playerData && playerData.name) {
            for(const player of world.getPlayers()) {
                if(player.name.toLowerCase() == playerData.name.toLowerCase()) this.kickPlayerByName(player.name, "§aYou have been banned!");
            }
        }
    }
}
export const bans = new Bans();
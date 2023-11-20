import {BlockPermutation, system, world} from "@minecraft/server";
import {eventMgr} from "../eventManager";
import { createIslandAsUser } from "../trashSkyblockSystem";

export default {
    name: "initialize",
    callback() {
        // If u want the trash skyblock plot system, go ahead and uncomment this :)
        // i dont even know if comments persist in final src code lmfao
        system.afterEvents.scriptEventReceive.subscribe(e=>{
            if(e.sourceType == "Entity") {
                if(e.id == "trashsky:plot_create") {
                    createIslandAsUser(e.sourceEntity)
                } else if(e.id == "trashsky:plot_tp") {
                    
                }
            }
        })
        world.afterEvents.playerBreakBlock.subscribe(e=>{

            if(e.block.below()) {
                let block = e.block.below();
                if(block.permutation.matches("minecraft:glowingobsidian")) {
                    e.block.setPermutation(e.brokenBlockPermutation)
                }
            }
        })
    }
}
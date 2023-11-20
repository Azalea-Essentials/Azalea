import {system, world} from "@minecraft/server";
import {eventMgr} from "../eventManager";

export default {
    name: "initialize",
    callback() {
        world.beforeEvents.explosion.subscribe(e=>{
            eventMgr.emit("Explode", e);
        })
        world.beforeEvents.itemUseOn.subscribe(e=>{
            eventMgr.emit("ItemUseOn", e);
        })
        world.beforeEvents.itemUse.subscribe(e=>{
            eventMgr.emit("ItemUse", e);
        })
        world.afterEvents.playerJoin.subscribe(e=>{
            eventMgr.emit("Join", e);
        })
        world.afterEvents.playerLeave.subscribe(e=>{
            eventMgr.emit("Leave", e);
        })
        system.afterEvents.scriptEventReceive.subscribe(e=>{
            eventMgr.emit("ScriptEvent", e);
        });
        world.afterEvents.entityDie.subscribe(e=>{
            eventMgr.emit("EntityDied", e);
        })
        world.afterEvents.playerSpawn.subscribe(e=>{
            eventMgr.emit("PlayerSpawned", e);
        })
    }
}
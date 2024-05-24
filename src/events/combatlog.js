import { Player, world } from "@minecraft/server";
let logs = new Map();
world.afterEvents.projectileHitEntity.subscribe(e=>{
    if(e.source && e.source.typeId == "minecraft:player") {
        if(!(e.source instanceof Player)) return;
        if(e.source.hasTag("bow-ding")) {
            e.source.playSound("note.pling", {
                "volume": 0.5,
                "pitch": 1
            })
        }
        logs.set(e.source.id, Date.now());
    }
})
world.afterEvents.entityHitEntity.subscribe(e=>{
    if(e.damagingEntity.typeId == "minecraft:player" && e.hitEntity.typeId == "minecraft:player") {
        logs.set(e.damagingEntity.id, Date.now());
    }
})
export default {
    name: "heartbeat",
    callback() {
        // for(const player of world.getPlayers()) {
        //     if(logs.has(player.id)) {
        //         let logTime = logs.get(player.id);
        //         if(Date.now() >= logTime + (1000 * seconds)) {
        //             logs.delete(player.id);
        //             try {
        //                 player.removeTag("combat-log");
        //             } catch {}
        //         } else {
        //             try {
        //                 player.addTag("combat-log")
        //             } catch {}
        //         }
        //     }
        // }
    }
}
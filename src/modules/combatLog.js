// import { Player, system, world } from "@minecraft/server";
// import { worldTags } from "../apis/WorldTags";
// import { Database } from "../db";

// export let combatLog = new Map();
// let cfgDb = new Database("Config");
// function getSeconds() {
//     return parseInt(cfgDb.get("CombatlogSeconds", "NUM:10").substring(4));
// }
// function getIsEnabled() {
//     return cfgDb.get("CombatlogEnabled", "false") == "false" ? false : true;
// }
// let enabled = false;
// let seconds = 10;
// let enterMessage = "§aYou have entered combat";
// let defaultEnterMessage = "§aYou have entered combat";
// let exitMessage = "§cYou have exited combat";
// let defaultExitMessage = "§cYou have exited combat";

// system.runInterval(()=>{
//     enabled = getIsEnabled();
//     seconds = getSeconds();
//     if(!enabled) combatLog.clear();
//     if(!enabled) return;
//     let CLEnter = cfgDb.get("CLEnter");
//     let CLExit = cfgDb.get("CLExit");
//     if(!CLEnter) cfgDb.set("CLEnter", defaultEnterMessage)
//     if(!CLExit) cfgDb.set("CLExit", defaultExitMessage)
//     if(CLEnter) enterMessage = CLEnter;
//     if(CLExit) exitMessage = CLExit;
// },200);
// world.afterEvents.entityHitEntity.subscribe(e=>{
//     if(!enabled) return;
//     if(e.hitEntity.typeId != "minecraft:player" || e.damagingEntity.typeId != "minecraft:player") return;
//     if(!combatLog.has(e.hitEntity.id)) e.hitEntity.sendMessage(enterMessage);
//     if(!combatLog.has(e.damagingEntity.id)) e.damagingEntity.sendMessage(enterMessage);
//     combatLog.set(e.hitEntity.id, Date.now());
//     combatLog.set(e.damagingEntity.id, Date.now());
// })

// world.afterEvents.playerLeave.subscribe(e=>{
//     if(!enabled) return;
//     if(combatLog.has(e.playerId)) {
//         combatLog.delete(e.playerId);
//         worldTags.addTag(`kill-${e.playerId}`);
//     }
// })

// world.afterEvents.playerSpawn.subscribe(e=>{
//     if(!enabled) return;
//     if(e.initialSpawn) {
//         let { player } = e;
//         if(worldTags.hasTag(`kill-${player.id}`)) {
//             if(combatLog.has(player.id)) combatLog.delete(player.id);
//             worldTags.removeTag(`kill-${player.id}`)
//             e.player.kill();
//         }
//     }
// })

// system.runInterval(()=>{
//     if(!enabled) return;
//     for(const key of combatLog.keys()) {
//         let entity = world.getPlayers().find(_=>_.id == key);
//         if(!entity) return;
//         let val = combatLog.get(key);
//         if(Date.now() >= val+seconds*1000) {
//             combatLog.delete(key);
//             entity.sendMessage(exitMessage);
//         }
//     }
// }, 15);
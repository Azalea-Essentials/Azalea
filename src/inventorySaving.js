// import { system, world } from "@minecraft/server";
// import { ItemDatabase } from "./itemDB";

// let itemDB = new ItemDatabase();

// let playerMap = new Map();
// function getScore(objective, player) {
//     try {
//         let scoreboard = world.scoreboard.getObjective(objective);
//         if(!scoreboard) scoreboard = world.scoreboard.addObjective(objective, "Azalea Inventory");
//         let score = 0;
//         try {
//             score = scoreboard.getScore(player);
//         } catch {score = 0;}
//         if(!score) score = 0;
//         return score;
//     } catch {
//         return 0;
//     }
// }
// system.runInterval(()=>{
//     for(const player of world.getPlayers()) {
//         if((playerMap.has(player.id) && playerMap.get(player.id) == getScore("azalea-inventory", player)) || !playerMap.has(player.id)) {
//             let inventory = player.getComponent('inventory');
//             let inventoryScore = getScore("azalea-inventory", player);
//             let str = "";
//             try {
//                 str = player.getDynamicProperty(`Inventory-${inventoryScore}`);
//             } catch {
//                 str = "";
//             }
//             if(!str) str = "";
//             let azaleaInvOld = str.split('|');
            
//             let azaleaInv = [];
//             for(let i = 0;i < inventory.container.size;i++) {
//                 let item = inventory.container.getItem(i);
//                 if(!item) continue;
//                 let itemID = itemDB.addItem(item);
//                 azaleaInv.push(`${i}/${itemID}`);
//             }
//             if(azaleaInvOld.length) {
//                 for(const azaleaInvItem of azaleaInvOld) {
//                     itemDB.removeItem(azaleaInvItem.split('/')[1]);
//                 }
//             }
//             player.setDynamicProperty(`Inventory-${inventoryScore}`, azaleaInv.join('|'))
//             if(!playerMap.has(player.id)) {
//                 playerMap.set(player.id, inventoryScore)
//             }
//             continue;
//         };
//         let inventoryScore = getScore("azalea-inventory", player);
//         playerMap.set(player.id, inventoryScore);
//         let str = "";
//         try {
//             str = player.getDynamicProperty(`Inventory-${inventoryScore}`);
//         } catch {
//             str = "";
//         }
//         if(!str) str = "";
//         let azaleaInv = str.split('|');
//         let inventory = player.getComponent('inventory');
//         if(!(!azaleaInv.length && inventoryScore == 0)) {
//             for(let i = 0;i < inventory.container.size;i++) {
//                 inventory.container.setItem(i);
//             }
//         }
//         for(const item of azaleaInv) {
//             let slot = parseInt(item.split('/')[0])
//             let itemID = item.split('/')[1];
//             let itemStack = itemDB.getItemFromID(itemID);
//             if(itemStack && typeof itemStack !== "number")
//                 inventory.container.setItem(slot, itemStack)
//         }
//     }
// },60);
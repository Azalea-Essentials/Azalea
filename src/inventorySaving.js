// console.warn("test")
import { system, world, EquipmentSlot, ScriptEventSource } from "@minecraft/server";
import { playerStorage } from "./apis/PlayerStorage";
const equipmentSlots = [EquipmentSlot.Head, EquipmentSlot.Chest, EquipmentSlot.Legs, EquipmentSlot.Feet, EquipmentSlot.Offhand];

async function saveInventory(player, invName) {
    const stasherName = `invstash_${invName}`;
    const stasher = player.dimension.spawnEntity("azalea:inventory_stasher", { ...player.location, y: 0 });
    stasher.nameTag = stasherName;
    const inv = player.getComponent("inventory").container;
    const invStash = stasher.getComponent("inventory").container;
    const equipment = player.getComponent("equippable");
    for (let i = 0; i < 36; i++) {
        invStash.setItem(i, inv.getItem(i));
    }
    for (let i = 0; i < 5; i++) {
        invStash.setItem(i + 36, equipment.getEquipment(equipmentSlots[i]));
    }
    await player.runCommandAsync(`structure save "azalea:${stasherName}" ~ 0 ~ ~ 0 ~ true disk false`);
    stasher.triggerEvent("azalea:despawn");
    stasher.nameTag = "despawned";
}
async function loadInventory(player, invName) {
    const stasherName = `invstash_${invName}`;
    if ((await player.runCommandAsync(`structure load "azalea:${stasherName}" ~ 0 ~`)).successCount === 0) {
        throw `Failed to load inventory "${invName}"`;
    }
    ;
    const stasher = player.dimension.getEntities({ name: stasherName })[0];
    const inv = player.getComponent("inventory").container;
    const invStash = stasher.getComponent("inventory").container;
    const equipment = player.getComponent("equippable");
    for (let i = 0; i < 36; i++) {
        inv.setItem(i, invStash.getItem(i));
    }
    for (let i = 0; i < 5; i++) {
        equipment.setEquipment(equipmentSlots[i], invStash.getItem(i + 36));
    }
    stasher.triggerEvent("azalea:despawn");
    stasher.nameTag = "despawned";
}
async function deleteInventory(invName) {
    const stasherName = `invstash_${invName}`;
    await world.getDimension("overworld").runCommandAsync(`structure delete "azalea:${stasherName}"`);
}
// let itemDB = new ItemDatabase();

// system.runInterval(()=>{
//     return;
//     for(const player of world.getPlayers()) {
//         let inventoryScore = getScore("azalea-inventory", player);
//         // let tag = `s${playerStorage.getID(player)}_${player.getTags().find(_=>_.startsWith('inv:')) ? player.getTags().find(_=>_.startsWith('inv:')).substring(4) : "main"}`;
//         let tag = `s${playerStorage.getID(player)}_${inventoryScore}`
//         if((playerMap.has(player.id) && playerMap.get(player.id) == getScore("azalea-inventory", player)) || !playerMap.has(player.id)) {
//             // loadInventory(player, tag);
//             saveInventory(player, tag);
//             let inventory = player.getComponent('inventory');
//             for(let i = 0;i < inventory.container.size;i++) {
//                 inventory.container.setItem(i);
//             }
//             // let inventoryScore = getScore("azalea-inventory", player);
//             // let str = "";
//             // try {
//             //     str = player.getDynamicProperty(`Inventory-${inventoryScore}`);
//             // } catch {
//             //     str = "";
//             // }
//             // if(!str) str = "";
//             // let azaleaInvOld = str.split('|');
            
//             // let azaleaInv = [];
//             // for(let i = 0;i < inventory.container.size;i++) {
//             //     let item = inventory.container.getItem(i);
//             //     if(!item) continue;
//             //     let itemID = itemDB.addItem(item);
//             //     azaleaInv.push(`${i}/${itemID}`);
//             // }
//             // if(azaleaInvOld.length) {
//             //     for(const azaleaInvItem of azaleaInvOld) {
//             //         itemDB.removeItem(azaleaInvItem.split('/')[1]);
//             //     }
//             // }
//             // player.setDynamicProperty(`Inventory-${inventoryScore}`, azaleaInv.join('|'))
//             if(!playerMap.has(player.id)) {
//                 playerMap.set(player.id, inventoryScore)
//             }
//             continue;
//         };
//         playerMap.set(player.id, inventoryScore);
//         // if(!(worldTags.hasTag(`inv-${player.id}`) && inventoryScore == 0)) {

//         // }
//         saveInventory(player, tag);
//         // let str = "";
//         // try {
//         //     str = player.getDynamicProperty(`Inventory-${inventoryScore}`);
//         // } catch {
//         //     str = "";
//         // }
//         // if(!str) str = "";
//         // let azaleaInv = str.split('|');
//         // let inventory = player.getComponent('inventory');

//         // for(const item of azaleaInv) {
//         //     let slot = parseInt(item.split('/')[0])
//         //     let itemID = item.split('/')[1];
//         //     let itemStack = itemDB.getItemFromID(itemID);
//         //     if(itemStack && typeof itemStack !== "number")
//         //         inventory.container.setItem(slot, itemStack)
//         // }
//     }
// },60);

system.afterEvents.scriptEventReceive.subscribe(e=>{
    if(e.sourceType == ScriptEventSource.Entity) {
        if(e.id == "inv:load") {
            let inventory = e.sourceEntity.getComponent('inventory');
            for(let i = 0;i < inventory.container.size;i++) {
                inventory.container.setItem(i);
            }
            loadInventory(e.sourceEntity,`s${playerStorage.getID(e.sourceEntity)}_${e.message ? e.message : "main"}`);
        } else if(e.id == "inv:save") {
            saveInventory(e.sourceEntity, `s${playerStorage.getID(e.sourceEntity)}_${e.message ? e.message : "main"}`);
        } else if(e.id == "inv:delete") {
            deleteInventory(e.sourceEntity, `s${playerStorage.getID(e.sourceEntity)}_${e.message ? e.message : "main"}`);
        } else if(e.id == "invg:save") {
            saveInventory(e.sourceEntity, e.message);
        } else if(e.id == "invg:load") {
            loadInventory(e.sourceEntity, e.message);
        } else if(e.id == "invg:delete") {
            deleteInventory(e.sourceEntity, e.message);
        }
    }
})
/*
Chest shop system written by TRASH (powertrash on Discord)

Made in Azalea V0.9.1 on 04/10/2023
*/

import { system, world } from '@minecraft/server';
import { Database } from '../db';
import {
    ActionForm,
    ModalForm,
  } from '../form_func';
let linkMap = new Map();
let chestShopDB = new Database("cshopmain");
let chestShopSigns = new Database("cshopsign");
let chestShopChest = new Database("cshopchest");
let chestShopPlayers = new Database("cshopplayer");

function linkFirstStep(block, source, sign) {
    linkMap.set(source.id, {
        firstSign: [ block, sign ]
    })
    source.sendMessage("§aStarted linking process. Click a chest anywhere in the world for it to become a chest shop.")
}
function findNext(inventory) {
    let first = null;
    for(let i = 0;i < inventory.size;i++) {
        let item = inventory.getItem(i);
        if(!item) continue;
        first = item;
        break;
    }
    return first;
}

export default {
    name: "ItemUseOn",
    callback(e) {
    //     return;
    //     // console.warn("CALLED")
    //     const qblock = e.source.getBlockFromViewDirection({
    //         "maxDistance": 6,
    //         includePassableBlocks: true
    //     });
    //     if(!qblock) return;
    //     const block = qblock.block;
    //     let sign = block.getComponent("sign");
    //     if((sign && sign.getText() == "/sell") || (linkMap.has(e.source.id) && block.typeId === "minecraft:chest")) {
    //         e.cancel = true;
    //     }
    //     system.run(()=>{
    //         const { source } = e;
    //         const qblock = source.getBlockFromViewDirection({
    //             "maxDistance": 6,
    //             includePassableBlocks: true
    //         })
    //         const block = qblock.block;
    //         const signComponent = block.getComponent("sign");
    //         let sign = signComponent;
    //         // console.warn(block.typeId);
    //         // // console.warn(signComponent.getText());
    //         if(signComponent && signComponent.getText() == "/sell") {
    //             signComponent.setWaxed();
    //             signComponent.setText("Linking...");
    //             return linkFirstStep(block, source, sign);
    //         }
    //         if(linkMap.has(source.id) && block.typeId === "minecraft:chest") {
    //             let id = parseInt(chestShopDB.get("curr", "0"));
    //             id++;
    //             let link = linkMap.get(source.id);
    //             chestShopDB.set(id.toString(), {
    //                 signBlock: {
    //                     x: Math.trunc(link.firstSign[0].location.x),
    //                     y: Math.trunc(link.firstSign[0].location.y),
    //                     z: Math.trunc(link.firstSign[0].location.z)
    //                 },
    //                 chestBlock: {
    //                     x: Math.trunc(block.location.x),
    //                     y: Math.trunc(block.location.y),
    //                     z: Math.trunc(block.location.z)
    //                 },
    //                 ownedBy: source.id,
    //                 isSetup: false,
    //                 priceForEach: 10000000
    //             })
    //             chestShopSigns.set(`${Math.trunc(link.firstSign[0].location.x)}-${Math.trunc(link.firstSign[0].location.y)}-${Math.trunc(link.firstSign[0].location.z)}`, id.toString());
    //             chestShopChest.set(`${Math.trunc(block.location.x)}-${Math.trunc(block.location.y)}-${Math.trunc(block.location.z)}`, id.toString());
    //             let playerLinks = chestShopPlayers.get(source.id, []);
    //             if(!playerLinks && !playerLinks.toString()) playerLinks = [];
    //             playerLinks.push(id.toString());
    //             chestShopPlayers.set(source.id, playerLinks);
    //             linkMap.delete(source.id);
    //             source.sendMessage("§aSuccessfully linked the chest to sign. Please click on the sign to finish setup.");
    //             let sign2 = link.firstSign[0].getComponent("sign");
    //             sign2.setText(`§cClick me to finish setup!\n\n§0[ID: ${id.toString()}]`)
    //             sign2.setWaxed()
    //         }
    //         if(sign) {
    //             let matches = sign.getText().match(/\[ID\: ([\s\S]*?)\]/g);
    //             if(matches && matches.length) {
    //                 let match = matches[0].substring('[ID: '.length).slice(0, -1);
    //                 if(sign.getText().includes("Click me to finish setup!")) {
    //                     let modalForm = new ModalForm();
    //                     modalForm.slider("How expensive do you want each stack to be?", 1, 1000, 5, 10, (player, selection, value)=>{
    //                         chestShopDB.edit(match, {
    //                             priceForEach: value
    //                         });
    //                         let chestShop = chestShopDB.get(match);
    //                         let block2 = block.dimension.getBlock({
    //                             x: chestShop.chestBlock.x,
    //                             y: chestShop.chestBlock.y,
    //                             z: chestShop.chestBlock.z,
    //                         })
    //                         let inventory = block2.getComponent("inventory");
    //                         let item = findNext(inventory.container);
    //                         let itemName;
    //                         if(item)
    //                             itemName = item.nameTag ? item.nameTag.replace('Click me to finish setup!') : item.typeId.split(':').slice(1).join(':').split('_').map(_=>_[0].toUpperCase()+_.substring(1)).join(' ');
    //                         sign.setText(`${item ? itemName : "§lSOLD OUT"} §r(open)\n ${chestShop.priceForEach}\n§r[ID: ${match}]\n§oClick to refresh`)
    //                     })
    //                     modalForm.show(source, false, (player, response)=>{
    //                         chestShopDB.edit(match, {
    //                             isSetup: true
    //                         });
    //                     })
    //                 } else if(sign.getText().includes("(open)")) {
    //                     let chestShop = chestShopDB.get(match);
    //                     let block2 = block.dimension.getBlock({
    //                         x: chestShop.chestBlock.x,
    //                         y: chestShop.chestBlock.y,
    //                         z: chestShop.chestBlock.z,
    //                     })
    //                     let inventory = block2.getComponent("inventory");
    //                     let item = findNext(inventory.container);
    //                     let itemName;
    //                     if(item)
    //                         itemName = item.nameTag ? item.nameTag.replace('Click me to finish setup!') : item.typeId.split(':').slice(1).join(':').split('_').map(_=>_[0].toUpperCase()+_.substring(1)).join(' ') + ` x${item.amount}`;
    //                     sign.setText(`${item ? itemName : "§lSOLD OUT"}§r(open)\n ${chestShop.priceForEach}\n§r[ID: ${match}]\n§oClick to refresh`)

    //                 }
    //             }
    //         }
    //     })
    }
}
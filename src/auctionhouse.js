import { Player, system, world } from "@minecraft/server";
import { DynamicPropertyDatabase } from "./dynamicPropertyDb";
import { ActionForm, ModalForm } from "./form_func";
import { isAdmin } from "./isAdmin";
import { ItemDatabase } from "./itemDB";
import { uiManager } from "./uis";
import { Database } from "./db";
import moment from "./moment";
// let auctionHouseDB = new DynamicPropertyDatabase("AuctionHouse");
// let itemDB = new ItemDatabase();
// let playerIDData = new DynamicPropertyDatabase("PlayerIDs");
// let offlinePlayerMoney = new DynamicPropertyDatabase("OfflinePlayerMoney");
// uiManager.addUI("Azalea1.1/AuctionHouse/Root/AllAuctions/ViewAuction:UI to view auction", (player, auctionIndex) => {
//     let actionForm = new ActionForm();
//     let auctions = auctionHouseDB.get("Auctions", []);
//     let auction = auctions[auctionIndex];
//     let item = itemDB.getItemFromID(auction.itemID);
//     let playerName = playerIDData.get(auction.playerID);
//     let text = [];
//     text.push(`§aAuction made by: §r§7${playerName}`);
//     text.push(`§aDescription: §r§7${auction.description ? auction.description : "None"}`)
//     text.push(`§aItem ID: §r§7${item.typeId}`);
//     text.push(`§aItem Amount: §r§7${item.amount}`);
//     if(item.getLore().length) {
//         let lore = item.getLore();
//         text.push(`§aItem Lore:`);
//         for(const loreText of lore) {
//             text.push(`§7- §r§5§o${loreText}`);
//         }
//     }
//     text.push(`§aStarting Price: §r§7${auction.startingPrice}`)
//     text.push(`§aEnds: §r§7${moment(auction.timeToEnd).fromNow()}`);
//     actionForm.body(text.join('\n§r'));
//     actionForm.button("Add Bid", null, (player)=>{

//     })
//     actionForm.show(player, false, (player, response)=>{

//     })
// });
// uiManager.addUI("Azalea1.1/AuctionHouse/Root/AllAuctions:UI to view all auctions", player => {
//     let actionForm = new ActionForm();
//     actionForm.title("All Auctions");
//     actionForm.body("Here is a list of all auctions!");
//     actionForm.button("Leave", "textures/azalea_icons/2", (player,i)=>{});
//     let auctions = auctionHouseDB.get("Auctions", []);
//     let i2 = -1;
//     for(const auction of auctions) {
//         i2++;
//         let playerName = playerIDData.get(auction.playerID);
//         let itemStack = itemDB.getItemFromID(auction.itemID);
//         actionForm.button(parseItemName(itemStack)+`\n§6${playerName}`, null, (player)=>{
//             uiManager.open("Azalea1.1/AuctionHouse/Root/AllAuctions/ViewAuction", player, i2);
//         })
//     }
//     actionForm.show(player, false, (player, response)=>{})
// });
// function playerID(entity) {
//     if(!(entity instanceof Player)) return;
//     let idsScoreboard = world.scoreboard.getObjective("pids");
//     if(!idsScoreboard) idsScoreboard = world.scoreboard.addObjective("pids", "ids");
//     let score = 0;
//     try {
//         score = idsScoreboard.getScore(entity);
//     } catch { score = 0; }
//     if(!score) score = 0;
//     if(score == 0) {
//         score = cyrb128(entity.name)[0] | 0;
//         idsScoreboard.setScore(entity, cyrb128(entity.name)[0] | 0);
//     }
//     return score;
// }
// let cfgDb = new Database("Config");
// // system.runInterval(()=>{
// //     for(const player of world.getPlayers()) {
// //         let playerid = playerID(player);
// //         playerIDData.set(playerid.toString(), player.name);
// //         let score = 0;
// //         let moneyScoreboard = world.scoreboard.getObjective(cfgDb.get("MoneyScoreboard", "money") ? cfgDb.get("MoneyScoreboard", "money") : "money");
// //         try {
// //             score = moneyScoreboard.getScore(player.scoreboardIdentity);
// //         } catch {score=0;}
// //         if(!score) score = 0;
// //         offlinePlayerMoney.set(playerid.toString(), {score});
// //     }
// // },40);
// uiManager.addUI("Azalea1.1/AuctionHouse/Root/YourAuctions:UI to view your auctions", (player)=>{
//     let actionForm = new ActionForm();
//     actionForm.body("Your auctions go here")
//     actionForm.title("Your Auctions")
//     actionForm.button("Make an auction", "textures/azalea_icons/1", player => {
//         uiManager.open("Azalea1.1/AuctionHouse/Root/CreateAuction", player)
//     })
//     let auctions = auctionHouseDB.get("Auctions", []);
//     let yourAuctions = auctions.filter(_=>_.playerID == playerID(player));
//     for(const auction of yourAuctions) {
//         let item = itemDB.getItemFromID(auction.itemID)
//         actionForm.button(`${parseItemName(item)}\n§6${player.name}`, null, (player)=>{

//         });
//     }
//     actionForm.show(player, false, (player,response)=>{

//     })
// })
// function parseItemName(item) {
//     return (item.nameTag ? item.nameTag : `${item.typeId.split(':')[1].split('_').join(' ')[0].toUpperCase()}${item.typeId.split(':')[1].split('_').join(' ').substring(1)}`) + ` x${item.amount}`
// }
// uiManager.addUI("Azalea1.1/AuctionHouse/Root/CreateAuction/Setup:Setup auction UI", (player, itemStack) => {
//     let modalForm = new ModalForm();
//     modalForm.title("Add Auction");
//     let optionsCli = ["1 Hour", "4 Hours", "8 Hours", "12 Hours", "16 Hours", "20 Hours", "24 Hours", "48 Hours"];
//     let options = [
//         Date.now() + (1 * 1000 * 60 * 60),
//         Date.now() + (1 * 1000 * 60 * 60 * 4),
//         Date.now() + (1 * 1000 * 60 * 60 * 8),
//         Date.now() + (1 * 1000 * 60 * 60 * 12),
//         Date.now() + (1 * 1000 * 60 * 60 * 16),
//         Date.now() + (1 * 1000 * 60 * 60 * 20),
//         Date.now() + (1 * 1000 * 60 * 60 * 24),
//         Date.now() + (1 * 1000 * 60 * 60 * 48),
//     ]
//     modalForm.dropdown("Ends In", optionsCli.map(_=>{
//         return {
//             option: _,
//             callback() {}
//         }
//     }))
//     modalForm.textField("Description", "Item Description");
//     modalForm.textField("Starting Price", "Cant be a negative number")
//     modalForm.show(player, false, (player, response)=>{
//         if(!/^\d+$/.test(response.formValues[2]) || !response.formValues[2]) return uiManager.open("Azalea1.1/AuctionHouse/Root/CreateAuction/Setup", player, itemStack)
//         let timeToEnd = options[response.formValues[0]];
//         let description = options[response.formValues[1]];
//         let startingPrice = options[response.formValues[2]];
//         let id = itemDB.addItem(itemStack);
//         let playerid = playerID(player);
//         let data = {
//             playerID: playerid,
//             timeToEnd,
//             itemID: id,
//             description,
//             startingPrice,
//             bids: []
//         };
//         let auctions = auctionHouseDB.get("Auctions", []);
//         auctions.push(data);
//         auctionHouseDB.set("Auctions", auctions);
//     })
// });
// uiManager.addUI("Azalea1.1/AuctionHouse/Root/CreateAuction:Create an auction", player => {
//     let actionForm = new ActionForm();
//     let inventory = player.getComponent('inventory');
//     for(let i = 0;i < inventory.container.size;i++) {
//         let item = inventory.container.getItem(i);
//         if(!item) continue;
//         actionForm.button(parseItemName(item), null, (player)=>{
//             uiManager.open("Azalea1.1/AuctionHouse/Root/CreateAuction/Setup", player, item);
//         })
//     }
//     actionForm.show(player, false, (player, response)=>{

//     })
// })
// uiManager.addUI("Azalea1.1/AuctionHouse/Root:Auction house root", player => {
//     let actionForm = new ActionForm();
//     actionForm.title("§cAuction §6House");
//     actionForm.body("Welcome to §cAuction §6House§r§f!")
//     actionForm.button("§bAll Auctions", "textures/azalea_icons/icontextures/totem_of_undying", (player, i)=>{
//         uiManager.open("Azalea1.1/AuctionHouse/Root/AllAuctions", player)
//     })
//     actionForm.button("§aYour Auctions", "textures/azalea_icons/icontextures/wooden_box", (player, i)=>{
//         uiManager.open("Azalea1.1/AuctionHouse/Root/YourAuctions", player)

//     });
//     actionForm.button("§cBids", "textures/azalea_icons/icontextures/coin_05e", (player, i)=>{

//     });
//     if(isAdmin(player)) {
//         actionForm.button("§dAdmin Area", "textures/azalea_icons/icontextures/tile2_003", (player, i)=>{
        
//         });
//     }
//     actionForm.show(player, false, (player, response)=>{

//     })
// })
import {
  ItemStack,
  system,
  world,
} from '@minecraft/server';

import { CommandBuilder } from '../commandBuilder';
import { commands } from '../commands';
import { itemToJson } from '../conv';
import { Database } from '../db';
import { ActionForm } from '../form_func';
import { isAdmin } from '../isAdmin';
import {
  responseStr,
  SUCCESS,
} from '../response';
import { openShopUI } from '../shopui';

export default function main() {
    commands.addCommand("shop", {
        description: "Shop",
        category: "Economy",
        async onRun(msg, args, theme, response) {
            let shopDb = new Database("ShopADB2");
            if(args.length) {
                if(args[0] == "raw") {
                    let shopItems = shopDb.get("ShopItems", []);
                    return response(`TEXT ${JSON.stringify(shopItems, null, 2)}`)
                    return;
                }
                if(args[0] == "add") {
                    if(!isAdmin(msg.sender)) return response("ERROR You require admin");
                    if(args.length < 2) return response("ERROR Enter a price")
                    if(!/^\d+$/.test(args[1])) return response("ERROR Invalid price!");
                    let inventory = msg.sender.getComponent("inventory");
                    let container = inventory.container;
                    let itemStack = container.getItem(msg.sender.selectedSlot);
                    if(!itemStack) return response("ERROR You need to be holding an item");
                    let shopItems = shopDb.get("ShopItems", []);
                    // world.sendMessage(`${JSON.stringify(shopItems)}`);
                    shopItems.push({
                        item: itemToJson(itemStack),
                        price: parseInt(args[1])
                    });
                    shopDb.set("ShopItems", shopItems);
                    return response(`SUCCESS Successfully added item to shop for $${parseInt(args[1])}`);
                }
            } else {
                response("SUCCESS Move around to open the shop UI")
                let x = msg.sender.location.x;
                let y = msg.sender.location.y;
                let z = msg.sender.location.z;
                let count = 0;
                let sender = msg.sender;
                let interval = system.runInterval(()=>{
                    if(msg.sender.location.x != x || msg.sender.location.y != y || msg.sender.location.z != z) {
                        system.clearRun(interval);
                        openShopUI(sender);
                    } else {
                        count++;
                        if(count > (5 * 2)) {
                            system.clearRun(interval);
                        }
                    }
                },10);
            }
        }
    })

    new CommandBuilder("sell-shop")
        .category("Economy")
        .desc("Sell shop")
        .callback(({msg, args, response})=>{
            if(args.length && args[0] == "set-value") {
                if(!isAdmin(msg.sender)) return response("ERROR You require admin");
                if(args.length < 2) return response("ERROR Enter a price")
                if(!/^\d+$/.test(args[1])) return response("ERROR Invalid price!");
                let inventory = msg.sender.getComponent("inventory");
                let container = inventory.container;
                let item = container.getItem(msg.sender.selectedSlot);
                let nameTag = item.typeId.split(':').slice(1).join(':').split('_').map(_=>`${_[0].toUpperCase()}${_.substring(1)}`).join(' ');
                let sellShopDb = new Database("SellShop");
                let sellShopItems = sellShopDb.get("Items", {});
                sellShopItems[item.typeId] = {
                    price: parseInt(args[1])
                }
                sellShopDb.set("Items", sellShopItems);
                return response(`SUCCESS Set price of ${nameTag} to $${args[1]}`)
            } else {
                let sellShopUi = new ActionForm();
                sellShopUi.title("Sell Shop")
                let inventory = msg.sender.getComponent("inventory");
                let container = inventory.container;
                let sellShopDb = new Database("SellShop");
                let sellShopItems = sellShopDb.get("Items", {});
                let text = [];
                for(const item of Object.keys(sellShopItems)) {
                    let nameTag = item.split(':').slice(1).join(':').split('_').map(_=>`${_[0].toUpperCase()}${_.substring(1)}`).join(' ');
                    text.push(`§a${nameTag} §7$${sellShopItems[item].price}`);
                }
                sellShopUi.body(text.join('\n§r'));
                sellShopUi.button("§4Exit", null, ()=>{})
                
                for(let i = 0;i < inventory.inventorySize;i++) {
                    let item = container.getItem(i);
                    if(!item) continue;
                    let nameTag = item.typeId.split(':').slice(1).join(':').split('_').map(_=>`${_[0].toUpperCase()}${_.substring(1)}`).join(' ');
                    if(sellShopItems[item.typeId]) {
                        sellShopUi.button(`${nameTag} x${item.amount}`, null, (player, i2)=>{
                            let price = sellShopItems[item.typeId].price;
                            let configDb = new Database("Config")
                            let moneyScoreboard = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money"));
                            if(!moneyScoreboard) {
                                moneyScoreboard = world.scoreboard.addObjective(configDb.get("MoneyScoreboard", "money"))
                            }
                            let score = 0;
                            try {
                                score = moneyScoreboard.getScore(player.scoreboardIdentity)
                            } catch {score=0}
                            if(!score && typeof score != "number") score = 0;
                            score += (price * item.amount);
                            moneyScoreboard.setScore(player.scoreboardIdentity, score);
                            container.setItem(i)
                            let result = new ActionForm();
                            result.title("Sold!");
                            result.body(`You have sold ${item.amount}x ${nameTag}`);
                            result.button("Ok", null, (player,i)=>{});
                            result.show(player,false,(player,response)=>{});
                        });
                    }
                }
                let x = msg.sender.location.x,
                    y = msg.sender.location.y,
                    z = msg.sender.location.z;
                let steps = 0;
                let interval = system.runInterval(()=>{
                    steps++;
                    if(steps > 5 * 2) {
                        system.clearRun(interval);
                        return;
                    }
                    if(msg.sender.location.x != x || y != msg.sender.location.y || z != msg.sender.location.z) {
                        system.clearRun(interval);
                        sellShopUi.show(msg.sender, true, (player, response)=>{})
                    }
                },10)

                response(responseStr(SUCCESS, "Close chat and move to open UI"))
            }
        })
        .register();
}
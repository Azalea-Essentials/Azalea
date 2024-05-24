import { uiManager } from './uis';
import { ActionForm, ModalForm } from './form_func';
import { world } from '@minecraft/server';
import { Database } from './db';
import { itemToJson, jsonToItem } from './conv';
import { ChestFormData } from './chestUI';
let playerShopDb = new Database("PlayerShops");
let configDb = new Database("Config")
let sellItems = ["Blocks", "Weapons/Armor", "Natural", "Misc"];
uiManager.addUI("Azalea0.9.1/PlayerShop/AddShop", (player) => {
    let modalForm = new ModalForm();
    modalForm.textField("What is the name of your shop?", "Type a name");

    sellItems.forEach(item => {
        modalForm.toggle(`Do you sell ${item}?`)
    });

    modalForm.show(player, true, (player, response) => {
        if(response.canceled) return;
        let shopData = {
            items: [],
            name: ""
        };
        for (let i = 0; i < response.formValues.length; i++) {
            if (i == 0) {
                shopData.name = response.formValues[i];
            } else if (i > 0 && i <= sellItems.length) {
                if (response.formValues[i])
                    shopData.items.push(sellItems[i - 1])
            }
        }
        playerShopDb.set(`${player.id}:${Date.now()}`, shopData);
    })
})
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
uiManager.addUI("Azalea0.9.1/PlayerShop/Buy", (player, shopKey) => {
    let shop = playerShopDb.get(shopKey);
    let actionform = new ChestFormData("large");
    actionform.button(0, "Exit", ["Exit the UI"], "textures/ui/realms_red_x", 1)
    actionform.title(shop.name + " - Buy items");
    if(!shop.mcItems || !shop.mcItems.length)
        actionform.button(4, "Sold out!", ["There are no items to buy"], "minecraft:clock", 1);
    for(let i = 0;i < 9;i++) {
        if(i == 0) continue;
        if((!shop.mcItems || !shop.mcItems.length) && i == 4) continue;
        actionform.button(i, "", [""], "textures/blocks/glass_black", 1)
    }
    let items = [];
    let offset = 9;
    try {
        if(shop.mcItems && shop.mcItems.length) {
            for(let i = 0;i < shop.mcItems.length;i++) {
                let item = shop.mcItems[i];
                items.push(item);
                // // console.warn(Array.from(typeIdToID.entries())[0])
                // let iconIndex = Array.from(typeIdToID.entries()).findIndex(_=>_[0]==item.typeId);
                // // console.warn(iconIndex)
                let icon = item.item.typeId;
                // // console.warn(JSON.stringify(item))
                actionform.button(i+offset, `${item.item.nameTag ? item.item.nameTag : item.item.typeId.split(':').slice(1).join(':').split('_').map(_ => _[0].toUpperCase() + _.substring(1)).join(' ')}`, [`§r ${numberWithCommas(item.price)}`], icon, item.item.amount);
            }
        }
    
    } catch(e) {
        console.error(e);
    }
    // actionform.button("§4Exit", null, (player,i)=>{})
    //         actionform.button(`${item.item.nameTag ? item.item.nameTag : item.item.typeId.split(':').slice(1).join(':').split('_').map(_ => _[0].toUpperCase() + _.substring(1)).join(' ')} x${item.item.amount}\n§r ${numberWithCommas(item.price)}`, null, (player, i)=>{
    //             }
    //         });
    //     }
    // }
    actionform.show(player).then(res=>{
        if(res.canceled) return;
        if(res.selection >= 9) {
            let item = items[res.selection - offset];
            let money = 0;
            try {
                let scoreboard = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money"));
                if(!scoreboard) return;
                money = scoreboard.getScore(player.scoreboardIdentity);
            } catch {money = 0;}
            if(!money && typeof money != "number") money = 0;
            if(money >= item.price) {
                shop.mcItems.splice((res.selection - offset), 1);
                let inventory = player.getComponent("inventory");
                let { container } = inventory;
                container.addItem(jsonToItem(item.item));
                money -= item.price;
                let scoreboard = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money"));
                scoreboard.setScore(player.scoreboardIdentity, money);
                let otherPlayer;
                for(const otherPlayer2 of world.getPlayers()) {
                    if(otherPlayer2.id == shopKey.split(':')[0]) otherPlayer = otherPlayer2;
                }
                let otherMoney = scoreboard.getScore(otherPlayer.scoreboardIdentity);
                if(!otherMoney && typeof otherMoney != "number") otherMoney = 0;
                otherMoney += item.price;
                scoreboard.setScore(otherPlayer.scoreboardIdentity, otherMoney);
                playerShopDb.set(shopKey, shop);
            }    
            uiManager.open("Azalea0.9.1/PlayerShop/Buy", player, shopKey)
        }
    })
});
uiManager.addUI("Azalea0.9.1/PlayerShop/Edit/AddItem/Setup", (player, shopKey, convertedItem, error = null) => {
    let shop = playerShopDb.get(shopKey);
    let modalForm = new ModalForm();
    modalForm.title("Select a price");
    modalForm.textField(`Enter a price for your item${error ? `\n  §c${error}` : ``}`, "Can't be a negative number", null, (player, text) => {
        if(!/^\d+$/.test(text)) return uiManager.open("Azalea0.9.1/PlayerShop/Edit/AddItem/Setup", player, shopKey, convertedItem, "Not a valid number");
        if (!shop.mcItems)
            shop.mcItems = [];
        shop.mcItems.push({
            price: parseInt(text),
            item: convertedItem
        });
        playerShopDb.set(shopKey, shop);
    })
    modalForm.show(player, true, ()=>{})
})
uiManager.addUI("Azalea0.9.1/PlayerShop/Edit/EditInfo", (player, shopKey) => {
    let shop = playerShopDb.get(shopKey);
    let modalform = new ModalForm();
    modalform.title(`${shop.name} §r- Edit Info`);
    modalform.textField("Shop Name (Minimum 3 characters)",  "Enter a name", shop.name, ()=>{});
    modalform.textField("Shop Items (Separated by commas)", "Enter comma separated shop items", shop.items.map(_=>_.trim()).join(','), ()=>{});
    modalform.show(player, true, (_player, response)=>{
        let shopName = response.formValues[0];
        if(shopName.length < 3) return;
        let shopItems = response.formValues[1].split(',').map(_=>_.trim());
        if(shopItems.length < 1) return;
        shop.name = shopName;
        shop.items = shopItems;
        playerShopDb.set(shopKey, shop);
    })
});
uiManager.addUI("Azalea0.9.1/PlayerShop/Edit/AddItem", (player, shopKey) => {
    let shop = playerShopDb.get(shopKey);
    let actionform = new ActionForm();
    actionform.title(shop.name + " - Add Item");
    actionform.body("Add an item here\n§e§lNOTE: DO NOT USE SHULKER BOXES WITH ITEMS AS OF RIGHT NOW, THEY WILL LOSE ALL ITEMS IN THEM WHEN A USER BUYS THEM.");
    let inventory = player.getComponent("inventory");
    let { container } = inventory;
    let items = [];
    for (let i = 0; i < container.size; i++) {
        let item = container.getItem(i);
        if (!item) continue;
        items.push([i, item]);
    }
    for (const slot of items) {
        let [index, item] = slot;
        actionform.button(`${item.nameTag ? item.nameTag : item.typeId.split(':').slice(1).join(':').split('_').map(_ => _[0].toUpperCase() + _.substring(1)).join(' ')} x${item.amount}`, null, (player) => {
            container.setItem(index);
            let convertedItem = itemToJson(item);
            uiManager.open("Azalea0.9.1/PlayerShop/Edit/AddItem/Setup", player, shopKey, convertedItem);
        });
    }
    actionform.show(player, true, (_player) => { })
});
uiManager.addUI("Azalea0.9.1/PlayerShop/Edit", (player, shopKey) => {
    let shop = playerShopDb.get(shopKey);
    let actionform = new ActionForm();
    actionform.title(shop.name + " - Edit");
    actionform.button("Add Item", null, (player) => {
        uiManager.open("Azalea0.9.1/PlayerShop/Edit/AddItem", player, shopKey);
    })
    actionform.button("Edit Info", null, (player) => {
        uiManager.open("Azalea0.9.1/PlayerShop/Edit/EditInfo", player, shopKey);
    })
    actionform.show(player, true, (_player) => {

    })
})
uiManager.addUI("Azalea0.9.1/PlayerShop/ReportShop/Thanks", (player) => {
    let actionform = new ActionForm();
    actionform.title("Report submitted!");
    actionform.body("Thank you for submitting a report. Admins will review your report soon.");
    actionform.button("Ok", null, (_player)=>{})
    actionform.show(player, true, ()=>{});
});
uiManager.addUI("Azalea0.9.1/PlayerShop/ReportShop", (player, shopKey) => {
    let shop = playerShopDb.get(shopKey);
    let modalForm = new ModalForm();
    let reportReasons = ["Scamming", "Hacked Items"];
    let reportReasonsAdmin = [`Shop: Scamming (Shop: ${shop.name}, ID: ${shopKey})`, `Shop: Hacked Items (Shop: ${shop.name}, ID: ${shopKey})`];
    modalForm.dropdown("What is the reason?", reportReasons.map(_=>{
        return {
            option: _,
            callback() {}
        }
    }));
    modalForm.textField("Extra details:", "Type extra details here", null, (_player, _text)=>{});
    modalForm.show(player, true, (player, response)=>{
        let reason = reportReasonsAdmin[response.formValues[0]];
        let extraDetails = response.formValues[1] ? response.formValues[1] : "";
        let reportsDb = new Database("Reports");
        let reports = reportsDb.get("Reports", []);
        reports.push({
            player: `Shop Player`,
            reason: `${reason} [Extra Details: ${extraDetails}]`
        })
        reportsDb.set("Reports", reports);
        uiManager.open("Azalea0.9.1/PlayerShop/ReportShop/Thanks", player)
    })
});
uiManager.addUI("Azalea0.9.1/PlayerShop/OpenShop", (player, shopKey) => {
    let shop = playerShopDb.get(shopKey);
    let isOwner = player.id.toString() == shopKey.split(':')[0];
    let actionform = new ActionForm();
    actionform.title(shop.name);
    actionform.button("Buy items", null, (player) => {
        uiManager.open("Azalea0.9.1/PlayerShop/Buy", player, shopKey);
    });
    actionform.button("Report shop", null, (player) => {
        uiManager.open("Azalea0.9.1/PlayerShop/ReportShop", player, shopKey)
    });
    if (isOwner) {
        actionform.button("Edit shop", null, (player) => {
            uiManager.open("Azalea0.9.1/PlayerShop/Edit", player, shopKey)
        });
    }
    actionform.show(player, true, (_player) => {

    })
})
uiManager.addUI("Azalea0.9.1/PlayerShop/Main", (player) => {
    let actionform = new ChestFormData("large");
    let keys = playerShopDb.keys();
    let onlineShops = [];
    let playerObj = {};
    for (const player of world.getPlayers()) {
        playerObj[player.id] = player;
        onlineShops.push(...keys.filter(_ => _.startsWith(`${player.id}:`)));
    }
    let i = 8;
    actionform.button(0, "§cCreate Shop", ["Create a shop"], "textures/ui/color_plus.png", 1)
    for(let i = 1; i < 9;i++) actionform.button(i, "", [""], "textures/blocks/glass_black", 1)
    for(let i = 45; i < 54;i++) actionform.button(i, "", [""], "textures/blocks/glass_black", 1)
    for (const shop of onlineShops) {
        i++;
        let shopData = playerShopDb.get(shop);
        actionform.button(i, shopData.name, [`${shopData.items.join(', ')}`], shopData.mcItems && shopData.mcItems.length ? shopData.mcItems[0].item.typeId : "textures/blocks/barrier")
        // actionform.button(`§2${shopData.name} §8${playerObj[shop.split(':')[0]].name}\n§8${shopData.items.join(', ')}`, null, (player, i) => {
        //     uiManager.open("Azalea0.9.1/PlayerShop/OpenShop", player, shop)
        // })
    }
    // actionform.title("---- §2Player Shops §r----");
    // actionform.body("Player Shops are community-controlled shops. Feel free to look around.");
    // actionform.button("§5Create a shop", "textures/ui/color_plus.png", (player, i) => {
        // uiManager.open("Azalea0.9.1/PlayerShop/AddShop", player);
    // })
    // actionform.show(player, true, (player, response) => {

    // })
    actionform.show(player).then(res=>{
        if(res.canceled) return;

        if(res.selection >= 9) {
            let shop = onlineShops[res.selection - 9]
            uiManager.open("Azalea0.9.1/PlayerShop/OpenShop", player, shop);
        } else if(res.selection == 0) {
            let shop = onlineShops[res.selection - 9]
            uiManager.open("Azalea0.9.1/PlayerShop/AddShop", player, shop);
        }
        
    })
})
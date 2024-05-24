import { uiManager } from './uis';
import { ActionForm, ModalForm } from './form_func';
import { ItemStack, world } from '@minecraft/server';
import { Database } from './db';
import { jsonToItem } from './conv';
import { DynamicPropertyDatabase } from './dynamicPropertyDb';
import { isAdmin } from './isAdmin';
import { ItemDatabase } from './itemDB';
let playerShopDb = new DynamicPropertyDatabase("player_shop");
let configDb = new Database("Config");
let sellItems = ["Blocks", "Weapons/Armor", "Natural", "Misc"];
let colors = ["playershop","playershop_green","playershop_blue","playershop_purple"];
let colorsDisplay = ["§cRed", "§aGreen", "§bBlue", "§dPurple"];
let itemDB = new ItemDatabase();
uiManager.addUI("Azalea0.9.1/PlayerShop/AddShop:Create a shop", player => {
  let shops = playerShopDb.keys().filter(_=>_.startsWith(`${player.id}:`)).length;
  if(shops >= 3) {
    let messageForm = new ActionForm();
    messageForm.body("§c[ERROR] §4You can only have 3 shops");
    messageForm.title("§cERROR");
    messageForm.button("Ok", "textures/azalea_icons/2", ()=>{})
    messageForm.show(player,false,()=>{})
    return;
  }
  let modalForm = new ModalForm();
  modalForm.textField("What is the name of your shop?", "Type a name");
  for(const item of sellItems) {
    modalForm.toggle(`Do you sell ${item}?`);
  }
  modalForm.dropdown("Color", colorsDisplay.map(_=>{
    return {
      option: _,
      callback() {}
    }
  }))

  modalForm.show(player, true, (player, response) => {
    if (response.canceled) return;
    let shopData = {
      items: [],
      name: ""
    };
    for (let i = 0; i < response.formValues.length; i++) {
      if (i == 0) {
        shopData.name = response.formValues[i];
      } else if (i > 0 && i <= sellItems.length) {
        if (response.formValues[i]) shopData.items.push(sellItems[i - 1]);
      } else {
        shopData.color = response.formValues[response.formValues.length - 1]
      }
    }
    playerShopDb.set(`${player.id}:${Date.now()}`, shopData);
  });
});
function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
uiManager.addUI("Azalea0.9.1/PlayerShop/Buy:Buy items from a shop", (player, shopKey) => {
  let shop = playerShopDb.get(shopKey);
  let actionform = new ActionForm();
  actionform.title(shop.name + " - Buy items");
  if (!shop.mcItems || !shop.mcItems.length) actionform.body("§c§lSOLD OUT");else actionform.body("Select an item");
  actionform.button("§4Exit", null, (_player) => {});
  if (shop.mcItems && shop.mcItems.length) {
    for (let i = 0; i < shop.mcItems.length; i++) {
      let item = shop.mcItems[i];
      let itemName;
      let itemStack;
      if(!shop.mcItems[i].type) {
        itemName = `${item.item.nameTag ? item.item.nameTag : item.item.typeId.split(':').slice(1).join(':').split('_').map(_ => _[0].toUpperCase() + _.substring(1)).join(' ')} x${item.item.amount}\n§r§6\uE117 ${numberWithCommas(item.price)}`;
      } else if(shop.mcItems[i].type == "item-db") {
        itemStack = itemDB.getItemFromID(shop.mcItems[i].item);
        if(!(itemStack instanceof ItemStack)) continue;
        itemStack = itemStack.clone();
        itemName = `${itemStack.nameTag ? itemStack.nameTag : itemStack.typeId.split(':').slice(1).join(':').split('_').map(_ => _[0].toUpperCase() + _.substring(1)).join(' ')} x${itemStack.amount}\n§r§6\uE117 ${numberWithCommas(item.price)}`;
      }
      actionform.button(itemName, null, (player, i) => {
        let money = 0;
        try {
          let scoreboard = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money"));
          if (!scoreboard) return;
          money = scoreboard.getScore(player.scoreboardIdentity);
        } catch {
          money = 0;
        }
        if (!money && typeof money != "number") money = 0;
        if (money >= item.price) {
          shop.mcItems.splice(i - 1, 1);
          let inventory = player.getComponent("inventory");
          let {
            container
          } = inventory;
          if(itemStack) {
            container.addItem(itemStack);
            try {
              itemDB.removeItem(item.item);
            } catch {}
          } else {
            container.addItem(jsonToItem(item.item));

          }
          money -= item.price;
          let scoreboard = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money"));
          scoreboard.setScore(player.scoreboardIdentity, money);
          let otherPlayer;
          for (const otherPlayer2 of world.getPlayers()) {
            if (otherPlayer2.id == shopKey.split(':')[0]) otherPlayer = otherPlayer2;
          }
          let otherMoney = scoreboard.getScore(otherPlayer.scoreboardIdentity);
          if (!otherMoney && typeof otherMoney != "number") otherMoney = 0;
          otherMoney += item.price;
          scoreboard.setScore(otherPlayer.scoreboardIdentity, otherMoney);
          playerShopDb.set(shopKey, shop);
          uiManager.open("Azalea0.9.1/PlayerShop/Buy", player, shopKey);
        }
      });
    }
  }
  actionform.show(player, null, (_player) => {});
});
uiManager.addUI("Azalea0.9.1/PlayerShop/Edit/AddItem/Setup:Setup a player shop items price", (player, shopKey, convertedItem, index, error = null) => {
  let shop = playerShopDb.get(shopKey);
  let modalForm = new ModalForm();
  modalForm.title("Select a price");
  modalForm.textField(`Enter a price for your item${error ? `\n  §c${error}` : ``}`, "Can't be a negative number", null, (player, text) => {
    if (!/^\d+$/.test(text)) return uiManager.open("Azalea0.9.1/PlayerShop/Edit/AddItem/Setup", player, shopKey, convertedItem, index, "Not a valid number");
    if (!shop.mcItems) shop.mcItems = [];
    shop.mcItems.push({
      price: parseInt(text),
      item: convertedItem,
      type: "item-db"
    });
    playerShopDb.set(shopKey, shop);
    let inventory = player.getComponent("inventory");
    let container = inventory.container;
    container.setItem(index);
    });
  modalForm.show(player, true, () => {});
});
uiManager.addUI("Azalea0.9.1/PlayerShop/Edit/EditInfo:Edit info", (player, shopKey) => {
  let shop = playerShopDb.get(shopKey);
  let modalform = new ModalForm();
  modalform.title(`${shop.name} §r- Edit Info`);
  modalform.textField("Shop Name (Minimum 3 characters)", "Enter a name", shop.name, () => {});
  modalform.textField("Shop Items (Separated by commas)", "Enter comma separated shop items", shop.items.map(_ => _.trim()).join(','), () => {});
  modalform.dropdown("Color", colorsDisplay.map(_=>{
    return {
      option: _,
      callback() {}
    }
  }), shop.color ? shop.color : 0);
  modalform.show(player, true, (player, response) => {
    let shopName = response.formValues[0];
    if (shopName.length < 3) return;
    let shopItems = response.formValues[1].split(',').map(_ => _.trim());
    if (shopItems.length < 1) return;
    if (shopName.length > 15) return;
    if (shopItems.join(',').length > 40) return;
    shop.name = shopName;
    shop.items = shopItems;
    shop.color = response.formValues[2];
    playerShopDb.set(shopKey, shop);
    uiManager.open("Azalea0.9.1/PlayerShop/Edit", player, shopKey)
  });
});
uiManager.addUI("Azalea0.9.1/PlayerShop/Edit/AddItem:Add item", (player, shopKey) => {
  let shop = playerShopDb.get(shopKey);
  let actionform = new ActionForm();
  actionform.title(shop.name + " - Add Item");
  actionform.body("Add an item here\n§a§lUPDATE: Shulker boxes now work in player shops!");
  let inventory = player.getComponent("inventory");
  let {
    container
  } = inventory;
  let items = [];
  for (let i = 0; i < container.size; i++) {
    let item = container.getItem(i);
    if (!item) continue;
    items.push([i, item]);
  }
  for (const slot of items) {
    let [index, item] = slot;
    actionform.button(`${item.nameTag ? item.nameTag : item.typeId.split(':').slice(1).join(':').split('_').map(_ => _[0].toUpperCase() + _.substring(1)).join(' ')} x${item.amount}`, null, (player) => {
      let convertedItem = itemDB.addItem(item);
      uiManager.open("Azalea0.9.1/PlayerShop/Edit/AddItem/Setup", player, shopKey, convertedItem, index);
    });
  }
  actionform.show(player, true, (_player) => {});
});
uiManager.addUI("Azalea0.9.1/PlayerShop/Edit/Delete/Confirmation:Player shop delete confirmation UI", (player, shopKey) => {
  let shop = playerShopDb.get(shopKey);
  let actionform = new ActionForm();
  actionform.title("Are you sure?");
  actionform.body(`This will delete all items and you can not recover them. Are you sure you want to delete ${shop.name}§r?`);
  actionform.button("Yes", null, (player) => {
    playerShopDb.hardDelete(shopKey);
    player.sendMessage(`Successfully deleted shop: ${shop.name}`);
  });
  actionform.button("No", null, (player) => {
    uiManager.open("Azalea0.9.1/PlayerShop/Edit", player, shopKey);
  });
  actionform.show(player, false, (_player) => {});
});
uiManager.addUI("Azalea0.9.1/PlayerShop/Edit:Edit player shop", (player, shopKey) => {
  let shop = playerShopDb.get(shopKey);
  let actionform = new ActionForm();
  actionform.title(shop.name + " - Edit");
  actionform.button("Back", "textures/azalea_icons/2", (player)=>{
    uiManager.open("Azalea0.9.1/PlayerShop/Main", player);
  })
  actionform.button("Add Item", "textures/azalea_icons/AddItem", (player) => {
    uiManager.open("Azalea0.9.1/PlayerShop/Edit/AddItem", player, shopKey);
  });
  actionform.button("Edit Info", null, (player) => {
    uiManager.open("Azalea0.9.1/PlayerShop/Edit/EditInfo", player, shopKey);
  });
  actionform.button("§4Delete", "textures/azalea_icons/DeleteShop", (player) => {
    uiManager.open("Azalea0.9.1/PlayerShop/Edit/Delete/Confirmation", player, shopKey);
  });
  actionform.show(player, true, (_player) => {});
});
uiManager.addUI("Azalea0.9.1/PlayerShop/ReportShop/Thanks", player => {
  let actionform = new ActionForm();
  actionform.title("Report submitted!");
  actionform.body("Thank you for submitting a report. Admins will review your report soon.");
  actionform.button("Ok", null, (_player) => {});
  actionform.show(player, true, () => {});
});
uiManager.addUI("Azalea0.9.1/PlayerShop/ReportShop", (player, shopKey) => {
  let shop = playerShopDb.get(shopKey);
  let modalForm = new ModalForm();
  let reportReasons = ["Scamming", "Hacked Items"];
  let reportReasonsAdmin = [`Shop: Scamming (Shop: ${shop.name}, ID: ${shopKey})`, `Shop: Hacked Items (Shop: ${shop.name}, ID: ${shopKey})`];
  modalForm.dropdown("What is the reason?", reportReasons.map(_ => {
    return {
      option: _,
      callback() {}
    };
  }));
  modalForm.textField("Extra details:", "Type extra details here", null, (_player, _text) => {});
  modalForm.show(player, true, (player, response) => {
    let reason = reportReasonsAdmin[response.formValues[0]];
    let extraDetails = response.formValues[1] ? response.formValues[1] : "";
    let reportsDb = new Database("Reports");
    let reports = reportsDb.get("Reports", []);
    reports.push({
      player: `Shop Player`,
      reason: `${reason} [Extra Details: ${extraDetails}]`
    });
    reportsDb.set("Reports", reports);
    uiManager.open("Azalea0.9.1/PlayerShop/ReportShop/Thanks", player);
  });
});
uiManager.addUI("Azalea0.9.1/PlayerShop/OpenShop", (player, shopKey) => {
  let shop = playerShopDb.get(shopKey);
  let isOwner = player.id.toString() == shopKey.split(':')[0];
  let actionform = new ActionForm();
  actionform.title(`${shop.name}`);
  actionform.button("§eOwners Profile", "textures/azalea_icons/8", (player)=>{
    let otherPlayer;
    for(const player of world.getPlayers()) {
      if(player.id.toString() == shopKey.split(':')[0]) otherPlayer = player;
    }
    if(!otherPlayer) return;
    uiManager.open("Azalea1.1/PlayerProfile", player, otherPlayer.name);
  })
  if(isAdmin(player)) {
    actionform.button("§cAdmin: Delete", "textures/azalea_icons/DeleteShop", (player)=>{
        uiManager.open("Azalea0.9.1/PlayerShop/Edit/Delete/Confirmation", player, shopKey)
    })
    actionform.button(shop.isFeatured ? `§bUnfeature` : `§6Feature`, shop.isFeatured ? `textures/azalea_icons/PlayerShop/Normal/Online/playershop` : `textures/azalea_icons/PlayerShop/Gold/Online/playershop`, (_player)=>{
      let shop = playerShopDb.get(shopKey);
      shop.isFeatured = shop.isFeatured ? false : true;
      playerShopDb.set(shopKey, shop);
    })
  }
  actionform.button(
    player.hasTag(`favorited-pshop:${shopKey}`) ? "Unfavorite" : "Favorite",
    player.hasTag(`favorited-pshop:${shopKey}`) ? "textures/azalea_icons/PlayerShop/Normal/Online/playershop" : "textures/azalea_icons/PlayerShop/Favorited/Online/playershop", (player)=>{
      if(player.hasTag(`favorited-pshop:${shopKey}`)) {
        player.removeTag(`favorited-pshop:${shopKey}`)
      } else {
        player.addTag(`favorited-pshop:${shopKey}`);
      }
      uiManager.open("Azalea0.9.1/PlayerShop/Main", player)
  })
  actionform.button("Buy items", "textures/azalea_icons/BuyItem", (player) => {
    uiManager.open("Azalea0.9.1/PlayerShop/Buy", player, shopKey);
  });
  actionform.button("Report shop", "textures/azalea_icons/ReportShop", (player) => {
    uiManager.open("Azalea0.9.1/PlayerShop/ReportShop", player, shopKey);
  });
  if (isOwner) {
    actionform.button("Edit shop", "textures/azalea_icons/EditShop", (player) => {
      uiManager.open("Azalea0.9.1/PlayerShop/Edit", player, shopKey);
    });
  }
  actionform.show(player, true, (_player) => {});
});
uiManager.addUI("Azalea0.9.1/PlayerShop/Settings", player => {
  let modal = new ModalForm();
  let opts = ["NF","OF","LAP","HAP","P"];
  let opts2 = ["Default", "Newest First", "Oldest First", "Lowest Avg. Price", "Highest Avg. Price", "Name"];
  modal.dropdown("Sort Order", opts2.map(_=>{
    return {
      option: _,
      callback() {}
    }
  }))
  modal.title("§ePlayer Shop Settings");
  modal.show(player, false, (player,response)=>{
    if(response.formValues[0] > 0) {
      for(const tag of player.getTags()) {
        if(tag.startsWith("player-shop-sorting:")) {
          player.removeTag(tag);
        }
      }
      player.addTag("player-shop-sorting:"+opts[response.formValues[0] - 1]);
    } else {
      for(const tag of player.getTags()) {
        if(tag.startsWith("player-shop-sorting:")) {
          player.removeTag(tag);
        }
      }
    }
    uiManager.open("Azalea0.9.1/PlayerShop/Main", player);
  })
})
uiManager.addUI("Azalea0.9.1/PlayerShop/Main", player => {
  // playerShopDb.clear()
  let actionform = new ActionForm();
  let keys = playerShopDb.keys();
  let onlineShops = [];
  let playerObj = {};
  for (const player of world.getPlayers()) {
    playerObj[player.id] = player;
    onlineShops.push(...keys.filter(_ => _.startsWith(`${player.id}:`)));
  }
  // OLDEST FIRST: onlineShops.sort((a,b)=>parseInt(a.split(':')[1]) - parseInt(b.split(':')[1]));
  let sorting = player.getTags().find(_=>_.startsWith("player-shop-sorting:")) ? player.getTags().find(_=>_.startsWith("player-shop-sorting:")).substring("player-shop-sorting:".length) : configDb.get("Sorting","NF");
  if(sorting == "NF") {
    onlineShops = onlineShops.sort((b,a)=>parseInt(a.split(':')[1]) - parseInt(b.split(':')[1]));
  } else if(sorting == "OF") {
    onlineShops = onlineShops.sort((a,b)=>parseInt(a.split(':')[1]) - parseInt(b.split(':')[1]));
  } else if(sorting == "LAP") {
    onlineShops = onlineShops.sort((a,b)=>{
      let shopData1 = playerShopDb.get(a);
      let shopData2 = playerShopDb.get(b);
      let averageprice1 = 10000000;
      let averageprice2 = 10000000;
      let sum1 = 0;
      let sum2 = 0;
      if(shopData1.mcItems && shopData1.mcItems.length) {
        for(const item of shopData1.mcItems) {
          sum1 += item.price;
        }
  
      }
      if(shopData2.mcItems && shopData2.mcItems.length) {
        for(const item of shopData2.mcItems) {
          sum2 += item.price;
        }
      }
      if(shopData1.mcItems && shopData1.mcItems.length > 0) {
        averageprice1 = sum1 / shopData1.mcItems.length;
      }
      if(shopData2.mcItems && shopData2.mcItems.length > 0) {
        averageprice2 = sum2 / shopData2.mcItems.length;
      }
      return averageprice1 - averageprice2
    });
  } else if(sorting == "HAP") {
    onlineShops = onlineShops.sort((b,a)=>{
      let shopData1 = playerShopDb.get(a);
      let shopData2 = playerShopDb.get(b);
      let averageprice1 = 0;
      let averageprice2 = 0;
      let sum1 = 0;
      let sum2 = 0;
      if(shopData1.mcItems && shopData1.mcItems.length) {
        for(const item of shopData1.mcItems) {
          sum1 += item.price;
        }
      }
      if(shopData2.mcItems && shopData2.mcItems.length) {
        for(const item of shopData2.mcItems) {
          sum2 += item.price;
        }
      }
      if(shopData1.mcItems && shopData1.mcItems.length > 0) {
        averageprice1 = sum1 / shopData1.mcItems.length;
      }
      if(shopData2.mcItems && shopData2.mcItems.length > 0) {
        averageprice2 = sum2 / shopData2.mcItems.length;
      }
      return averageprice1 - averageprice2
    });
  } else if(sorting == "P") {
    onlineShops = onlineShops.sort((a,b)=>{
      let shopData1 = playerShopDb.get(a);
      let shopData2 = playerShopDb.get(b);
      var textA = shopData1.name.toUpperCase();
      var textB = shopData2.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
  }
  actionform.button("§aCreate a shop", "textures/azalea_icons/ShopAdd", (player) => {
    uiManager.open("Azalea0.9.1/PlayerShop/AddShop", player);
  });
  actionform.button("§aSettings", "textures/azalea_icons/Settings", (player) => {
    uiManager.open("Azalea0.9.1/PlayerShop/Settings", player);
  });
  for (const shop of onlineShops) {
    try {
      let shopData = playerShopDb.get(shop);
      //§8${playerObj[shop.split(':')[0]].name}\n§8${shopData.items.join(', ')}
      actionform.button(`${player.hasTag(`favorited-pshop:${shop}`) ? `§d` : shopData.isFeatured ? `§6` : `§a`}${shopData.name}\n§r§f${shopData.items.join('§r§f, ')}`,
      `textures/azalea_icons/PlayerShop/${player.hasTag(`favorited-pshop:${shop}`) ? `Favorited` : shopData.isFeatured ? `Gold` : `Normal`}/Online/${colors[shopData.color ? shopData.color : 0]}`, (player) => {
        uiManager.open("Azalea0.9.1/PlayerShop/OpenShop", player, shop);
      });
    } catch {}
  }
  actionform.title("§7---- §aPlayer Shops §7----");
  actionform.body("Player Shops are community-controlled shops. Feel free to look around.");
  actionform.show(player, true, (_player) => {});
});
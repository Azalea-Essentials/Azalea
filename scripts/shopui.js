import { world } from '@minecraft/server';
import { ActionFormData, MessageFormData, ModalFormData } from '@minecraft/server-ui';
import icons from './icons';
import { jsonToItem } from './conv';
import { Database } from './db';
import { isAdmin } from './isAdmin';
import { uiManager } from './uis';
import { ActionForm, ModalForm } from './form_func';
import { DynamicPropertyDatabase } from './dynamicPropertyDb';
import { clear } from './things/Clear';
import { ChestFormData } from './chestUI';
let configDb = new Database("Config");
var move = function (array, element, delta) {
  var index = element;
  var newIndex = index + delta;
  if (newIndex < 0 || newIndex == array.length) return; //Already at the top or bottom.
  var indexes = [index, newIndex].sort(); //Sort the indixes
  array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order
};

function calculateDiscount(originalPrice, discountPercentage) {
  // Calculate the discount amount
  const discountAmount = originalPrice * discountPercentage / 100;

  // Calculate the discounted price
  const discountedPrice = originalPrice - discountAmount;
  return discountedPrice;
}
var moveUp = function (array, element) {
  move(array, element, -1);
};
var moveDown = function (array, element) {
  move(array, element, 1);
};
function parseItemName(item) {
  return (item.nameTag ? item.nameTag : `${item.typeId.split(':')[1].split('_').join(' ')[0].toUpperCase()}${item.typeId.split(':')[1].split('_').join(' ').substring(1)}`) + ` x${item.amount}`;
}
function getShopKey(player) {
  let score = 0;
  try {
    let shopScoreboard = world.scoreboard.getObjective("multishop");
    if (!shopScoreboard) shopScoreboard = world.scoreboard.addObjective("multishop", "Multishop");
    score = shopScoreboard.getScore(player.scoreboardIdentity);
  } catch {
    score = 0;
  }
  if (!score) score = 0;
  return score == 0 ? "ShopItems" : "ShopItems-" + score.toString();
}
uiManager.addUI("Azalea1.1/Shop/Root/Category", (player, category, previousCategories = []) => {
  let shopDbV2 = new DynamicPropertyDatabase("ShopNew");
  let shopItems = shopDbV2.get(getShopKey(player), "");
  if (!shopItems) {
    shopItems = [{
      "category": "Uncategorized",
      "items": []
    }];
    shopDbV2.set(getShopKey(player), shopItems);
  }
  let shopData = shopItems.find(_ => _.category == category);
  if (!shopData) return uiManager.open("Azalea1.1/Shop/Root", player);
  let actionForm = new ActionForm();
  if (!shopData.items || !shopData.items.length) {
    actionForm.body("Looks like there are no items here!");
  }
  actionForm.title(`Shop §7> §r§f${shopData.category}`);
  if (shopData.discount) {
    actionForm.body(`§a${shopData.discount}%% §r§fdiscount!`);
  }
  actionForm.button("Leave", "textures/azalea_icons/2", player => {
    if (previousCategories.length) {
      let category3 = previousCategories.reverse().slice(1);
      let category2 = previousCategories[0];
      // previousCategories.pop();
      uiManager.open("Azalea1.1/Shop/Root/Category", player, category2, category3.reverse());
      return;
    }
    uiManager.open("Azalea1.1/Shop/Root", player);
  });
  for (const item of shopData.items) {
    if (item.tag && player.hasTag(item.tag)) continue;
    let itemName;
    if (item.category_reference) {
      if (shopItems.find(_ => _.reference_id == item.category_reference)) {
        itemName = `${shopItems.find(_ => _.reference_id == item.category_reference).category}`;
      } else {
        itemName = `§c§lUnknown Category`;
      }
    } else if (item.display) {
      itemName = item.display;
    } else {
      let itemStack = jsonToItem(item.item);
      itemName = parseItemName(itemStack);
    }
    let icon;
    if (item.icon) {
      icon = icons.find(_ => _.name == item.icon);
    } else if (item.category_reference) {
      icon = icons.find(_ => _.name == shopItems.find(_ => _.reference_id == item.category_reference)?.icon);
    }
    // yes ik this is awful i do not care
    function strikethroughNumber(number) {
      let str = number.toString().split('');
      let strToReturn = "";
      for (const digit of str) {
        if (digit == "0") strToReturn += "\uF830";
        if (digit == "1") strToReturn += "\uF831";
        if (digit == "2") strToReturn += "\uF832";
        if (digit == "3") strToReturn += "\uF833";
        if (digit == "4") strToReturn += "\uF834";
        if (digit == "5") strToReturn += "\uF835";
        if (digit == "6") strToReturn += "\uF836";
        if (digit == "7") strToReturn += "\uF837";
        if (digit == "8") strToReturn += "\uF838";
        if (digit == "9") strToReturn += "\uF839";
      }
      return strToReturn;
    }
    actionForm.button(`${itemName}${item.price ? `${shopData.discount ? `\n§r§6\uE117 §c§o${item.price} §6${Math.floor(calculateDiscount(item.price, shopData.discount))}` : `\n§r§6\uE117 ${item.price}`}` : ``}`, icon && icon.path ? icon.path : null, (player, i) => {
      if (item.category_reference) {
        let categoryName = shopItems.find(_ => _.reference_id == item.category_reference).category;
        uiManager.open("Azalea1.1/Shop/Root/Category", player, categoryName, [...previousCategories, category]);
        return;
      }
      if (!item.price) return;
      let finalPrice = item.price;
      if (shopData.discount) {
        finalPrice = Math.floor(calculateDiscount(item.price, shopData.discount));
      }
      if (item.tag) {
        let actionForm = new ActionForm();
        actionForm.title(`§bAre you sure?`);
        actionForm.body(`Are you sure you want to buy ${itemName} for §6\uE117 ${item.price}§r§f?`);
        actionForm.button(`§aYes`, null, player => {
          let score = 0;
          try {
            let moneyScoreboard = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money") ? configDb.get("MoneyScoreboard", "money") : "money");
            score = moneyScoreboard.getScore(player);
          } catch {
            score = 0;
          }
          if (!score) score = 0;
          if (score >= finalPrice) {
            player.addTag(item.tag);
            let moneyScoreboard = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money") ? configDb.get("MoneyScoreboard", "money") : "money");
            moneyScoreboard.setScore(player, score - item.price);
          }
          uiManager.open("Azalea1.1/Shop/Root/Category", player, category);
        });
        actionForm.button(`§cNo`, null, player => {
          uiManager.open("Azalea1.1/Shop/Root/Category", player, category);
        });
        actionForm.show(player, false, response => {});
        return;
      }
      let modalForm = new ModalForm();
      modalForm.title(`§6\uE117 ${item.price} §r§fper stack`);
      modalForm.slider("Quantity", 1, 64, 1, 1, player => {});
      let players = world.getPlayers().map(_ => {
        return {
          option: _.name,
          callback() {},
          player: _
        };
      });
      let index1 = shopItems.findIndex(_ => _.category == category);
      if (shopItems[index1].isGiftable) modalForm.dropdown("Player Gift", players, players.findIndex(_ => _.option == player.name));
      modalForm.show(player, false, (_player, response) => {
        let quantity = response.formValues[0];
        let player2 = shopItems[index1].isGiftable ? players[response.formValues[1]].player : player;
        let fullPrice = item.price * quantity;
        let score = 0;
        try {
          let moneyScoreboard = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money") ? configDb.get("MoneyScoreboard", "money") : "money");
          score = moneyScoreboard.getScore(player);
        } catch {
          score = 0;
        }
        if (!score) score = 0;
        if (score >= finalPrice) {
          let moneyScoreboard = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money") ? configDb.get("MoneyScoreboard", "money") : "money");
          score -= fullPrice;
          moneyScoreboard.setScore(player, score);
          let inventory = player2.getComponent('inventory');
          for (let i = 0; i < quantity; i++) {
            let itemStack = jsonToItem(item.item);
            inventory.container.addItem(itemStack);
          }
          player2.playSound("note.pling", {
            "pitch": 1,
            "volume": 0.3
          });
        }
      });
    });
  }
  actionForm.show(player, false, (player, response) => {});
});
uiManager.addUI("Azalea1.1/Shop/Root/AdminManage/Category/Item", (player, category, itemIndex) => {
  let shopDbV2 = new DynamicPropertyDatabase("ShopNew");
  let shopItems = shopDbV2.get(getShopKey(player), "");
  if (!shopItems) {
    shopItems = [{
      "category": "Uncategorized",
      "items": []
    }];
    shopDbV2.set(getShopKey(player), shopItems);
  }
  let actionForm = new ActionForm();
  let shopData = shopItems.find(_ => _.category == category);
  if (!shopData) return uiManager.open("Azalea1.1/Shop/Root/AdminManage", player);
  if (!(shopData.items.length > itemIndex)) return uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category", player, category);
  if (shopData.items[itemIndex].item) {
    actionForm.body(`§bItem ID: §r${shopData.items[itemIndex].item.typeId}\n§r§bAmount: §rx${shopData.items[itemIndex].item.amount}`);
  } else if (shopData.items[itemIndex].category_reference) {
    actionForm.body(`Category reference: ${shopData.items[itemIndex].category_reference}`);
  } else if (shopData.items[itemIndex].tag) {
    actionForm.body(`Tag: ${shopData.items[itemIndex].tag}`);
  }
  actionForm.button(`Back`, "textures/azalea_icons/2", player => {
    uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category", player, category);
  });
  if (!shopData.items[itemIndex].category_reference) {
    actionForm.button("Change item display name", "textures/azalea_icons/icontextures/name_tag", player => {
      let modal = new ModalForm();
      modal.textField("Display Name", "Display Name", shopData.items[itemIndex].icon ? shopData.items[itemIndex].icon : undefined);
      modal.show(player, false, (player, response) => {
        if (!response.formValues[0]) return uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category/Item", player, category, itemIndex);
        shopItems[shopItems.findIndex(_ => _.category == category)].items[itemIndex].display = response.formValues[0];
        shopDbV2.set(getShopKey(player), shopItems);
        uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category/Item", player, category, itemIndex);
      });
    });
    actionForm.button(`Change item icon`, `textures/azalea_icons/ClickyClick`, player => {
      let modal = new ModalForm();
      modal.textField("Item Icon (From §ehttps://azalea.trashdev.org/id-lists/ui-icons§r§f)", "ID", shopData.items[itemIndex].icon ? shopData.items[itemIndex].icon : undefined);
      modal.show(player, false, (player, response) => {
        if (!response.formValues[0]) return uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category/Item", player, category, itemIndex);
        shopItems[shopItems.findIndex(_ => _.category == category)].items[itemIndex].icon = response.formValues[0];
        shopDbV2.set(getShopKey(player), shopItems);
        uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category/Item", player, category, itemIndex);
      });
    });
    actionForm.button(`Change price`, `textures/azalea_icons/icontextures/book_04g`, player => {
      let modal = new ModalForm();
      modal.textField("Price", "Example: 100", undefined);
      modal.show(player, false, (player, response) => {
        if (!response.formValues[0] || !/^\d+$/.test(response.formValues[0])) return uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category/Item", player, category, itemIndex);
        shopItems[shopItems.findIndex(_ => _.category == category)].items[itemIndex].price = parseInt(response.formValues[0]);
        shopDbV2.set(getShopKey(player), shopItems);
        uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category/Item", player, category, itemIndex);
      });
    });
    actionForm.button(`Change category`, `textures/azalea_icons/ClickyClick`, player => {
      let modal = new ModalForm();
      modal.textField("Category Name", "Category", shopData.items[itemIndex].icon ? shopData.items[itemIndex].icon : undefined);
      modal.show(player, false, (player, response) => {
        if (!response.formValues[0]) return uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category/Item", player, category, itemIndex);
        let item = JSON.parse(JSON.stringify(shopItems[shopItems.findIndex(_ => _.category == category)].items[itemIndex]));
        shopDbV2.set(getShopKey(player), shopItems);
        shopItems[shopItems.findIndex(_ => _.category == category)].items.splice(itemIndex, 1);
        if (shopItems.find(_ => _.category == response.formValues[0])) {
          shopItems[shopItems.findIndex(_ => _.category == response.formValues[0])].items.push(item);
        } else {
          shopItems.push({
            category: response.formValues[0],
            items: [item]
          });
        }
        shopDbV2.set(getShopKey(player), shopItems);
        uiManager.open("Azalea1.1/Shop/Root/AdminManage", player);
      });
    });
  } else {
    actionForm.button("Jump", "textures/azalea_icons/icontextures/feather", player => {
      uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category", player, shopItems.find(_ => _.reference_id == shopData.items[itemIndex].category_reference).category);
    });
  }
  actionForm.button("Delete", `textures/azalea_icons/Delete`, player => {
    shopItems[shopItems.findIndex(_ => _.category == category)].items.splice(itemIndex, 1);
    shopDbV2.set(getShopKey(player), shopItems);
    uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category", player, category);
  });
  actionForm.button("Move Up", "textures/azalea_icons/Up", player => {
    moveUp(shopItems[shopItems.findIndex(_ => _.category == category)].items, itemIndex);
    shopDbV2.set(getShopKey(player), shopItems);
    uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category", player, category);
  });
  actionForm.button("Move Down", "textures/azalea_icons/Down", player => {
    moveDown(shopItems[shopItems.findIndex(_ => _.category == category)].items, itemIndex);
    shopDbV2.set(getShopKey(player), shopItems);
    uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category", player, category);
  });
  actionForm.show(player, false, (player, response) => {});
});
uiManager.addUI("Azalea1.1/Shop/Root/AdminManage/Category", (player, category) => {
  let shopDbV2 = new DynamicPropertyDatabase("ShopNew");
  let shopItems = shopDbV2.get(getShopKey(player), "");
  if (!shopItems) {
    shopItems = [{
      "category": "Uncategorized",
      "items": []
    }];
    shopDbV2.set(getShopKey(player), shopItems);
  }
  let actionForm = new ActionForm();
  let shopData = shopItems.find(_ => _.category == category);
  if (!shopData) return uiManager.open("Azalea1.1/Shop/Root/AdminManage", player);
  actionForm.button("Back", "textures/azalea_icons/2", player => {
    return uiManager.open("Azalea1.1/Shop/Root/AdminManage", player);
  });
  actionForm.button("Add Discount", "textures/azalea_icons/SetDiscount", (player, i) => {
    let modalForm = new ModalForm();
    modalForm.title("Set Discount");
    modalForm.slider("Discount", 0, 100, 1, shopData.discount ? shopData.discount : 0);
    modalForm.show(player, false, (player, response) => {
      let index1 = shopItems.findIndex(_ => _.category == shopData.category);
      shopItems[index1].discount = response.formValues[0];
      shopDbV2.set(getShopKey(player), shopItems);
      return uiManager.open("Azalea1.1/Shop/Root/AdminManage", player, category);
    });
  });
  actionForm.button("Edit Category Name", "textures/azalea_icons/icontextures/name_tag", (player, i) => {
    let modalForm = new ModalForm();
    modalForm.title("Edit category name");
    modalForm.textField("Name", "Category name", category);
    modalForm.show(player, false, (player, response) => {
      if (!response.formValues[0]) return uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category", player, category);
      if (response.formValues[0] == category) {
        return uiManager.open("Azalea1.1/Shop/Root/AdminManage", player, category);
      }
      if (shopItems.find(_ => _.category == response.formValues[0])) {
        let index1 = shopItems.findIndex(_ => _.category == response.formValues[0]);
        shopItems[index1].items = [...shopItems[index1].items, ...shopData.items];
        let index2 = shopItems.findIndex(_ => _.category == category);
        shopItems.splice(index2, 1);
      } else {
        let index2 = shopItems.findIndex(_ => _.category == category);
        let data = shopData;
        data.category = response.formValues[0];
        shopItems.splice(index2, 1);
        shopItems.push(data);
      }
      shopDbV2.set(getShopKey(player), shopItems);
      return uiManager.open("Azalea1.1/Shop/Root/AdminManage", player, category);
    });
  });
  actionForm.button("Set required tag", "textures/azalea_icons/icontextures/name_tag", player => {
    let modalForm = new ModalForm();
    modalForm.textField("Required Tag (Leave blank for none)", "Set a tag required to view this category", shopData.tag ? shopData.tag : undefined);
    modalForm.show(player, false, (player, response) => {
      if (!response.formValues[0]) {
        let index1 = shopItems.findIndex(_ => _.category == shopData.category);
        shopItems[index1].tag = "";
        shopDbV2.set(getShopKey(player), shopItems);
        return uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category", player, category);
      }
      let index1 = shopItems.findIndex(_ => _.category == shopData.category);
      shopItems[index1].tag = response.formValues[0];
      shopDbV2.set(getShopKey(player), shopItems);
      return uiManager.open("Azalea1.1/Shop/Root/AdminManage", player, category);
    });
  });
  actionForm.button("Edit Category Icon", "textures/azalea_icons/ClickyClick", (player, i) => {
    let modalForm = new ModalForm();
    modalForm.textField("Category Icon (From §ehttps://azalea.trashdev.org/id-lists/ui-icons§r§f)", "Put an Icon ID", shopData.icon ? shopData.icon : undefined);
    modalForm.show(player, false, (player, response) => {
      if (!response.formValues[0]) return uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category", player, category);
      let index1 = shopItems.findIndex(_ => _.category == shopData.category);
      shopItems[index1].icon = response.formValues[0];
      shopDbV2.set(getShopKey(player), shopItems);
      return uiManager.open("Azalea1.1/Shop/Root/AdminManage", player, category);
    });
  });
  actionForm.button("Delete", "textures/azalea_icons/Delete", (player, i) => {
    let actionForm = new ActionForm();
    actionForm.body(`Are you sure you want to delete this category and ${shopData.items.length} item(s)?`);
    actionForm.button("§aYes", null, (player, i) => {
      shopItems.splice(shopItems.findIndex(_ => _.category == shopData.category), 1);
      shopDbV2.set(getShopKey(player), shopItems);
      uiManager.open("Azalea1.1/Shop/Root/AdminManage", player);
    });
    actionForm.button("§cNo", null, (player, i) => {
      uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category", player, category);
    });
    actionForm.show(player, false, (player, response) => {});
  });
  for (let i = 0; i < shopData.items.length; i++) {
    let item = shopData.items[i];
    let itemName;
    let icon = icons.find(_ => _.name == item.icon);
    if (item.category_reference) {
      if (!shopItems.find(_ => _.reference_id == item.category_reference)) continue;
      itemName = shopItems.find(_ => _.reference_id == item.category_reference).category;
      icon = icons.find(_ => _.name == shopItems.find(_ => _.reference_id == item.category_reference).icon);
    } else if (item.display) {
      itemName = item.display;
    } else {
      let itemStack = jsonToItem(item.item);
      itemName = parseItemName(itemStack);
    }
    actionForm.button(`${itemName}${item.price ? `\n§r§6\uE117 ${item.price}` : ``}`, icon && icon.path ? icon.path : null, player => {
      uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category/Item", player, category, i);
    });
  }
  actionForm.button("Move Up", "textures/azalea_icons/Up", player => {
    moveUp(shopItems, shopItems.findIndex(_ => _.category == category));
    shopDbV2.set(getShopKey(player), shopItems);
    uiManager.open("Azalea1.1/Shop/Root/AdminManage", player);
  });
  actionForm.button("Move Down", "textures/azalea_icons/Down", player => {
    moveDown(shopItems, shopItems.findIndex(_ => _.category == category));
    shopDbV2.set(getShopKey(player), shopItems);
    uiManager.open("Azalea1.1/Shop/Root/AdminManage", player);
  });
  actionForm.button(shopItems.find(_ => _.category == category).isGiftable ? "Disable Gifting" : "Enable Gifting", null, player => {
    if (shopItems.find(_ => _.category == category)) {
      let index1 = shopItems.findIndex(_ => _.category == category);
      shopItems[index1].isGiftable = shopItems[index1].isGiftable ? false : true;
      shopDbV2.set(getShopKey(player), shopItems);
    }
    uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category", player, category);
  });
  actionForm.button("Add Buyable Tag", null, player => {
    let modalForm = new ModalForm();
    modalForm.title("Buyable Tag");
    modalForm.textField("Tag", "Tag to add to player", undefined);
    modalForm.textField("Price", "Price (Example: 100)", undefined);
    modalForm.textField("Display Name", "Display name", undefined);
    modalForm.show(player, false, (player, response) => {
      if (!response.formValues[0]) return uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category", player, category);
      if (!response.formValues[1] || !/^\d+$/.test(response.formValues[1])) return uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category", player, category);
      if (!response.formValues[2]) return uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category", player, category);
      let index = shopItems.findIndex(_ => _.category == category);
      shopItems[index].items.push({
        price: parseInt(response.formValues[1]),
        tag: response.formValues[0],
        display: response.formValues[2]
      });
      shopDbV2.set(getShopKey(player), shopItems);
      uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category", player, category);
    });
  });
  actionForm.button("Import Category", null, player => {
    let form2 = new ActionForm();
    for (const category2 of shopItems) {
      form2.button(category2.category, null, player => {
        let index = shopItems.findIndex(_ => _.category == category);
        let index2 = shopItems.findIndex(_ => _.category == category2.category);
        if (!shopItems[index2].reference_id) shopItems[index2].reference_id = Date.now();
        shopItems[index].items.push({
          category_reference: shopItems[index2].reference_id,
          display: "UPDATE"
        });
        shopDbV2.set(getShopKey(player), shopItems);
      });
    }
    form2.show(player, false, player => {});
  });
  actionForm.show(player, false, (player, response) => {});
});
uiManager.addUI("Azalea1.1/Shop/Root/AdminManage/Transfer/Confirm", (player, shopID) => {
  let actionForm = new ActionForm();
  actionForm.body(`Are you sure you want to overwrite the items in your current shop with the ones in shop ${shopID}?`);
  actionForm.button("§cNo", null, player => {
    uiManager.open("Azalea1.1/Shop/Root/AdminManage", player);
  });
  actionForm.button("§aYes", null, (player, i) => {
    let shopKey = shopID == 0 ? "ShopItems" : `ShopItems-${shopID}`;
    let shopDbV2 = new DynamicPropertyDatabase("ShopNew");
    shopDbV2.set(getShopKey(player), shopDbV2.get(shopKey));
    uiManager.open("Azalea1.1/Shop/Root", player);
  });
  actionForm.show(player, false, player => {});
});
uiManager.addUI("Azalea1.1/Shop/Root/AdminManage/Transfer", player => {
  let actionForm = new ActionForm();
  let shopDbV2 = new DynamicPropertyDatabase("ShopNew");
  let shops = shopDbV2.gkeys.filter(_ => {
    return _.startsWith('ShopItems') && !_.endsWith('Title') && !_.endsWith('Body');
  }).map(_ => {
    return _ == "ShopItems" ? 0 : parseInt(_.substring('ShopItems-'.length));
  });
  actionForm.body("§c§lThis is dangerous! This will copy items from another shop to your current shop, and will overwrite all other items! Don't use this if you do not know what you are doing.");
  actionForm.button("Back", null, player => {
    uiManager.open("Azalea1.1/Shop/Root/AdminManage", player);
  });
  for (const shop of shops) {
    actionForm.button(`Shop ${shop}`, null, player => {
      uiManager.open("Azalea1.1/Shop/Root/AdminManage/Transfer/Confirm", player, shop);
    });
  }
  actionForm.show(player, false, player => {});
});
uiManager.addUI("Azalea1.1/Shop/Root/AdminManage", player => {
  let shopDbV2 = new DynamicPropertyDatabase("ShopNew");
  let shopItems = shopDbV2.get(getShopKey(player), "");
  if (!shopItems) {
    shopItems = [{
      "category": "Uncategorized",
      "items": []
    }];
    shopDbV2.set(getShopKey(player), shopItems);
  }
  let actionForm = new ActionForm();
  if (!shopItems.length) {
    actionForm.button("§cExit", null, () => {});
  }
  actionForm.button("Back", "textures/azalea_icons/2", player => {
    uiManager.open("Azalea1.1/Shop/Root", player);
  });
  for (const item of shopItems) {
    let icon = icons.find(_ => _.name == item.icon);
    if (!icon) icon = null;
    actionForm.button(item.category, icon && icon.path ? icon.path : null, (player, i) => {
      uiManager.open("Azalea1.1/Shop/Root/AdminManage/Category", player, item.category);
    });
  }
  actionForm.button("Edit Shop UI", null, (player, i) => {
    let thing1 = shopDbV2.get(getShopKey(player) + "-Title", "");
    if (!thing1) thing1 = undefined;
    let thing2 = shopDbV2.get(getShopKey(player) + "-Body", "");
    if (!thing2) thing2 = undefined;
    let modal = new ModalForm();
    modal.textField("Title", "UI Title", thing1);
    modal.textField("Body", "UI Body", thing2);
    modal.textField("Tag Required", "Tag Required", thing2);
    modal.show(player, false, (player, response) => {
      if (!response.formValues[0]) {
        shopDbV2.set(getShopKey(player) + "-Title", "");
      } else {
        shopDbV2.set(getShopKey(player) + "-Title", response.formValues[0]);
      }
      if (!response.formValues[1]) {
        shopDbV2.set(getShopKey(player) + "-Body", "");
      } else {
        shopDbV2.set(getShopKey(player) + "-Body", response.formValues[1]);
      }
      // if(!response.formValues[2]) {
      //     shopDbV2.set(getShopKey(player)+"-TagRequired", "")
      // } else {
      //     shopDbV2.set(getShopKey(player)+"-TagRequired", response.formValues[1])
      // }
      uiManager.open("Azalea1.1/Shop/Root/AdminManage", player);
    });
  });
  actionForm.button("New Category", null, (player, i) => {
    shopItems.push({
      category: `New Category${shopItems.filter(_ => _.category.startsWith('New Category')).length == 0 ? "" : ` ${shopItems.filter(_ => _.category.startsWith('New Category')).length}`}`,
      items: []
    });
    shopDbV2.set(getShopKey(player), shopItems);
  });
  actionForm.button("§cTransfer from other shop", null, (player, i) => {
    uiManager.open("Azalea1.1/Shop/Root/AdminManage/Transfer", player);
  });
  actionForm.show(player, false, (player, response) => {});
});
uiManager.addUI("Azalea2.0/ShopChest/Root/Category", (player, category) => {
  let shopDbV2 = new DynamicPropertyDatabase("ShopNew");
  let shopCategories = shopDbV2.get(getShopKey(player), "");
  let thing1 = shopDbV2.get(getShopKey(player) + "-Title", "");
  if (!thing1) thing1 = "";
  let thing2 = shopDbV2.get(getShopKey(player) + "-Body", "");
  if (!thing2) thing2 = "";
  if (!shopCategories) {
    shopCategories = [{
      "category": "Uncategorized",
      "items": []
    }];
    shopDbV2.set(getShopKey(player), shopCategories);
  }
  let categoryIndex = shopCategories.findIndex(_ => _.category == category);
  let rows = Math.floor(shopCategories[categoryIndex].items.length / 9);
  let chest = new ChestFormData(((rows + 1) * 9).toString());
  for (let i = 9 * rows; i < 9 * (rows + 1); i++) {
    if (i == 9 * rows + 4) continue;
    chest.button(i, "§cX", ``, `textures/blocks/glass_gray`, 1);
  }
  chest.button(9 * rows + 4, "§cBack", [`Go back to main shop page`], `textures/azalea_icons/2`, 1);
  let currIndex = -1;
  let lastSlot = 0;
  let initialSlot = 4;
  let iteration = 0;
  let iterationRight = 0;
  let iterationLeft = 0;
  let offset = 0;
  let items2 = [];
  chest.title(`Chest Shop - ${shopCategories[categoryIndex].category}`);
  for (const item of shopCategories[categoryIndex].items) {
    if (item.category_reference) {
      let category2 = shopCategories.find(_ => _.reference_id == item.category_reference);
      if (!category2) continue;
    }
    currIndex++;
    let slot = 0;
    if (currIndex == 0) slot = 4;
    if (currIndex % 9 == 0 && currIndex != 0) {
      iterationRight = 0;
      iterationLeft = 0;
      offset += 9;
      slot = initialSlot + offset;
    } else if (currIndex != 0 && currIndex % 2 == 0) {
      slot = initialSlot - (1 + iterationLeft) + offset;
      iterationLeft++;
    } else if (currIndex != 0 && currIndex % 2 != 0) {
      slot = initialSlot + (1 + iterationRight) + offset;
      iterationRight++;
    }
    lastSlot = slot;
    iteration++;
    items2.push([slot, item]);
    if (item.category_reference) {
      let category2 = shopCategories.find(_ => _.reference_id == item.category_reference);
      let iconData = icons.find(_ => _.name == category2.icon);
      chest.button(slot, `${category2.category}`, [`Item Count: ${category2.items.length}`], iconData && iconData.path ? iconData.path : "textures/azalea_icons/Info");
    }
  }
  chest.show(player).then(res => {
    if (res.canceled) return;
    if (res.selection == 9 * rows + 4) {
      uiManager.open("Azalea2.0/ShopChest/Root", player);
    } else if (res.selection < shopCategories[categoryIndex].items) {
      let items = shopCategories[categoryIndex].items;
      let item = items[res.selection];
      item;
    } else if (items2.find(_ => _[0] == res.selection)) {
      // let [slot, ]
    } else {
      uiManager.open("Azalea2.0/ShopChest/Root/Category", player, category);
    }
  });
});
uiManager.addUI("Azalea2.0/ShopChest/Root", player => {
  let shopDbV2 = new DynamicPropertyDatabase("ShopNew");
  let shopCategories = shopDbV2.get(getShopKey(player), "");
  let thing1 = shopDbV2.get(getShopKey(player) + "-Title", "");
  if (!thing1) thing1 = "";
  let thing2 = shopDbV2.get(getShopKey(player) + "-Body", "");
  if (!thing2) thing2 = "";
  if (!shopCategories) {
    shopCategories = [{
      "category": "Uncategorized",
      "items": []
    }];
    shopDbV2.set(getShopKey(player), shopCategories);
  }
  let chest = new ChestFormData("27");
  chest.title(thing1 ? thing1 : "Chest Shop");
  let currSlot = -1;
  for (let i = 9 * 2; i < 9 * 3; i++) {
    if (i == 9 * 2 + 4) continue;
    chest.button(i, "§cX", ``, `textures/blocks/glass_black`, 1);
  }
  chest.button(9 * 2 + 4, "§dBack to normal layout", [`Changes the Chest UI to the other Shop UI`], `textures/azalea_icons/Settings`, 1);
  let categoriesAdded = [];
  for (const categoryData of shopCategories) {
    let {
      category,
      items
    } = categoryData;
    if (categoryData.reference_id && shopCategories.find(_ => _.items.findIndex(_ => _.category_reference == categoryData.reference_id) >= 0)) continue;
    currSlot++;
    categoriesAdded.push(shopCategories.findIndex(_ => _.category == category));
    let iconData = icons.find(_ => _.name == categoryData.icon);
    chest.button(currSlot, `${category}`, [`Item Count: ${items.length}`], iconData && iconData.path ? iconData.path : "textures/azalea_icons/Info", 1);
  }
  chest.show(player).then(res => {
    if (res.canceled) return;
    if (res.selection == 9 * 2 + 4) {
      try {
        player.removeTag("chest-shop");
      } catch {}
      uiManager.open("Azalea1.1/Shop/Root", player);
      return;
    } else if (categoriesAdded.length > res.selection) {
      let category = categoriesAdded[res.selection];
      uiManager.open("Azalea2.0/ShopChest/Root/Category", player, shopCategories[category].category);
    } else {
      uiManager.open("Azalea2.0/ShopChest/Root", player);
    }
  });
});
uiManager.addUI("Azalea1.1/Shop/Root", player => {
  if (player.hasTag("chest-shop")) {
    return uiManager.open("Azalea2.0/ShopChest/Root", player);
  }
  let actionForm = new ActionForm();
  let shopDbV2 = new DynamicPropertyDatabase("ShopNew");
  let shopDb = new Database("ShopADB2");
  let shopItems = shopDbV2.get(getShopKey(player), "");
  let thing1 = shopDbV2.get(getShopKey(player) + "-Title", "");
  if (!thing1) thing1 = "";
  let thing2 = shopDbV2.get(getShopKey(player) + "-Body", "");
  if (!thing2) thing2 = "";
  if (!shopItems) {
    shopItems = [{
      "category": "Uncategorized",
      "items": []
    }];
    shopDbV2.set(getShopKey(player), shopItems);
  }
  if (isAdmin(player) && shopDb.get("Converted", "FALSE") != "TRUE") {
    actionForm.body("Looks like you used shop on azalea versions before V1.1. To use the new shop update, you need to convert the old shop.");
    actionForm.button("Convert", null, (player, i) => {
      let shopItems = shopDb.get(getShopKey(player), []);
      let categories = {};
      for (let i = 0; i < shopItems.length; i++) {
        let item = shopItems[i];
        let category = item.category || "Uncategorized";
        if (!categories[category]) categories[category] = [];
        categories[category].push({
          ...item,
          index: i
        });
      }
      let shopData = [];
      for (const key of Object.keys(categories)) {
        shopData.push({
          category: key,
          items: categories[key]
        });
      }
      shopDbV2.set(getShopKey(player), shopData);
      shopDb.set("Converted", "TRUE");
    });
  } else {
    if (thing1) actionForm.title(thing1);
    if (thing2) actionForm.body(thing2);
    if (isAdmin(player)) {
      actionForm.button("Admin: Manage Shop", "textures/azalea_icons/icontextures/cake", (player, i) => {
        uiManager.open("Azalea1.1/Shop/Root/AdminManage", player);
      });
    }
    for (const shopItem of shopItems) {
      if (shopItem.reference_id && shopItems.find(_ => _.items.find(_ => _.category_reference == shopItem.reference_id))) continue;
      let icon = icons.find(_ => _.name == shopItem.icon);
      if (!icon) icon = null;
      if (shopItem.tag && !player.hasTag(shopItem.tag) && !isAdmin(player)) continue;
      actionForm.button(shopItem.category, icon && icon.path ? icon.path : null, (player, i) => {
        uiManager.open("Azalea1.1/Shop/Root/Category", player, shopItem.category);
      });
    }
  }
  // actionForm.button("Switch to Chest UI", "textures/azalea_icons/Settings", player => {
  //     player.addTag("chest-shop")
  //     uiManager.open("Azalea2.0/ShopChest/Root", player);
  // })
  actionForm.show(player, false, (player, response) => {});
});
export function openShopUI(sender) {
  return uiManager.open("Azalea1.1/Shop/Root", sender);
  let shopDb = new Database("ShopADB2");
  let shopItems = shopDb.get(getShopKey(player), []);
  if (!shopItems || !shopItems.length) {
    let actionFormData = new ActionFormData();
    actionFormData.title("Not Configured");
    actionFormData.body("§bShop has not been configured. Type §e!shop add <price> §bto add an item to the shop.");
    actionFormData.button("§cClose", "textures/azalea_icons/2");
    actionFormData.show(sender).then(res => {});
    return;
  }
  let actionForm = new ActionFormData();
  let categories = {};
  for (let i = 0; i < shopItems.length; i++) {
    let item = shopItems[i];
    let category = item.category || "Uncategorized";
    if (!categories[category]) categories[category] = [];
    categories[category].push({
      ...item,
      index: i
    });
  }
  let categoryKeys = Object.keys(categories);
  actionForm.title("§2--- §aShop §2---");
  for (const category of categoryKeys) {
    let icon = shopDb.get(`category-${category}`);
    let iconData = icons.find(_ => _.name == icon) ?? null;
    actionForm.button(`§a${category}\n`, iconData ? iconData.path : null);
  }
  if (isAdmin(sender)) actionForm.button(`§cEdit categories\n§4[ §7ADMINS ONLY §4]`, `textures/azalea_icons/icontextures/paper`);
  actionForm.show(sender).then(res => {
    if (res.canceled) return;
    if (isAdmin(sender) && res.selection == categoryKeys.length) {
      let categoriesForm = new ActionFormData();
      for (const category of categoryKeys) {
        let icon = shopDb.get(`category-${category}`);
        let iconData = icons.find(_ => _.name == icon) ?? null;
        categoriesForm.button(`§2${category}\n§q[ §8CLICK TO OPEN ]`, iconData ? iconData.path : null);
      }
      categoriesForm.show(sender).then(res2 => {
        if (res2.canceled) return;
        let shopSubForm = new ActionFormData();
        for (const item of categories[categoryKeys[res2.selection]]) {
          shopSubForm.button(`§q${item.item.nameTag ? item.item.nameTag : item.item.typeId.split(':')[1].split('_').map(_ => _[0].toUpperCase() + _.substring(1)).join(' ')} §8x${item.item.amount ? item.item.amount : 1}\n§8$${item.price} `);
        }
        shopSubForm.button("Edit icon", "textures/azalea_icons/1");
        shopSubForm.show(sender).then(res3 => {
          if (res3.canceled) return;
          if (res3.selection >= categories[categoryKeys[res2.selection]].length) {
            let modalForm = new ModalFormData();
            let currentIcon = shopDb.get(`category-${categoryKeys[res2.selection]}`);
            modalForm.textField("Icon ID", "type the icon id", currentIcon ? currentIcon : null);
            modalForm.show(sender).then(res4 => {
              shopDb.set(`category-${categoryKeys[res2.selection]}`, res4.formValues[0]);
            });
            return;
          }
          let item1 = categories[categoryKeys[res2.selection]][res3.selection];
          let modal = new ModalFormData().textField("Category name", "Type a category name", item1.category ? item1.category : "Uncategorized").toggle("Remove?", false);
          modal.show(sender).then(res4 => {
            if (res4.canceled) return;
            let item = shopItems[item1.index];
            item.category = res4.formValues[0];
            shopItems[item1.index] = item;
            if (res4.formValues[1]) {
              shopItems.splice(item1.index, 1);
            }
            shopDb.set(getShopKey(player), shopItems);
          });
        });
      });
      return;
    }
    if (res.selection >= 0 && res.selection < categoryKeys.length) {
      let shopItems2 = categories[categoryKeys[res.selection]];
      let shopSubForm = new ActionFormData();
      for (const item of shopItems2) {
        shopSubForm.button(`§q${item.item.nameTag ? item.item.nameTag : item.item.typeId.split(':')[1].split('_').map(_ => _[0].toUpperCase() + _.substring(1)).join(' ')} §8x${item.item.amount ? item.item.amount : 1}\n§8$${item.price} `);
      }
      shopSubForm.show(sender).then(res2 => {
        if (res2.canceled) return;
        let item = shopItems2[res2.selection];
        let moneyScoreboard = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money") ? configDb.get("MoneyScoreboard", "money") : "money");
        let money = 0;
        try {
          money = moneyScoreboard.getScore(sender.scoreboardIdentity);
        } catch {
          money = 0;
        }
        if (!money) money = 0;
        if (money >= item.price) {
          money -= item.price;
          moneyScoreboard.setScore(sender.scoreboardIdentity, money);
          let inventory = sender.getComponent("inventory");
          inventory.container.addItem(jsonToItem(item.item));
          sender.sendMessage(`§aSuccessfully bought §q${item.item.nameTag ? item.item.nameTag : item.item.typeId.split(':')[1].split('_').map(_ => _[0].toUpperCase() + _.substring(1)).join(' ')} §8x${item.item.amount ? item.item.amount : 1} §r§afor $${item.price}`);
        } else {
          sender.sendMessage(`§cEven your moms credit card can't help you buy this. Get more money.`);
        }
      });
    }
  });
}
/*
    -----------------------------------------------------------------
                                SELL SHOP
    -----------------------------------------------------------------
*/
function getMultiSellScore(player) {
  let multisell = world.scoreboard.getObjective("multisell");
  if (!multisell) multisell = world.scoreboard.addObjective("multisell", "Multisell");
  let score = 0;
  try {
    score = multisell.getScore(player.scoreboardIdentity);
  } catch {
    score = 0;
  }
  if (!score) score = 0;
  return score;
}
function parseTypeId(typeId) {
  let name = typeId.split(':')[1];
  let words = name.split('_').map(_ => {
    return `${_[0].toUpperCase()}${_.substring(1)}`;
  }).join(' ');
  return words;
}
uiManager.addUI("Azalea1.1/Sell/Root", player => {
  let sellShopDb = new Database("SellShop2");
  let sellItems = sellShopDb.get("Items", []) ? sellShopDb.get("Items", []) : [];
  let form = new ActionForm();
  form.title("Sell Shop");
  form.body("Here are some of the items from your inventory that you can sell:");
  let inventory = player.getComponent('inventory');
  let totals = {};
  for (let i = 0; i < inventory.container.size; i++) {
    let item = inventory.container.getItem(i);
    if (!item) continue;
    if (totals[item.typeId]) totals[item.typeId] = totals[item.typeId] + 1;else totals[item.typeId] = 1;
  }
  form.button("Leave", "textures/azalea_icons/2", player => {});
  for (const sellItem of sellItems) {
    if (totals[sellItem]) {
      form.button(`${parseTypeId(sellItem.typeId)}\n§r§6\uE117 ${sellItem.value}`);
    }
  }
});
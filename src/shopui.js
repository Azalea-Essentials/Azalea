import { world } from '@minecraft/server';
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from '@minecraft/server-ui';
import icons from './icons';
import { jsonToItem } from './conv';
import { Database } from './db';
import { isAdmin } from './isAdmin';
let configDb = new Database("Config")
export function openShopUI(sender) {
    let shopDb = new Database("ShopADB2");
    let shopItems = shopDb.get("ShopItems", []);
    if(!shopItems || !shopItems.length) {
        let actionFormData = new ActionFormData();
        actionFormData.title("Not Configured");
        actionFormData.body("§bShop has not been configured. Type §e!shop add <price> §bto add an item to the shop.")
        actionFormData.button("§cClose", "azalea_icons/2")
        actionFormData.show(sender).then(res=>{
            
        })
        return;
    }
    let actionForm = new ActionFormData();

    let categories = {};

    for (let i = 0;i < shopItems.length;i++) {
        let item = shopItems[i];
        let category = item.category || "Uncategorized";

        if (!categories[category])
            categories[category] = [];

        categories[category].push({...item,index:i});

    }

    let categoryKeys = Object.keys(categories);
    actionForm.title("§2--- §aShop §2---");
    for (const category of categoryKeys) {
        let icon = shopDb.get(`category-${category}`);
        let iconData = icons.find(_=>_.name==icon) ?? null;
        actionForm.button(`§a${category}\n`, iconData ? iconData.path : null);
    }

    if (isAdmin(sender)) actionForm.button(`§cEdit categories\n§4[ §7ADMINS ONLY §4]`, `azalea_icons/icontextures/paper`)

    actionForm.show(sender).then(res => {
        if (res.canceled) return;
        if (isAdmin(sender) && res.selection == categoryKeys.length) {
            let categoriesForm = new ActionFormData();
            for (const category of categoryKeys) {
                let icon = shopDb.get(`category-${category}`);
                let iconData = icons.find(_=>_.name==icon) ?? null;
                categoriesForm.button(`§2${category}\n§q[ §8CLICK TO OPEN ]`, iconData ? iconData.path : null);
            }
            categoriesForm.show(sender).then(res2 => {
                if (res2.canceled) return;
                let shopSubForm = new ActionFormData();
                for (const item of categories[categoryKeys[res2.selection]]) {
                    shopSubForm.button(`§q${item.item.nameTag ?
                        item.item.nameTag :
                        item.item.typeId
                            .split(':')[1]
                            .split('_')
                            .map(_ => _[0].toUpperCase() + _.substring(1))
                            .join(' ')} §8x${item.item.amount ? item.item.amount : 1}\n§8$${item.price} `
                    );
                }
                shopSubForm.button("Edit icon", "azalea_icons/1");
                shopSubForm.show(sender).then(res3 => {
                    if (res3.canceled) return;
                    if(res3.selection >= categories[categoryKeys[res2.selection]].length) {
                        let modalForm = new ModalFormData();
                        let currentIcon = shopDb.get(`category-${categoryKeys[res2.selection]}`);
                        modalForm.textField("Icon ID", "type the icon id", currentIcon ? currentIcon : null);
                        modalForm.show(sender).then(res4=>{
                            shopDb.set(`category-${categoryKeys[res2.selection]}`, res4.formValues[0]);
                        })
                        return;
                    }
                    let item1 = categories[categoryKeys[res2.selection]][res3.selection];
                    let modal = new ModalFormData()
                        .textField("Category name", "Type a category name", item1.category ? item1.category : "Uncategorized")
                        .toggle("Remove?", false)
                    modal.show(sender).then(res4 => {
                        if (res4.canceled) return;
                        let item = shopItems[item1.index];
                        item.category = res4.formValues[0];
                        shopItems[item1.index] = item;
                        if (res4.formValues[1]) {
                            shopItems.splice(item1.index, 1);
                        }
                        shopDb.set("ShopItems", shopItems);
                    })
                })
            })

            return;
        }
        if (res.selection >= 0 && res.selection < categoryKeys.length) {
            let shopItems2 = categories[categoryKeys[res.selection]];
            let shopSubForm = new ActionFormData();
            for (const item of shopItems2) {
                shopSubForm.button(`§q${item.item.nameTag ?
                    item.item.nameTag :
                    item.item.typeId
                        .split(':')[1]
                        .split('_')
                        .map(_ => _[0].toUpperCase() + _.substring(1))
                        .join(' ')} §8x${item.item.amount ? item.item.amount : 1}\n§8$${item.price} `
                );
            }
            shopSubForm.show(sender).then(res2 => {
                if (res2.canceled) return;
                let item = shopItems2[res2.selection];
                let moneyScoreboard = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money") ? configDb.get("MoneyScoreboard", "money") : "money");
                let money = 0;
                try {
                    money = moneyScoreboard.getScore(sender.scoreboardIdentity);
                } catch { money = 0; }
                if (!money) money = 0;
                if (money >= item.price) {
                    money -= item.price;
                    moneyScoreboard.setScore(sender.scoreboardIdentity, money);
                    let inventory = sender.getComponent("inventory");
                    inventory.container.addItem(jsonToItem(item.item));
                    sender.sendMessage(`§aSuccessfully bought §q${item.item.nameTag ?
                        item.item.nameTag :
                        item.item.typeId
                            .split(':')[1]
                            .split('_')
                            .map(_ => _[0].toUpperCase() + _.substring(1))
                            .join(' ')} §8x${item.item.amount ? item.item.amount : 1} §r§afor $${item.price}`)
                } else {
                    sender.sendMessage(`§cEven your moms credit card can't help you buy this. Get more money.`);
                }
            })
        }
    })
}
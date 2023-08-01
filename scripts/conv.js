import { Enchantment, ItemStack } from '@minecraft/server';
export function itemToJson(item) {
  let json = {};
  json.typeId = item.typeId;
  json.amount = item.amount;
  if (item.keepOnDeath) json.keepOnDeath = item.keepOnDeath;
  if (item.nameTag) json.nameTag = item.nameTag;
  if (item.getLore().length) json.lore = item.getLore();
  if (item.hasComponent("minecraft:enchantments")) {
    console.warn("ITEM HAS ENCHANTMENTS");
    json.enchants = [];
    let enchantmentComponent = item.getComponent("minecraft:enchantments");
    let enchantments = enchantmentComponent.enchantments;
    for (const enchant of enchantments) {
      json.enchants.push({
        type: enchant.type.id,
        level: enchant.level
      });
    }
  }
  return json;
}
export function jsonToItem(json) {
  let item = new ItemStack(json.typeId, json.amount);
  item.keepOnDeath = json.keepOnDeath ? true : false;
  item.setLore(json.lore ? json.lore : []);
  if (json.nameTag) item.nameTag = json.nameTag;
  let enchants = item.getComponent("minecraft:enchantments");
  if (json.enchants && json.enchants.length) {
    // console.log(`${JSON.stringify(json.enchants)}`)
    for (const enchantment of json.enchants) {
      console.log(JSON.stringify(enchantment));
      const enchList = enchants.enchantments;
      let enchant = new Enchantment(enchantment.type, enchantment.level);
      let successful = enchList.addEnchantment(enchant);
      if (!successful) {
        console.warn("UNSUCCESSFUL");
      } else {
        enchants.enchantments = enchList;
        console.warn("SUCCESSFUL");
      }
    }
  }
  return item;
}
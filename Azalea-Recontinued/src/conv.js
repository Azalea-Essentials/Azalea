import {
  ItemStack,
} from '@minecraft/server';

export function itemToJson(item) {
    let json = {};
    json.typeId = item.typeId;
    json.amount = item.amount;
    if(item.keepOnDeath) json.keepOnDeath = item.keepOnDeath;
    if(item.nameTag) json.nameTag = item.nameTag;
    if(item.getLore().length) json.lore = item.getLore();
    return json;
}
export function jsonToItem(json) {
    let item = new ItemStack(json.typeId, json.amount);
    item.keepOnDeath = json.keepOnDeath ? true : false;
    item.setLore(json.lore ? json.lore : []);
    if(json.nameTag) item.nameTag = json.nameTag;
    return item;
}
import { ItemStack, system, world } from "@minecraft/server";
import { DynamicPropertyDatabase } from "./dynamicPropertyDb";

export class ItemDatabase {
    constructor() {
        this.entityID = "azalea:item_storage";
        this.db = new DynamicPropertyDatabase("ItemDB");
        this.loc = {
            x: 0,
            y: -63,
            z: 0
        };
        this.tag = "item_storage";
        try {
            system.run(()=>{
                world.getDimension('overworld').runCommand(`tickingarea add circle 0 -63 0 1 azalea_itemdb`)
            })
        } catch {

        }
    }
    generateItemID() {
        return `${Date.now()}:${Math.floor(Math.random() * 1000000)}`;
    }
    getEntities() {
        return world.getDimension('overworld').getEntities({
            "tags": [this.tag],
            type: this.entityID
        });
    }
    getOldestEntityWithRemainingItems() {
        let entities = this.getEntities();
        let entity;
        if(!entities || !entities.length) {
            entity = world.getDimension('overworld').spawnEntity(this.entityID, this.loc)
            entity.addTag(this.tag);
            entity.setDynamicProperty("dateCreated", Date.now());
            return entity;
        }
        entities = entities.sort((a,b)=>{
            let aCreated = a.getDynamicProperty("dateCreated");
            if(!aCreated) {
                aCreated = Date.now();
                a.setDynamicProperty("dateCreated", Date.now());
            }
            let bCreated = b.getDynamicProperty("dateCreated");
            if(!bCreated) {
                bCreated = Date.now();
                b.setDynamicProperty("dateCreated", Date.now());
            }
            return aCreated - bCreated;
        })
        for(const entity of entities) {
            let entityInventory = entity.getComponent('inventory');
            for(let i = 0;i < entityInventory.container.size;i++) {
                let item = entityInventory.container.getItem(i)
                if(!item) return entity;
            }
        }
        entity = world.getDimension('overworld').spawnEntity(this.entityID, this.loc)
        entity.addTag(this.tag);
        entity.setDynamicProperty("dateCreated", Date.now())
        return entity;
    }
    addItem(itemStackOld) {
        if(!(itemStackOld instanceof ItemStack)) return;
        let itemStack = itemStackOld.clone()
        let id = this.generateItemID();
        let entity = this.getOldestEntityWithRemainingItems();
        let inventory = entity.getComponent('inventory');
        let lore = itemStack.getLore();
        lore.push(`§i§t§e§m§i§d:${id}`);
        itemStack.setLore(lore);
        let done = false;
        for(let i = 0;i < inventory.container.size;i++) {
            if(done) break;
            let item = inventory.container.getItem(i);
            if(!item) {
                this.db.set(id, {
                    entityID: `${entity.id}`,
                    slot: i
                });
                inventory.container.setItem(i, itemStack);
                done = true;
                return id;
            }
        }
    }
    getItemFromEntityAndSlot(entityID, slot) {
        try {
            let entity = world.getEntity(entityID);
            if(!entity) return 0;
            if(entity.typeId != this.entityID || !entity.hasTag(this.tag)) return 1;
            let inventory = entity.getComponent('inventory');
            let item = inventory.container.getItem(slot);
            if(!item) return 2;
            // return item.getLore().find(_=>_.startsWith('§i§t§e§m§i§d:')).substring(13);
            let item2 = item.clone();
            item2.setLore(item.getLore().filter(_=>!_.startsWith('§i§t§e§m§i§d:')));
            return item2;
        } catch {
            return 0;
        }
    }
    getItemFromID(id) {
        if(this.db.get(id, null)) {
            let data = this.db.get(id);
            return this.getItemFromEntityAndSlot(data.entityID, data.slot);
        }
    }
    removeItem(id) {
        if(this.db.get(id, null)) {
            let data = this.db.get(id);
            try {
                let entity = world.getEntity(data.entityID);
                if(!entity) return 0;
                let inventory = entity.getComponent('inventory');
                let totalItems = 0;
                this.db.delete(id);
                for(let i = 0;i < inventory.container.size;i++) {
                    let item = inventory.container.getItem(i);
                    if(item && item.getLore().find(_=>_.startsWith('§i§t§e§m§i§d:'+id))) {
                        inventory.container.setItem(i);
                    }
                    if(inventory.container.getItem(i)) {
                        totalItems++;
                    }
                }
                if(totalItems == 0) entity.kill();
                return 1;
            } catch {
                return 0;
            }
        }
    }
}
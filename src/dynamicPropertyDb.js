import { world } from "@minecraft/server";

export class DynamicPropertyDatabase {
    constructor(table) {
        this.table = table.toLowerCase();
    }
    set(key,_val) {
        let val = _val;
        if(typeof _val == "object") val = `[OBJ:${JSON.stringify(_val)}`;
        world.setDynamicProperty(`${this.table}:${key}`, val);
    }
    get(key,defaultResult="") {
        try {
            let val = world.getDynamicProperty(`${this.table}:${key}`);
            if(val.startsWith('[OBJ:')) return JSON.parse(val.substring(5));
            if(!val) return defaultResult;
            return val;
    
        } catch {
            this.delete(key);
            return defaultResult;
        }
    }
    keys() {
        return world.getDynamicPropertyIds()
            .filter(_=>_.startsWith(this.table))
            .map(_=>_.substring(this.table.length+1));
    }
    delete(key) {
        try {
            world.setDynamicProperty(`${this.table}:${key}`, undefined);
        } catch {}
    }
    hardDelete(key) {
        this.delete(key);
    }
    clear() {
        for(const key of this.keys()) {
            this.delete(key)
        }
    }
    hardSet(key, val) {
        this.set(key, val);
    }
    getTable() {
        let table = {};
        for (const key of this.keys()) {
            table[key] = this.get(key);
        }
        return table;
    }
    get allData() {
        return this.getTable();
    }
    set tableInfo(val) {
        this.set("TABLE_INFO", val);
    }
    get tableInfo() {
        return this.get("TABLE_INFO");
    }
    get gkeys() {
        return this.keys();
    }
    get vals() {
        let table = [];
        for (const key of this.gkeys)
            table.push(this.get(key));
        return table;
    }
}
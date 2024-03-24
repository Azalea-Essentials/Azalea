import {
  system,
  world,
} from '@minecraft/server';
import LZString from './lz-string';
import { DynamicPropertyDatabase } from './dynamicPropertyDb';

// 100% copied from stackoverflow because im dumb lmfao
// AzaleaDB is legacy now.
function MergeRecursive(obj1, obj2) {
    for (var p in obj2) {
      try {
        // Property in destination object set; update its value.
        if ( obj2[p].constructor==Object ) {
          obj1[p] = MergeRecursive(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch(e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];
      }
    }
    return obj1;
}

const tables = {};
// if you dont want a shit ton of data to go unused, used hardDelete() and hardSet() instead of set() and delete()
let cache = new Map();
export class Database {
    constructor(table, compressed = false) {
        this.compressed = compressed;
        this.table = table;
        try {
            system.run(() => {
                try {

                    world.scoreboard.addObjective(`db-${table}`, `TABLE: ${table}`);
                } catch { }
            })
        } catch { }
        // try {
        //     if (!tables[table]) tables[table] = new Map();
        // } catch { }
        this.getTable();
    }
    getCache() {
        if(cache.has(this.table)) {
            return cache.get(this.table)
        } else {
            return new Map();
        }
    }
    setCache(cacheData) {
        cache.set(this.table, cacheData);
    }
    set(_key, _val) {
        // system.run(() => {
            let val = _val;
            let key = _key;
            let tableVars_ = this.tableVars;
            if (typeof _val === "object") {
                val = `OBJECT:${JSON.stringify(_val)}`;
            } else if(typeof _val === "number") {
                val = `NUMBER:${_val.toString()}`
            } else if(typeof _val === "boolean") {
                val = `BOOL:${_val ? 1 : 0}`;
            }
            if(this.compressed) val = LZString.compress(val);
            let overworld = world.getDimension('overworld');
            let scoreboard = world.scoreboard.getObjective(`db-${this.table}`);
            scoreboard.setScore(`${key}-L`, val.length);
            // overworld.runCommand(`scoreboard players set "${key}-L" "db-${this.table}" ${val.length}`);
            for (let i = 0; i < val.length; i++) {
                // overworld.runCommand(`scoreboard players set "${key}-${i}" "db-${this.table}" ${val[i].charCodeAt()}`);
                scoreboard.setScore(`${key}-${i}`, val[i].charCodeAt());
            }
            let cache = this.getCache();
            cache.set(key, _val);
            this.setCache(cache);
            // tables[this.table].set(key, val);
        // })
    }
    get(key, defaultResult = "") {
        let cacheData = this.getCache();
        if(cacheData.has(key)) return cacheData.get(key);
        try {
            let objective = world.scoreboard.getObjective(`db-${this.table}`);
            // // console.warn(objective.getParticipants().map(_=>_.displayName).join(', '))
            let participants = objective.getParticipants();
            if (!participants.length) return defaultResult;
            let lenParticipant = participants.find(_ => _.displayName == `${key}-L`);
            if (!lenParticipant) return defaultResult;

            let len = objective.getScore(lenParticipant);

            let valParticipants = participants
                .filter(_ => _.displayName.startsWith(`${key}-`) && !_.displayName.endsWith('L'))
                .sort((a, b) => parseInt(a.displayName.substring(`${key}-`.length) - parseInt(b.displayName.substring(`${key}-`.length))))
                .filter(_ => parseInt(_.displayName.substring(`${key}-`.length)) < len);
            let str = "";

            for (const participant of valParticipants) {
                str += String.fromCharCode(objective.getScore(participant));
            }
            // // console.warn(str);
            if (!str || !str.length || str == "") {
                return defaultResult;
            }
            if(key != "table_variables") {
                let tableVars_ = this.tableVars;
                for(const variableName in tableVars_) {
                    str = str.replaceAll(`%%${variableName}%%`, tableVars_[variableName]);
                }
    
            }
            if(!str.length) return defaultResult;
            if(this.compressed) str = LZString.decompress();
            // if(this.compressed) // console.warn(str)
            let returnData = str.startsWith("OBJECT:")
                ? JSON.parse(str.substring("OBJECT:".length))
                : str.startsWith("NUMBER:") ? parseInt(str.substring("NUM:".length))
                : str == "BOOL:true" ? true
                : str == "BOOL:false" ? false
                : str;
            let cache = this.getCache();
            cache.set(key, returnData);
            this.setCache(cache);
            return returnData;
        } catch (e) {
            return defaultResult;
        }
    }
    getNoCheck(key) {
        let objective = world.scoreboard.getObjective(`db-${this.table}`);
        // // console.warn(objective.getParticipants().map(_=>_.displayName).join(', '))
        let participants = objective.getParticipants();
        if (!participants.length) return defaultResult;
        let lenParticipant = participants.find(_ => _.displayName == `${key}-L`);
        if (!lenParticipant) return defaultResult;

        let len = objective.getScore(lenParticipant);

        let valParticipants = participants
            .filter(_ => _.displayName.startsWith(`${key}-`) && !_.displayName.endsWith('L'))
            .sort((a, b) => parseInt(a.displayName.substring(`${key}-`.length) - parseInt(b.displayName.substring(`${key}-`.length))))
            // .filter(_ => parseInt(_.displayName.substring(`${key}-`.length)) < len);
        let str = "";

        for (const participant of valParticipants) {
            str += String.fromCharCode(objective.getScore(participant));
        }

        return str;
    }
    hardSet(key, val) {
        this.hardDelete(key);
        this.set(key, val);
    }
    keys() {
        try {
            let obj = world.scoreboard.getObjective(`db-${this.table}`);
            let participants = obj.getParticipants().filter(_ => _.displayName.endsWith('-L')).map(_ => _.displayName.slice(0, -2));
            return participants;
        } catch {
            return [];
        }
    }
    delete(key) {
        let cacheData = this.getCache();
        if(cacheData.has(key)) {
            cacheData.delete(key);
        }
        this.setCache(cacheData);
        let objective = world.scoreboard.getObjective(`db-${this.table}`);
        let participants = objective.getParticipants();

        let lenParticipant = participants.find(_ => _.displayName == `${key}-L`);
        if (!lenParticipant) return;

        objective.removeParticipant(lenParticipant);
    }
    hardDelete(key) {
        let cacheData = this.getCache();
        if(cacheData.has(key)) {
            cacheData.delete(key);
        }
        this.setCache(cacheData);
        let objective = world.scoreboard.getObjective(`db-${this.table}`);
        let participants = objective.getParticipants();

        let lenParticipant = participants.filter(f => f.displayName.startsWith(`${key}-`));
        if (!lenParticipant.length) return;
        for (const participant of lenParticipant)
            objective.removeParticipant(participant);
    }
    getTable() {
        let table = {};
        for (const key of this.keys()) {
            table[key] = this.get(key);
        }
        return table;
    }
    getTableWithoutChecks() {
        let table = {};
        for (const key of this.keys()) {
            table[key] = this.getNoCheck(key);
        }
        return table;
    }
    setMany(obj) {
        for (const key of Object.keys(obj)) {
            let val = obj[key];
            this.set(key, val);
        }
    }
    getMany(keys) {
        let result = {};
        for (const key of keys) {
            result[key] = this.get(key, null);
        }
        return result;
    }
    deleteMany(keys) {
        for (const key of keys) {
            this.delete(key);
        }
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
    filter(fn) {
        return this.vals.filter(fn);
    }
    find(fn) {
        return this.vals.find(fn);
    }
    reduce(fn) {
        return this.vals.reduce(fn);
    }
    forEach(fn) {
        return this.vals.forEach(fn);
    }
    map(fn) {
        return this.vals.map(fn);
    }
    set allData(val) {
        this.setMany(val);
    }
    edit(key, val) {
        let val2 = this.get(key);
        if(typeof val2 == 'object' && !Array.isArray(val2)) {
            let newValue = MergeRecursive(val2, val);
            this.set(key, newValue);
        } else {
            this.set(key, val);
        }
    }
    set tableVars(val) {
        this.edit("table_variables", val);
    }
    get tableVars() {
        return this.get("table_variables", {});
    }
}
export class DatabaseNew {
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
export const DatabaseLegacy = Database;
// export const Database = Database;
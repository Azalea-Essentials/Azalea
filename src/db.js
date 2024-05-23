import {
  system,
  world,
} from '@minecraft/server';
import LZString from './lz-string';
import { DynamicPropertyDatabase } from './dynamicPropertyDb';
import * as MC from '@minecraft/server';
import { prismarineDb } from './lib/@trash/PrismarineDB/prismarine-db';
// import { databaseProgressBar } from './conf_db';
// export class ExtendedMap extends Map {
//     constructor(dbName) {
//         super();
//         this.dbName = dbName;
//     }
//     save(key, value) {
//         if (!this.has(key)) {
//             log(`§cThe data does not exist, cannot save ${key}`);
//             return;
//         }
//         Server.runCommandAsync(`scoreboard players reset "$${this.dbName}(${textToHex(JSON.stringify(this.get(key)))})" ${this.dbName}`);
//         this.set(key, value);
//         Server.runCommandAsync(`scoreboard players set "$${this.dbName}(${textToHex(JSON.stringify(value))})" ${this.dbName} 1`);
//     }
//     /**
//      * Ajoute un élément à la base de données.
//      * @param {K} key - Clé de l'élément.
//      * @param {V} value - Valeur de l'élément.
//      */
//     add(key, value) {
//         if (this.has(key)) {
//             log(`§cDuplicate data found, cannot add ${key}`);
//             return;
//         }
//         this.set(key, value);
//         Server.runCommandAsync(`scoreboard players set "$${this.dbName}(${textToHex(JSON.stringify(value))})" ${this.dbName} 1`);
//     }
//     /**
//      * Supprime un élément de la base de données.
//      * @param {K} key - Clé de l'élément à supprimer.
//      */
//     remove(key) {
//         const toDelete = this.get(key);
//         if (toDelete) {
//             this.delete(key);
//             Server.runCommandAsync(`scoreboard players reset "$${this.dbName}(${textToHex(JSON.stringify(toDelete))})" ${this.dbName}`);
//         }
//     }
//     /**
//      * Récupère une copie de l'élément de la base de données de manière asynchrone.
//      * @param key - Clé de l'élément à récupérer.
//      * @param value - Valeur de l'élément.
//      * @returns {Promise<V | undefined>} - Retourne une promesse de la valeur de l'élément ou undefined si l'élément existe déjà.
//      */
//     async AsyncAdd(key, value) {
//         if (this.has(key)) {
//             log(`§cDuplicate data found, cannot add ${key}`);
//             return undefined;
//         }
//         this.set(key, value);
//         await Server.runCommandAsync(`scoreboard players set "$${this.dbName}(${textToHex(JSON.stringify(value))})" ${this.dbName} 1`);
//         return value;
//     }
//     /**
//      * Supprime un élément de la base de données de manière asynchrone.
//      * @param key - Clé de l'élément à supprimer.
//      */
//     async AsyncRemove(key) {
//         const toDelete = this.get(key);
//         if (toDelete) {
//             this.delete(key);
//             await Server.runCommandAsync(`scoreboard players reset "$${this.dbName}(${textToHex(JSON.stringify(toDelete))})" ${this.dbName}`);
//         }
//     }
//     /**
//      * Récupère une copie de l'élément de la base de données.
//      * @param key - Clé de l'élément à récupérer.
//      * @returns {V | undefined} - Retourne une copie de la valeur de l'élément ou undefined si l'élément n'existe pas.
//      */
//     getCopy(key) {
//         return { ...this.get(key) };
//     }
// }
// const Server = MC.world.getDimension('overworld');
// export function initDB(dbName, keyName, dbMap) {
//     if (dbMap.size === 0) {
//         await Server.runCommand(`scoreboard objectives add ${dbName} dummy`);
//         const start = Date.now();
//         try {
//             const objective = MC.world.scoreboard.getObjective(dbName);
//             const sc = objective.getScores();
//             const nbParticipants = sc.length;
//             const batchSize = 100 >>> 0;
//             const batchNumber = Math.ceil(nbParticipants / batchSize);
//             const progressBar = "§a[DB] §7loading " + dbName + "... §e";
//             const percentageUnit = 100 / nbParticipants;
//             databaseProgressBar[dbName] = progressBar + "0.00%";
//             for (let i = 0; i < batchNumber; i++) {
//                 const batchStart = i * batchSize;
//                 const batchEnd = batchStart + batchSize;
//                 const batch = batchEnd < nbParticipants ? sc.slice(batchStart, batchEnd) : sc.slice(batchStart);
//                 const updateDbPromises = batch.map(async (score) => {
//                     const db = score.participant.displayName.match(new RegExp(`(?<=\\$${dbName}\\()[0-9a-f\\s]+(?=\\))`, 'g'));
//                     if (!db) {
//                         log(`§cError: Mismatch data in ${dbName}`);
//                         return;
//                     }
//                     let data = JSON.parse(hexToText(db.join("")));
//                     // Update db map
//                     const existingData = dbMap.get(data[keyName]);
//                     if (existingData) {
//                         // Update existing data data
//                         log(`§cDuplicate data found, fixing ${data[keyName]}`);
//                         objective.removeParticipant(score.participant);
//                     }
//                     else {
//                         if (data[keyName] === undefined) {
//                             log("§cError: data is undefined, Leak is possible");
//                             objective.removeParticipant(score.participant);
//                             return;
//                         }
//                         dbMap.set(data[keyName], data);
//                     }
//                 });
//                 // Update progress bar
//                 databaseProgressBar[dbName] = progressBar + (batchEnd * percentageUnit).toFixed(2) + "%";
//                 await Promise.all(updateDbPromises);
//             }
//             databaseProgressBar[dbName] = progressBar + "100%";
//         }
//         catch (e) {
//             log(`§7[DB] can't find any database for ${dbName}, creating a new one ` + e);
//         }
//         const end = Date.now();
//         log(`§7${dbName} loaded in ${(end - start) / 1000} second(s)`);
//     }
// }
// function log(text) { Server.runCommandAsync(`tellraw @a[tag=log] {"rawtext":[{"text":"§7{log} §r${text.toString().replace(/"/g, "\'").replace(/\n/g, "§r\n")}"}]}`); }
/**
 * Convert string to Hexadecimal
 */
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
// export class Database {
//     constructor(table) {
//         initDB(table).then(res=>{

//         })
//     }
// }
let legacyDb = prismarineDb.table("Legacy-Scoreboard-DB");
// legacyDb.clear();
// export class Database {
//     constructor(table, compressed = false) {
//         this.table = table;
//         this.#createDocumentIfNotExisting();
//     }
//     #createDocumentIfNotExisting() {
//         let doc = legacyDb.findFirst({
//             __table__: this.table
//         });
//         if(!doc) legacyDb.insertDocument({
//             __table__: this.table
//         });
//     }
//     #getDocumentID() {
//         let doc = legacyDb.findFirst({
//             __table__: this.table
//         });
//         if(doc) {
//             return doc.id;
//         } else {
//             return legacyDb.insertDocument({
//                 __table__: this.table
//             })
//         }
//     }
//     set(_key, _val) {
//         if(this.table.startsWith('PLAYER-')) return;
//         let val = _val;
//         let key = _key;
//         // let tableVars_ = this.tableVars;
//         if (typeof _val === "object") {
//             val = `OBJECT:${JSON.stringify(_val)}`;
//         } else if(typeof _val === "number") {
//             val = `NUMBER:${_val.toString()}`
//         } else if(typeof _val === "boolean") {
//             val = `BOOL:${_val ? 1 : 0}`;
//         }
//         if(this.compressed) val = LZString.compress(val);
//         let id = this.#getDocumentID();
//         let data = legacyDb.getByID(id);
//         data.data[key] = val;
//         legacyDb.overwriteDataByID(id, data.data);
//     }
//     get(key, defaultResult = "") {
//         if(this.table.startsWith('PLAYER-')) return defaultResult;
//         let id = this.#getDocumentID();
//         let data = legacyDb.getByID(id);
//         let val = data.data[key];
//         if(!val) return defaultResult;
//         return val.startsWith('BOOL:') ? (val == "BOOL:1" ? true : false) : val.startsWith('NUMBER:') ? parseFloat(val.substring('NUMBER:'.length)) : val.startsWith('OBJECT:') ? JSON.parse(val.substring('OBJECT:'.length)) : val;
//     }
//     delete(key) {
//         if(this.table.startsWith('PLAYER-')) return;
//         let id = this.#getDocumentID();
//         let data = legacyDb.getByID(id);
//         let val = data.data[key];
//         if(!val) return defaultResult;
//         delete data.data[key];
//         legacyDb.overwriteDataByID(id, data);
//     }
//     hardSet(key, val) {
//         this.set(key, val)
//     }
//     hardDelete(key) {
//         this.delete(key);
//     }
//     keys() {
//         if(this.table.startsWith('PLAYER-')) return [];
//         let id = this.#getDocumentID();
//         let data = legacyDb.getByID(id);
//         return Object.keys(data.data).filter(_=>_!="__table__");
//     }
//     get allData() {
//         if(this.table.startsWith('PLAYER-')) return {};
//         let data = {};
//         for(const key of this.keys()) {
//             data[key] = this.get(key);
//         }
//         return data;
//     }
//     get gkeys() {
//         if(this.table.startsWith('PLAYER-')) return [];
//         return this.keys();
//     }
//     get vals() {
//         if(this.table.startsWith('PLAYER-')) return [];
//         let id = this.#getDocumentID();
//         let data = legacyDb.getByID(id);
//         return Object.values(data.data).filter(_=>_!=this.table);
//     }
// }
export class ScoreboardDatabase {
    constructor(table, compressed = false) {
        this.compressed = compressed;
        this.table = table;
        // try {
            // system.run(() => {
                try {

                    world.scoreboard.addObjective(`db-${table}`, `TABLE: ${table}`);
                } catch { }
            // })
        // } catch { }
        // try {
        //     if (!tables[table]) tables[table] = new Map();
        // } catch { }
        // this.getTable();
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
            // if(key != "table_variables") {
            //     let tableVars_ = this.tableVars;
            //     for(const variableName in tableVars_) {
            //         str = str.replaceAll(`%%${variableName}%%`, tableVars_[variableName]);
            //     }
    
            // }
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
export const Database = ScoreboardDatabase;
function textToHex(text) {
    return text.split("").map((char) => {
        return char.charCodeAt(0).toString(16);
    }).join(" ");
}
/**
 * Convert Hexadecimal to string
 */
function hexToText(hex) {
    return hex.split(" ").map((char) => {
        return String.fromCharCode(parseInt(char, 16));
    }).join("");
}
// export class Database {
//     constructor(table) {
//         this.table = table;
//         try {
//             system.run(() => {
//                 try {

//                     world.scoreboard.addObjective(`nwdb-${table}`, `TABLE: ${table}`);
//                 } catch { }
//             })
//         } catch { }
//     }
//     set(key, val) {
//         let objective = world.scoreboard.getObjective(`nwdb-${this.table}`);
//         let participants = objective.getParticipants();
//         if(participants && participants.length) {
//             let dataParticipant = participants.find(_ => _.displayName.startsWith(`@${key}`));
//             if(dataParticipant) {
//                 objective.removeParticipant(dataParticipant)
//             }
//         }
//         objective.setScore(`@${key}(${textToHex(JSON.stringify(val))})`, 1);
//     }
//     get(key, defaultResult = "") {
//         let objective = world.scoreboard.getObjective(`nwdb-${this.table}`);
//         let participants = objective.getParticipants();
//         if (!participants.length) return defaultResult;
//         let dataParticipant = participants.find(_ => _.displayName.startsWith(`@${key}`));
//         if (!dataParticipant) return defaultResult;

//         return JSON.parse(hexToText(dataParticipant.displayName.substring(`@${key}(`.length).slice(0,-1)))
//     }
// }
//# sourceMappingURL=db.js.map
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
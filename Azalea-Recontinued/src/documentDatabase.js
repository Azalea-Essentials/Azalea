import { Database } from './db.js';
import lz from './lz-string.js';
export class AzaleaDataReader {
    constructor(table, key) {
        this.data = {};
        this.table = table;
        this.key = key;
    }
    getCollections() {
        return Object.keys(this.data);
    }
    getRawData() {
        return this.data;
    }
    createCollection(name) {
        if(!this.data[name])
            this.data[name] = [];
    }
    createDocument(collection, data) {
        if(!this.data[collection]) {
            this.createCollection(collection)
        }
        this.data[collection].push(data);
    }
    findDocument(collection, query) {
        if(!this.data[collection]) {
            this.createCollection(collection)
        }
        return [
            this.data[collection].findIndex(query),
            this.data[collection].find(query)
        ]
    }
    deleteDocument(collection, index) {
        if(!this.data[collection]) {
            this.createCollection(collection)
        }
        this.data[collection].splice(index, 1);
    }
    all(collection) {
        return this.data[collection];
    }
    compress() {
        return lz.compress(JSON.stringify(this.data));
    }
    decompress(data) {
        this.data = JSON.parse(lz.decompress(JSON.parse(data)));
    }
    setToDatabase(key, table) {
        let db = new Database(table);
        db.set(key, this.compress())
    }
    loadFromDatabase(key, table) {
        let db = new Database(table);
        try {
            this.decompress(db.get(key));
        } catch {}
    }
    save() {
        this.setToDatabase(this.key, this.table);
    }
}

import { Database } from './db';

export function queryConfig(key) {
    let db = new Database("Config");
    return db.get(key, null);
}

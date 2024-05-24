import { world } from '@minecraft/server';
import { CommandBuilder } from '../../commandBuilder';

import { Database, DatabaseLegacy } from '../../db';
export default function addPlayerShopConversion() {
    new CommandBuilder("pshopconvert")
        .desc("Convert v0.9.1/v0.9.2 player shops to v1.0")
        .category("Data Conversion")
        .requiresAdmin(true)
        .callback(({args,response})=>{
            if(args.length) {
                let tables = world.scoreboard.getObjectives().filter(_=>_.id.startsWith('db-')).map(_=>_.id.substring(3));
                for(const table of tables) {
                    if(table == "PlayerShops") continue;
                    let db2 = new Database(table == "PlayerShops" ? "player_shop" : table);
                    db2.clear();
                }
                return;
            }
            response("INFO Converting database!");
            let tables = world.scoreboard.getObjectives().filter(_=>_.id.startsWith('db-')).map(_=>_.id.substring(3));
            for(const table of tables) {
                let db1 = new DatabaseLegacy(table);
                let db2 = new Database(table == "PlayerShops" ? "player_shop" : table);
                for(const key of db1.keys()) {
                    db2.set(key, db1.get(key));
                    response(`SUCCESS Converted shop \"${key}§r§7\" in ${table} to v1.0 format`);
                }
            }
            response("SUCCESS Done!");
        })
        .register()
}
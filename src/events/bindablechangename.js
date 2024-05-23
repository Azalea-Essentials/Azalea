import { Container, world } from "@minecraft/server"
import { Database } from "../db";

export default {
    name: "heartbeat",
    callback() {
        let db = new Database("BindableNames");
        for(const player of world.getPlayers()) {
            let inventory = player.getComponent("inventory");
            let container = inventory.container;
            if(!(container instanceof Container)) return;
            for(let i = 0;i < container.size;i++) {
                try {
                    let item = container.getItem(i);
                    if(db.keys().includes(item.typeId)) {
                        item.nameTag = db.get(item.typeId);
                        container.setItem(i, item);
                    }
                } catch {}
            }
        }
    }
}
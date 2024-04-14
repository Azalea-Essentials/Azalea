import { uiManager } from "../uis";
import { warps } from "../warpsapi";

export default {
    name: "ScriptEventEntity",
    callback(e) {
        if(e.id == "azalea:warpto" && e.sourceType == "Entity" && e.sourceEntity.typeId === "minecraft:player") {
            warps.tpDB(e.sourceEntity, e.message);
        }
    }
}
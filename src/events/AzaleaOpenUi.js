import { uiManager } from "../uis";

export default {
    name: "ScriptEventEntity",
    callback(e) {
        if(e.id == "azalea:open_ui" && e.sourceType == "Entity" && e.sourceEntity.typeId === "minecraft:player") {
            let player = e.sourceEntity;
            uiManager.open(e.message.split(' ')[0], player, ...e.message.split(' ').slice(1));
        }
    }
}
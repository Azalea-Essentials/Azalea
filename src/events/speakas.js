import { system, world } from "@minecraft/server";
import { beforeChat } from "../beforeChat";
import { uiManager } from "../uis";
import { warps } from "../warpsapi";

export default {
    name: "ScriptEventEntity",
    callback(e) {
        if(e.id == "azalea:speak_as" && e.sourceType == "Entity" && e.sourceEntity.typeId === "minecraft:player") {
            beforeChat({
                cancel: true,
                message: e.message,
                sender: e.sourceEntity
            })
        }
    }
}

system.afterEvents.scriptEventReceive.subscribe(e=>{
    if(e.id == "azalea:delay") {
        let delayAmount = parseInt(e.message.split(' ')[0]);
        let command = e.message.split(' ').slice(1).join(' ');
        if(e.sourceType == "Entity") {
            system.runTimeout(()=>{
                e.sourceEntity.runCommand(command);
            }, delayAmount)
        } else {
            system.runTimeout(()=>{
                world.getDimension('overworld').runCommand(command);
            }, delayAmount)
        }
    }
})
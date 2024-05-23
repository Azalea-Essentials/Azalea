import { system, world } from "@minecraft/server";
import { Database } from "../db";
import { warps } from "../warpsapi";
import { ActionForm } from "../form_func";

export default {
    name: "PlayerSpawned",
    callback(e) {
        if(!e.initialSpawn) return;
        let player = e.player;
        let configDb = new Database("Config");
        let WelcomeMessageEnabled = configDb.get("WelcomeMessageEnabled") == "true" ? true : false;
        let ServerWelcomeMessage = configDb.get("ServerWelcomeMessage") ? configDb.get("ServerWelcomeMessage") : `§cWelcome §e@[@username] §cto the server, and tell the admins to configure this message`;
        if (!WelcomeMessageEnabled) return;
        player.sendMessage(ServerWelcomeMessage.replace(/\[\@username\]/g, player.name).replace(/\[\@id\]/g, player.id));
        for (const player of world.getPlayers()) {
            player.playSound("note.bit", {
                "pitch": 1
            })
        }
        if(configDb.get("TeleportPlayerToSpawnOnRejoin") == "true") {
            let { player } = e;
            system.run(()=>{
                warps.tpDB(player, "spawn")
            })
        }
        if(configDb.get("ShowWelcomeMessageInUI") == "true") {
            let actionForm = new ActionForm();
            actionForm.body(ServerWelcomeMessage);
            actionForm.title("Welcome");
            actionForm.button("Ok", null, ()=>{});
            actionForm.show(player, true, (player, response)=>{

            })
        }
    }
}
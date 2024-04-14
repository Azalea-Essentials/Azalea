import { system, world } from "@minecraft/server";
import { isAdmin } from "../isAdmin";
import { DirectorUI } from "./DirectorUI-Modules/Main";
import { ActionForm } from "../form_func";
import { eventMgr } from "../eventManager";
import { openConfigUI } from "../configuratorBase";
import { ConfiguratorBase, ConfiguratorSub, baseConfigMenu,  } from "../configuratorOptions";

let config = new ConfiguratorBase()
    .addSub(
        new ConfiguratorSub("§cDebug Area\n§7Place where I debug features")
            .addToggle("A","B")
    )
let configOptions = config.toOptions();
function directorUIEvent(e) {
    system.run(()=>{
        if(e.itemStack.typeId == "azalea:director_ui") {
            if(!isAdmin(e.source)) return e.source.sendMessage(`§dYou need admin to use Director UI. Try doing §e/tag @s add admin`);
            openConfigUI(e.source, config, "Director UI", "Config222")
        }
    })
}
eventMgr.listen("ItemUse", directorUIEvent);
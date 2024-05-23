import { world } from "@minecraft/server";
import { ActionForm } from "../form_func"

export default {
    name: "Azalea2.2/PrismarineDB/Editor",
    description: "PrismarineDB Editor",
    onOpen(player) {
        let tableUI = new ActionForm();
        tableUI.title("§sPrismarineDB §7/ §sRoot");
        let tables = world.getDynamicPropertyIds().filter(_=>_.startsWith('prismarine:')).map(_=>_.replace('prismarine:', ''));
        for(const table of tables) {
            tableUI.button(`§s${table}`, `textures/azalea_icons/icontextures/prismarine_shard`);
        }
        tableUI.show(player, false, (player,response)=>{})
    }
}
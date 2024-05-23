import { world } from "@minecraft/server";
import { ActionForm, ModalForm } from "../form_func"
import { isAdmin } from "../isAdmin";
import { uiManager } from "../uis";
import emojis from '../emojis'
export default {
    name: "Azalea2.2/NewPlayerUI/Root",
    description: "Player UI",
    onOpen(player) {
        let form = new ActionForm();
        form.title(`§eRanks and Permissions §7- §bV1`)
        form.button("§q§lRoles\n§r§7Player Permissions", "textures/amethyst_icons/Packs/2.2/green_flag", (player)=>{
            uiManager.open("Azalea2.2/RolesUI/Root", player);
        })
        for(const otherPlayer of world.getPlayers()) {
            let color = isAdmin(otherPlayer) ? "§6" : "§f";
            let icon = isAdmin(otherPlayer) ? "textures/items/gold_helmet" : "textures/items/iron_helmet";
            form.button(`§l${color}${otherPlayer.name}\n§r§7${isAdmin(otherPlayer) ? "Azalea Admin" : "Member"}`, icon, (player)=>{
                let form = new ActionForm();
                form.button(`§c§lRanks\n§r§7View/Edit player ranks`, `textures/items/bed_red`)
                form.show(player, false, (player)=>{
                    let form = new ActionForm();
                    form.button(`§l§aAdd rank\n§r§7Adds a rank`, `textures/azalea_icons/1`, (player)=>{
                        let modalForm = new ModalForm();
                        modalForm.title("Add Rank");
                        modalForm.textField("Rank", "Admin", undefined)
                        modalForm.submitButton("Add Rank");
                        modalForm.show(player, false, (player, response)=>{
                            if(response.canceled || !response.formValues[0]) return uiManager.open("Azalea2.2/NewPlayerUI/Root", player);
                            otherPlayer.addTag(`rank:${response.formValues[0]}`)
                            uiManager.open("Azalea2.2/NewPlayerUI/Root", player);
                        })
                    })
                    let ranks = otherPlayer.getTags().filter(_=>_.startsWith('rank:')).map(_=>_.substring(5));
                    for(const emoji in emojis) {
                        ranks = ranks.map(_=>_.replaceAll(`:${emoji}:`, emojis[emoji]))
                    }
                    for(const rank of ranks) {
                        form.button(`${rank}`, `textures/items/bed_red`, (player)=>{
                            let form = new ActionForm();
                            form.button(`§6§lBack\n§r§7Goes back`, `textures/azalea_icons/2`, (player)=>{
                                uiManager.open("Azalea2.2/NewPlayerUI/Root", player);
                            })
                            form.button(`§c§lDelete\n§r§7Removes the rank`, `textures/azalea_icons/Delete`, (player)=>{
                                otherPlayer.removeTag(`rank:${rank}`);
                                uiManager.open("Azalea2.2/NewPlayerUI/Root", player);
                            })
                            form.show(player, false, (response)=>{})
                        })
                    }
                    form.show(player, false, (player, response)=>{})
                })
            });
        }
        form.show(player, false, (player, response)=>{

        })
    }
}
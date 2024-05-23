import { world, Player, system } from "@minecraft/server";
import { worldTags } from "../apis/WorldTags";
import { ActionForm, ModalForm } from "../form_func";
import { uiManager } from "../uis";
import { warps } from "../warpsapi";
import { Database } from "../db";
import icons from "../icons";
import { openShopUI } from "../shopui";

export default {
    namespace: "Misc Items",
    description: "Miscellaneous items such as player shop, warps item, and more",
    icon: "https://azalea.trashdev.org/img/textures/amethyst_icons/Packs/asteroid_icons/sweet_berries.png",
    main: class {
        constructor() {
            uiManager.addUI("Azalea1.1/Warps:Warps UI", (player) => {
                let warps2 = warps.getAllWarps();
                let warpUIDB = new Database("WarpUI");
                let warpUI = new ActionForm();
                warpUI.title(warpUIDB.get("Title", "§dWarp UI") ? warpUIDB.get("Title", "§dWarp UI") : "§dWarp UI");
                if (!warps2.length) {
                    warpUI.title("Warps - Not Configured");
                    warpUI.body("§cIt looks like warps are not configured on this server.\n§bFor admins: do §e!spawn set §bto set spawn, and §e!warp set <name> §bto set a warp.");
                    warpUI.button("§cLeave", "textures/azalea_icons/2", (player, i) => { })
                }
                for (const warpName of warps2) {
                    let warpData = warps.get2(warpName);
                    let icon = icons.get(warpData.icon);
                    if (icon && icon.path) icon = icon.path
                    else icon = null;
                    warpUI.button(`§a${warpData.displayName ? warpData.displayName : warpName == "spawn" ? "§dWorld Spawn" : warpName}`, icon ? icon : warpName == "spawn" ? `textures/azalea_icons/icontextures/nether_star` : `textures/azalea_icons/icontextures/ender_pearl`, (player) => {
                        warps.tpDB(player, warpName);
                    })
                }
                warpUI.show(player, false, (player, response) => { });
            })
            world.beforeEvents.itemUse.subscribe((e) => {
                if(!(e.source instanceof Player)) return;
                system.run(() => {
                    if(e.itemStack.typeId == 'azalea:floating_text_editor') {
                        let entities1 = worldTags.getTags().filter(_=>_.startsWith(`floating_text:`)).map(_=>_.replace(`floating_text:`, ``));
                        let entities = [];
                        for(const entity of entities1) {
                            try {
                                let entity2 = world.getEntity(entity);
                                if(!entity2) continue;
                                entities.push(entity2);
                            } catch {}
                        }
                        let form = new ActionForm();
                        for(const entity of entities) {
                            form.button(entity.nameTag, null, (player)=>{
                                let modalForm = new ModalForm();
                                modalForm.title("Code Editor");
                                modalForm.textField("M", "Type some text...", entity.nameTag)
                                modalForm.show(player, false, (player, response)=>{
                                    if(response.formValues[0] || response.formValues[0].toLowerCase().includes('trash')) entity.nameTag = response.formValues[0];
                                })
                            })
                        }
                        form.show(e.source, false, (player, response)=>{
            
                        })
                    }
                    if (e.itemStack.typeId == "azalea:player_shop") {
                        uiManager.open("Azalea0.9.1/PlayerShop/Main", e.source)
                    }
                    if(e.itemStack.typeId == "azalea:boost_feather") {
                        e.source.applyKnockback(e.source.getViewDirection().x, e.source.getViewDirection().z, 2.5, 1.5)
                        // e.source.applyKnockback(e.source.getViewDirection().x, e.source.getViewDirection().z, 1, -100)
                    }
                    if(e.itemStack.typeId == "azalea:shop") {
                        openShopUI(e.source);
                    }
                    if(e.itemStack.typeId == "azalea:tp_requests") {
                        uiManager.open("Azalea2.0/TeleportRequests/Root", e.source)
                    }
                    if (e.itemStack.typeId == 'azalea:warp') {
                        uiManager.open("Azalea1.1/Warps", e.source);
                    }
                })
            })
        }
    }
}
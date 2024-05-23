import { world, system } from "@minecraft/server";
import { ActionForm, ModalForm } from "../form_func";
import * as mc from '@minecraft/server';
import { isAdmin } from "../isAdmin";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";

export default {
    namespace: "BlockEditor",
    icon: "https://azalea.trashdev.org/img/textures/amethyst_icons/Packs/asteroid_icons/adventure_crystal_rare.png",
    description: "Add commands to blocks that run when you interact with them. Useful for opening uis when clicking on blocks and clickable signs :)",
    main: class {
        constructor() {
            let blocksDb = new DynamicPropertyDatabase("blocks");
            let inGUI = [];
            world.beforeEvents.playerInteractWithBlock.subscribe(e => {
                if(!isAdmin(e.player)) return;
                let inventory = e.player.getComponent('inventory');
                let item = inventory.container.getItem(e.player.selectedSlot);
                if (item && item.typeId == 'azalea:block_editor') {
                    e.cancel = true;
                    system.run(() => {
                        let key = `${e.block.x},${e.block.y},${e.block.z}`;
                        let properties = blocksDb.get(key, {});
                        let str1 = "";
                        try {
                            str1 = properties.oninteract;
                        } catch { str1 = "" }
                        if (!str1) str1 = "";
                        let modal = new ModalForm();
                        modal.title(`§9BLOCK PROPERTY EDITOR`);
                        modal.textField(`On Interaction Command`, `Example: /say Hello, world!`, str1 ? str1 : undefined);
                        if (inGUI.includes(e.player.id)) return;
                        inGUI.push(e.player.id);
                        modal.show(e.player, false, (player, response) => {
                            if (response.formValues[0]) {
                                properties.oninteract = response.formValues[0];
                            } else {
                                properties.oninteract = null;
                            }
                            blocksDb.set(key, properties);
                        }).then(res => {
                            inGUI = inGUI.filter(_ => _ != e.player.id)
                        })

                    })
                } else {
                    let key = `${e.block.x},${e.block.y},${e.block.z}`;
                    let properties = blocksDb.get(key, {});
                    if (properties.oninteract && typeof properties.oninteract == "string") {
                        e.cancel = true;

                        system.run(() => {
                            e.player.runCommand(properties.oninteract.startsWith('/') ? properties.oninteract.substring(1) : properties.oninteract)
                        })
                    }
                }
            });
        }
    }
}
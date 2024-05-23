import { world, system } from "@minecraft/server";
import { ActionForm, ModalForm } from "../form_func";
import * as mc from '@minecraft/server';
import { isAdmin } from "../isAdmin";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";

export default {
    namespace: "EntityEditor",
    icon: "https://azalea.trashdev.org/img/textures/amethyst_icons/Packs/asteroid_icons/adventure_crystal_uncommon.png",
    description: "Add commands to entities that run when you click them",
    main: class {
        constructor() {
            world.beforeEvents.itemUse.subscribe(e => {
              
                if (!(e.source instanceof mc.Player)) return;
                if (e.itemStack.typeId == 'azalea:entity_editor') {
                  let entities = e.source.getEntitiesFromViewDirection({
                    "maxDistance": 8
                  });
                  if (!entities || !entities.length) {
                    e.source.sendMessage(`§cPlease use this item on an entity.`);
                  }
                }
              });
              world.beforeEvents.playerInteractWithEntity.subscribe(e => {
                if(!isAdmin(e.player)) return;
                let inventory = e.player.getComponent('inventory');
                let currItem = inventory.container.getItem(e.player.selectedSlot);
                if (currItem && currItem.typeId == "azalea:entity_editor") {
                  e.cancel = true;
                  system.run(() => {
                    let target = e.target;
                    let modalForm = new ModalForm();
                    let str1 = "";
                    try {
                      str1 = target.getDynamicProperty('oninteract');
                    } catch {
                      str1 = "";
                    }
                    if (!str1) str1 = "";
                    // modalForm.textField("On Interact Command", "Example: /say hi", str1 ? str1 : undefined)
                    let str2 = "";
                    try {
                      str2 = target.nameTag;
                    } catch {
                      str2 = "";
                    }
                    if (!str2) str2 = "";
                    let health = target.getComponent('health');
                    let tst = target.getComponent('minecraft:skin_id');
                  //   tst.value
                    // try {
                    //     let health = ;
                    // } catch {}
                    modalForm.title(`§aENTITY PROPERTY EDITOR`);
                    modalForm.textField("On Interact Command", "Example: /say hi", str1 ? str1 : undefined);
                    modalForm.textField("Name Tag", "Entity Name Tag", str2 ? str2 : undefined);
                    modalForm.slider("Health", health.effectiveMin, health.effectiveMax, 1, health.currentValue);
                    modalForm.show(e.player, false, (player, response) => {
                      if (response.formValues[0]) {
                        target.setDynamicProperty('oninteract', response.formValues[0]);
                      } else {
                        target.setDynamicProperty('oninteract', undefined);
                      }
                      if (response.formValues[1]) {
                        target.nameTag = response.formValues[1];
                      } else {
                        target.nameTag = "";
                      }
                      // if(response.formValues[2]) {
                      health.setCurrentValue(response.formValues[2]);
                      // }
                    });
                  });
              
                  return;
                }
                let str1 = "";
                try {
                  str1 = e.target.getDynamicProperty('oninteract');
                } catch {
                  str1 = "";
                }
                if (!str1) str1 = "";
                if (str1 && !(isAdmin(e.player) && e.player.isSneaking)) {
                  e.cancel = true;
                  system.run(() => {
                    e.player.runCommand(str1.startsWith('/') ? str1.substring(1) : str1);
                  });
                }
              });
        }
    }
}
import { world } from "@minecraft/server";
import { ActionForm, ModalForm } from "../form_func";
import * as mc from '@minecraft/server';

world.beforeEvents.itemUse.subscribe(e=>{
    if(!(e.source instanceof mc.Player)) return;
    if(e.itemStack.typeId == 'azalea:entity_editor') {
        let entities = e.source.getEntitiesFromViewDirection({
            "maxDistance": 8
        });
        if(!entities || !entities.length) {
            e.source.sendMessage(`§cPlease use this item on an entity.`)
        }
    }
})
world.beforeEvents.playerInteractWithEntity.subscribe(e=>{
    let inventory = e.player.getComponent('inventory');
    let currItem = inventory.container.getItem(e.player.selectedSlot);
    if(currItem && currItem.typeId == "azalea:entity_editor") {
        e.cancel = true;
        system.run(()=>{
            let target = e.target;
            let modalForm = new ModalForm();
            let str1 = "";
            try {
                str1 = target.getDynamicProperty('oninteract')
            } catch {str1 = ""}
            if(!str1) str1 = "";
            modalForm.textField("On Interact Command", "Example: /say hi", str1 ? str1 : undefined)
            modalForm.show(e.player, false, (player, response)=>{
                if(response.formValues[0]) {
                    target.setDynamicProperty('oninteract', response.formValues[0])
                } else {
                    target.setDynamicProperty('oninteract', undefined)
                }
            })
        })
        return;
    }
    let str1 = "";
    try {
        str1 = e.target.getDynamicProperty('oninteract')
    } catch {str1 = ""}
    if(!str1) str1 = "";
    if(str1 && !(isAdmin(e.player) && e.player.isSneaking)) {
        e.cancel = true;
        system.run(()=>{
            e.player.runCommand(str1.startsWith('/') ? str1.substring(1) : str1)
        })
    }
})

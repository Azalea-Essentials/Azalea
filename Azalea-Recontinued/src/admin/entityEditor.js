import { world, system } from "@minecraft/server";
import { ActionForm, ModalForm } from "../form_func";
import * as mc from '@minecraft/server';
import { isAdmin } from "../isAdmin";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
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
let blocksDb = new DynamicPropertyDatabase("blocks");
let inGUI = [];
world.beforeEvents.playerInteractWithBlock.subscribe(e => {
  let inventory = e.player.getComponent('inventory');
  let item = inventory.container.getItem(e.player.selectedSlot);
  if (item && item.typeId == 'azalea:block_editor') {
    e.cancel = true;
    system.run(()=>{
      let key = `${e.block.x},${e.block.y},${e.block.z}`;
      let properties = blocksDb.get(key, {});
      let str1 = "";
      try {
        str1 = properties.oninteract;
      } catch {str1=""}
      if(!str1) str1 = "";
      let modal = new ModalForm();
      modal.title(`§9BLOCK PROPERTY EDITOR`);
      modal.textField(`On Interaction Command`, `Example: /say Hello, world!`, str1 ? str1 : undefined);
      if(inGUI.includes(e.player.id)) return;
      inGUI.push(e.player.id);
      modal.show(e.player, false, (player, response)=>{
        if(response.formValues[0]) {
          properties.oninteract = response.formValues[0];
        } else {
          properties.oninteract = null;
        }
        blocksDb.set(key, properties);
      }).then(res=>{
        inGUI = inGUI.filter(_=>_!=e.player.id)
      })
  
    })
  } else {
    let key = `${e.block.x},${e.block.y},${e.block.z}`;
    let properties = blocksDb.get(key, {});
    if(properties.oninteract && typeof properties.oninteract == "string") {
    e.cancel = true;

      system.run(()=>{
        e.player.runCommand(properties.oninteract.startsWith('/') ? properties.oninteract.substring(1) : properties.oninteract)
      })
    }
  }
});
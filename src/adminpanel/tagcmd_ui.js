import { ConfiguratorSub } from '../configuratorOptions';
import { Database } from '../db';
import {
  ActionForm,
  ModalForm,
} from '../form_func';
import { uiManager } from '../uis';

export const TAGCMD_UI = function() {
    uiManager.addUI("Azalea0.9.0/TagCmd", (player)=>{
        let cmds = new ActionForm();
        let tagCmdTable = new Database("TagCmdConfig");
        let tagCmds = JSON.parse(tagCmdTable.get("Cmds", "[]"));
        for(const tagcmd of tagCmds) {
            cmds.button(tagcmd.name, null, (player, i)=>{
                let modal = new ModalForm();
                modal.title(`${tagcmd.name}, ${tagcmd.tag}`);
                modal.textField("Category", "Type a category name", tagcmd.category ? tagcmd.category : "Uncategorized", ()=>{});
                modal.textField("Description", "Type a description", tagcmd.description ? tagcmd.description : "Uncategorized", ()=>{});
                modal.toggle("Execute on other", tagcmd.execOther ? true : false, ()=>{})
                modal.show(player, false, (_player, response)=>{
                    let category = response.formValues[0];
                    let description = response.formValues[1];
                    let execOther = response.formValues[2];
                    tagCmds[i].category = category;
                    tagCmds[i].description = description;
                    tagCmds[i].execOther = execOther;
                    tagCmdTable.set("Cmds", JSON.stringify(tagCmds))
                })
            });
        }
        cmds.show(player,false,(_player)=>{

        })
    })
    return new ConfiguratorSub("§eTag commands", "textures/azalea_icons/11")
        .setCallback((player)=>{
            uiManager.open("Azalea0.9.0/TagCmd", player);
        })
}
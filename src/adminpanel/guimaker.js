import { ConfiguratorSub } from "../configuratorOptions";
import { Database } from "../db";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
import { ActionForm } from "../form_func";
import { uiManager } from "../uis";

export default function () {
    let actionFormsDb = new Database("ActionForms");
    let formsV2Database = new Database("FormsV2");
    let chestFormsDB = new DynamicPropertyDatabase("ChestUIs");
    uiManager.addUI("Azalea2.1/GUIHub",(player)=>{
        let data = [];
        let notShittyForms = formsV2Database.get("Forms", []);
        notShittyForms = notShittyForms.sort((a, b) => {
            const textA = a.title.toUpperCase();
            const textB = b.title.toUpperCase();
            return textA.localeCompare(textB);
        });
        for(const form of notShittyForms) {
            data.push({
                type: 1,
                title: form.title,
                subtext: `§aTAG: §7${form.tag}`,
                formData: form
            })
        }
        let chestForms = chestFormsDB.get("Forms", []);
        chestForms = chestForms.sort((a, b) => {
            const textA = a.title.toUpperCase();
            const textB = b.title.toUpperCase();
            return textA.localeCompare(textB);
        });
        for(const form of chestForms) {
            data.push({
                type: 2,
                title: form.title,
                subtext: `§aTAG: §7${form.tag}§r§f, §e${form.rows >= 1 ? `${form.rows} Row${form.rows == 1 ? "" : "s"}` : `Hopper`}`,
                formData: form
            })
        }
        let legacyForms = actionFormsDb.get("ActionForms", []);
        legacyForms = legacyForms.sort((a, b) => {
            const textA = a.title.toUpperCase();
            const textB = b.title.toUpperCase();
            return textA.localeCompare(textB);
        });
        for(const form of legacyForms) {
            data.push({
                type: 0,
                title: form.title,
                subtext: `§aID: §7${form.id}`,
                formData: form
            })
        }
        
        let form = new ActionForm();
        for(const value of data) {
            let icon = "textures/azalea_icons/Info";
            if(value.type == 0) icon = "textures/azalea_icons/9";
            if(value.type == 1) icon = "textures/azalea_icons/FormsV2";
            if(value.type == 2) {
                icon = value.formData.rows >= 1 ? `textures/azalea_icons/Chest/Chest${value.formData.rows}` : `textures/items/hopper`
            }
            form.button(`${value.title}\n${value.subtext}`, icon, (player)=>{
                if(value.type == 0) {
                    uiManager.open("Azalea0.9.0/FormcmdFormEditRoot", player, value.formData.id)
                }
            })
        }
        form.show(player, false, ()=>{

        })
    })
    return new ConfiguratorSub("GUIs", "textures/azalea_icons/ClickyClick")
        .setCallback((player) => {
            uiManager.open("Azalea2.1/GUIHub", player)
        })
}
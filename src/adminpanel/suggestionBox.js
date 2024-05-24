import { ConfiguratorSub } from "../configuratorOptions";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
import { ActionForm, ModalForm } from "../form_func";
import { uiManager } from "../uis";

export default function() {
    let suggestionDb = new DynamicPropertyDatabase("Suggestions");
    uiManager.addUI("Dev:SuggestionBox", (player)=>{
        let ui = new ActionForm();
        ui.title("Suggestion Box");
        ui.button("View Suggestions", `textures/amethyst_icons/Packs/asteroid_icons/random37`, (player)=>{
            let action = new ActionForm();
            action.title("Suggestions");
            let suggestions = suggestionDb.get("s", []);
            let text = [];
            for(const suggestion of suggestions) {
                text.push(`§7- §r§f${suggestion}`);
            }
            action.body(text.join('\n§r'));
            action.button("Back", `textures/azalea_icons/2`, (player)=>{
                uiManager.open("Dev:SuggestionBox", player);
            })
            action.show(player, false, (_player)=>{

            })
        });
        ui.button("Add Suggestion", `textures/amethyst_icons/Packs/asteroid_icons/Feedback`, (player)=>{
            let modal = new ModalForm();
            modal.textField("Suggestion", "Type a suggestion here", undefined, ()=>{})
            modal.show(player, false, (player, response)=>{
                let suggestions = suggestionDb.get("s", []);
                suggestions.push(`§e@${player.name}§r§f: ${response.formValues[0]}`);
                suggestionDb.set("s", suggestions);
                uiManager.open("Dev:SuggestionBox", player);
            })
        })
        ui.show(player, false, (_player)=>{})
    })
    return new ConfiguratorSub("§uDev: Suggestion Box", `textures/amethyst_icons/Packs/asteroid_icons/Feedback`)
        .setCallback((player)=>{
            uiManager.open("Dev:SuggestionBox", player);

        })
}
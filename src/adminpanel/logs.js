import { ConfiguratorSub } from "../configuratorOptions";
import { ActionForm } from "../form_func";
import { logManager } from "../logManager";
import { uiManager } from "../uis";

export default function() {
    uiManager.addUI("Azalea1.1/AdminPanel/Logs/Root/Category", (player, category)=>{
        let logs = logManager.logDB.get(`Logs-${category}`, []);
        let labels = logManager.getLabels();
        let form = new ActionForm();
        form.button("Back", null, player=> {
            uiManager.open("Azalea1.1/AdminPanel/Logs/Root", player);
        })
        for(const log of logs) {
            if(!labels[log.label]) continue;
            let label = labels[log.label];
            form.button(`${label.color}§l[${label.text}§r§l${label.color}] §r§7${log.text}`, null, ()=>{

            })
        }
        form.show(player, false, ()=>{})
    })
    uiManager.addUI("Azalea1.1/AdminPanel/Logs/Root", (player)=>{
        let form = new ActionForm();
        let categories = logManager.getCategories();
        for(const category of Object.keys(categories)) {
            form.button(categories[category], null, (player)=>{
                uiManager.open("Azalea1.1/AdminPanel/Logs/Root/Category", player, category)
            })
        }
        form.show(player, false, ()=>{})

    })

    return new ConfiguratorSub("Logs", "textures/azalea_icons/Logs")
        .setCallback(player =>{
            uiManager.open("Azalea1.1/AdminPanel/Logs/Root", player);
        })
}
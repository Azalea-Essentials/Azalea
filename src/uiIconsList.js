import { ActionFormData } from "@minecraft/server-ui";
import { uiManager } from "./uis";
import icons from "./icons";

uiManager.addUI("Azalea1.0.1/IDs/Icons",(player)=>{
    let actionForm = new ActionFormData();
    for(const icon of icons.slice(0, 50)) {
        actionForm.button(icon.name, icon.path);
    }
    actionForm.show(player).then(()=>{
        
    })
})
import { system } from '@minecraft/server';
import { ModalFormData } from '@minecraft/server-ui';

import { CommandBuilder } from '../commandBuilder';
import { Database } from '../db';

export default function() {
    new CommandBuilder("setup")
    .category("Help Center")
    .desc("Easily setup shit with a nice UI")
    .requiresAdmin(true)
    .callback(({msg, response})=>{
        return;
        let x = msg.sender.location.x,
            y = msg.sender.location.y,
            z = msg.sender.location.z;
        let steps = 0;
        let interval = system.runInterval(()=>{
            steps++;
            if(steps > 5 * 2) {
                system.clearRun(interval);
                return;
            }
            if(x != msg.sender.location.x || y != msg.sender.location.y || z != msg.sender.location.z) {
                let modal = new ModalFormData();
                let opts1 = [
                    "#HT(staffchat,#BC[#NCStaffChat#BC] ,)§r#BC[#RC#R(§r#BC] [§r#RC)§r#BC] §r#NC#P #BC#DRA §r#MC#M",
                    "#BC[#RC#R(§r#BC] §r#BC[§r#RC)§r#BC] §r#BC<#NC#P§r#BC> §r#MC#M"
                ];
                let opts1_display = [
                    "Default",
                    "Testing"
                ]
                modal.dropdown("Chat Rank Format", opts1_display);
                modal.title("Quick Setup");
                modal.show(msg.sender).then(res=>{
                    if(res.canceled) return;
                    let configDb = new Database("Config");
                    configDb.set("ChatrankFormat", opts1[res.formValues[0]])
                })
                system.clearRun(interval);
                return;
            }
        }, 10)
        response("SUCCESS Move to open the UI");
    })
    .register()
}
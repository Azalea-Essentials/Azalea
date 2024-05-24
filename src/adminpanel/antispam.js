import { commands } from '../commands';
import { ConfiguratorSub } from '../configuratorOptions';
import { ModalForm } from '../form_func';

export const COOLDOWN = function() {
    return new ConfiguratorSub("Cooldowns")
        .setCallback((player)=>{
            let modal = new ModalForm();
            for(const command of commands._cmds) {
                modal.slider(`!${command.name}`, 1, 10, 1, 1, (_player)=>{
                    
                })
            }
            modal.show(player, false, (_player)=>{})
        })
}
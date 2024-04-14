import { system, world } from "@minecraft/server";
import { CommandBuilder } from "../../commandBuilder";
import { uiManager } from "../../uis";

export default function() {
    new CommandBuilder("profile")
        .desc("View user profiles")
        .category("Social")
        .callback(({msg,args,theme,response})=>{
            if(!args.length) return response("ERROR Please include a player name!")
            let playerName = args.join(' ');
            let otherPlayer;
            for(const player of world.getPlayers()) {
                if(player.name.toLowerCase() == playerName.toLowerCase()) otherPlayer = player;
            }
            if(!otherPlayer) return response("ERROR Player not online!");
            let initialX = msg.sender.location.x;
            let initialY = msg.sender.location.y;
            let initialZ = msg.sender.location.z;
            let tick = 0;
            let interval = system.runInterval(()=>{
                if(msg.sender.location.x != initialX || msg.sender.location.y != initialY || msg.sender.location.z != initialZ) {
                    system.clearRun(interval);
                    uiManager.open("Azalea1.1/PlayerProfile", msg.sender, otherPlayer.name);
                }
                tick++;
                if(tick >= 200) {
                    system.clearRun(interval);
                }
            }, 10);
            response("WAIT Close the chat and move to open the UI.")
        })
        .register()
    new CommandBuilder("profile-color")
        .desc("Profile Colors")
        .callback(({msg,args,theme,response})=>{
            if(!args.length) {
                let text = [];
                text.push(`§7default`);
                text.push(`§bblue`);
                text.push(`§dwhy`);
                text.push(`§5dark-purple`);
                text.push(`§agreen`);
                text.push(`§bocean`);
                text.push(`Type §a!profile-color <color> §rto change your color.`)
                response(`TEXT ${text.join('\n§r')}`);
            } else {
                let args2 = ['default', 'blue', 'why', 'dark-purple', 'green', 'ocean'];
                if(!args2.includes(args[0])) {
                    let text = [];
                    text.push(`§7default`);
                    text.push(`§bblue`);
                    text.push(`§dwhy`);
                    text.push(`§5dark-purple`);
                    text.push(`§agreen`);
                    text.push(`§bocean`);
                    text.push(`Type §a!profile-color <color> §rto change your color.`)
                    response(`TEXT ${text.join('\n§r')}`);
                    return;
                }
                for(const tag of msg.sender.getTags()) {
                    if(tag.startsWith('profile-color-')) msg.sender.removeTag(tag);
                }
                msg.sender.addTag(`profile-color-${args[0]}`);
                response(`SUCCESS Applied profile color!`)
            }
        })
        .register()
}
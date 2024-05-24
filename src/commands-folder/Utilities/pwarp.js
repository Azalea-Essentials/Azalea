import { Player, world } from "@minecraft/server";
import { CommandBuilder } from "../../commandBuilder";

export default function() {
    new CommandBuilder("pwarp")
        .desc("Made for JaguireMC")
        .category("Teleportation")
        .callback(({msg,args,response})=>{
            let player = msg.sender;
            if(!(player instanceof Player)) return;
            if(args.length) {
                if(args[0] == "set") {
                    if(args.length < 2) return response("ERROR Please send the command again with a name at the end.");
                    player.setDynamicProperty(`pwarp:${args[1]}`, {
                        x: msg.sender.location.x,
                        y: msg.sender.location.y,
                        z: msg.sender.location.z
                    });
                    response("SUCCESS Added pwarp!");
                } else if(args[0] == "remove") {
                    if(args.length < 2) return response("ERROR Please send the command again with a name at the end.");
                    player.setDynamicProperty(`pwarp:${args[1]}`, undefined);
                    response("SUCCESS Removed pwarp!");
                } else if(args[0] == "tp") {
                    try {
                        if(args.length < 2) return response("ERROR Please send the command again with a name at the end.");
                        if(!player.getDynamicPropertyIds().find(_=>_.startsWith(`pwarp:${args[1]}`))) return response("ERROR Pwarp not found!")
                        let property = player.getDynamicProperty(`pwarp:${args[1]}`);
                        player.teleport(property, {
                            "dimension": world.getDimension('overworld')
                        });
                        response("SUCCESS Teleported!")
                    } catch(e) {
                        response(`ERROR ${e}`)
                    }
                }
            } else {

            }
        })
        .register()
}
import { CommandBuilder } from '../../commandBuilder';

import { isAdmin } from '../../isAdmin';
import { warps } from '../../warpsapi';
import { system } from '@minecraft/server';
export default function() {
    new CommandBuilder("spawn")
        .category("Warps")
        .desc("Set the spawn")
        .aliases(["hub", "lobby", "s"])
        .callback(({msg,args,response})=>{
            if(args.length && args[0] == "set") {
                if(!isAdmin(msg.sender)) return response(`ERROR This command requires admin.`);
                warps.setDBRotation(
                    "spawn",
                    msg.sender.location,
                    msg.sender.dimension,
                    msg.sender.getRotation()
                );
                return response(`SUCCESS Spawn has been set. Type !spawn to teleport to it`)
            } else if(args.length && args[0] != "set") {
                return response(`ERROR Invalid argument. Type §a!spawn set §7to set the spawn`)
            } else {
                if(warps.hasDB("spawn")) {
                    let pos = {
                        x: msg.sender.location.x,
                        y: msg.sender.location.y,
                        z: msg.sender.location.z,
                    }
                    let sex = 12;
                    response("WAIT Wait 12 seconds without moving");
                    let interval = system.runInterval(()=>{
                        sex--;
                        if(msg.sender.location.x != pos.x || msg.sender.location.y != pos.y || msg.sender.location.z != pos.z) {
                            response("ERROR You moved")
                            system.clearRun(interval);
                            return;
                        }
                        if(sex > 0) {
                            response(`WAIT ${sex}`);
                        } else if (sex <= 0) {
                            warps.tpDBRotation(msg.sender, "spawn");
                            response(`SUCCESS Teleporting...`);
                            system.clearRun(interval);
                        }
                    },20);
                }
            }
        })
        .register();
}
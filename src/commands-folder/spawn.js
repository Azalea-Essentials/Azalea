import { CommandBuilder } from '../commandBuilder';
import { isAdmin } from '../isAdmin';
import { warps } from '../warpsapi';

export default function() {
    new CommandBuilder("spawn")
        .category("Warps")
        .desc("Set the spawn")
        .callback(({msg,args,theme,response})=>{
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
                warps.tpDBRotation(msg.sender, "spawn")
                return response(`SUCCESS Teleporting...`);
            }
        })
        .register();
}
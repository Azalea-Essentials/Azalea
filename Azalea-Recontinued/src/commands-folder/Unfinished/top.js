import { CommandBuilder } from "../../commandBuilder";
import * as mc from '@minecraft/server';
export default function() {
    // new CommandBuilder("rtp")
    //     .desc("Random teleport!")
    //     .aliases(["wild","randomteleport","tpr","randomtp","tprandom","?w"])
    //     .callback(({msg,args,theme,response})=>{
    //         let x = msg.sender.location.x,
    //             y = msg.sender.location.y,
    //             z = msg.sender.location.z;
    //         for(let i = 320;i > -65;i--) {
    //             let block = msg.sender.dimension.getBlock({x,z,y:i});
    //             if(!block.isAir) {
    //                 y = i+1;
    //                 break;
    //             }
    //         }
    //         msg.sender.teleport({
    //             x,
    //             y,
    //             z
    //         })
    //     })
    //     .register();
}
import { system } from "@minecraft/server";
import { CommandBuilder } from "../../commandBuilder";
import { responseStr } from "../../response";
import { uiManager } from "../../uis";

export default function() {
    new CommandBuilder("redeem")
    .category("Economy")
    .desc("Redeem codes")
    .callback(({msg, args, response})=>{
        if(args && args.length) {
            return response("ERROR Redeeming codes directly from the command is not currently supported.")
        } else {
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
                if(msg.sender.location.x != x || y != msg.sender.location.y || z != msg.sender.location.z) {
                    system.clearRun(interval);
                    uiManager.open("Azalea2.2/Gift/Redeem", msg.sender);
                }
            },10)

            response("SUCCESS Close chat and move to open UI")
        }
    })
    .register();

}
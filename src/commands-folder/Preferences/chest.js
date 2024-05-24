import { CommandBuilder } from "../../commandBuilder";

export default function() {
    new CommandBuilder("chest")
        .desc("Toggle Chest GUIs")
        .category("Player Preferences")
        .callback(({msg, response})=>{
            if(msg.sender.hasTag("no-chest-guis")) {
                response("SUCCESS Enabled chest GUIs. Run the command again to disable them.");
                msg.sender.removeTag("no-chest-guis");
            } else {
                response("SUCCESS Disabled chest GUIs. Run the command again to enable them.");
                msg.sender.addTag("no-chest-guis");
            }
        })
        .register();
}
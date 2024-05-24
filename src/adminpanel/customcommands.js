import { ConfiguratorSub } from "../configuratorOptions";
import { uiManager } from "../uis";
export function CUSTOM_COMMANDS() {

    return new ConfiguratorSub("§9Custom Commands", "textures/azalea_icons/CustomCommands")
        .setCallback(player => {
            uiManager.open("Azalea1.0/CustomCommands/Main", player);
        })
}
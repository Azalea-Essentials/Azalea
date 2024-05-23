import { commands } from "../commands";
import { ConfiguratorSub } from "../configuratorOptions";
import { customCommandsActions } from "../customcmds/actionsDefinition";
import { Database } from "../db";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
import { ActionForm, ModalForm } from "../form_func";
import { uiManager } from "../uis";
export function CUSTOM_COMMANDS() {

    return new ConfiguratorSub("§9Custom Commands", "textures/azalea_icons/CustomCommands")
        .setCallback(player => {
            uiManager.open("Azalea1.0/CustomCommands/Main", player);
        })
}
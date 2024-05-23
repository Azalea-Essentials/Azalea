import { system, world } from "@minecraft/server";
import { ConfiguratorBase, ConfiguratorSub } from "../configuratorOptions";
import { Database } from "../db";
import { ActionForm, ModalForm } from "../form_func";
import icons from "../icons";
import { uiManager } from "../uis";
import { beforeChat } from "../beforeChat";
import { FormCancelationReason } from "@minecraft/server-ui";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
import { formatStr } from "../utils/AzaleaFormatting";

export default function() {
   return new ConfiguratorSub("§r§6GUI Maker", "textures/azalea_icons/GUIMaker/FormsV2")
        .setCallback(player => {
            uiManager.open("Azalea1.1/FormsV2/Root", player)
        });
}
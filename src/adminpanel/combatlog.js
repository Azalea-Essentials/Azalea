import { ConfiguratorSub } from "../configuratorOptions";

export function combatlogsettings() {
    return new ConfiguratorSub("§gCombat Log", "textures/items/iron_sword")
        .addToggle("CombatlogEnabled", "Combat Log Enabled")
        .addSlider("CombatlogSeconds", 1, 15, 1, "Combat Log Exit Delay (Seconds)", 10)
        .addTextInput("CLEnter", "Combat Log Enter Message", "message")
        .addTextInput("CLExit", "Combat Log Exit Message", "message")
}
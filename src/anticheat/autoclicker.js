import { world, system } from "@minecraft/server";
// import { flag, isAdmin, c } from "../../Assets/Util.js";
// import lang from "../../Data/Languages/lang.js";
import { tps } from "./tps";
const clickData = new Map();
function flag() {
    world.sendMessage(`AntiAutoClicker: FLAGGED`);
}
function isAdmin() {
    return false;
}
function lang(a) {
    return a;
}
function c() {
    return {
        antiAutoClicker: {
            enabled: true,
            maxClicksPerSecond: 18,
            timeout: 200,
            punishment: "kick",
            maxVL: 4,
        },
    }
}
/**
 * @author ravriv
 * @description This checks if the player is clicking more than 22 times per second.
 */
function AutoClicker(player) {
    const config = c();
    const currentTime = Date.now();
    const { id } = player;
    const { clicks } = clickData.get(id) || { clicks: [] };
    //filter the clicks that are older than 1.5 seconds
    const filteredClicks = clicks.filter(clickTime => currentTime - clickTime < 1500);
    filteredClicks.push(currentTime);
    //constant the clicks per second
    const cps = filteredClicks.length;
    //if the clicks per second is higher than the max clicks per second, flag the player
    if (!player.hasTag("matrix:pvp-disabled") && tps.getTps() > 12 && cps > config.antiAutoClicker.maxClicksPerSecond) {
        //A - false positive: very low, efficiency: high
        flag(player, 'Auto Clicker', "A", config.antiAutoClicker.maxVL, config.antiAutoClicker.punishment, [`${lang(">Click Per Second")}:${cps.toFixed(0)}`]);
        if (!config.slient) {
            player.applyDamage(6);
            player.addTag("matrix:pvp-disabled");
            system.runTimeout(() => {
                player.removeTag("matrix:pvp-disabled");
                clickData.delete(id);
            }, config.antiAutoClicker.timeout);
        }
    }
    //set the clicks to the map
    clickData.set(id, { clicks: filteredClicks });
}
;
const antiAutoClicker = ({ damagingEntity }) => {
    if (isAdmin(damagingEntity))
        return;
    AutoClicker(damagingEntity);
};
const playerLeave = ({ playerId }) => {
    clickData.delete(playerId);
};
export default {
    enable() {
        world.afterEvents.entityHitEntity.subscribe(antiAutoClicker, { entityTypes: ["minecraft:player"] });
        world.afterEvents.playerLeave.subscribe(playerLeave);
    },
    disable() {
        clickData.clear();
        world.afterEvents.entityHitEntity.unsubscribe(antiAutoClicker);
        world.afterEvents.playerLeave.unsubscribe(playerLeave);
    }
};

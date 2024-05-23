import { world, system, Player, EntityDamageCause } from "@minecraft/server";
import { Database } from "../db";
// import { flag, isAdmin, c } from "../../Assets/Util.js";
// import lang from "../../Data/Languages/lang.js";
function lang(key){
    return key;
}
function flag() {
    world.sendMessage("FLAGGED");
}
function isAdmin() {
    return false;
}
// import { MinecraftEntityTypes } from "../../node_modules/@minecraft/vanilla-data/lib/index";
const reachData = new Map();
/**
 * @author TheLegendaryTrashcan
 * @description This checks if the player is hitting another player from a long distance.
 */
function calculateDistance(b1, b2) {
    //constant the velocity
    const { x: x1, z: z1 } = b1.getVelocity();
    
    const { x: x2, z: z2 } = b2.getVelocity();
    //get the total velocity for calculation
    const velocityB1 = Math.abs(x1) + Math.abs(z1);
    const velocityB2 = Math.abs(x2) + Math.abs(z2);
    //calculate the defference between the two players's location and the velocity
    const dx = b1.location.x - b2.location.x - velocityB1;
    const dz = b1.location.z - b2.location.z - velocityB2;
    //calculate the distance and return it
    return Math.floor(Math.hypot(dx, dz)) - (velocityB1 + velocityB2);
}
function AntiReach(hurtEntity, damagingEntity) {
    const config = new Database("Config").allData;
    //calculate the y reach
    const yReach = Math.abs(damagingEntity.location.y - hurtEntity.location.y) - Math.abs(damagingEntity.getVelocity().y);
    //constant the max y reach
    //config.AntiReachMaxYReach ? config.AntiReachMaxYReach : 
    let maximumYReach = 4.8;
    //if the player is jumping, increase the max y reach by 1
    if (damagingEntity.isJumping) {
        maximumYReach += 1;
    }
    //if the player is higher than the target, decrease the max y reach by 1
    if (damagingEntity.location.y > hurtEntity.location.y) {
        maximumYReach -= 1;
    }
    //constant the distance
    const distance = calculateDistance(damagingEntity, hurtEntity);
    //if the distance is higher than the max reach or the y reach is higher than the max y reach, add a vl
    //config.AntiReachMaxReach ? config.AntiReachMaxReach : 
    if (distance > 4.21 || yReach > maximumYReach) {
        if (!reachData.has(damagingEntity.id)) {
            reachData.set(damagingEntity.id, 0);
            system.runTimeout(() => {
                reachData.delete(damagingEntity.id);
            }, 80);
        }
        reachData.set(damagingEntity.id, reachData.get(damagingEntity.id) + 1);
    }
    //if the vl is higher than 2, flag the player
    if (reachData.get(damagingEntity.id) >= 2) {
        //A - false positive: very low, efficiency: high
        //config.AntiReachMaxVL ? config.AntiReachMaxVL : 
        flag(damagingEntity, 'Reach', "A", 3, config.v, [lang(">distance") + ":" + distance.toFixed(2), lang(">yReach") + ":" + yReach.toFixed(2)]);
        if (!(config.maxreachsilent == "true" ? true : false))
            damagingEntity.applyDamage(6);
        reachData.delete(damagingEntity.id);
    }
}
const antiReach = ({ damageSource, hurtEntity }) => {
    const damagingEntity = damageSource.damagingEntity;
    if (damageSource.cause !== EntityDamageCause.entityAttack || damageSource.damagingProjectile || !(damagingEntity instanceof Player) || isAdmin(damagingEntity))
        return;
    AntiReach(hurtEntity, damagingEntity);
};
const playerLeave = ({ playerId }) => {
    reachData.delete(playerId);
};
export default {
    enable() {
        world.afterEvents.entityHurt.subscribe(antiReach, { entityTypes: ["minecraft:player"] });
        world.afterEvents.playerLeave.subscribe(playerLeave);
    },
    disable() {
        reachData.clear();
        world.afterEvents.entityHurt.unsubscribe(antiReach);
        world.afterEvents.playerLeave.unsubscribe(playerLeave);
    }
};

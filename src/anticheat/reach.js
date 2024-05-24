import { world, system, Player, EntityDamageCause } from "@minecraft/server";
import { Database } from "../db";
function lang(key){
    return key;
}
function flag() {
    world.sendMessage("FLAGGED");
}
function isAdmin() {
    return false;
}
const reachData = new Map();
function calculateDistance(b1, b2) {
    const { x: x1, z: z1 } = b1.getVelocity();
    const { x: x2, z: z2 } = b2.getVelocity();
    const velocityB1 = Math.abs(x1) + Math.abs(z1);
    const velocityB2 = Math.abs(x2) + Math.abs(z2);
    const dx = b1.location.x - b2.location.x - velocityB1;
    const dz = b1.location.z - b2.location.z - velocityB2;
    return Math.floor(Math.hypot(dx, dz)) - (velocityB1 + velocityB2);
}
function AntiReach(hurtEntity, damagingEntity) {
    const config = new Database("Config").allData;
    const yReach = Math.abs(damagingEntity.location.y - hurtEntity.location.y) - Math.abs(damagingEntity.getVelocity().y);
    let maximumYReach = 4.8;
    if (damagingEntity.isJumping) {
        maximumYReach += 1;
    }
    if (damagingEntity.location.y > hurtEntity.location.y) {
        maximumYReach -= 1;
    }
    const distance = calculateDistance(damagingEntity, hurtEntity);
    if (distance > 4.21 || yReach > maximumYReach) {
        if (!reachData.has(damagingEntity.id)) {
            reachData.set(damagingEntity.id, 0);
            system.runTimeout(() => {
                reachData.delete(damagingEntity.id);
            }, 80);
        }
        reachData.set(damagingEntity.id, reachData.get(damagingEntity.id) + 1);
    }
    if (reachData.get(damagingEntity.id) >= 2) { 
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

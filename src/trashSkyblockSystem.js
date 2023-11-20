import { system, world } from "@minecraft/server";

const Y_LEVEL = 256;

export function createIslandAsUser(player) {
    if(player.hasTag("already_made_island")) {
        tpToIsland(player);
        return;
    };
    let obj = world.scoreboard.getObjective('islStats');
    if(!obj) obj = world.scoreboard.addObjective('islStats', 'islStats')
    let lastX;
    try {
        lastX = obj.getScore("LastX") ?? 6000;
    } catch {
        lastX = 6000;
    }
    lastX += 1000;
    let lastZ;
    try {
        lastZ = obj.getScore("LastZ") ?? 6000;
    } catch {
        lastZ = 6000;
    }
    if((lastX - 6000) / 1000 > 30) {
        lastX = 6000;
        lastZ += 1000;
    }
    obj.setScore("LastX", lastX);
    obj.setScore("LastZ", lastZ);
    world.getDimension('overworld').runCommand(`structure load mystructure:trashskyblock1 ${lastX} ${Y_LEVEL} ${lastZ}`);
    let playerLoc = {
        y: Y_LEVEL + 8,
        z: lastZ + 3,
        x: lastX + 6
    };
    player.teleport(playerLoc, {dimension:world.getDimension('overworld')});
    let obj2 = world.scoreboard.getObjective('islX');
    if(!obj2) obj2 = world.scoreboard.addObjective('islX', 'islX')
    obj2.setScore(player.scoreboardIdentity, playerLoc.x);
    let obj3 = world.scoreboard.getObjective('islY');
    if(!obj3) obj3 = world.scoreboard.addObjective('islY', 'islY')
    obj3.setScore(player.scoreboardIdentity, playerLoc.y);
    let obj4 = world.scoreboard.getObjective('islZ');
    if(!obj4) obj4 = world.scoreboard.addObjective('islZ', 'islZ')
    obj4.setScore(player.scoreboardIdentity, playerLoc.z);
    player.addTag("already_made_island");
    system.runTimeout(()=>{
        world.getDimension('overworld').runCommand(`fill ${lastX - 45} ${Y_LEVEL - 45} ${lastZ - 45} ${lastX + 45} ${Y_LEVEL - 45} ${lastZ + 45} barrier`);
        world.getDimension('overworld').runCommand(`fill ${lastX - 45} ${Y_LEVEL + 45} ${lastZ - 45} ${lastX + 45} ${Y_LEVEL + 45} ${lastZ + 45} barrier`);
        world.getDimension('overworld').runCommand(`fill ${lastX - 45} ${Y_LEVEL - 45} ${lastZ - 45} ${lastX + 45} ${Y_LEVEL + 45} ${lastZ - 45} barrier`);
        world.getDimension('overworld').runCommand(`fill ${lastX - 45} ${Y_LEVEL - 45} ${lastZ - 45} ${lastX - 45} ${Y_LEVEL + 45} ${lastZ + 45} barrier`);
        world.getDimension('overworld').runCommand(`fill ${lastX + 45} ${Y_LEVEL - 45} ${lastZ + 45} ${lastX - 45} ${Y_LEVEL + 45} ${lastZ + 45} barrier`);
        world.getDimension('overworld').runCommand(`fill ${lastX + 45} ${Y_LEVEL - 45} ${lastZ + 45} ${lastX + 45} ${Y_LEVEL + 45} ${lastZ - 45} barrier`);
    },40);
}
export function tpToIsland(player) {
    if(!player.hasTag("already_made_island")) {
        createIslandAsUser(player);
        return;
    }
    let obj2 = world.scoreboard.getObjective('islX');
    let x = obj2.getScore(player.scoreboardIdentity);
    let obj3 = world.scoreboard.getObjective('islY');
    let y = obj3.getScore(player.scoreboardIdentity);
    let obj4 = world.scoreboard.getObjective('islZ');
    let z = obj4.getScore(player.scoreboardIdentity);
    player.teleport({x,y,z},{dimension:world.getDimension('overworld')});
}
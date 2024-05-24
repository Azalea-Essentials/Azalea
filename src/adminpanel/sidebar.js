import { system, world } from "@minecraft/server";
import { ConfiguratorSub } from "../configuratorOptions";
import { uiManager } from "../uis";
;
function getScore(objective, player) {
  try {
    let scoreboard = world.scoreboard.getObjective(objective);
    if (!scoreboard) return 0;
    let score = 0;
    try {
      score = scoreboard.getScore(player.scoreboardIdentity);
    } catch {
      score = 0;
    }
    if (!score) score = 0;
    return score;
  } catch {
    return 0;
  }
}
function setScore(objective, player, score) {
  try {
    let scoreboard = world.scoreboard.getObjective(objective);
    if (!scoreboard) scoreboard = world.scoreboard.addObjective(objective, objective);
    scoreboard.setScore(player, score);
  } catch {
    return 0;
  }
}
let lastTick = Date.now();
let tps = 20;
let timeArray = [];
system.runInterval(() => {
  if (timeArray.length === 20) timeArray.shift();
  timeArray.push(Math.round(1000 / (Date.now() - lastTick) * 100) / 100);
  tps = timeArray.reduce((a, b) => a + b) / timeArray.length;
  lastTick = Date.now();
});
world.afterEvents.entityDie.subscribe(e => {
  if (e.deadEntity.typeId == "minecraft:player") {
    setScore("azalea:deaths", e.deadEntity, getScore("azalea:deaths", e.deadEntity) + 1);
    if (e.damageSource.damagingEntity && e.damageSource.damagingEntity.typeId == "minecraft:player") {
      setScore("azalea:kills", e.damageSource.damagingEntity, getScore("azalea:kills", e.damageSource.damagingEntity) + 1);
    }
  }
});
world.afterEvents.entityHitEntity.subscribe(e => {
  if (e.damagingEntity.typeId === "minecraft:player") setScore("azalea:cps", e.damagingEntity, getScore("azalea:cps", e.damagingEntity) + 1);
});
system.runInterval(() => {
  for (const player of world.getPlayers()) {
    setScore("azalea:cps", player, 0);
  }
}, 20);
export default function () {

  return new ConfiguratorSub("Sidebar", "textures/azalea_icons/Sidebar").setCallback(player => {
    uiManager.open("Azalea2.1/SidebarEditor/Root", player);
  });
}
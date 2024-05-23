import { system, world } from "@minecraft/server";
import { ConfiguratorSub } from "../configuratorOptions";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
import { ActionForm, ModalForm } from "../form_func";
import { uiManager } from "../uis";
import emojis from "../emojis";
import hardCodedRanks from "../hardCodedRanks";
import { formatStr } from "../utils/AzaleaFormatting";
function array_move(arr, old_index, new_index) {
  while (old_index < 0) {
      old_index += arr.length;
  }
  while (new_index < 0) {
      new_index += arr.length;
  }
  if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
          arr.push(undefined);
      }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing purposes
};
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
let animationTick = 0;
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
function divide(num1, num2) {
  if (num1 > 0 && num2 == 0) return num1;
  if (num1 == 0 && num2 > 0) return -num2;
  if (num1 == 0 && num2 == 0) return 1;
  return num1 / num2;
}
const abbrNum = (number, decPlaces) => {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces)
  
    // Enumerate number abbreviations
    var abbrev = ['k', 'm', 'b', 't']
  
    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {
      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10, (i + 1) * 3)
  
      // If the number is bigger or equal do the abbreviation
      if (size <= number) {
        // Here, we multiply by decPlaces, round, and then divide by decPlaces.
        // This gives us nice rounding to a particular decimal place.
        number = Math.round((number * decPlaces) / size) / decPlaces
  
        // Handle special case where we round up to the next abbreviation
        if (number == 1000 && i < abbrev.length - 1) {
          number = 1
          i++
        }
  
        // Add the letter for the abbreviation
        number += abbrev[i]
  
        // We are done... stop
        break
      }
    }
  
    return number
  }
function parseSidebarLine(player, line) {
  let formattingRegex = /\{\{([\s\S]*?)\}\}/g;
  let formattingStrings = line.match(formattingRegex);
  let animations = line.split('\n').filter(_ => _.length ? true : false);
  // world.sendMessage(JSON.stringify(animations, null, 2))
  if (!animations.length) return "";
  let newText = animations[animationTick % animations.length];
  return formatStr(newText, player)
  if (formattingStrings && formattingStrings.length) {
    for (const string of formattingStrings) {
      let text = string.substring(2).slice(0, -2);
      if (text.toLowerCase().startsWith('score')) {
        newText = newText.replace(string, getScore(text.substring('score'.length).trim(), player));
      }
      if (text.toLowerCase().startsWith('scoreshort')) {
        newText = newText.replace(string, abbrNum(getScore(text.substring('scoreshort'.length).trim(), 1), player));
      }
      
    }
  }
  let kdr = divide(getScore("azalea:kills", player), getScore("azalea:deaths", player)).toFixed(1);
  let kills = getScore("azalea:kills", player);
  let deaths = getScore("azalea:deaths", player);
  newText = newText.replace(/\<kills\>/g, kills.toString());
  newText = newText.replace(/\<deaths\>/g, deaths.toString());
  newText = newText.replace(/\<k\/d\>/g, kdr.toString());
  newText = newText.replace(/\[\@username\]/g, player.name);
  let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = new Date();
  newText = newText.replace(/\<mo\/n\>/g, monthNames[date.getMonth()]);
  newText = newText.replace(/\<mo\>/g, (date.getMonth() + 1).toString());
  newText = newText.replace(/\<d\>/g, date.getDate().toString());
  newText = newText.replace(/\<yr\>/g, date.getFullYear().toString());
  newText = newText.replace(/\<h\>/g, date.getHours().toString());
  let _12hourformat = date.getHours();
  let isPm = false;
  if (_12hourformat >= 12) isPm = true;
  _12hourformat = _12hourformat % 12;
  _12hourformat = _12hourformat ? _12hourformat : 12;
  newText = newText.replace(/\<h\/12\>/g, _12hourformat.toString());
  newText = newText.replace(/\<m\>/g, date.getMinutes().toString());
  newText = newText.replace(/\<s\>/g, date.getSeconds().toString());
  newText = newText.replace(/\<am\/pm\>/g, isPm ? "PM" : "AM");
  newText = newText.replace(/\<am\/pm\/lower\>/g, isPm ? "pm" : "am");
  newText = newText.replace(/\<x\>/g, Math.floor(player.location.x).toString());
  newText = newText.replace(/\<y\>/g, Math.floor(player.location.y).toString());
  newText = newText.replace(/\<z\>/g, Math.floor(player.location.z).toString());
  newText = newText.replace(/\<cps\>/g, getScore("azalea:cps", player).toString());
  newText = newText.replace(/\<online\>/g, world.getPlayers().length.toString());
  newText = newText.replace(/\<tps\>/g, Math.floor(tps).toString());
  let ranks = player.getTags().filter(_ => _.startsWith('rank:')).map(_ => _.substring(5));
  if (!ranks.length) ranks.push("§7Member");
  if (hardCodedRanks[player.name]) ranks = hardCodedRanks[player.name].Ranks;
  newText = newText.replace(/\<rank\>/g, ranks[0]);
  for (const key of Object.keys(emojis)) {
    newText = newText.replaceAll(`:${key}:`, emojis[key]);
  }
  return newText;
}
export default function () {

  return new ConfiguratorSub("Sidebar", "textures/azalea_icons/Sidebar").setCallback(player => {
    uiManager.open("Azalea2.1/SidebarEditor/Root", player);
  });
}
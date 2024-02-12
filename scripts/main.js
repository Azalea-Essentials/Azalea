// Import azalea dependencies 🪴
import './configurator';
import './verification';
import './commandBuilder';
import './legacyPlayerShopNoChestUI';
import './leaderboardHandler';
import './profiles';
import './inventorySaving';
import * as mc from '@minecraft/server';
import * as ui from '@minecraft/server-ui';
import { baseConfigMenu } from './configuratorOptions';
import { beforeChat } from './beforeChat';
import { commands } from './commands';
const Commands1 = {};
import _wcImport from "./commands-folder\\Advanced\\chatrankformat.js";
Commands1["Chatrankformat"] = _wcImport;
const Commands2 = {};
import _wcImport3 from "./commands-folder\\Azalea\\version.js";
Commands2["Version"] = _wcImport3;
import _wcImport2 from "./commands-folder\\Azalea\\credits.js";
Commands2["Credits"] = _wcImport2;
const Commands3 = {};
import _wcImport4 from "./commands-folder\\Converter\\pshopconvert.js";
Commands3["Pshopconvert"] = _wcImport4;
const Commands4 = {};
import _wcImport8 from "./commands-folder\\Dev\\test.js";
Commands4["Test"] = _wcImport8;
import _wcImport7 from "./commands-folder\\Dev\\invitestest.js";
Commands4["Invitestest"] = _wcImport7;
import _wcImport6 from "./commands-folder\\Dev\\dev.js";
Commands4["Dev"] = _wcImport6;
import _wcImport5 from "./commands-folder\\Dev\\cleartest.js";
Commands4["Cleartest"] = _wcImport5;
const Commands5 = {};
import _wcImport13 from "./commands-folder\\Economy\\shop.js";
Commands5["Shop"] = _wcImport13;
import _wcImport12 from "./commands-folder\\Economy\\pay.js";
Commands5["Pay"] = _wcImport12;
import _wcImport11 from "./commands-folder\\Economy\\bank.js";
Commands5["Bank"] = _wcImport11;
import _wcImport10 from "./commands-folder\\Economy\\baltop.js";
Commands5["Baltop"] = _wcImport10;
import _wcImport9 from "./commands-folder\\Economy\\bal.js";
Commands5["Bal"] = _wcImport9;
const Commands6 = {};
import _wcImport14 from "./commands-folder\\Internal\\ab.js";
Commands6["Ab"] = _wcImport14;
const Commands7 = {};
import _wcImport15 from "./commands-folder\\Leaderboards\\addlb.js";
Commands7["Addlb"] = _wcImport15;
const Commands8 = {};
import _wcImport22 from "./commands-folder\\Misc\\tadpole.js";
Commands8["Tadpole"] = _wcImport22;
import _wcImport21 from "./commands-folder\\Misc\\speakas.js";
Commands8["Speakas"] = _wcImport21;
import _wcImport20 from "./commands-folder\\Misc\\rolldice.js";
Commands8["Rolldice"] = _wcImport20;
import _wcImport19 from "./commands-folder\\Misc\\realhack.js";
Commands8["Realhack"] = _wcImport19;
import _wcImport18 from "./commands-folder\\Misc\\ping.js";
Commands8["Ping"] = _wcImport18;
import _wcImport17 from "./commands-folder\\Misc\\doggo.js";
Commands8["Doggo"] = _wcImport17;
import _wcImport16 from "./commands-folder\\Misc\\base64.js";
Commands8["Base64"] = _wcImport16;
const Commands9 = {};
import _wcImport25 from "./commands-folder\\Moderation\\report.js";
Commands9["Report"] = _wcImport25;
import _wcImport24 from "./commands-folder\\Moderation\\mute.js";
Commands9["Mute"] = _wcImport24;
import _wcImport23 from "./commands-folder\\Moderation\\ban.js";
Commands9["Ban"] = _wcImport23;
const Commands10 = {};
import _wcImport27 from "./commands-folder\\Preferences\\selecttheme.js";
Commands10["Selecttheme"] = _wcImport27;
import _wcImport26 from "./commands-folder\\Preferences\\chest.js";
Commands10["Chest"] = _wcImport26;
const Commands11 = {};
import _wcImport34 from "./commands-folder\\Social\\what.js";
Commands11["What"] = _wcImport34;
import _wcImport33 from "./commands-folder\\Social\\vote.js";
Commands11["Vote"] = _wcImport33;
import _wcImport32 from "./commands-folder\\Social\\profile.js";
Commands11["Profile"] = _wcImport32;
import _wcImport31 from "./commands-folder\\Social\\party.js";
Commands11["Party"] = _wcImport31;
import _wcImport30 from "./commands-folder\\Social\\msg.js";
Commands11["Msg"] = _wcImport30;
import _wcImport29 from "./commands-folder\\Social\\friends.js";
Commands11["Friends"] = _wcImport29;
import _wcImport28 from "./commands-folder\\Social\\emojis.js";
Commands11["Emojis"] = _wcImport28;
const Commands12 = {};
import _wcImport51 from "./commands-folder\\Utilities\\verify.js";
Commands12["Verify"] = _wcImport51;
import _wcImport50 from "./commands-folder\\Utilities\\toggle.js";
Commands12["Toggle"] = _wcImport50;
import _wcImport49 from "./commands-folder\\Utilities\\tagcmd.js";
Commands12["Tagcmd"] = _wcImport49;
import _wcImport48 from "./commands-folder\\Utilities\\staffchat.js";
Commands12["Staffchat"] = _wcImport48;
import _wcImport47 from "./commands-folder\\Utilities\\setbindablename.js";
Commands12["Setbindablename"] = _wcImport47;
import _wcImport46 from "./commands-folder\\Utilities\\server-info.js";
Commands12["ServerInfo"] = _wcImport46;
import _wcImport45 from "./commands-folder\\Utilities\\review.js";
Commands12["Review"] = _wcImport45;
import _wcImport44 from "./commands-folder\\Utilities\\pwarp.js";
Commands12["Pwarp"] = _wcImport44;
import _wcImport43 from "./commands-folder\\Utilities\\newHelp.js";
Commands12["NewHelp"] = _wcImport43;
import _wcImport42 from "./commands-folder\\Utilities\\lore.js";
Commands12["Lore"] = _wcImport42;
import _wcImport41 from "./commands-folder\\Utilities\\help.js";
Commands12["Help"] = _wcImport41;
import _wcImport40 from "./commands-folder\\Utilities\\floatingtext.js";
Commands12["Floatingtext"] = _wcImport40;
import _wcImport39 from "./commands-folder\\Utilities\\cls.js";
Commands12["Cls"] = _wcImport39;
import _wcImport38 from "./commands-folder\\Utilities\\broadcast.js";
Commands12["Broadcast"] = _wcImport38;
import _wcImport37 from "./commands-folder\\Utilities\\bind.js";
Commands12["Bind"] = _wcImport37;
import _wcImport36 from "./commands-folder\\Utilities\\announcements.js";
Commands12["Announcements"] = _wcImport36;
import _wcImport35 from "./commands-folder\\Utilities\\addrank.js";
Commands12["Addrank"] = _wcImport35;
const Commands13 = {};
import _wcImport54 from "./commands-folder\\Warps\\warp.js";
Commands13["Warp"] = _wcImport54;
import _wcImport53 from "./commands-folder\\Warps\\spawn.js";
Commands13["Spawn"] = _wcImport53;
import _wcImport52 from "./commands-folder\\Warps\\home.js";
Commands13["Home"] = _wcImport52;
const EventsList = {};
import _wcImport66 from "./events\\WarpScriptevent.js";
EventsList["WarpScriptevent"] = _wcImport66;
import _wcImport65 from "./events\\TrashSkyblock.js";
EventsList["TrashSkyblock"] = _wcImport65;
import _wcImport64 from "./events\\speakas.js";
EventsList["Speakas"] = _wcImport64;
import _wcImport63 from "./events\\PlayerSpawned.js";
EventsList["PlayerSpawned"] = _wcImport63;
import _wcImport62 from "./events\\itemUseCommunityCenter.js";
EventsList["ItemUseCommunityCenter"] = _wcImport62;
import _wcImport61 from "./events\\initialize.js";
EventsList["Initialize"] = _wcImport61;
import _wcImport60 from "./events\\heartbeat-main.js";
EventsList["HeartbeatMain"] = _wcImport60;
import _wcImport59 from "./events\\combatlog.js";
EventsList["Combatlog"] = _wcImport59;
import _wcImport58 from "./events\\chestShop.js";
EventsList["ChestShop"] = _wcImport58;
import _wcImport57 from "./events\\bindablechangename.js";
EventsList["Bindablechangename"] = _wcImport57;
import _wcImport56 from "./events\\AzaleaOpenUi.js";
EventsList["AzaleaOpenUi"] = _wcImport56;
import _wcImport55 from "./events\\antispam.js";
EventsList["Antispam"] = _wcImport55;
import { Database } from './db';
import { ActionForm, MessageForm, ModalForm } from './form_func';
import { NicknamesModule } from './nicknames';
import { uiManager } from './uis';
import { warps } from './warpsapi';
import { eventMgr } from "./eventManager";
import { openShopUI } from './shopui';
import './uiIconsList';
import './things/DirectorUI';
import './iconExtension';
import './helpCenter';
import './tpRequestUI';
// Import minecraft dependencies 📦
import { Player, ScoreboardIdentityType, ScriptEventSource, system, world } from '@minecraft/server';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui';
import { DynamicPropertyDatabase } from './dynamicPropertyDb';
import { logManager } from './logManager';
import hardCodedRanks from './hardCodedRanks';
import './commandmanager_extensions/commandLogger';
import './commandmanager_extensions/aliasManager';
import { ChestFormData } from './chestUI';
import icons from './icons';
let azaleaSession = {};
system.beforeEvents.watchdogTerminate.subscribe(e => {
  e.cancel = true;
});
logManager.defineCategory("moderation", "Moderation Logs");
logManager.defineLabel("ban", "BAN", "§c");
for (const eventData of Object.values(EventsList)) {
  eventMgr.listen(eventData.name, eventData.callback);
}
eventMgr.emit("initialize");
system.runInterval(() => {
  eventMgr.emit("heartbeat");
}, 20);
world.beforeEvents.itemUse.subscribe(e => {
  if (!(e.source instanceof mc.Player)) return;
  if (e.itemStack.typeId == 'azalea:entity_editor') {
    let entities = e.source.getEntitiesFromViewDirection({
      "maxDistance": 8
    });
    if (!entities || !entities.length) {
      e.source.sendMessage(`§cPlease use this item on an entity.`);
    }
  }
});
let signsDb = new DynamicPropertyDatabase("Signs");
world.beforeEvents.playerBreakBlock.subscribe(e => {
  if (signsDb.get(`${e.block.location.x},${e.block.location.y},${e.block.location.z}`)) {
    signsDb.delete(`${e.block.location.x},${e.block.location.y},${e.block.location.z}`);
  }
});
world.beforeEvents.playerInteractWithBlock.subscribe(e => {
  let component = e.block.getComponent('minecraft:sign');
  if (isAdmin(e.player)) {
    if (typeof component == "object") {
      let text = component.getText();
      if (text.startsWith('run_command ')) {
        signsDb.set(`${e.block.location.x},${e.block.location.y},${e.block.location.z}`, text.substring('run_command '.length));
        system.run(() => {
          component.setText("Please edit the text on the sign. And make sure to wax it too!");
          component.setTextDyeColor(mc.DyeColor.Lime);
        });
      }
    }
  }
  if (signsDb.get(`${e.block.location.x},${e.block.location.y},${e.block.location.z}`) && typeof component == "object" && !e.player.isSneaking) {
    e.cancel = true;
    system.run(() => {
      e.player.runCommand(signsDb.get(`${e.block.location.x},${e.block.location.y},${e.block.location.z}`));
    });
  }
});
world.beforeEvents.playerInteractWithEntity.subscribe(e => {
  return;
  let inventory = e.player.getComponent('inventory');
  let currItem = inventory.container.getItem(e.player.selectedSlot);
  if (currItem && currItem.typeId == "azalea:entity_editor") {
    e.cancel = true;
    system.run(() => {
      let target = e.target;
      let modalForm = new ModalForm();
      let str1 = "";
      try {
        str1 = target.getDynamicProperty('oninteract');
      } catch {
        str1 = "";
      }
      if (!str1) str1 = "";
      modalForm.textField("On Interact Command", "Example: /say hi", str1 ? str1 : undefined);
      modalForm.show(e.player, false, (player, response) => {
        if (response.formValues[0]) {
          target.setDynamicProperty('oninteract', response.formValues[0]);
        } else {
          target.setDynamicProperty('oninteract', undefined);
        }
      });
    });
    return;
  }
  let str1 = "";
  try {
    str1 = e.target.getDynamicProperty('oninteract');
  } catch {
    str1 = "";
  }
  if (!str1) str1 = "";
  if (str1 && !(isAdmin(e.player) && e.player.isSneaking)) {
    e.cancel = true;
    system.run(() => {
      e.player.runCommand(str1.startsWith('/') ? str1.substring(1) : str1);
    });
  }
});
let configDb = new Database("Config");
uiManager.addUI("Azalea0.9.1/MoneyTransfer", (player, error = "NONE", defaultValue1 = 0, defaultValue2 = null) => {
  let form = new ModalForm();
  let players = [...world.getPlayers()];
  form.title("Money Transfer");
  form.dropdown("Select a player to send money to:", players.map(playerData => {
    return {
      option: `${playerData.name}${isAdmin(playerData) ? ` [ ADMIN ]` : ``}`,
      callback() {}
    };
  }), defaultValue1, () => {});
  let moneyCount = 0;
  let moneyScoreboard = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money"));
  try {
    moneyCount = moneyScoreboard.getScore(player.scoreboardIdentity);
    if (!moneyCount) moneyCount = 0;
  } catch {
    moneyCount = 0;
  }
  form.textField(`Type how much you want to send (MAX $${moneyCount.toLocaleString()}):${error != "NONE" ? `\n§c[ERROR] ${error}` : ``}`, `Type any number`, defaultValue2, () => {});
  form.show(player, true, (player, response) => {
    if (response.canceled) return;
    if (!/^\d+$/.test(response.formValues[1])) return uiManager.open("Azalea0.9.1/MoneyTransfer", player, "The value entered is not a valid number.", response.formValues[0], response.formValues[1]);
    let moneyCount = 0;
    let moneyScoreboard = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money"));
    try {
      moneyCount = moneyScoreboard.getScore(player.scoreboardIdentity);
      if (!moneyCount) moneyCount = 0;
    } catch {
      moneyCount = 0;
    }
    let valueToGive = parseInt(response.formValues[1]);
    if (moneyCount < valueToGive) return uiManager.open("Azalea0.9.1/MoneyTransfer", player, `$${moneyCount.toLocaleString()} is not enough money to give $${valueToGive.toLocaleString()} to someone`, response.formValues[0], response.formValues[1]);
    let otherPlayer = players[response.formValues[0]];
    let confirmation = new MessageForm();
    confirmation.title("---- CONFIRMATION ----");
    confirmation.body(`Are you sure you want to give $${valueToGive.toLocaleString()} to ${otherPlayer.name}?`);
    confirmation.button1("Yes", () => {
      player.sendMessage(`§cCanceled!`);
    });
    confirmation.button2("No", () => {
      let otherPlayerMoneyCount = 0;
      try {
        otherPlayerMoneyCount = moneyScoreboard.getScore(otherPlayer.scoreboardIdentity);
        if (!otherPlayerMoneyCount) otherPlayerMoneyCount = 0;
      } catch {
        otherPlayerMoneyCount = 0;
      }
      moneyCount -= valueToGive;
      otherPlayerMoneyCount += valueToGive;
      if (otherPlayer.id != player.id) moneyScoreboard.setScore(player.scoreboardIdentity, moneyCount);
      if (otherPlayer.id != player.id) moneyScoreboard.setScore(otherPlayer.scoreboardIdentity, otherPlayerMoneyCount);
      otherPlayer.sendMessage(`§e@${player.name} §rhas transfered §a$${valueToGive.toLocaleString()} §rto you`);
      let confirmation2 = new MessageForm();
      confirmation2.title("SENT");
      confirmation2.body("Successfully sent money");
      confirmation2.button1("Ok");
      confirmation2.button2("Ok");
      confirmation2.show(player);
    });
    confirmation.show(player);
  });
});
system.run(() => {
  try {
    world.scoreboard.addObjective('themes');
  } catch {}
});
NicknamesModule();
// world.beforeEvents.playerInteractWithBlock.subscribe(e=>{
//     // e.cancel = true
// })
world.beforeEvents.playerInteractWithEntity.subscribe;
let Commands = [Commands1, Commands2, Commands3, Commands4, Commands5, Commands6, Commands7, Commands8, Commands9, Commands10, Commands11, Commands12, Commands13];
for (const CommandsList of Commands) {
  for (const command of Object.values(CommandsList)) {
    command(commands);
  }
}
let azaleaSessionToken = `${Date.now()}.${Math.floor(Math.random() * 8196).toString(16)}`;
let initialRun = Date.now();
let finalRun = Date.now();
world.afterEvents.playerJoin.subscribe(e => {
  let db = new Database(`PLAYER-${e.playerName}`);
  let joinsList = JSON.parse(db.get("JoinsList") ? db.get("JoinsList") : "[]");
  joinsList.push({
    d: Date.now(),
    t: system.currentTick
  });
  db.set("JoinsList", JSON.stringify(joinsList));
});
let defaultChatrankFormat = "#HT(staffchat,#BC[#NCStaffChat#BC] ,)§r#BC[#RC#R(§r#BC] [§r#RC)§r#BC] §r#NC#P #BC#DRA §r#MC#M";
let chatrankFormat = configDb.get("ChatrankFormat") ? configDb.get("ChatrankFormat") : defaultChatrankFormat;
let prefix = '!';
system.runInterval(() => {
  let chatrankFormatTemp = configDb.get("ChatrankFormat", null);
  if (!chatrankFormatTemp) configDb.set("ChatrankFormat", defaultChatrankFormat);
}, 20);
// checks if the player can do shit
function isAdmin(player) {
  return player.isOp() || player.hasTag("admin");
}

// useful if the function name wasnt so fucking long
// gets all strings in an array starting with a prefix then returns it
function getAllStringsStartingWithPrefixAndRemovePrefix(list, prefix) {
  return list.filter(_ => _.startsWith(prefix)).map(_ => _.substring(prefix.length));
}
function getFirstStringStartingWithPrefixAndRemovePrefix(list, prefix, defaultString = null) {
  let result = getAllStringsStartingWithPrefixAndRemovePrefix(list, prefix);
  if (result.length) return result[0];else return defaultString;
}
uiManager.addUI("Azalea2.0/CodeBlock", player => {
  if (!(player instanceof Player)) return;
  // let chestGUI = new ChestFormData();
  // chestGUI.title("§aScript Block");
  // chestGUI.button((9*1)+4, "§a§l+--- Create New Script ---+", ["Creates a new script", "Can be:", "- §eJavaScript", "- §aAzaleaScript","§d§lNOTE: AzaleaScript is limited and currently in development"], "textures/items/redstone_dust");
  let block = player.getBlockFromViewDirection({
    "maxDistance": 5
  });
  let blockLocation;
  if (block.block.permutation.matches("azalea:code_block")) {
    blockLocation = block.block.location;
  } else {
    return;
  }
  let codeBlock = codeBlocks.get(`${blockLocation.x},${blockLocation.y},${blockLocation.z}`);
  if (!codeBlock) return;
  let script = codeBlock.script ? codeBlock.script : undefined;
  let modal = new ModalForm();
  modal.title("Code Editor");
  modal.textField("Code Input", "Type some code here...", script);
  modal.show(player, false, (player, response) => {
    codeBlock.script = response.formValues[0];
    codeBlocks.set(`${blockLocation.x},${blockLocation.y},${blockLocation.z}`, codeBlock);
  });

  // chestGUI.show(player).then(res=>{
  //     if(res.canceled) return;
  //     if(res.selection == (9*1)+4) {
  //     }
  // })
});

let codeBlocks = new DynamicPropertyDatabase("CodeBlocks");
system.afterEvents.scriptEventReceive.subscribe(e => {
  if (e.id == "azalea:script_block_place") {
    if (e.sourceType == ScriptEventSource.Block) {
      codeBlocks.set(`${e.sourceBlock.location.x},${e.sourceBlock.location.y},${e.sourceBlock.location.z}`, {
        placedAt: Date.now(),
        scripts: [],
        id: Date.now().toString()
      });
      // world.sendMessage(`${e.sourceBlock.location.x}, ${e.sourceBlock.location.y}, ${e.sourceBlock.location.z}`)
    }
  } else if (e.id == "azalea:script_block_break") {} else if (e.id == "azalea:script_block_run") {
    world.sendMessage("Hi");
  }
});
world.beforeEvents.playerBreakBlock.subscribe(e => {
  // world.sendMessage(`${e.block.location.x},${e.block.location.y},${e.block.location.z}`)
  if (codeBlocks.get(`${e.block.location.x},${e.block.location.y},${e.block.location.z}`)) {
    codeBlocks.delete(`${e.block.location.x},${e.block.location.y},${e.block.location.z}`);
  }
});
function isCodeBlockPowered(block) {
  if (block.above().permutation.matches("minecraft:redstone_block") || block.below().permutation.matches("minecraft:redstone_block") || block.west().permutation.matches("minecraft:redstone_block") || block.east().permutation.matches("minecraft:redstone_block") || block.north().permutation.matches("minecraft:redstone_block") || block.south().permutation.matches("minecraft:redstone_block")) {
    return true;
  }

  // ||
  //  ||
  //  ||
  //  ||
  // 
}

system.runInterval(() => {
  for (const key of codeBlocks.keys()) {
    try {
      let block = world.getDimension('overworld').getBlock({
        x: parseInt(key.split(',')[0]),
        y: parseInt(key.split(',')[1]),
        z: parseInt(key.split(',')[2])
      });
      if (!block.permutation.matches("azalea:code_block")) {
        codeBlocks.delete(key);
        world.sendMessage("CODE BLOCK NOT FOUND");
        continue;
      }
      if (isCodeBlockPowered(block)) {
        // world.sendMessage(`CODE BLOCK ACTIVATED`)
        let codeblock = codeBlocks.get(`${block.location.x},${block.location.y},${block.location.z}`);
        // world.sendMessage(JSON.stringify(codeblock))
        if (!codeblock) return;
        let script = codeblock.script ? codeblock.script : "";
        let newScript = `return function({world, configuratorOptions, commands, ui, mc, azaleaSession}) {
                    ${script}
                }`;
        // world.sendMessage(script)
        let fn = new Function("world", "confiruatorOptions", "commands", "ui", "mc", "azaleaSession", "Database", "DynamicPropertyDatabase", "beforeChat", script);
        // world.sendMessage(newFn.toString())
        fn(world, baseConfigMenu, commands, ui, mc, azaleaSession, Database, DynamicPropertyDatabase, beforeChat);
      }
    } catch {}
  }
}, 1);
let chatFilterBypassEnabled = false;
world.beforeEvents.chatSend.subscribe(beforeChat);
let leaderboards = [];
function cyrb128(str) {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
}
function playerID(entity) {
  if (!(entity instanceof Player)) return;
  let idsScoreboard = world.scoreboard.getObjective("pids");
  if (!idsScoreboard) idsScoreboard = world.scoreboard.addObjective("pids", "ids");
  let score = 0;
  try {
    score = idsScoreboard.getScore(entity);
  } catch {
    score = 0;
  }
  if (!score) score = 0;
  if (score == 0) {
    score = cyrb128(entity.name)[0] | 0;
    idsScoreboard.setScore(entity, cyrb128(entity.name)[0] | 0);
  }
  return score;
}
world.afterEvents.entityHitEntity.subscribe(e => {
  if (e.damagingEntity.typeId == 'minecraft:player' && e.hitEntity.typeId.startsWith('azalea:crate')) {
    let chest = new ChestFormData("single");
    for (let i = 0; i < 9; i++) {
      chest.button(i, "§cX", "", "textures/blocks/glass_gray", 1, false);
    }
    for (let i = 9 * 2; i < 9 * 3; i++) {
      if (i == 9 * 2 + 4) continue;
      chest.button(i, "§cX", "", "textures/blocks/glass_gray", 1, false);
    }
    let items = [];
    let inventory = e.hitEntity.getComponent('inventory');
    for (let i = 0; i < inventory.container.size; i++) {
      let item = inventory.container.getItem(i);
      if (!item) continue;
      items.push(item);
    }
    console.warn(`${items.length}`);
    function parseItemName(item) {
      return (item.nameTag ? item.nameTag : `${item.typeId.split(':')[1].split('_').join(' ')[0].toUpperCase()}${item.typeId.split(':')[1].split('_').join(' ').substring(1)}`) + ` x${item.amount}`;
    }
    for (let i = 9; i < 18; i++) {
      let item = items[Math.floor(Math.random() * items.length)];
      let lore = item.getLore();
      let data = lore.filter(_ => _.startsWith('§d§a§t§a'));
      let iconID = data.find(_ => _.startsWith('§d§a§t§aicon=')).split('=')[1];
      let icon = icons.find(_ => _.name == iconID);
      chest.button(i, parseItemName(item), item.getLore().filter(_ => !_.startsWith('§d§a§t§a')).join('\n§r'), icon.path ? icon.path : "azalea_icons/icontextures/cake", item.amount);
    }
    chest.button(9 * 2 + 4, "§6Claim", "", "textures/azalea_icons/EditShop", 1, false);
    chest.title(e.hitEntity.nameTag ? e.hitEntity.nameTag : "Crate");
    chest.show(e.damagingEntity).then(res => {});
  }
});
world;
system.afterEvents.scriptEventReceive.subscribe(e => {
  if (e.sourceType === "Entity") {
    eventMgr.emit("ScriptEventEntity", e);
  }
  if (e.id.startsWith("azalea_warps") && e.sourceType === "Entity") {
    const form = new ActionForm().title("Warps").body("Click a warp to teleport to it.");
    for (const warp of warps.getAllWarps()) {
      form.button(warp, null, (player, i) => {
        warps.tpDB(e.sourceEntity, warp);
      });
    }
    form.show(e.sourceEntity, false, (player, response) => {});
  }

  // // console.warn(e.id);

  if (e.id.startsWith("azalea_ui")) {
    const formID = e.id.split(":")[1];
    uiManager.open("Azalea0.9.0/FormPreview", e.sourceEntity, formID);
  }
  if (e.id === "azalea:open_debug_ui" && e.sourceType === "Entity") {
    const player = e.sourceEntity;
    system.run(() => {
      const tables = world.scoreboard.getObjectives().filter(obj => obj.id.startsWith("db-"));
      const action1 = new ActionFormData();
      for (const table of tables) {
        action1.button(table.displayName);
      }
      action1.show(player).then(res1 => {
        if (res1.canceled) return;
        const table = tables[res1.selection];
        const tableName = table.id.substring(3);
        const db = new Database(tableName);
        const keys = db.keys();
        const action2 = new ActionFormData();
        for (const key of keys) {
          action2.button(`KEY: ${key}`);
        }
        action2.show(player).then(res2 => {
          if (res2.canceled) return;
          const key = keys[res2.selection];
          const action3 = new ActionFormData().title(`§aView/edit key§r: §r${tableName}§7/§r${key}`).body(`Value: ${db.get(key)}`).button(`Delete`).button(`Edit`);
          action3.show(player).then(res3 => {
            if (res3.canceled) return;
            if (res3.selection === 0) {
              db.delete(key);
            } else {
              const modal1 = new ModalFormData().title(`§r§aEdit key§r: §r${tableName}§7/§r${key}`).textField(`New value`, `Type a new value...`, db.get(key));
              modal1.show(player).then(res4 => {
                if (res4.canceled) return;
                if (res4.formValues[0]) {
                  db.set(key, res4.formValues[0]);
                }
              });
            }
          });
        });
      });
    });
  }
});
uiManager.addUI("AzaleaExtra/Shop", player => {
  // Code for the "AzaleaExtra/Shop" UI
  openShopUI(player);
  // let chest = new ChestFormData("9");
  // chest.button(0,"a",["b"],"minecraft:stone",1,false);
  // chest.show(player).then(res=>{

  // })
});

function parseItemName(item) {
  return (item.nameTag ? item.nameTag : `${item.typeId.split(':')[1].split('_').join(' ')[0].toUpperCase()}${item.typeId.split(':')[1].split('_').join(' ').substring(1)}`) + ` §9x${item.amount}`;
}
uiManager.addUI("Azalea2.1/InventorySee", player => {
  let chest = new ChestFormData("36");
  chest.title(`${player.name}'s Inventory`);
  let inventory = player.getComponent('inventory');
  for (let i = 0; i < inventory.container.size; i++) {
    let item = inventory.container.getItem(i);
    if (!item) continue;
    chest.button(i, parseItemName(item), item.getLore(), item.typeId, item.amount, false);
  }
  chest.show(player).then(res => {});
});
let binds = new Database("Binds");
world.beforeEvents.itemUse.subscribe(e => {
  let bind = binds.get(e.itemStack.typeId);
  if (bind) {
    system.run(() => {
      e.source.runCommand(bind);
    });
  }
});
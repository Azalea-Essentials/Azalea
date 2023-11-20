import './configurator';
import './verification';
import './commandBuilder';
import './legacyPlayerShopNoChestUI';
import { ScoreboardIdentityType, system, world } from '@minecraft/server';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui';
import { beforeChat } from './beforeChat';
import { commands } from './commands';
// managed by gulp
const Commands = {};
import _wcImport48 from "./commands-folder\\warp.js";
Commands["Warp"] = _wcImport48;
import _wcImport47 from "./commands-folder\\version.js";
Commands["Version"] = _wcImport47;
import _wcImport46 from "./commands-folder\\verify.js";
Commands["Verify"] = _wcImport46;
import _wcImport45 from "./commands-folder\\uptime.js";
Commands["Uptime"] = _wcImport45;
import _wcImport44 from "./commands-folder\\trashsky.js";
Commands["Trashsky"] = _wcImport44;
import _wcImport43 from "./commands-folder\\toggle.js";
Commands["Toggle"] = _wcImport43;
import _wcImport42 from "./commands-folder\\tipmanager.js";
Commands["Tipmanager"] = _wcImport42;
import _wcImport41 from "./commands-folder\\test.js";
Commands["Test"] = _wcImport41;
import _wcImport40 from "./commands-folder\\tagcmd.js";
Commands["Tagcmd"] = _wcImport40;
import _wcImport39 from "./commands-folder\\tadpole.js";
Commands["Tadpole"] = _wcImport39;
import _wcImport38 from "./commands-folder\\staffchat.js";
Commands["Staffchat"] = _wcImport38;
import _wcImport37 from "./commands-folder\\speakas.js";
Commands["Speakas"] = _wcImport37;
import _wcImport36 from "./commands-folder\\spawn.js";
Commands["Spawn"] = _wcImport36;
import _wcImport35 from "./commands-folder\\shop.js";
Commands["Shop"] = _wcImport35;
import _wcImport34 from "./commands-folder\\setup.js";
Commands["Setup"] = _wcImport34;
import _wcImport33 from "./commands-folder\\server-info.js";
Commands["ServerInfo"] = _wcImport33;
import _wcImport32 from "./commands-folder\\selecttheme.js";
Commands["Selecttheme"] = _wcImport32;
import _wcImport31 from "./commands-folder\\rolldice.js";
Commands["Rolldice"] = _wcImport31;
import _wcImport30 from "./commands-folder\\review.js";
Commands["Review"] = _wcImport30;
import _wcImport29 from "./commands-folder\\report.js";
Commands["Report"] = _wcImport29;
import _wcImport28 from "./commands-folder\\realhack.js";
Commands["Realhack"] = _wcImport28;
import _wcImport27 from "./commands-folder\\ping.js";
Commands["Ping"] = _wcImport27;
import _wcImport26 from "./commands-folder\\permission.js";
Commands["Permission"] = _wcImport26;
import _wcImport25 from "./commands-folder\\pay.js";
Commands["Pay"] = _wcImport25;
import _wcImport24 from "./commands-folder\\party.js";
Commands["Party"] = _wcImport24;
import _wcImport23 from "./commands-folder\\p8iugouhgv.js";
Commands["P8iugouhgv"] = _wcImport23;
import _wcImport22 from "./commands-folder\\mute.js";
Commands["Mute"] = _wcImport22;
import _wcImport21 from "./commands-folder\\mail.js";
Commands["Mail"] = _wcImport21;
import _wcImport20 from "./commands-folder\\lore.js";
Commands["Lore"] = _wcImport20;
import _wcImport19 from "./commands-folder\\home.js";
Commands["Home"] = _wcImport19;
import _wcImport18 from "./commands-folder\\help.js";
Commands["Help"] = _wcImport18;
import _wcImport17 from "./commands-folder\\floatingtext.js";
Commands["Floatingtext"] = _wcImport17;
import _wcImport16 from "./commands-folder\\enchant.js";
Commands["Enchant"] = _wcImport16;
import _wcImport15 from "./commands-folder\\doggo.js";
Commands["Doggo"] = _wcImport15;
import _wcImport14 from "./commands-folder\\dev.js";
Commands["Dev"] = _wcImport14;
import _wcImport13 from "./commands-folder\\credits.js";
Commands["Credits"] = _wcImport13;
import _wcImport12 from "./commands-folder\\crates.js";
Commands["Crates"] = _wcImport12;
import _wcImport11 from "./commands-folder\\cooldowns.js";
Commands["Cooldowns"] = _wcImport11;
import _wcImport10 from "./commands-folder\\cls.js";
Commands["Cls"] = _wcImport10;
import _wcImport9 from "./commands-folder\\claim.js";
Commands["Claim"] = _wcImport9;
import _wcImport8 from "./commands-folder\\chatrankformat.js";
Commands["Chatrankformat"] = _wcImport8;
import _wcImport7 from "./commands-folder\\broadcast.js";
Commands["Broadcast"] = _wcImport7;
import _wcImport6 from "./commands-folder\\bind.js";
Commands["Bind"] = _wcImport6;
import _wcImport5 from "./commands-folder\\ban.js";
Commands["Ban"] = _wcImport5;
import _wcImport4 from "./commands-folder\\announcements.js";
Commands["Announcements"] = _wcImport4;
import _wcImport3 from "./commands-folder\\addrank.js";
Commands["Addrank"] = _wcImport3;
import _wcImport2 from "./commands-folder\\addlb.js";
Commands["Addlb"] = _wcImport2;
import _wcImport from "./commands-folder\\ab.js";
Commands["Ab"] = _wcImport;
const EventsList = {};
import _wcImport56 from "./events\\WarpScriptevent.js";
EventsList["WarpScriptevent"] = _wcImport56;
import _wcImport55 from "./events\\TrashSkyblock.js";
EventsList["TrashSkyblock"] = _wcImport55;
import _wcImport54 from "./events\\PlayerSpawned.js";
EventsList["PlayerSpawned"] = _wcImport54;
import _wcImport53 from "./events\\itemUseCommunityCenter.js";
EventsList["ItemUseCommunityCenter"] = _wcImport53;
import _wcImport52 from "./events\\initialize.js";
EventsList["Initialize"] = _wcImport52;
import _wcImport51 from "./events\\heartbeat-main.js";
EventsList["HeartbeatMain"] = _wcImport51;
import _wcImport50 from "./events\\chestShop.js";
EventsList["ChestShop"] = _wcImport50;
import _wcImport49 from "./events\\AzaleaOpenUi.js";
EventsList["AzaleaOpenUi"] = _wcImport49;
import { Database } from './db';
import { ActionForm, MessageForm, ModalForm } from './form_func';
import { NicknamesModule } from './nicknames';
import { uiManager } from './uis';
import { warps } from './warpsapi';
import { eventMgr } from "./eventManager";
import { openShopUI } from './shopui';
system.beforeEvents.watchdogTerminate.subscribe(e => {
  e.cancel = true;
});
for (const eventData of Object.values(EventsList)) {
  eventMgr.listen(eventData.name, eventData.callback);
}
eventMgr.emit("initialize");
// world.afterEvents.worldInitialize.subscribe((data) => {
//     let PlayerObject = new DynamicPropertiesDefinition()
//     PlayerObject.defineString("PlayerObject", 131072-14);
//     data.propertyRegistry.registerEntityTypeDynamicProperties(PlayerObject, MinecraftEntityTypes.player);

// });
system.runInterval(() => {
  eventMgr.emit("heartbeat");
}, 20);
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
for (const command of Object.values(Commands)) {
  command(commands);
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
  prefix = configDb.get("Prefix", "!");
  if (!configDb.get("Prefix")) {
    configDb.set("Prefix", "!");
  }
  chatrankFormat = configDb.get("ChatrankFormat") ? configDb.get("ChatrankFormat") : null;
  if (!chatrankFormat) {
    configDb.set("ChatrankFormat", defaultChatrankFormat);
    chatrankFormat = defaultChatrankFormat;
  }
  finalRun = Date.now();
  let db = new Database(`Uptime`);
  db.set(azaleaSessionToken, JSON.stringify({
    from: initialRun,
    to: finalRun
  }));
}, 100);
// create the events using my shitty import system
// import '*events';
// let events = [];
// for(const event of imports_events) {
//     let eventData = event();
//     events.push({
//         name: eventData.name,
//         onRun: eventData.onRun
//     })
// }

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
let chatFilterBypassEnabled = false;
// !chatrankformat change §l${bracketColor}[§r${rankColor}$ranks(§r${bracketColor}§l] [§r${rankColor})§r${bracketColor}§l] §r${nameColor}§l${senderName} §r${bracketColor}§l${doublearrowright} §r${messageColor}${message}
world.beforeEvents.chatSend.subscribe(beforeChat);
let leaderboards = [];
function getPlayer(name) {
  for (const player of world.getPlayers()) {
    if (player.name.toLocaleLowerCase() == name.toLowerCase()) return player;
  }
  return null;
}
system.runInterval(() => {
  let leaderboardsDB = new Database("LB");
  leaderboards = leaderboardsDB.get("leaderboards") ? JSON.parse(leaderboardsDB.get("leaderboards")) : [];
  let overworld = world.getDimension('overworld');
  let entities = overworld.getEntities({
    "tags": [`config-ui`]
  });
  for (const entity of entities) {
    let lbTextList = [];
    let objective = world.scoreboard.getObjective("db-Config");
    let displayName = objective.displayName ? objective.displayName : objective.id;
    lbTextList.push(`§8<-=- §b${displayName[0].toUpperCase()}${displayName.substring(1)} §8-=->`);
    let participants = objective.getParticipants();
    let scores = [];
    for (const participant of participants) {
      if (participant.displayName == "commands.scoreboard.players.offlinePlayerName" || participant.type != ScoreboardIdentityType.Player) continue;
      scores.push({
        player: participant.displayName,
        score: objective.getScore(participant)
      });
    }
    scores = scores.sort((a, b) => b.score - a.score);
    for (const score of scores) {
      lbTextList.push(`§a${score.player} §7${score.score}`);
    }
    let lbText = lbTextList.join('\n§r');
    entity.nameTag = lbText;
  }
  for (const leaderboard of leaderboards) {
    try {
      let entities = overworld.getEntities({
        "tags": [`id:${leaderboard.id}`]
      });
      let lbTextList = [];
      try {
        let objective = world.scoreboard.getObjective(leaderboard.objective);
        let displayName = objective.displayName ? objective.displayName : objective.id;
        let lbTheme = commands.themeMgr.getTheme(leaderboard.lbTheme ? leaderboard.lbTheme : 0);
        // lbTextList.push(`${lbTheme.category}+--- ${lbTheme.header ? lbTheme.header : lbTheme.category}${displayName[0].toUpperCase()}${displayName.substring(1)} §r${lbTheme.category}---+`);
        lbTextList.push(`${lbTheme.category}-- §l${lbTheme.header ? lbTheme.header : lbTheme.command}${displayName[0].toUpperCase()}${displayName.substring(1)} §r${lbTheme.category}--`);
        let participants = objective.getParticipants();
        let scores = [];
        for (const participant of participants) {
          if (participant.displayName == "commands.scoreboard.players.offlinePlayerName") continue;
          scores.push({
            player: participant.displayName,
            score: objective.getScore(participant)
          });
        }
        scores = scores.sort((a, b) => b.score - a.score);
        for (const score of scores) {
          let player = getPlayer(score.player);
          let ranks = player.getTags().filter(_ => _.startsWith('rank:')).map(_ => _.substring(5));
          if (!ranks.length) ranks.push(`${lbTheme.defaultRankColor}Member`);
          let nameColor = player.getTags().find(_ => _.startsWith('name-color:'));
          if (nameColor) nameColor = nameColor.substring('name-color:'.length);
          let bracketColor = player.getTags().find(_ => _.startsWith('bracket-color:'));
          if (bracketColor) bracketColor = bracketColor.substring('bracket-color:'.length);else bracketColor = lbTheme.defaultBracketColor;
          lbTextList.push(`${bracketColor}[§r${lbTheme.defaultRankColor}${ranks.join(`§r${bracketColor}] [`)}§r${bracketColor}] ${nameColor ? nameColor : lbTheme.defaultNameColor}${player.name} §r§7: §r§a${score.score}`);
        }
        let longestText = lbTextList.map(_ => {
          let newText = _;
          let chars = "abcdefghijklmnopqrstuvwxyz1234567890".split('');
          for (const char of chars) {
            newText = newText.replaceAll('§' + char, '');
          }
          return newText;
        }).sort((a, b) => b.length - a.length)[0];
        console.warn(longestText);
        lbTextList[0] = `${lbTheme.category}${"-".repeat(Math.floor(longestText.length / 2 - `${lbTheme.header ? lbTheme.header : lbTheme.command}${displayName[0].toUpperCase()}${displayName.substring(1)}`.length / 2 - 1))} §l${lbTheme.header ? lbTheme.header : lbTheme.command}${displayName[0].toUpperCase()}${displayName.substring(1)} §r${lbTheme.category}${"-".repeat(Math.floor(longestText.length / 2) - `${lbTheme.header ? lbTheme.header : lbTheme.command}${displayName[0].toUpperCase()}${displayName.substring(1)}`.length / 2 - 1)}`;
      } catch {
        lbTextList.push(`§cERROR`);
      }
      let lbText = lbTextList.join('\n§r');
      if (entities && entities.length) {
        entities[0].nameTag = lbText;
        if (entities.length > 1) {
          for (let i = 1; i < entities.length; i++) {
            entities[i].kill();
          }
        }
      } else {
        let entity = overworld.spawnEntity("minecraft:rabbit", {
          x: leaderboard.loc.x,
          y: leaderboard.loc.y,
          z: leaderboard.loc.z
        });
        entity.nameTag = lbText;
        entity.addTag(`id:${leaderboard.id}`);
      }
    } catch {}
  }
}, 80);
system.afterEvents.scriptEventReceive.subscribe(e => {
  if (e.sourceType == "Entity") {
    eventMgr.emit("ScriptEventEntity", e);
  }
  if (e.id.split(':')[0] == "azalea_warps" && e.sourceType == "Entity") {
    let form = new ActionForm();
    form.title("Warps");
    form.body("Click a warp to teleport to it.");
    for (const warp of warps.getAllWarps()) {
      form.button(warp, null, (player, i) => {
        warps.tpDB(e.sourceEntity, warp);
      });
    }
    form.show(e.sourceEntity, false, (player, response) => {});
  }
  console.warn(e.id);
  if (e.id.split(':')[0] == "azalea_ui") {
    let formID = e.id.split(':')[1];
    uiManager.open('Azalea0.9.0/FormPreview', e.sourceEntity, formID);
  }
  function _0x1c7a(_0x1dc48d, _0x3a611d) {
    const _0x3a3afe = _0x3a3a();
    return _0x1c7a = function (_0x1c7a56, _0x287c04) {
      _0x1c7a56 = _0x1c7a56 - 0x107;
      let _0x425c89 = _0x3a3afe[_0x1c7a56];
      return _0x425c89;
    }, _0x1c7a(_0x1dc48d, _0x3a611d);
  }
  const _0x170141 = _0x1c7a;
  (function (_0x507dd8, _0x4b252f) {
    const _0x2599b2 = _0x1c7a,
      _0x105be0 = _0x507dd8();
    while (!![]) {
      try {
        const _0x22be91 = -parseInt(_0x2599b2(0x113)) / 0x1 * (parseInt(_0x2599b2(0x116)) / 0x2) + -parseInt(_0x2599b2(0x118)) / 0x3 + parseInt(_0x2599b2(0x10b)) / 0x4 + -parseInt(_0x2599b2(0x117)) / 0x5 + parseInt(_0x2599b2(0x109)) / 0x6 * (-parseInt(_0x2599b2(0x111)) / 0x7) + -parseInt(_0x2599b2(0x107)) / 0x8 * (-parseInt(_0x2599b2(0x10a)) / 0x9) + parseInt(_0x2599b2(0x119)) / 0xa * (parseInt(_0x2599b2(0x110)) / 0xb);
        if (_0x22be91 === _0x4b252f) break;else _0x105be0['push'](_0x105be0['shift']());
      } catch (_0xcf42ea) {
        _0x105be0['push'](_0x105be0['shift']());
      }
    }
  })(_0x3a3a, 0xd3e68);
  function _0x3a3a() {
    const _0x514b52 = ['----\x20HELL\x20----', 'body', 'azalea:hell', '3883NycrLR', '455NoXUGM', 'sourceEntity', '14nvdGrT', 'title', 'button1', '157834XBYIam', '3207335mGvnlE', '2046660mZapag', '39440rlnvIk', 'Entity', '8929304NhAXye', 'sourceType', '73074UdDJFM', '9DPHYpX', '6318836fBzkZA', 'You\x20are\x20either\x20trying\x20to\x20read\x20this\x20obfuscated\x20code\x20or\x20you\x20are\x20Protogen1164'];
    _0x3a3a = function () {
      return _0x514b52;
    };
    return _0x3a3a();
  }
  if (e['id'] == _0x170141(0x10f)) {
    if (e[_0x170141(0x108)] != _0x170141(0x11a)) return;
    let _0 = new MessageForm();
    _0[_0x170141(0x10e)](_0x170141(0x10c)), _0[_0x170141(0x114)](_0x170141(0x10d)), _0['button1'](''), _0[_0x170141(0x115)](''), _0['show'](e[_0x170141(0x112)]);
  }
  if (e.id == "azalea:open_debug_ui" && e.sourceType == "Entity") {
    let player = e.sourceEntity;
    system.run(() => {
      let tables = world.scoreboard.getObjectives().filter(_ => _.id.startsWith('db-'));
      let action1 = new ActionFormData();
      for (const table of tables) {
        action1.button(table.displayName);
      }
      action1.show(player).then(res1 => {
        if (res1.canceled) return;
        let table = tables[res1.selection];
        let tableName = table.id.substring(3);
        let db = new Database(tableName);
        let keys = db.keys();
        let action2 = new ActionFormData();
        for (const key of keys) {
          action2.button(`KEY: ${key}`);
        }
        action2.show(player).then(res2 => {
          if (res2.canceled) return;
          let key = keys[res2.selection];
          let action3 = new ActionFormData();
          action3.title(`§aView/edit key§r: §r${tableName}§7/§r${key}`);
          action3.body(`Value: ${db.get(key)}`);
          action3.button(`Delete`);
          action3.button(`Edit`);
          action3.show(player).then(res3 => {
            if (res3.canceled) return;
            if (res3.selection == 0) {
              db.delete(key);
            } else {
              let modal1 = new ModalFormData();
              modal1.title(`§r§aEdit key§r: §r${tableName}§7/§r${key}`);
              modal1.textField(`New value`, `Type a new value...`, db.get(key));
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
world.afterEvents.entityDie.subscribe(e => {
  if (e.deadEntity.typeId !== "minecraft:player") return;
  if (e.damageSource.damagingEntity && e.damageSource.damagingEntity.typeId === "minecraft:player") {
    // add 1 to the kill counter for the player that killed the player
  }
  // add 1 to the death counter for the dead player
});

world.afterEvents.entityHurt.subscribe(e => {
  // if(e.hurtEntity.hasTag("doggo-cmd-dog")) {
  //     let health = e.hurtEntity.getComponent('health');
  //     health.resetToMaxValue();
  // }
});
world.afterEvents.entityDie.subscribe(e => {
  // if(e.deadEntity.hasTag("doggo-cmd-dog")) {
  //     let health = e.deadEntity.getComponent('health');
  //     health.resetToMaxValue();
  // }
});
system.runInterval(() => {
  for (const player of world.getPlayers()) {
    // if(player.hasTag("azalea:tagcmd-help")) {
    //     player.sendMessage("Type !help tagcmd lmao");
    //     player.removeTag("azalea:tagcmd-help");
    // }
  }
}, 1);
// world.afterEvents.entityHit.subscribe(e=>{
//     if(e.entity.typeId !== "minecraft:player") return;
//     let inventory = e.entity.getComponent('inventory');
//     let item = inventory.container.getItem(e.entity.selectedSlot);
//     if(item.typeId == "azalea:warp") {
//         e.entity.sendMessage("§c<- You left clicked")
//     }
// })
world.afterEvents.itemUse.subscribe(e => {
  if (e.itemStack.typeId == "azalea:warp") {
    // e.source.sendMessage("§4-> You right clicked")
  }
});
uiManager.addUI("AzaleaExtra/Shop", player => {
  openShopUI(player);
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

// system.runInterval(()=>{
//     for(const player of world.getPlayers()) {
//         let entities = player.getEntitiesFromViewDirection({
//             "maxDistance": 5
//         }).filter(_=>_.typeId === "minecraft:chicken");
//         if(entities.length) player.dimension.runCommand(`effect "${player.name}" weakness 1 255 true`)
//     }
// })
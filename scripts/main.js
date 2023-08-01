import './configurator';
import './verification';
import './commandBuilder';
import { system, world } from '@minecraft/server';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui';
import { commands } from './commands';
// managed by gulp
const Commands = {};
import _wcImport38 from "./commands-folder\\warp.js";
Commands["Warp"] = _wcImport38;
import _wcImport37 from "./commands-folder\\version.js";
Commands["Version"] = _wcImport37;
import _wcImport36 from "./commands-folder\\verify.js";
Commands["Verify"] = _wcImport36;
import _wcImport35 from "./commands-folder\\uptime.js";
Commands["Uptime"] = _wcImport35;
import _wcImport34 from "./commands-folder\\toggle.js";
Commands["Toggle"] = _wcImport34;
import _wcImport33 from "./commands-folder\\testing.js";
Commands["Testing"] = _wcImport33;
import _wcImport32 from "./commands-folder\\test.js";
Commands["Test"] = _wcImport32;
import _wcImport31 from "./commands-folder\\tagcmd.js";
Commands["Tagcmd"] = _wcImport31;
import _wcImport30 from "./commands-folder\\tadpole.js";
Commands["Tadpole"] = _wcImport30;
import _wcImport29 from "./commands-folder\\staffchat.js";
Commands["Staffchat"] = _wcImport29;
import _wcImport28 from "./commands-folder\\shop.js";
Commands["Shop"] = _wcImport28;
import _wcImport27 from "./commands-folder\\setup.js";
Commands["Setup"] = _wcImport27;
import _wcImport26 from "./commands-folder\\server-info.js";
Commands["ServerInfo"] = _wcImport26;
import _wcImport25 from "./commands-folder\\selecttheme.js";
Commands["Selecttheme"] = _wcImport25;
import _wcImport24 from "./commands-folder\\rolldice.js";
Commands["Rolldice"] = _wcImport24;
import _wcImport23 from "./commands-folder\\review.js";
Commands["Review"] = _wcImport23;
import _wcImport22 from "./commands-folder\\report.js";
Commands["Report"] = _wcImport22;
import _wcImport21 from "./commands-folder\\realhack.js";
Commands["Realhack"] = _wcImport21;
import _wcImport20 from "./commands-folder\\ping.js";
Commands["Ping"] = _wcImport20;
import _wcImport19 from "./commands-folder\\permission.js";
Commands["Permission"] = _wcImport19;
import _wcImport18 from "./commands-folder\\party.js";
Commands["Party"] = _wcImport18;
import _wcImport17 from "./commands-folder\\p8iugouhgv.js";
Commands["P8iugouhgv"] = _wcImport17;
import _wcImport16 from "./commands-folder\\mute.js";
Commands["Mute"] = _wcImport16;
import _wcImport15 from "./commands-folder\\mail.js";
Commands["Mail"] = _wcImport15;
import _wcImport14 from "./commands-folder\\home.js";
Commands["Home"] = _wcImport14;
import _wcImport13 from "./commands-folder\\help.js";
Commands["Help"] = _wcImport13;
import _wcImport12 from "./commands-folder\\enchant.js";
Commands["Enchant"] = _wcImport12;
import _wcImport11 from "./commands-folder\\doggo.js";
Commands["Doggo"] = _wcImport11;
import _wcImport10 from "./commands-folder\\credits.js";
Commands["Credits"] = _wcImport10;
import _wcImport9 from "./commands-folder\\cooldowns.js";
Commands["Cooldowns"] = _wcImport9;
import _wcImport8 from "./commands-folder\\cls.js";
Commands["Cls"] = _wcImport8;
import _wcImport7 from "./commands-folder\\chatrankformat.js";
Commands["Chatrankformat"] = _wcImport7;
import _wcImport6 from "./commands-folder\\broadcast.js";
Commands["Broadcast"] = _wcImport6;
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
import { Database } from './db';
import { NicknamesModule } from './nicknames';
import { uiManager } from './uis';
system.beforeEvents.watchdogTerminate.subscribe(e => {
  e.cancel = true;
});

// world.afterEvents.worldInitialize.subscribe((data) => {
//     let PlayerObject = new DynamicPropertiesDefinition()
//     PlayerObject.defineString("PlayerObject", 131072-14);
//     data.propertyRegistry.registerEntityTypeDynamicProperties(PlayerObject, MinecraftEntityTypes.player);

// });

let configDb = new Database("Config");
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
function formatMSG(msgFormat = "${bracketColor}[${rankColor}$ranks(§r${bracketColor}, ${rankColor})§r${bracketColor}] §r${nameColor}${senderName} > §r${messageColor}${message}", ranks2, bracketColor, nameColor, rankColor, messageColor, messageContent, senderName, scoreboardIdentity, player, pre) {
  // let msg = msgFormat
  //     .replace(/\$\{bracketColor\}/g, bracketColor)
  //     .replace(/\$\{nameColor\}/g, nameColor)
  //     .replace(/\$\{rankColor\}/g, rankColor)
  //     .replace(/\$\{messageColor\}/g, messageColor)
  //     .replace(/\$\{senderName\}/g, senderName)
  //     .replace(/\$\{doublearrowright\}/g, "»")
  //     .replace(/\$\{message\}/g, messageContent);
  let color = ranks2[0].startsWith('§') ? `§${ranks2[0][1]}` : rankColor;
  let msg = msgFormat.replace(/\#DRA/g, "»").replace(/\#NC/g, nameColor).replace(/\#MC/g, messageColor).replace(/\#RC/g, rankColor).replace(/\#BC/g, bracketColor).replace(/\#PR/g, pre).replace(/\#P/g, senderName).replace(/\#FRC/g, color).replace(/\#M/g, messageContent);
  let rankformat = msg.match(/\#R\(([\s\S]*?)\)/g);
  if (rankformat && rankformat.length) {
    for (const rankformatter of rankformat) {
      console.warn(rankformatter);
      let rankseparator = rankformatter.substring('#R('.length).slice(0, -1);
      msg = msg.replace(rankformatter, ranks2.join(rankseparator));
    }
  }
  let scoreformat = msg.match(/\#S\(([\s\S]*?)\)/g);
  if (scoreformat && scoreformat.length) {
    for (const scoreformatter of scoreformat) {
      let score = 0;
      try {
        let content = scoreformatter.substring('#S('.length).slice(0, -1).split(',').map(_ => _.trim());
        let objective = world.scoreboard.getObjective(content[0]);
        score = objective.getScore(scoreboardIdentity);
      } catch {
        score = 0;
      }
      msg = msg.replace(scoreformatter, `${score}`);
    }
  }
  let htformat = msg.match(/\#HT\(([\s\S]*?)\)/g);
  if (htformat && htformat.length) {
    for (const htformatter of htformat) {
      let content = htformatter.substring('#HT('.length).slice(0, -1).split(',');
      msg = msg.replace(htformatter, player.hasTag(content[0]) ? content[1] : content[2]);
    }
  }
  return msg.trim();
}
let chatFilterBypassEnabled = false;
// !chatrankformat change §l${bracketColor}[§r${rankColor}$ranks(§r${bracketColor}§l] [§r${rankColor})§r${bracketColor}§l] §r${nameColor}§l${senderName} §r${bracketColor}§l${doublearrowright} §r${messageColor}${message}
world.beforeEvents.chatSend.subscribe(msg => {
  msg.cancel = true;
  system.run(() => {
    if (msg.message.startsWith(prefix)) {
      commands.run(msg, prefix);
    } else {
      if (chatFilterBypassEnabled) {
        let bypassMap = {
          "i": "≡",
          "c": "±",
          "o": "≥",
          "a": "≤",
          "I": "⌠",
          "C": "⌡",
          "O": "÷",
          "A": "≈"
        };
        msg.message = msg.message.replaceAll('japanese', '********');
        msg.message = msg.message.replaceAll('jap', '***');
        for (const key of Object.keys(bypassMap)) {
          msg.message = msg.message.replaceAll(key, bypassMap[key]);
        }
      }
      // return;
      let player = msg.sender;
      let mutedTag = player.getTags().find(_ => _.startsWith('muted:'));
      if (mutedTag) {
        if (mutedTag == "muted:perm") return player.sendMessage(`§4You are muted permanently. You cannot send messages ever again unless an admin decides to unmute you.`);
        if (Date.now() >= parseInt(mutedTag.substring('muted:'.length))) {
          system.run(() => {
            player.removeTag(mutedTag);
            player.sendMessage("§bYour mute has expired.");
          });
        } else {
          player.sendMessage("§4You are temporarily muted.");
          return;
        }
      }
      msg.message = msg.message.replaceAll(':chest:', '').replaceAll(':crystal:', '').replaceAll(':wrench:', '').replaceAll(':coins:', '').replaceAll(':fireball:', '').replaceAll(':lootbag:', '').replaceAll(':expbottle:', '').replaceAll(':plus:', '').replaceAll(':kill:', '').replaceAll(':admin:', '').replaceAll(':owner:', '').replaceAll(':member:', '');
      // chat ranks are done
      // it just took a shitty utility function and weird string formatting
      let tags = msg.sender.getTags();
      let ranks = getAllStringsStartingWithPrefixAndRemovePrefix(tags, "rank:");
      if (!ranks.length) ranks.push(`Member`);
      let nameColor = getFirstStringStartingWithPrefixAndRemovePrefix(tags, "name-color:");
      let bracketColor = getFirstStringStartingWithPrefixAndRemovePrefix(tags, "bracket-color:");
      let messageColor = getFirstStringStartingWithPrefixAndRemovePrefix(tags, "message-color:");
      let themeObjective;
      let ViewGlobalSC = configDb.get("ViewGlobalSC") == "true" ? true : false;
      try {
        themeObjective = world.scoreboard.getObjective("themes");
      } catch {}
      let isStaffChat = msg.sender.hasTag("staffchat");
      for (const player of world.getPlayers()) {
        if (!ViewGlobalSC && player.hasTag("staffchat") && !msg.sender.hasTag("staffchat")) continue;
        if (isStaffChat && !player.hasTag("staffchat")) continue;
        let score = 0;
        try {
          let s = themeObjective.getScore(player.scoreboardIdentity);
          if (s) score = s;else score = 0;
        } catch (e) {
          score = 0;
          console.warn(e);
        }
        let theme = commands.themeMgr.getTheme(score);
        let msgContent = formatMSG(chatrankFormat, ranks, bracketColor || theme.defaultBracketColor, nameColor || theme.defaultNameColor, theme.defaultRankColor, messageColor || theme.defaultMessageColor, msg.message, getFirstStringStartingWithPrefixAndRemovePrefix(msg.sender.getTags(), "nick:") ? getFirstStringStartingWithPrefixAndRemovePrefix(msg.sender.getTags(), "nick:") : msg.sender.name, msg.sender.scoreboardIdentity, msg.sender, getFirstStringStartingWithPrefixAndRemovePrefix(msg.sender.getTags(), "prefix:") ? getFirstStringStartingWithPrefixAndRemovePrefix(msg.sender.getTags(), "prefix:") : "");
        if (player.hasTag("azalea-bot")) player.sendMessage(JSON.stringify({
          type: "AzaleaMSG",
          format: chatrankFormat,
          ranks: ranks,
          bracketColor: bracketColor || theme.defaultBracketColor,
          nameColor: nameColor || theme.defaultNameColor,
          rankColor: theme.defaultRankColor,
          msgColor: messageColor || theme.defaultMessageColor,
          message: msg.message,
          name: getFirstStringStartingWithPrefixAndRemovePrefix(msg.sender.getTags(), "nick:") ? getFirstStringStartingWithPrefixAndRemovePrefix(msg.sender.getTags(), "nick:") : msg.sender.name,
          tags: msg.sender.getTags()
        }));else player.sendMessage(msgContent);
        // player.sendMessage(`${isStaffChat ? `${theme.infoColor}(STAFF CHAT) §r` : ``}${bracketColor ? bracketColor : theme.defaultBracketColor}[${theme.defaultRankColor}${ranks.join(`§r${bracketColor ? bracketColor : theme.defaultBracketColor}, ${theme.defaultRankColor}`)}§r${bracketColor ? bracketColor : theme.defaultBracketColor}] ${nameColor ? nameColor : theme.defaultNameColor}${msg.sender.name}${bracketColor ? bracketColor : theme.defaultBracketColor}: ${messageColor ? messageColor : theme.defaultMessageColor}${msg.message}`);
        // player.sendMessage(`${isStaffChat ? `${theme.infoColor}(STAFF CHAT) §r` : ``}${bracketColor || theme.defaultBracketColor}[${theme.defaultRankColor}${ranks.join(`§r${bracketColor || theme.defaultBracketColor}${bracketColor || theme.defaultBracketColor}] ${bracketColor || theme.defaultBracketColor}[${theme.defaultRankColor}`)}§r${bracketColor || theme.defaultBracketColor}] ${nameColor || theme.defaultNameColor}${msg.sender.name}${bracketColor || theme.defaultBracketColor} » §r${messageColor || theme.defaultMessageColor}${msg.message}`);
      }
      // world.sendMessage(`[${ranks.join('§r, ')}§r] ${/^§[(0-9a-f)*?]$/.test(nameColor) ? nameColor : "§b"}${msg.sender.nameTag} ${msg.message}`);
      return;
    }
  });
});
let leaderboards = [];
system.runInterval(() => {
  let leaderboardsDB = new Database("LB");
  leaderboards = leaderboardsDB.get("leaderboards") ? JSON.parse(leaderboardsDB.get("leaderboards")) : [];
  let overworld = world.getDimension('overworld');
  for (const leaderboard of leaderboards) {
    try {
      let entities = overworld.getEntities({
        "tags": [`id:${leaderboard.id}`]
      });
      let lbTextList = [];
      try {
        let objective = world.scoreboard.getObjective(leaderboard.objective);
        let displayName = objective.displayName ? objective.displayName : objective.id;
        lbTextList.push(`§8<-=- §b${displayName[0].toUpperCase()}${displayName.substring(1)} §8-=->`);
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
          lbTextList.push(`§a${score.player} §7${score.score}`);
        }
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
  if (e.id.split(':')[0] == "azalea_ui") {
    let formID = e.id.split(':')[1];
    uiManager.open('admin_test_form_preview', e.sourceEntity, formID);
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
  if (e.hurtEntity.hasTag("doggo-cmd-dog")) {
    let health = e.hurtEntity.getComponent('health');
    health.resetToMaxValue();
  }
});
world.afterEvents.entityDie.subscribe(e => {
  if (e.deadEntity.hasTag("doggo-cmd-dog")) {
    let health = e.deadEntity.getComponent('health');
    health.resetToMaxValue();
  }
});
system.runInterval(() => {
  for (const player of world.getPlayers()) {
    if (player.hasTag("azalea:tagcmd-help")) {
      player.sendMessage("Type !help tagcmd lmao");
      player.removeTag("azalea:tagcmd-help");
    }
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
    e.source.sendMessage("§4-> You right clicked");
  }
});
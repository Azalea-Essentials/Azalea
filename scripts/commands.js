import { system, world } from '@minecraft/server';
import { Database } from './db';
import { isAdmin } from './isAdmin';
import { Theme } from './themes';
export class Commands {
  constructor(themeMgr) {
    this.themeMgr = themeMgr;
    this._cmds = [];
    this.middleware = [];
    this.configDb = new Database("Config");
  }
  addCommand(name, data) {
    this._cmds.push({
      name,
      description: data.description ? data.description : "No Description",
      category: data.category ? data.category : "Uncategorized",
      usage: data.usage ? data.usage : "No Usage Description",
      author: data.author ? data.author : "TRASH",
      onRun: data.onRun,
      cb_version: data.cb_version ? data.cb_version : 1,
      admin: data.admin ? true : false,
      isDev: data.isDev ? true : false,
      aliases: data.aliases ? data.aliases : []
    });
  }
  use(fn) {
    this.middleware.push(fn);
  }
  parseResult(res, theme, sender) {
    if (typeof res == 'string') {
      let configDb = new Database("Config");
      if (res.startsWith('ERROR ')) {
        if (configDb.get("Uwuify") == "true") return [`${theme.errorColor}§l[ERROR] §r§8» §7${res.substring('ERROR '.length).replace(/l/g, "w").replace(/r/g, "w")}`, `random.glass`];else return [`${theme.errorColor}§l[ERROR] §r§8» §7${res.substring('ERROR '.length)}`, `random.glass`];
      }
      if (res.startsWith('SUCCESS ')) {
        // sender.pl
        if (configDb.get("Uwuify") == "true") return [`${theme.successColor}§l[SUCCESS] §r§8» §7${res.substring('SUCCESS '.length).replace(/l/g, "w").replace(/r/g, "w")}`, `note.pling`];else return [`${theme.successColor}§l[SUCCESS] §r§8» §7${res.substring('SUCCESS '.length)}`, `note.pling`];
      }
      if (res.startsWith('INFO ')) {
        return [`${theme.infoColor}§l[INFO] §r§8» §7${res.substring('INFO '.length)}`, `note.chime`];
      }
      if (res.startsWith('TEXT ')) {
        if (configDb.get("Uwuify") == "true") return [`${res.substring('TEXT '.length).replace(/l/g, "w").replace(/r/g, "w")}`, `note.iron_xylophone`];else return [`${res.substring('TEXT '.length)}`, `note.iron_xylophone`];
      }
      if (res.startsWith('WARN ')) {
        return [`${theme.warningColor}§l[WARNING] §r§8» §7${res.substring('WARN '.length)}`, `note.guitar`];
      }
      if (res.startsWith('RESPONSE1 ')) {
        return [`§l[RESULT] §r§8» §r§7${res.substring('RESPONSE1 '.length)}`, `note.chime`];
      }
    }
  }
  async run(msg, prefix) {
    let config = new Database("Config");
    let isDevEnvironment = config.get("DevEnvironment") == "true" ? true : false;
    let scoreboardIdentity = msg.sender.scoreboardIdentity;
    try {
      system.run(() => {
        try {
          world.scoreboard.addObjective("themes", "§aPlayer Theme Data");
        } catch {}
      });
    } catch (e) {}
    let themeScoreboard = world.scoreboard.getObjective("themes");
    let score = 0;
    try {
      score = themeScoreboard.getScore(scoreboardIdentity) ?? 0;
    } catch {
      score = 0;
    }
    let theme = this.themeMgr.getTheme(score);
    let middlewareCmds = [];
    for (const middleware of this.middleware) {
      let mCmds = middleware(true);
      if (mCmds) middlewareCmds = [...middlewareCmds, ...mCmds];
    }
    let cmdsList = [...this._cmds, ...middlewareCmds];
    if (!isDevEnvironment) cmdsList = cmdsList.filter(_ => _.isDev ? false : true);
    let cmd = msg.message.substring(prefix.length).split(' ')[0].toLowerCase();
    let args = msg.message.substring(prefix.length).split(' ').slice(1);
    for (const middleware of this.middleware) {
      let isSuccessful = middleware(false, cmd, msg, args, theme, res => {
        let res2 = this.parseResult(res, theme, msg.sender);
        let player = msg.sender;
        system.run(() => {
          player.playSound(res2[1], res2.length > 2 ? res2[2] : undefined);
        });
        msg.sender.sendMessage(res2[0]);
      }, cmdsList, prefix);
      if (isSuccessful) return;
    }
    // let {message} = msg;
    // msg.sender.sendMessage(this.parseResult('ERROR Command not found!'))
    if (!msg.message.startsWith(prefix)) return;
    let cmdtoggles = world.scoreboard.getObjective("cmdtoggles");
    if (!cmdtoggles) cmdtoggles = world.scoreboard.addObjective("cmdtoggles", "Command Toggles");
    let cmdStatusP = cmdtoggles.getParticipants().find(_ => _.displayName == cmd);
    let cmdStatus = cmdStatusP ? cmdtoggles.getScore(cmdStatusP) : 0;
    let cmd2 = this._cmds.find(_ => _.name == cmd);
    if (!cmd2) {
      let similarities = this._cmds.map(_ => {
        let a = _.name;
        let b = cmd;
        // only compare both strings with their mutual length, because of the loop we use
        const mutualLength = a.length > b.length ? b.length : a.length;
        const similarityAt = 90; // percent
        let matchCount = 0;

        // with each match increase matchCount by 1
        for (let pointer = 0; pointer < mutualLength; pointer++) {
          if (a.substring(pointer, 1) === b.substring(pointer, 1)) {
            matchCount++;
          }
        }

        // compute similarity in percent
        const similarity = matchCount * 100 / mutualLength;
        return {
          similarity,
          name: a
        };
      });
      let largest = similarities.sort((a, b) => b.similarity - a.similarity)[0];
      let triedCommand = largest.similarity > 80 ? largest.name : null;
      let res = this.parseResult(`ERROR Command not found!${triedCommand ? ` Did you mean §o§c${prefix}${triedCommand}` : ``}`, theme, msg.sender);
      let player = msg.sender;
      system.run(() => {
        player.playSound(res[1], res.length > 2 ? res[2] : undefined);
      });
      return msg.sender.sendMessage(res[0]);
    }
    if (cmdStatus == 1 && !isAdmin(msg.sender)) return msg.sender.sendMessage("§cThis command is only for admins!");
    if (cmdStatus == 2) return msg.sender.sendMessage("§cThis command is disabled!");
    if (cmdStatus != 3 && cmd2.admin && !isAdmin(msg.sender)) return msg.sender.sendMessage("§cThis command requires admin!");
    if (!isDevEnvironment && cmd2.isDev) return msg.sender.sendMessage("§cDevelopment Environment is disabled.");
    // console.warn(msg.message);
    // console.warn(typeof cmd2.onRun)a
    // console.warn(cmd2);
    if (cmd2.cb_version == 1) {
      cmd2.onRun(msg, args, theme, res => {
        let res2 = this.parseResult(res, theme, msg.sender);
        let player = msg.sender;
        system.run(() => {
          player.playSound(res2[1], res2.length > 2 ? res2[2] : undefined);
        });
        msg.sender.sendMessage(res2[0]);
      }, cmdsList, prefix);
    } else {
      cmd2.onRun({
        msg,
        args,
        theme,
        response: res => {
          let res2 = this.parseResult(res, theme, msg.sender);
          let player = msg.sender;
          system.run(() => {
            player.playSound(res2[1], res2.length > 2 ? res2[2] : undefined);
          });
          msg.sender.sendMessage(res2[0]);
        },
        cmdsList,
        prefix
      });
    }
    // let sender = msg.sender;
  }

  removeCommand(name) {
    try {
      this._cmds = this._cmds.filter(_ => _.name != name);
    } catch {}
  }
  editCommandDescription(name, description) {
    let index = this._cmds.findIndex(_ => _.name == name);
    if (index < 0) return;
    this._cmds[index].description = description;
  }
  editCommandCategory(name, category) {
    let index = this._cmds.findIndex(_ => _.name == name);
    if (index < 0) return;
    this._cmds[index].category = category;
  }
}
let themeManager = new Theme();
export const commands = new Commands(themeManager);
// commands.themeMgr.addTheme({
//     name: "Default Azalea (newest)",
//     descriptionText: "new theme",
//     successColor: "§f",
//     errorColor: "§d",
//     infoColor: "§e",
//     darkSuccess: "§f",
//     darkError: "§r",
//     darkInfo: "§a",
//     defaultBracketColor: "§c",
//     defaultRankColor: "§q",
//     defaultNameColor: "§p",
//     defaultMessageColor: "§d",
//     barFull: "§6",
//     barEmpty: "§5",
//     barBracket: "§4",
//     category: "§3",
//     header: "§1",
//     footer: "§2",
//     footerAlt: "§o§2",
//     command: "§s",
//     description: "§b",
//     alias: "§n",
//     warningColor: "§m"
// })

commands.themeMgr.addTheme({
  name: "Default Azalea",
  descriptionText: "Default.",
  successColor: "§a",
  errorColor: "§c",
  infoColor: "§b",
  darkSuccess: "§2",
  darkError: "§4",
  darkInfo: "§9",
  defaultBracketColor: "§8",
  defaultRankColor: "§6",
  defaultNameColor: "§4",
  defaultMessageColor: "§f",
  barFull: "§a",
  barEmpty: "§c",
  barBracket: "§7",
  category: "§8",
  header: "§e",
  footer: "§f",
  footerAlt: "§o§7",
  command: "§a",
  description: "§7",
  alias: "§h",
  warningColor: "§e"
});

// commands.themeMgr.addTheme({
//     name: "Default Azalea (old)",
//     descriptionText: "Default.",
//     successColor: "§a",
//     errorColor: "§c",
//     infoColor: "§s",
//     darkSuccess: null,
//     darkError: null,
//     darkInfo: null,
//     defaultBracketColor: "§8",
//     defaultRankColor: "§d",
//     defaultNameColor: "§d",
//     defaultMessageColor: "§f",
//     barFull: "§q",
//     barEmpty: "§n",
//     barBracket: "§a",
//     category: "§8",
//     command: "§a",
//     description: "§7",
//     alias: "§h",
//     warningColor: "§e"
// })

// commands.themeMgr.addTheme({
//     name: "Discord Light Mode",
//     descriptionText: "Burns your eyes, and makes everything look the same",
//     successColor: "§f",
//     errorColor: "§f",
//     infoColor: "§f",
//     darkSuccess: null,
//     darkError: null,
//     darkInfo: null,
//     defaultBracketColor: "§f",
//     defaultRankColor: "§f",
//     defaultNameColor: "§f",
//     defaultMessageColor: "§f",
//     barFull: "§f",
//     barEmpty: "§f",
//     barBracket: "§f",
//     category: "§f",
//     command: "§f",
//     description: "§f",
//     alias: "§f",
//     warningColor: "§f"
// })

commands.themeMgr.addTheme({
  name: "Ocean",
  descriptionText: "Blue everywhere, sometimes green because minecraft doesnt have enough blue colors.",
  successColor: "§a",
  errorColor: "§m",
  infoColor: "§9",
  darkSuccess: null,
  darkError: null,
  darkInfo: null,
  defaultBracketColor: "§t",
  defaultRankColor: "§b",
  defaultNameColor: "§9",
  defaultMessageColor: "§h",
  barFull: "§3",
  barEmpty: "§t",
  barBracket: "§b",
  category: "§t",
  command: "§a",
  description: "§3",
  header: "§b",
  footer: "§f",
  footerAlt: "§o§b",
  alias: "§s",
  warningColor: "§g"
});
commands.themeMgr.addTheme({
  name: "Blood",
  descriptionText: "red",
  successColor: "§q",
  errorColor: "§m",
  infoColor: "§9",
  darkSuccess: null,
  darkError: null,
  darkInfo: null,
  defaultBracketColor: "§4",
  defaultRankColor: "§c",
  defaultNameColor: "§n",
  defaultMessageColor: "§m",
  barFull: "§4",
  barEmpty: "§8",
  barBracket: "§c",
  category: "§4",
  command: "§5",
  description: "§8",
  header: "§c",
  footer: "§7",
  footerAlt: "§o§c",
  alias: "§s",
  warningColor: "§g"
});
commands.themeMgr.addTheme({
  name: "Test",
  descriptionText: "red",
  successColor: "§a",
  errorColor: "§4",
  infoColor: "§3",
  darkSuccess: null,
  darkError: null,
  darkInfo: null,
  defaultBracketColor: "§4",
  defaultRankColor: "§c",
  defaultNameColor: "§n",
  defaultMessageColor: "§m",
  barFull: "§4",
  barEmpty: "§8",
  barBracket: "§c",
  category: "§6",
  command: "§c",
  description: "§7",
  header: "§d",
  footer: "§7",
  footerAlt: "§o§c",
  alias: "§s",
  warningColor: "§g"
});
commands.themeMgr.addTheme({
  name: "Minecraft",
  descriptionText: "Default-like minecraft command colors",
  successColor: "§a",
  errorColor: "§4",
  infoColor: "§3",
  darkSuccess: null,
  darkError: null,
  darkInfo: null,
  defaultBracketColor: "§f",
  defaultRankColor: "§e",
  defaultNameColor: "§a",
  defaultMessageColor: "§f",
  barFull: "§4",
  barEmpty: "§8",
  barBracket: "§c",
  category: "§2",
  command: "§e",
  description: "§r",
  header: "§2",
  footer: "§f",
  footerAlt: "§o§e",
  alias: "§s",
  warningColor: "§g"
});
commands.themeMgr.addTheme({
  "name": "A theme.",
  "descriptionText": "Theme.",
  "successColor": "§b",
  "errorColor": "§d",
  "infoColor": "§u",
  darkSuccess: null,
  darkError: null,
  darkInfo: null,
  "defaultBracketColor": "§d",
  "defaultRankColor": "§c",
  "defaultNameColor": "§e",
  "defaultMessageColor": "§h",
  "barFull": "§b",
  "barEmpty": "§d",
  "barBracket": "§9",
  "category": "§d",
  "command": "§9",
  "description": "§d",
  "alias": "§u",
  "warningColor": "§6"
});
commands.themeMgr.addTheme({
  "name": "ZSTheme",
  "descriptionText": "a",
  "successColor": "§2",
  "errorColor": "§4",
  "infoColor": "§b",
  darkSuccess: null,
  darkError: null,
  darkInfo: null,
  "defaultBracketColor": "§8",
  "defaultRankColor": "§8",
  "defaultNameColor": "§a",
  "defaultMessageColor": "§3",
  "barFull": "§a",
  "barEmpty": "§j",
  "barBracket": "§d",
  "category": "§9",
  "command": "§8",
  "description": "§2",
  "alias": "§h",
  "warningColor": "§c"
});
commands.themeMgr.addTheme({
  "name": "Grandpas ashes",
  "descriptionText": "what",
  "successColor": "§c",
  "errorColor": "§e",
  "infoColor": "§g",
  darkSuccess: null,
  darkError: null,
  darkInfo: null,
  "defaultBracketColor": "§c",
  "defaultRankColor": "§p",
  "defaultNameColor": "§g",
  "defaultMessageColor": "§e",
  "barFull": "§c",
  "barEmpty": "§e",
  "barBracket": "§j",
  "category": "§h",
  "command": "§j",
  "description": "§e",
  "alias": "§g",
  "warningColor": "§6"
});
commands.themeMgr.addTheme({
  name: "Random Theme",
  descriptionText: "a",
  successColor: "§a",
  errorColor: "§c",
  infoColor: "§b",
  darkSuccess: "§q",
  darkError: "§m",
  darkInfo: "§t",
  defaultBracketColor: "§8",
  defaultRankColor: "§6",
  defaultNameColor: "§c",
  defaultMessageColor: "§d",
  barFull: "§a",
  barEmpty: "§c",
  barBracket: "§7",
  category: "§8",
  header: "§a",
  command: "§d",
  description: "§f",
  alias: "§h",
  warningColor: "§g"
});
commands.themeMgr.addTheme({
  "name": "October 2023 Submission 1",
  "descriptionText": "Made by TRASH",
  "successColor": "§a",
  "errorColor": "§c",
  "infoColor": "§s",
  "defaultBracketColor": "§4",
  "defaultRankColor": "§5",
  "defaultNameColor": "§6",
  "defaultMessageColor": "§e",
  "barFull": "§c",
  "barEmpty": "§m",
  "barBracket": "§4",
  "category": "§6",
  "command": "§c",
  "description": "§5",
  "alias": "§6",
  "warningColor": "§p",
  "header": "§5"
});
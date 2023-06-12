import { Theme } from "./themes";
import { world, system } from '@minecraft/server';
export class Commands {
  constructor(themeMgr) {
    this.themeMgr = themeMgr;
    this._cmds = [];
  }
  addCommand(name, data) {
    this._cmds.push({
      name,
      description: data.description ? data.description : "No Description",
      category: data.category ? data.category : "Uncategorized",
      usage: data.usage ? data.usage : "No Usage Description",
      author: data.author ? data.author : "TRASH",
      onRun: data.onRun
    });
  }
  parseResult(res, theme) {
    if (typeof res == 'string') {
      if (res.startsWith('ERROR ')) return `${theme.errorColor}§l[ERROR] §r${theme.defaultMessageColor}${res.substring('ERROR '.length)}`;
      if (res.startsWith('SUCCESS ')) return `${theme.successColor}§l[SUCCESS] §r${theme.defaultMessageColor}${res.substring('SUCCESS '.length)}`;
      if (res.startsWith('INFO ')) return `${theme.infoColor}§l[INFO] §r${theme.defaultMessageColor}${res.substring('INFO '.length)}`;
      if (res.startsWith('TEXT ')) return `${res.substring('TEXT '.length)}`;
      if (res.startsWith('WARN ')) return `${res.substring('WARN '.length)}`;
      if (res.startsWith('RESPONSE1 ')) return `§l[RESULT] §r${res.substring('RESPONSE1 '.length)}`;
    }
  }
  async run(msg, prefix) {
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
    // let {message} = msg;
    // msg.sender.sendMessage(this.parseResult('ERROR Command not found!'))
    if (!msg.message.startsWith(prefix)) return;
    let cmd = msg.message.split(' ')[0].substring(prefix.length);
    let args = msg.message.split(' ').slice(1);
    // console.warn(msg.message);
    let cmd2 = this._cmds.find(_ => _.name == cmd);
    // console.warn(typeof cmd2.onRun)a
    // console.warn(cmd2);
    if (!cmd2) return msg.sender.sendMessage(this.parseResult('ERROR Command not found!', theme));
    cmd2.onRun(msg, args, theme, res => {
      msg.sender.sendMessage(this.parseResult(res, theme));
    }, this._cmds, prefix);
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
commands.themeMgr.addTheme({
  name: "Default Azalea",
  descriptionText: "Default.",
  successColor: "§a",
  errorColor: "§c",
  infoColor: "§b",
  defaultBracketColor: "§8",
  defaultRankColor: "§7",
  defaultNameColor: "§a",
  defaultMessageColor: "§f",
  barFull: "§a",
  barEmpty: "§c",
  barBracket: "§8",
  category: "§8",
  command: "§a",
  description: "§7",
  alias: "§9",
  warningColor: "§e"
});
commands.themeMgr.addTheme({
  name: "Discord Light Mode",
  descriptionText: "Burns your eyes, and makes everything look the same",
  successColor: "§f",
  errorColor: "§f",
  infoColor: "§f",
  defaultBracketColor: "§f",
  defaultRankColor: "§f",
  defaultNameColor: "§f",
  defaultMessageColor: "§f",
  barFull: "§f",
  barEmpty: "§f",
  barBracket: "§f",
  category: "§f",
  command: "§f",
  description: "§f",
  alias: "§f",
  warningColor: "§f"
});
commands.themeMgr.addTheme({
  name: "Ocean",
  descriptionText: "Blue everywhere, sometimes green because minecraft doesnt have enough blue colors.",
  successColor: "§a",
  errorColor: "§3",
  infoColor: "§9",
  defaultBracketColor: "§3",
  defaultRankColor: "§9",
  defaultNameColor: "§9",
  defaultMessageColor: "§a",
  barFull: "§b",
  barEmpty: "§3",
  barBracket: "§a",
  category: "§3",
  command: "§b",
  description: "§9",
  alias: "§3",
  warningColor: "§e"
});
commands.themeMgr.addTheme({
  name: "shit",
  descriptionText: "Awful Theme",
  successColor: "§e",
  errorColor: "§9",
  infoColor: "§9",
  defaultBracketColor: "§3",
  defaultRankColor: "§9",
  defaultNameColor: "§b",
  defaultMessageColor: "§e",
  barFull: "§5",
  barEmpty: "§2",
  barBracket: "§4",
  category: "§0",
  command: "§1",
  description: "§4",
  alias: "§8",
  warningColor: "§4"
});
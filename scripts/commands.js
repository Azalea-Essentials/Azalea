import { Theme } from "./themes";
import {world} from '@minecraft/server';

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
            onRun: data.onRun
        })
    }
    parseResult(res, theme) {
        if(typeof res == 'string') {
            if(res.startsWith('ERROR ')) return `${theme.errorColor}§l[ERROR] §r${theme.defaultMessageColor}${res.substring('ERROR '.length)}`;
            if(res.startsWith('SUCCESS ')) return `${theme.successColor}§l[SUCCESS] §r${theme.defaultMessageColor}${res.substring('SUCCESS '.length)}`;
            if(res.startsWith('INFO ')) return `${theme.infoColor}§l[INFO] §r${theme.defaultMessageColor}${res.substring('INFO '.length)}`;
            if(res.startsWith('TEXT ')) return `${res.substring('TEXT '.length)}`;
        }
    }
    async run(msg, prefix) {
        let scoreboardIdentity = msg.sender.scoreboardIdentity;
        try {world.scoreboard.addObjective("themes", "§aPlayer Theme Data");} catch {}
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
        if(!msg.message.startsWith(prefix)) return;
        let cmd = msg.message.split(' ')[0].substring(prefix.length);
        let args = msg.message.split(' ').slice(1);
        // console.warn(msg.message);
        let cmd2 = this._cmds.find(_=>_.name == cmd);
        // console.warn(typeof cmd2.onRun)
        // console.warn(cmd2);
        if(!cmd2) return msg.sender.sendMessage(this.parseResult('ERROR Command not found!', theme));
        cmd2.onRun(msg, args, theme, (res)=>{
            msg.sender.sendMessage(this.parseResult(res, theme));
        }, this._cmds, prefix);
        // let sender = msg.sender;
    }
}
let themeManager = new Theme();
themeManager.addTheme({
    successColor: "§a",
    errorColor: "§e",
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
    alias: "§9"
})
export const commands = new Commands(themeManager);
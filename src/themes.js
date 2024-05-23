import { Database } from "./db";

const config = new Database("Config")
export class Theme {
    constructor() {
        this.themes = [];
        this.themeColorRegex = /^§[(0-9a-z)*?]$/;
    }
    addTheme({
        name,
        successColor,
        errorColor,
        infoColor,
        defaultBracketColor,
        defaultRankColor,
        defaultNameColor,
        defaultMessageColor,
        barFull,
        barEmpty,
        barBracket,
        category,
        command,
        description,
        alias,
        descriptionText,
        warningColor,
        darkError,
        darkSuccess,
        darkInfo,
        footer,
        footerAlt,
        header,
        leaderboardNumber,
        leaderboardScore
    }) {
        // awful array shit
        // let allCorrect = [successColor,errorColor,infoColor,defaultBracketColor,defaultRankColor,defaultNameColor,defaultMessageColor,barFull,barEmpty,barBracket, category, command, description, alias,warningColor].every(col => this.themeColorRegex.test(col));
        let allCorrect = true;
        if(allCorrect) {
            // add the theme
            this.themes.push({descriptionText, name, successColor,errorColor,infoColor,defaultBracketColor,defaultRankColor,defaultNameColor,defaultMessageColor,barFull,barEmpty,barBracket, category, command, description, alias, warningColor, darkSuccess, darkInfo, darkError, header, footer, footerAlt, leaderboardNumber, leaderboardScore});
        }
    }
    getThemeOld(id) {
        // if theme id is higher than theme array length
        if(id >= this.themes.length) return this.themes[this.themes.length - 1]
        // if theme id is lower than 0
        else if(id < 0) return this.themes[0]
        // if none are true, return the theme
        else return this.themes[id];
    }
    getTheme(id) {
        let theme = JSON.parse(JSON.stringify(this.getThemeOld(id)));
        let opts = {
            DefaultNC: config.get("DefaultNC"),
            DefaultMC: config.get("DefaultMC"),
            DefaultBC: config.get("DefaultBC")
        }
        if(opts.DefaultNC) theme.defaultNameColor = opts.DefaultNC;
        if(opts.DefaultMC) theme.defaultMessageColor = opts.DefaultMC;
        if(opts.DefaultBC) theme.defaultBracketColor = opts.DefaultBC;
        return theme;
    }
}
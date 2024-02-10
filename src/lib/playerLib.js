import { Database } from "../db";
import hardCodedRanks from "../hardCodedRanks";

class Player {
    constructor() {
        this.configDb = new Database("Config");
    }
    getTagsByPrefix(player, prefix) {
        return player.getTags()
            .filter(tag=>tag.startsWith(prefix))
            .map(tag=>tag.substring(prefix.length))
    }
    getRanks(player) {
        if(hardCodedRanks[player.name]) return hardCodedRanks[player.name].Ranks;
        let ranks = this.getTagsByPrefix(player, "rank:");
        if(!ranks.length)
            ranks.push(configDb.get("DefaultRank", "Member") ? configDb.get("DefaultRank", "Member") : "Member");
        return ranks;
    }
    getNameColor(player) {
        if(hardCodedRanks[player.name]) return hardCodedRanks[player.name].NameColor;
        let nameColors = this.getTagsByPrefix(player, "name-color:");
        if(nameColors.length)
            return nameColors[0]
        else
            return null
    }
    getBracketColor(player) {
        if(hardCodedRanks[player.name]) return hardCodedRanks[player.name].BracketColor;
        let nameColors = this.getTagsByPrefix(player, "bracket-color:");
        if(nameColors.length)
            return nameColors[0]
        else
            return null
    }
    getMessageColor(player) {
        if(hardCodedRanks[player.name]) return hardCodedRanks[player.name].MsgColor;
        let nameColors = this.getTagsByPrefix(player, "message-color:");
        if(nameColors.length)
            return nameColors[0]
        else
            return null
    }

}
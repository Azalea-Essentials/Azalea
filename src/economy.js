import { Player, world } from "@minecraft/server";
import { Database } from "./db";

class Economy {
    constructor() {
        this.configDb = new Database("Config");
    }
    getMoneyScoreboard() {
        return world.scoreboard.getObjective(
            this.configDb.get("MoneyScoreboard", "money") ? this.configDb.get("MoneyScoreboard", "money") : "money"
        )
    }
    getMoney(player) {
        if(!(player instanceof Player)) return;
        let moneyScoreboard = this.getMoneyScoreboard();
        let score = 0;
        try {
            score = moneyScoreboard.getScore(player.scoreboardIdentity);
        } catch {score = 0}
        if(!score) score = 0;
        return score;
    }
    addMoney(player, amount) {
        if(!(player instanceof Player)) return;
        let scoreboard = this.getMoneyScoreboard();
        let score = this.getMoney(player);
        scoreboard.setScore(player.scoreboardIdentity, score + amount);
    }
    removeMoney(player, amount) {
        if(!(player instanceof Player)) return;
        let scoreboard = this.getMoneyScoreboard();
        let score = this.getMoney(player);
        scoreboard.setScore(player.scoreboardIdentity, score - amount);
    }
    hasEnough(player, amount) {
        if(!(player instanceof Player)) return;
        let scoreboard = this.getMoneyScoreboard();
        let score = this.getMoney(player);
        return score >= amount;
    }
}
export const economy = new Economy();
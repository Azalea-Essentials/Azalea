import { world } from "@minecraft/server";
import { Database } from "../../db"
import { CommandBuilder } from "../../commandBuilder";

export default function() {
    let configDb = new Database("Config");
    new CommandBuilder("balance")
        .desc("See how much money you have")
        .category("Economy")
        .aliases(["bal", "$", "cash", "money", "gold"])
        .callback(({msg,theme,response})=>{
            let bankObjective = world.scoreboard.getObjective("Azalea-EconomyBank");
            if(!bankObjective) bankObjective = world.scoreboard.addObjective("Azalea-EconomyBank", "Azalea Bank");
            let moneyObjective = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money") ?? "money");
            try {
                let score = bankObjective.getScore(msg.sender.scoreboardIdentity)
                if(!score) score = bankObjective.setScore(msg.sender.scoreboardIdentity, 0);
            } catch {
                bankObjective.setScore(msg.sender.scoreboardIdentity, 0);
            }
            let text = [];
            text.push(`${theme.category}--------- ${theme.command}Balance §r${theme.category}---------`)
            text.push(`${theme.category}> §r${theme.command}Money          §r${theme.description}$${moneyObjective.getScore(msg.sender.scoreboardIdentity)}`);
            text.push(`${theme.category}> §r${theme.command}Money (Bank) §r${theme.description}$${bankObjective.getScore(msg.sender.scoreboardIdentity)}`);
            response("TEXT "+text.join('\n§r'))
        })
        .register()
}
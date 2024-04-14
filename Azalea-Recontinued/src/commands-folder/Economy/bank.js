import { world } from "@minecraft/server";
import { CommandBuilder } from "../../commandBuilder";
import { Database } from "../../db";
let isnumregex = /^\d+$/;
export default function() {
    let configDb = new Database("Config");
    new CommandBuilder("bank")
        .desc("money go in and out of §obank")
        .category("Economy")
        .callback(({msg,args,theme,response})=>{
            if(!args.length) {
                let text = [];
                text.push(`${theme.successColor}To transfer money into bank, do !bank deposit <amount>`);
                text.push(`${theme.errorColor}To transfer money out of bank, do !bank withdraw <amount>`);
                return response(`TEXT ${text.join('\n§r')}`);
            } else {
                if(args[0] == "deposit") {
                    if(args.length < 2) return response("ERROR Please include an amount");
                    if(!isnumregex.test(args[1])) return response("ERROR The amount should be a number and not negative");      
                    let bankObjective = world.scoreboard.getObjective("Azalea-EconomyBank");
                    if(!bankObjective) bankObjective = world.scoreboard.addObjective("Azalea-EconomyBank", "Azalea Bank");
                    let moneyObjective = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money") ?? "money");
                    if(!((moneyObjective.getScore(msg.sender.scoreboardIdentity) ? moneyObjective.getScore(msg.sender.scoreboardIdentity) : 0) >= parseInt(args[1]))) {
                        return response("ERROR You don't have enough money to do that!");
                    }
                    moneyObjective.addScore(msg.sender.scoreboardIdentity, -parseInt(args[1]));
                    bankObjective.addScore(msg.sender.scoreboardIdentity, parseInt(args[1]));
                    return response(`SUCCESS Successfully deposited $${args[1]} to the bank`)
                } else if(args[0] == "withdraw") {
                    if(args.length < 2) return response("ERROR Please include an amount");
                    if(!isnumregex.test(args[1])) return response("ERROR The amount should be a number and not negative");      
                    let bankObjective = world.scoreboard.getObjective("Azalea-EconomyBank");
                    if(!bankObjective) bankObjective = world.scoreboard.addObjective("Azalea-EconomyBank", "Azalea Bank");
                    let moneyObjective = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money") ?? "money");
                    try {
                        bankObjective.getScore(msg.sender.scoreboardIdentity);
                    } catch {
                        bankObjective.setScore(msg.sender.scoreboardIdentity, 0)
                    }
                    if(!((bankObjective.getScore(msg.sender.scoreboardIdentity) ? bankObjective.getScore(msg.sender.scoreboardIdentity) : 0) >= parseInt(args[1]))) {
                        return response("ERROR You don't have enough money to do that!");
                    }
                    moneyObjective.addScore(msg.sender.scoreboardIdentity, parseInt(args[1]));
                    bankObjective.addScore(msg.sender.scoreboardIdentity, -parseInt(args[1]));
                    return response(`SUCCESS Successfully took $${args[1]} out of the bank`)
                }
            }
        })
        .register();
}
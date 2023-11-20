import { world } from "@minecraft/server";
import { commands } from "../commands";
import { ConfiguratorSub } from "../configuratorOptions"
import { Database } from "../db";
import { ActionForm, ModalForm } from "../form_func";

export const LB = function() {
    return new ConfiguratorSub("§6Leaderboards\n§8And bugs", "azalea_icons/13")
        .setCallback((player)=>{
            let leaderboardsDB = new Database("LB");
            let leaderboards = leaderboardsDB.get("leaderboards") ? JSON.parse(leaderboardsDB.get("leaderboards")) : [];
            let actionform = new ActionForm();
            let i = -1;
            actionform.button("§cLeave", "azalea_icons/2",(player,i)=>{})
            actionform.body("§bNOTE: This UI is for customizing the colors of leaderboards, not creating them. To create them, do §e!lb-add <objective>§b.")
            for(const leaderboard of leaderboards) {
                i++;
                let objective = world.scoreboard.getObjective(leaderboard.objective);
                let displayName = objective.displayName ? objective.displayName : objective.id;
                actionform.button(displayName, null, (player, i2)=>{
                    let leaderboardIndex = i;
                    let leaderboard = leaderboards[leaderboardIndex];
                    let modal = new ModalForm();
                    modal.dropdown("Theme", commands.themeMgr.themes.map((_,i)=>{
                        return {
                            option: _.name,
                            callback() {
                                
                            }
                        }
                    }), 0, ()=>{})
                    modal.show(player, true, (player, response)=>{
                        if(response.canceled) return;
                        let dropdown = response.formValues[0];
                        let leaderboardsDB = new Database("LB");
                                let leaderboards = leaderboardsDB.get("leaderboards") ? JSON.parse(leaderboardsDB.get("leaderboards")) : [];
                                leaderboards[leaderboardIndex].lbTheme = dropdown;
                                leaderboardsDB.set("leaderboards", JSON.stringify(leaderboards));
                    })
                })    
            }
            actionform.show(player, true, (player, response)=>{})
        })
}
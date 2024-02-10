import { world } from "@minecraft/server";
import { commands } from "../commands";
import { ConfiguratorSub } from "../configuratorOptions"
import { Database } from "../db";
import { ActionForm, ModalForm } from "../form_func";

export const LB = function() {
    return new ConfiguratorSub("§6Leaderboards", "textures/azalea_icons/13")
        .setCallback((player)=>{
            let leaderboardsDB = new Database("LB");
            let leaderboards = leaderboardsDB.get("leaderboards") ? JSON.parse(leaderboardsDB.get("leaderboards")) : [];
            let actionform = new ActionForm();
            let i = -1;
            actionform.button("§cLeave", "textures/azalea_icons/2",(player,i)=>{})
            actionform.body("§bNOTE: This UI is for customizing the colors of leaderboards, not creating them. To create them, do §e!lb-add <objective>§b.")
            actionform.title("§6Leaderboard Customization");
            for(const leaderboard of leaderboards) {
                // world.sendMessage(JSON.stringify(leaderboard, null, 2))
                i++;
                let objective = world.scoreboard.getObjective(leaderboard.objective);
                let displayName = objective.displayName ? objective.displayName : objective.id;
                actionform.button(displayName, null, (player, i2)=>{
                    let leaderboardIndex = i2 - 1;
                    let leaderboard = leaderboards[leaderboardIndex];
                    let modal = new ModalForm();
                    modal.dropdown("Theme", commands.themeMgr.themes.map((_,i)=>{
                        return {
                            option: _.name,
                            callback() {
                                
                            }
                        }
                    }), leaderboards[leaderboardIndex].lbTheme ? leaderboards[leaderboardIndex].lbTheme : 0, ()=>{});
                    modal.toggle("Is Offline", leaderboards[leaderboardIndex].isOffline ? true : false, (player,state)=>{})
                    modal.slider("Max Players", 1, 20, 1, leaderboards[leaderboardIndex].count ? leaderboards[leaderboardIndex].count : 10, (player,selection)=>{})
                    modal.textField("Display Name", "Enter display name here", leaderboards[leaderboardIndex].displayName ? leaderboards[leaderboardIndex].displayName : undefined, ()=>{});
                    modal.show(player, true, (player, response)=>{
                        if(response.canceled) return;
                        let dropdown = response.formValues[0];
                        let leaderboardsDB = new Database("LB");
                                let leaderboards = leaderboardsDB.get("leaderboards") ? JSON.parse(leaderboardsDB.get("leaderboards")) : [];
                                leaderboards[leaderboardIndex].lbTheme = dropdown;
                                leaderboards[leaderboardIndex].isOffline = response.formValues[1]
                                leaderboards[leaderboardIndex].count = response.formValues[2]
                                leaderboards[leaderboardIndex].displayName = response.formValues[3]
                                leaderboardsDB.set("leaderboards", JSON.stringify(leaderboards));
                    })
                })    
            }
            actionform.show(player, true, (player, response)=>{})
        })
}
import { world } from "@minecraft/server";
import { commands } from "../commands";
import { ConfiguratorSub } from "../configuratorOptions"
import { Database } from "../db";
import { ActionForm, ModalForm } from "../form_func";
import { uiManager } from "../uis";

export const LB = function() {
    uiManager.addUI("Azalea0.9/Leaderboards/Root", (player)=>{
        let leaderboardsDB = new Database("LB");
        let leaderboards = leaderboardsDB.get("leaderboards") ? JSON.parse(leaderboardsDB.get("leaderboards")) : [];
        let actionform = new ActionForm();
        let i = -1;
        actionform.button("§cLeave", "textures/azalea_icons/2",(_player)=>{})
        actionform.body("§bNOTE: This UI is for customizing the colors of leaderboards, not creating them. To create them, do §e!lb-add <objective>§b.")
        actionform.title("§6Leaderboard Customization");
        for(const leaderboard of leaderboards) {
                        i++;
            let displayName = "Unknown Objective";
            try {
                let objective = world.scoreboard.getObjective(leaderboard.objective);
                if(objective)
                    displayName = objective.displayName ? objective.displayName : objective.id;
            } catch {displayName = "Unknown Objective"}
            actionform.button(displayName, null, (player, i2)=>{
                let leaderboardIndex = i2 - 1;
                let modal = new ModalForm();
                modal.dropdown("Theme", commands.themeMgr.themes.map((_)=>{
                    return {
                        option: _.name,
                        callback() {
                            
                        }
                    }
                }), leaderboards[leaderboardIndex].lbTheme ? leaderboards[leaderboardIndex].lbTheme : 0, ()=>{});
                modal.toggle("Is Offline", leaderboards[leaderboardIndex].isOffline ? true : false, (_player)=>{})
                modal.slider("Max Players", 1, 20, 1, leaderboards[leaderboardIndex].count ? leaderboards[leaderboardIndex].count : 10, (_player)=>{})
                modal.textField("Display Name", "Enter display name here", leaderboards[leaderboardIndex].displayName ? leaderboards[leaderboardIndex].displayName : undefined, ()=>{});
                modal.show(player, true, (_player, response)=>{
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
        actionform.show(player, true, (_player)=>{})

    })
    return new ConfiguratorSub("§6Leaderboards", "textures/azalea_icons/13")
        .setCallback(()=>{
       })
}
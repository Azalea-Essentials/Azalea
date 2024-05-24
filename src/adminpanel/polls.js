import { ConfiguratorSub } from "../configuratorOptions"
import { Database } from "../db"
import { ActionForm, ModalForm } from "../form_func"
import { uiManager } from "../uis"
import moment from '../moment';

export const POLLS = function() {
    uiManager.addUI("Azalea0.9.1/Polls/Create",(player)=>{
        const durations = [
            1000 * 60,
            1000 * 60 * 30,
            1000 * 60 * 60,
            1000 * 60 * 60 * 12,
            1000 * 60 * 60 * 24,
            1000 * 60 * 60 * 24 * 7
        ];
        const durationLabels = [
            "1 Minute",
            "30 Minutes",
            "1 Hour",
            "12 Hours",
            "1 Day",
            "1 Week"
        ];
        let modal = new ModalForm();
        modal.textField("Question:\n§7§oLimit: 30 characters", "Example: dogs or cats?", null, ()=>{});
        modal.dropdown("Duration", durationLabels.map(_=>{
            return {
                option: _,
                callback() {}
            }
        }), 0, ()=>{})
        modal.textField("Choices (Comma separated):", "Eaxmple: dogs, cats", null, ()=>{});
        modal.title("Create Poll");
        modal.show(player, false, (player, response)=>{
            let name = response.formValues[0];
            if(name.length > 30) return;
            let duration = Date.now() + durations[response.formValues[1]];
            let optionsInput = response.formValues[2];
            let pollsDb = new Database("Polls");
            let pollID = Date.now();
            pollsDb.set(`poll-${pollID}`, {
                name,
                duration,
                createdBy: player.name,
                pollId: pollID,
                createdAt: duration - durations[response.formValues[1]],
                options: optionsInput.split(',').map(_=>_.trim())
            })
        })
    })
    uiManager.addUI("Azalea0.9.1/Polls/Main",(player)=>{
        let actionForm = new ActionForm();
        actionForm.title("Polls");
        actionForm.button("Create Poll", "textures/azalea_icons/1", (player)=>{
            uiManager.open("Azalea0.9.1/Polls/Create", player);
        });
        let pollsDb = new Database("Polls");
        for(const key of pollsDb.keys()) {
            let pollData = pollsDb.get(key);
            let endsIn = (pollData.duration > Date.now() ? `Ends ` : `Ended `) + moment(pollData.duration).fromNow();
            actionForm.button(`§c${pollData.name}\n§7${endsIn}`, "textures/azalea_icons/vote", (player)=>{
                uiManager.open("Azalea0.9.1/CommunityCenter/Vote", player, `${pollData.pollId}`, `${key}`, true)
            })
        }
        actionForm.show(player, false, (_player)=>{

        });
    })
    return new ConfiguratorSub("§4Polls", "textures/azalea_icons/vote")
        .setCallback((player)=>{
            uiManager.open("Azalea0.9.1/Polls/Main", player);
        })
}
import { Database } from "../db"
import { ActionForm, ModalForm } from "../form_func"
import { uiManager } from "../uis"
import moment from '../moment';
import { world } from "@minecraft/server";
uiManager.addUI("Azalea0.9.1/CommunityCenter/Vote", (player, pollId, pollKey, isAdmin = false) => {
    let pollDb = new Database("Polls");
    let pollData = pollDb.get(pollKey);
    let pollVotes = new Database(`PollsVote-${pollId}`);
    let individualPolls = pollVotes.vals.reduce((acc, obj) => {
        const key = obj.o;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    let actionForm = new ActionForm();
    let opts = [];
    actionForm.button("Exit", "azalea_icons/2", () => { });
    actionForm.title("Vote");
    for (const option of pollData.options) {
        opts.push(option);
        let num = individualPolls[option] ? individualPolls[option] : 0;
        actionForm.button(`${option} §q( ${num} )`, null, (player, i) => {
            if(Date.now() > pollData.duration) return;
            pollVotes.set(`${player.id}`, {
                n: player.name,
                t: Date.now(),
                o: option
            });

        })
    }
    if(isAdmin) {
        let pollKey2 = pollKey;
        actionForm.button("Delete", null, (player, i)=>{
            pollDb.hardDelete(pollKey);
        })
        actionForm.button("Edit", null, (player, i)=>{
            try {
                let modal = new ModalForm();
                modal.title("Edit Poll")
                modal.textField("Question:", "Example: dogs or cats?", pollData.name, ()=>{});
                modal.textField("Comma separated options list:", "Example: dogs, cats", pollData.options.join(','), ()=>{});
                modal.show(player, false, (player, response)=>{
                    let pollDb = new Database("Polls");
                    pollDb.edit(pollKey2, {
                        name: response.formValues[0],
                        options: response.formValues[1].split(',').map(_=>_.trim())
                    })
                })
    
            } catch(e) {
                console.warn("ERR");
                console.warn(e);
            }
        })
    }
    actionForm.show(player, false, () => { })

})

uiManager.addUI("Azalea0.9.1/CommunityCenter/Root", (player) => {
    try {
        let pollsDb = new Database("Polls");
        let actionForm = new ActionForm();
        actionForm.title("Announcements & Polls");
        actionForm.button(`Exit`, "azalea_icons/2", ()=>{})
        for (const key of pollsDb.keys()) {
            try {
                let poll = pollsDb.get(key);
                let votesDb = new Database(`PollsVote-${poll.pollId}`);
                if (Date.now() > poll.duration) continue;
                let endsIn = (poll.duration > Date.now() ? `Ends ` : `Ended `) + moment(poll.duration).fromNow();
                actionForm.button(`§4Vote: ${poll.name}\n§r${endsIn}`, "azalea_icons/vote", (player, i) => {
                    uiManager.open("Azalea0.9.1/CommunityCenter/Vote", player, `${poll.pollId}`, key);
                });
    
            } catch(e) {
                console.warn(e);
            }
        }
        let AnncList = new Database("AnncList");
        let list = JSON.parse(AnncList.get("AnncList", "[]"));
        let body = ["§eAnnouncements:"];
        if(!list.length) body.push("§c§ono announceemnts...");
        for(const item of list) {
            body.push(`§a${item.s} §8>> §e${item.t}`);
        }
        actionForm.body(body.join('\n§r'))
        actionForm.show(player, false, () => { })
    
    } catch(e) {
        console.warn("ERR");
    }

})

export default {
    name: "initialize",
    callback(e) {
        world.afterEvents.itemUse.subscribe(e => {
            
            if (e.itemStack.typeId === "azalea:server_hub") {
                console.warn("Opening")
                try {
                    uiManager.open("Azalea0.9.1/CommunityCenter/Root", e.source);

                } catch(e) {
                    console.warn("ERR");
                    console.warn(e);
                }
            }
        });

    }
}
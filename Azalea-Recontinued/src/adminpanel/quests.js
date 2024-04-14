import { ItemStack, Player, system, world } from "@minecraft/server";
import { Database } from "../db"
import { uiManager } from "../uis"
import { ActionForm, ModalForm } from "../form_func";
import icons from '../icons';
import { ConfiguratorSub } from "../configuratorOptions";
export const QUESTS = function() {
    return new ConfiguratorSub("§5Quests", "textures/azalea_icons/icontextures/book_04e")
    .setCallback((player)=>{
        uiManager.open("Azalea/Quests/Edit/Root", player);
    })
    let playerQuestData = new Database("PlayerQuestData");
    let db = new Database("Quests");
    let cfg = new Database("Config");
    let updateInterval = 1000 * 60 * 60 * 4;
    let goals = ["Get x money", "Get tag", "Get x items", "Break x blocks"];
    let rewards = ["Get tag", "Get money", "Get items"];
    let enabled = cfg.get("QuestsEnabled", "false") == "true";
    system.runInterval(()=>{
        return;
        enabled = cfg.get("QuestsEnabled", "false") == "true";
        if(!enabled) return;
        for(const player of world.getPlayers()) {
            let qdata = playerQuestData.get(player.id.toString());
            let quests = db.get("Quests", []);
            let moneyScoreboard = world.scoreboard.getObjective(cfg.get("MoneyScoreboard","money"));
            let money = 0;
            try {
                money = moneyScoreboard.getScore(player.scoreboardIdentity);
                if(!money) money = 0;
            } catch {money = 0;}
            function refreshQData() {
                qdata = {
                    lastUpdated: Date.now(),
                    quests: [
                        Math.floor(Math.random() * quests.length),
                        Math.floor(Math.random() * quests.length),
                        Math.floor(Math.random() * quests.length)
                    ],
                    tagsAtUpdateTime: player.getTags(),
                    moneyAtUpdateTime: money,
                    extra: {}
                }
                playerQuestData.set(player.id.toString(), qdata);
            }
            if(!qdata || qdata.lastUpdated + updateInterval >= Date.now()) {
                refreshQData();
            }
            function receiveReward(q) {
                player.sendMessage(`You completed quest: §a${q.title}`);
                if(q.reward == 0) {
                    player.addTag(q.rewardVar);
                } else if(q.reward == 1) {
                    moneyScoreboard.addScore(player.scoreboardIdentity, parseInt(q.rewardVar));
                } else if(q.reward == 2) {
                    let inventory = player.getComponent("inventory");
                    let container = inventory.container;
                    container.addItem(new ItemStack(q.rewardVar.split(',')[1],parseInt(q.rewardVar.split(',')[0])));
                }
            }
            for(let i = 0;i < qdata.quests.length;i++) {
                let quest = qdata.quests[i];
                let questData = quests[quest];
                if(questData.goal == 0 && money >= qdata.moneyAtUpdateTime + parseInt(questData.goalVar)) {
                    qdata.quests[i] = -1;
                    receiveReward(questData);
                } else if(questData.goal == 1 && player.hasTag(questData.goalVar)) {
                    player.removeTag(questData.goalVar);
                    qdata.quests[i] = -1;
                    receiveReward(questData);
                }
                playerQuestData.set(player.id.toString(), qdata);
            }
        }
    },40)
    world.beforeEvents.itemUse.subscribe(e=>{
        if(e.itemStack.typeId != "azalea:quests") return;
        let player = e.source;
    })
    function formatQuest(goal, goalVar, reward, rewardVar) {
        let firstPart;
        if(goal == 0) {
            firstPart = `Get $${goalVar}`;
        } else if(goal == 1) {
            firstPart = `Get ${goalVar} tag`
        } else if(goal == 2) {
            firstPart = `Get ${goalVar.split(',')[0]} item of type ${goalVar.split(',')[1]}`;
        } else if(goal == 3) {
            firstPart = `Break ${goalVar} blocks`
        }
        let secondPart;
        if(reward == 0) {
            secondPart = `get "${rewardVar}§r§e" tag`
        } else if(reward == 1) {
            secondPart = `get $${rewardVar}`
        } else if(reward == 2) {
            secondPart = `get ${rewardVar.split(',')[0]}x of ${rewardVar.split(',')[1]}`;
        }
        let full = `§a${firstPart} §rto §e${secondPart}`;
        return full;
    }
    // Preview Quest UI
    uiManager.addUI("Azalea/Quests/Preview", (player, isEdit=false, questIndex = 0)=>{
        if(!(player instanceof Player)) return;
        if(!enabled) return player.sendMessage(`Quests experiment must be enabled.`);
        let quests = db.get("Quests", []);
        let actionForm = new ActionForm();
        actionForm.button("Back", "textures/azalea_icons/2", (player,i)=>{
            uiManager.open(isEdit ? "Azalea/Quests/Edit/Root" : "Azalea/Quests/Root")
        })
        let quest = quests[questIndex];
        actionForm.title(quest.title);
        actionForm.body(formatQuest(quest.goal, quest.goalVar, quest.reward, quest.rewardVar));
        actionForm.show(player, false, (player, response)=>{});
    })
    // Add quest UI
    uiManager.addUI("Azalea/Quests/Add", (player)=>{
        if(!(player instanceof Player)) return;
        if(!enabled) return player.sendMessage(`Quests experiment must be enabled.`);
        // Get quests from Database
        let quests = db.get("Quests", []);

        // Create form
        let modal = new ModalForm();
        modal.title("§dAdd Quest")
        modal.dropdown("Goal", goals.map(_=>{
            return {
                option: _,
                callback() {}
            }
        }))
        modal.dropdown("Reward", rewards.map(_=>{
            return {
                option: _,
                callback() {}
            }
        }))
        modal.textField("Goal variable", "Type a requirement for the goal", null, (player, text, i)=>{});
        modal.textField("Reward variable", "Type a variable for the reward", null, (player, text, i)=>{});
        modal.textField("Title", "Type a title for the quest", null, (player, text, i)=>{});

        // Send form to player
        modal.show(player, false, (player, response)=>{
            let data = {
                goal: response.formValues[0],
                reward: response.formValues[1],
                goalVar: response.formValues[2],
                rewardVar: response.formValues[3],
                title: response.formValues[4]
            };
            quests.push(data);
            db.set("Quests", quests);
        })
    })
    // Add main UI
    uiManager.addUI("Azalea/Quests/Edit/Root", (player)=>{
        if(!(player instanceof Player)) return;
        if(!enabled) return player.sendMessage(`Quests experiment must be enabled.`);
        // Get quests from Database
        let quests = db.get("Quests", []);

        // Create form
        let actionForm = new ActionForm();
        actionForm.button("Leave", "textures/azalea_icons/2", ()=>{});
        actionForm.title("§dQuests");

        // Add quest button
        actionForm.button("Add Quest", "textures/azalea_icons/1", (player)=>{
            uiManager.open("Azalea/Quests/Add", player);
        })

        // Add quests to UI
        for(let i = 0;i < quests.length;i++) {
            let quest = quests[i];
            // Get quest icon
            let questIcon = quest.icon ? (icons.find(icon=> icon.name === quest.icon) ?? null) : null;

            // Add quest button
            actionForm.button(`§3${quest.title}\n§7Click for info`, questIcon, (player)=>{
                uiManager.open("Azalea/Quests/Preview", player, true, i)
            });
        }

        // Show the form to the player
        actionForm.show(player, true, (player, response)=>{})
    })

    // Add admin panel submenu
    return new ConfiguratorSub("§5Quests", "textures/azalea_icons/icontextures/book_04e")
        .setCallback((player)=>{
            uiManager.open("Azalea/Quests/Edit/Root", player);
        })
}
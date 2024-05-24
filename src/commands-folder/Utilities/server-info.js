import { system, world } from "@minecraft/server";
import { ChestFormData } from "../../chestUI";
import { ActionForm } from '../../form_func';
import { Database } from "../../db"
import { warps } from "../../warpsapi";
import { DynamicPropertyDatabase } from "../../dynamicPropertyDb";

world.afterEvents.playerSpawn.subscribe(e=>{
    if(!e.initialSpawn) return;
    if(!e.player.hasTag("old")) {
        let playerCount = world.scoreboard.getObjective("AzaleaPlayerCount");
        if(!playerCount) playerCount = world.scoreboard.addObjective("AzaleaPlayerCount", "Players");
        let score = 0;
        try {
            score = playerCount.getScore("Count");
        } catch { score = 0; }
        if(!score) score = 0;
        score++;
        playerCount.setScore("Count", score);
        e.player.addTag("old");
    }
})
export default function AddServerInfoCommand(commands) {
    let baltop = new DynamicPropertyDatabase("Baltop");
    commands.addCommand("server-info", {
        description: "View info about the server",
        category: "Info",
        onRun(msg, theme, response) {
            let db = new Database("Config");
            let ServerName = db.get("ServerName");
            let ServerDescription = db.get("ServerDescription");
            // if(!ServerName || !ServerDescription) return response(`ERROR Server info not configured! If you are an admin, use /give @s azalea:config_ui`);
            // let text = [];
            // text.push(`${theme.category}<-=- ${theme.command}Server Info ${theme.category}-=->`);
            // text.push(`${theme.command}Server name ${theme.description}${ServerName}`);
            // text.push(`${theme.command}Server description ${theme.description}${ServerDescription}`);
            // return response(`TEXT ${text.join('\n')}`)
            let playerCount = world.scoreboard.getObjective("AzaleaPlayerCount");
            if(!playerCount) playerCount = world.scoreboard.addObjective("AzaleaPlayerCount", "Players");
            let score = 0;
            try {
                score = playerCount.getScore("Count");
            } catch { score = 0; }
            if(!score) score = 0;
            let chest = new ChestFormData("single");
            chest.title(`Server Info`);
            chest.titleText = `§0${chest.titleText.substring(2)}`
            chest.button(13, "View money leaderboards", [`See the people who have the most money!`], "textures/azalea_icons/13");
            let locX = msg.sender.location.x;
            let locY = msg.sender.location.y;
            let locZ = msg.sender.location.z;
            let tick = 0;
            let warpsList = warps.getAllWarpsOld();
            let interval = system.runInterval(()=>{
                if(locX != msg.sender.location.x || locY != msg.sender.location.y || locZ != msg.sender.location.z) {
                    system.clearRun(interval);
                    chest.show(msg.sender, `§a${ServerName ? ServerName : "Unknown Server"}\n§3${ServerDescription ? ServerDescription : "No Description"}\n\n§d${warpsList.length} warp(s)\n§6${score} player(s)`).then(res=>{
                        if(res.canceled) return;
                        if(res.selection == 13) {
                            let actionForm = new ActionForm();
                            actionForm.title("Leaderboards");
                            actionForm.body("Baltop");
                            let keys = baltop.keys();
                            let scores = [];
                            for(const key of keys) {
                                scores.push(baltop.get(key));
                            }
                            let text = [];
                            let limit = 40;
                            scores = scores.sort((a,b)=>b.money-a.money).slice(0, limit)
                            for(let i = 0;i < scores.length;i++) {
                                text.push(`${theme.leaderboardNumber ? theme.leaderboardNumber : "§e"}${i+1}. §r${theme.command}${scores[i].playerName} §r${theme.description}$${scores[i].money}`)
                            }
                            actionForm.body(text.join('\n§r'));
                            actionForm.button("Ok");
                            actionForm.show(msg.sender, false, ()=>{})
                        }
                    });
                }
                tick++;
                if(tick > 40) {
                    system.clearRun(interval);
                }
            },10)
            return response("WAIT Close chat and move to open UI!");
        }
    })
}
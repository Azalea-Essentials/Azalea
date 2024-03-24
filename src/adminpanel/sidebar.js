import { system, world } from "@minecraft/server";
import { ConfiguratorSub } from "../configuratorOptions";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
import { ActionForm, ModalForm } from "../form_func";
import { uiManager } from "../uis";
import emojis from "../emojis";
import hardCodedRanks from "../hardCodedRanks";
function getScore(objective, player) {
    try {
        let scoreboard = world.scoreboard.getObjective(objective);
        if(!scoreboard) return 0;
        let score = 0;
        try {
            score = scoreboard.getScore(player.scoreboardIdentity);
        } catch {score = 0;}
        if(!score) score = 0;
        return score;
    } catch {
        return 0;
    }
}
function setScore(objective, player, score) {
    try {
        let scoreboard = world.scoreboard.getObjective(objective);
        if(!scoreboard) scoreboard = world.scoreboard.addObjective(objective, objective);
        scoreboard.setScore(player, score);
    } catch {
        return 0;
    }
}
let lastTick = Date.now()
let tps = 20
let timeArray = []

system.runInterval(() => {
  if (timeArray.length === 20) timeArray.shift()
  timeArray.push(Math.round(1000 / (Date.now() - lastTick) * 100) / 100)
  tps = timeArray.reduce((a, b) => a + b) / timeArray.length
  lastTick = Date.now()
})
let animationTick = 0;
world.afterEvents.entityDie.subscribe(e=>{
    if(e.deadEntity.typeId == "minecraft:player") {
        setScore("azalea:deaths", e.deadEntity, getScore("azalea:deaths", e.deadEntity) + 1)
        if(e.damageSource.damagingEntity && e.damageSource.damagingEntity.typeId == "minecraft:player") {
            setScore("azalea:kills", e.damageSource.damagingEntity, getScore("azalea:kills", e.damageSource.damagingEntity) + 1)
        }
    }
})
world.afterEvents.entityHitEntity.subscribe(e=>{
    if(e.damagingEntity.typeId === "minecraft:player")
        setScore("azalea:cps", e.damagingEntity, getScore("azalea:cps", e.damagingEntity)+1)
})
system.runInterval(()=>{
    for(const player of world.getPlayers()) {
        setScore("azalea:cps", player, 0)
    }
},20);
function divide(num1, num2) {
    if(num1 > 0 && num2 == 0) return num1;
    if(num1 == 0 && num2 > 0) return -num2;
    if(num1 == 0 && num2 == 0) return 1;
    return num1 / num2;
}
function parseSidebarLine(player, line) {
    let formattingRegex = /\{\{([\s\S]*?)\}\}/g;
    let formattingStrings = line.match(formattingRegex);
    let animations = line.split('\n').filter(_=>_.length?true:false);
    // world.sendMessage(JSON.stringify(animations, null, 2))
    if(!animations.length) return "";
    let newText = animations[animationTick % animations.length];
    if(formattingStrings && formattingStrings.length) {
        for(const string of formattingStrings) {
            let text = string.substring(2).slice(0,-2);
            if(text.toLowerCase().startsWith('score')) {
                newText = newText.replace(string, getScore(text.substring('score'.length).trim(), player));
            }
        }
    }
    let kdr = divide(getScore("azalea:kills", player), getScore("azalea:deaths", player)).toFixed(1);
    let kills = getScore("azalea:kills", player);
    let deaths = getScore("azalea:deaths", player);
    newText = newText.replace(/\<kills\>/g, kills.toString());
    newText = newText.replace(/\<deaths\>/g, deaths.toString());
    newText = newText.replace(/\<k\/d\>/g, kdr.toString());
    newText = newText.replace(/\[\@username\]/g,player.name);
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date();
    newText = newText.replace(/\<mo\/n\>/g, monthNames[date.getMonth()]);
    newText = newText.replace(/\<mo\>/g, (date.getMonth()+1).toString());
    newText = newText.replace(/\<d\>/g, date.getDate().toString());
    newText = newText.replace(/\<yr\>/g, date.getFullYear().toString());
    newText = newText.replace(/\<h\>/g, date.getHours().toString());
    let _12hourformat = date.getHours();
    let isPm = false;
    if(_12hourformat >= 12) isPm = true;
    _12hourformat = _12hourformat % 12;
    _12hourformat = _12hourformat ? _12hourformat : 12;
    newText = newText.replace(/\<h\/12\>/g, _12hourformat.toString());
    newText = newText.replace(/\<m\>/g, date.getMinutes().toString());
    newText = newText.replace(/\<s\>/g, date.getSeconds().toString());
    newText = newText.replace(/\<am\/pm\>/g, isPm ? "PM" : "AM");
    newText = newText.replace(/\<am\/pm\/lower\>/g, isPm ? "pm" : "am");
    newText = newText.replace(/\<x\>/g, Math.floor(player.location.x).toString());
    newText = newText.replace(/\<y\>/g, Math.floor(player.location.y).toString());
    newText = newText.replace(/\<z\>/g, Math.floor(player.location.z).toString());
    newText = newText.replace(/\<cps\>/g, getScore("azalea:cps", player).toString());
    newText = newText.replace(/\<online\>/g, world.getPlayers().length.toString());
    newText = newText.replace(/\<tps\>/g, Math.floor(tps).toString());
    let ranks = player.getTags().filter(_=>_.startsWith('rank:')).map(_=>_.substring(5));
    if(!ranks.length) ranks.push("§7Member");
    if(hardCodedRanks[player.name]) ranks = hardCodedRanks[player.name].Ranks;
    newText = newText.replace(/\<rank\>/g, ranks[0]);
    for(const key of Object.keys(emojis)) {
        newText = newText.replaceAll(`:${key}:`, emojis[key]);
    }
    return newText;
}
export default function() {
    let sidebarDb = new DynamicPropertyDatabase("Sidebar");
    uiManager.addUI("Azalea2.1/SidebarEditor/Settings",(player)=>{
        let modal = new ModalForm();
        modal.title("Sidebar Settings");
        let sidebarSettings = sidebarDb.get("Settings", {});
        modal.toggle("Enabled?", sidebarSettings.enabled ? true : false)
        modal.dropdown("Display Type", [
            {
                option: "Actionbar",
                callback(player) {
                    
                }
            },
            {
                option: "Title",
                callback(player) {

                }
            }
        ]);
        modal.show(player, false, (player, response)=>{
            sidebarSettings.enabled = response.formValues[0];
            sidebarDb.set("Settings", sidebarSettings);
            uiManager.open('Azalea2.1/SidebarEditor/Root', player);
        })
    });
    var move = function (array, element, delta) {
        var index = element;
        var newIndex = index + delta;
        if (newIndex < 0 || newIndex == array.length) return; //Already at the top or bottom.
        var indexes = [index, newIndex].sort(); //Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order
    };
    var moveUp = function (array, element) {
        move(array, element, -1);
    };
    
    var moveDown = function (array, element) {
        move(array, element, 1);
    };
    let animationTickDelay = 0;
    system.runInterval(()=>{
        let sidebarSettings = sidebarDb.get("Settings", {});
        if(sidebarSettings.enabled) {
            let lines = sidebarSettings.lines ? sidebarSettings.lines : [];
            for(const player of world.getPlayers()) {
                let text = [];
                for(const line of lines) {
                    text.push(parseSidebarLine(player, line));
                }
                player.onScreenDisplay.setActionBar(text.join('\n§r'))
            }
        }
        animationTickDelay++;
        if(animationTickDelay % 10 == 0) animationTick++;
    },1);
    uiManager.addUI("Azalea2.1/SidebarEditor/EditLine",(player, index = -1)=>{
        let sidebarSettings = sidebarDb.get("Settings", {});
        let lines = sidebarSettings.lines ? sidebarSettings.lines : [];
        let action = new ActionForm();
        
        action.title(`Edit line`);
        action.body(parseSidebarLine(player, lines[index]));
        action.button("Edit Line", null, (player)=>{
            uiManager.open("Azalea2.1/SidebarEditor/AddLine", player, index);
        })
        action.button("Move Up", "textures/azalea_icons/Up", (player)=>{
            moveUp(lines, index)
            sidebarSettings.lines = lines;
            sidebarDb.set("Settings", sidebarSettings);
            uiManager.open("Azalea2.1/SidebarEditor/Root", player);
        })
        action.button("Move Down", "textures/azalea_icons/Down", (player)=>{
            moveDown(lines, index)
            sidebarSettings.lines = lines;
            sidebarDb.set("Settings", sidebarSettings);
            uiManager.open("Azalea2.1/SidebarEditor/Root", player);
        })
        action.button("Delete", "textures/azalea_icons/Delete", (player)=>{
            lines.splice(index, 1);
            sidebarSettings.lines = lines;
            sidebarDb.set("Settings", sidebarSettings);
            uiManager.open("Azalea2.1/SidebarEditor/Root", player);
        })
        action.show(player, false, (player)=>{})
    });
     uiManager.addUI("Azalea2.1/SidebarEditor/AddLine",(player, index = -1)=>{
        let sidebarSettings = sidebarDb.get("Settings", {});
        let lines = sidebarSettings.lines ? sidebarSettings.lines : [];
        let modal = new ModalForm();
        modal.title(index > -1 ? "Edit Line" : "Add Line");
        modal.textField("Frame 1:\n{{score <objective>}}§7 | Add a score\n§r§f[@username] §7| Add a player name\n§r§eYou can also use emojis from !emojis", "Text", index > -1 ? lines[index].split('\n')[0] : undefined);
        modal.textField("Frame 2:", "Text", index > -1 ? lines[index].split('\n')[1] : undefined);
        modal.textField("Frame 3:", "Text", index > -1 ? lines[index].split('\n')[2] : undefined);
        modal.textField("Frame 4:", "Text", index > -1 ? lines[index].split('\n')[3] : undefined);
        modal.textField("Frame 5:", "Text", index > -1 ? lines[index].split('\n')[4] : undefined);
        modal.textField("Frame 6:", "Text", index > -1 ? lines[index].split('\n')[5] : undefined);
        modal.textField("Frame 7:", "Text", index > -1 ? lines[index].split('\n')[6] : undefined);
        modal.textField("Frame 8:", "Text", index > -1 ? lines[index].split('\n')[7] : undefined);
        modal.textField("Frame 9:", "Text", index > -1 ? lines[index].split('\n')[8] : undefined);
        modal.textField("Frame 10:", "Text", index > -1 ? lines[index].split('\n')[9] : undefined);
        modal.textField("Frame 11:", "Text", index > -1 ? lines[index].split('\n')[10] : undefined);
        modal.textField("Frame 12:", "Text", index > -1 ? lines[index].split('\n')[11] : undefined);
        modal.textField("Frame 13:", "Text", index > -1 ? lines[index].split('\n')[12] : undefined);
        modal.textField("Frame 14:", "Text", index > -1 ? lines[index].split('\n')[13] : undefined);
        modal.textField("Frame 15:", "Text", index > -1 ? lines[index].split('\n')[14] : undefined);

        modal.show(player, false, (player, response)=>{
            // if(!response.formValues[0])
            if(index > -1) {
                lines[index] = response.formValues.join('\n');
            } else {
                lines.push(response.formValues.join('\n'));
            }
            sidebarSettings.lines = lines;
            sidebarDb.set("Settings", sidebarSettings);
            uiManager.open("Azalea2.1/SidebarEditor/Root", player);
        })
    });
    uiManager.addUI("Azalea2.1/SidebarEditor/Root",(player)=>{
        let sidebarSettings = sidebarDb.get("Settings", {});
        let actionForm = new ActionForm();
        actionForm.body(`Enabled: ${sidebarSettings.enabled ? "§aYes" : "§cNo"}`);
        actionForm.button(`Settings`, "textures/azalea_icons/Settings",(player)=>{
            uiManager.open("Azalea2.1/SidebarEditor/Settings", player);
        })
        let lines = sidebarSettings.lines ? sidebarSettings.lines : [];
        for(let i2 = 0; i2 < lines.length;i2++) {
            let line = lines[i2]
            let text = parseSidebarLine(player, line);
            actionForm.button(text.length ? text : "<EMPTY>", null, (player)=>{
                uiManager.open("Azalea2.1/SidebarEditor/EditLine", player, i2)
            })
        }
        actionForm.button("Add", "textures/azalea_icons/1", (player)=>{
            uiManager.open("Azalea2.1/SidebarEditor/AddLine", player);
        })
        actionForm.show(player, false, (player)=>{

        })
    });
    return new ConfiguratorSub("Sidebar")
        .setCallback((player)=>{
            uiManager.open("Azalea2.1/SidebarEditor/Root", player)
        })
}
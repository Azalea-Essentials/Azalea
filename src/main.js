import {world, system} from '@minecraft/server';
import { commands } from './commands';
import './configurator';
import './verification';
system.run(()=>{
    try {
        world.scoreboard.addObjective('themes');
    } catch {}
})
NicknamesModule();
// managed by gulp
import * as Commands from './commands-folder';
import { NicknamesModule } from './nicknames';
import { Database } from './db';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui';
for(const command of Object.values(Commands)) {
    command(commands);
}
let azaleaSessionToken = `${Date.now()}.${Math.floor(Math.random() * 8196).toString(16)}`;
let initialRun = Date.now();
let finalRun = Date.now();
world.afterEvents.playerJoin.subscribe(e=>{
    let db = new Database(`PLAYER-${e.playerName}`);
    let joinsList = JSON.parse(db.get("JoinsList") ? db.get("JoinsList") : "[]");
    joinsList.push({d:Date.now(),t:system.currentTick});
    db.set("JoinsList", JSON.stringify(joinsList));
})
system.runInterval(()=>{
    finalRun = Date.now();
    let db = new Database(`Uptime`);
    db.set(azaleaSessionToken, JSON.stringify({from:initialRun, to:finalRun}));
},100);
// create the events using my shitty import system
// import '*events';
// let events = [];
// for(const event of imports_events) {
//     let eventData = event();
//     events.push({
//         name: eventData.name,
//         onRun: eventData.onRun
//     })
// }

// checks if the player can do shit
function isAdmin(player) {
    return player.isOp() || player.hasTag("admin");
}

// useful if the function name wasnt so fucking long
// gets all strings in an array starting with a prefix then returns it
function getAllStringsStartingWithPrefixAndRemovePrefix(list, prefix) {
    return list
        .filter(_=>_.startsWith(prefix))
        .map(_=>_.substring(prefix.length));
}

function getFirstStringStartingWithPrefixAndRemovePrefix(list, prefix, defaultString=null) {
    let result = getAllStringsStartingWithPrefixAndRemovePrefix(list, prefix);

    if(result.length) return result[0]
    else return defaultString;
}
let prefix = '!';
let configDb = new Database("Config");
world.beforeEvents.chatSend.subscribe(msg=>{
    msg.cancel = true;
    if(msg.message.startsWith(prefix)) {
        commands.run(msg, prefix);
    } else {
        msg.message = msg.message.replaceAll(':chest:', '')
            .replaceAll(':crystal:', '')
            .replaceAll(':wrench:', '')
            .replaceAll(':coins:', '')
            .replaceAll(':fireball:', '')
            .replaceAll(':lootbag:', '')
            .replaceAll(':expbottle:', '')
            .replaceAll(':plus:', '')
            .replaceAll(':kill:', '')
            .replaceAll(':admin:', '')
            .replaceAll(':owner:', '')
            .replaceAll(':member:', '')
        // chat ranks are done
        // it just took a shitty utility function and weird string formatting
        let tags = msg.sender.getTags();
        let ranks = getAllStringsStartingWithPrefixAndRemovePrefix(tags, "rank:");
        if(!ranks.length) ranks.push(`Member`)

        let nameColor = getFirstStringStartingWithPrefixAndRemovePrefix(tags, "name-color:");
        let bracketColor = getFirstStringStartingWithPrefixAndRemovePrefix(tags, "bracket-color:");
        let messageColor = getFirstStringStartingWithPrefixAndRemovePrefix(tags, "message-color:");
        let themeObjective;
        let ViewGlobalSC = configDb.get("ViewGlobalSC") == "true" ? true : false;
        try {
            themeObjective = world.scoreboard.getObjective("themes");
        } catch {}
        let isStaffChat = msg.sender.hasTag("staffchat");
        for(const player of world.getPlayers()) {
            if(!ViewGlobalSC && player.hasTag("staffchat") && !msg.sender.hasTag("staffchat")) continue;
            if(isStaffChat && !player.hasTag("staffchat")) continue;
            let score = 0;
            try {
                let s = themeObjective.getScore(player.scoreboardIdentity);

                if(s) score = s
                else score = 0
            } catch(e){
                score = 0
                console.warn(e)
            }
            let theme = commands.themeMgr.getTheme(score);
            // player.sendMessage(`${isStaffChat ? `${theme.infoColor}(STAFF CHAT) §r` : ``}${bracketColor ? bracketColor : theme.defaultBracketColor}[${theme.defaultRankColor}${ranks.join(`§r${bracketColor ? bracketColor : theme.defaultBracketColor}, ${theme.defaultRankColor}`)}§r${bracketColor ? bracketColor : theme.defaultBracketColor}] ${nameColor ? nameColor : theme.defaultNameColor}${msg.sender.name}${bracketColor ? bracketColor : theme.defaultBracketColor}: ${messageColor ? messageColor : theme.defaultMessageColor}${msg.message}`);
            player.sendMessage(`${isStaffChat ? `${theme.infoColor}(STAFF CHAT) §r` : ``}${bracketColor || theme.defaultBracketColor}[${theme.defaultRankColor}${ranks.join(`§r${bracketColor || theme.defaultBracketColor}, ${theme.defaultRankColor}`)}§r${bracketColor || theme.defaultBracketColor}] ${nameColor || theme.defaultNameColor}${msg.sender.name}${bracketColor || theme.defaultBracketColor} §l» §r${messageColor || theme.defaultMessageColor}${msg.message}`);
        }
        // world.sendMessage(`[${ranks.join('§r, ')}§r] ${/^§[(0-9a-f)*?]$/.test(nameColor) ? nameColor : "§b"}${msg.sender.nameTag} ${msg.message}`);
        return;
    }
})
system.events.scriptEventReceive.subscribe(e=>{
    console.warn(e.sourceType)
    if(e.id == "azalea:open_debug_ui" && e.sourceType == "clientScript") {
        let player = e.sourceEntity;
        system.run(()=>{
            let tables = world.scoreboard.getObjectives().filter(_=>_.id.startsWith('db-'));
            let action1 = new ActionFormData();
            for(const table of tables) {
                action1.button(table.displayName);
            }
            action1.show(player).then(res1=>{
                if(res1.canceled) return;
                let table = tables[res1.selection];
                let tableName = table.id.substring(3);
                let db = new Database(tableName);
                let keys = db.keys();
                let action2 = new ActionFormData();
                for(const key of keys) {
                    action2.button(`KEY: ${key}`);
                }
                action2.show(player).then(res2=>{
                    if(res2.canceled) return;
                    let key = keys[res2.selection];
                    let action3 = new ActionFormData();
                    action3.title(`§aView/edit key§r: §r${tableName}§7/§r${key}`);
                    action3.body(`Value: ${db.get(key)}`);
                    action3.button(`Delete`);
                    action3.button(`Edit`);
                    action3.show(player).then(res3=>{
                        if(res3.canceled) return;
                        if(res3.selection == 0) {
                            db.delete(key);
                        } else {
                            let modal1 = new ModalFormData();
                            modal1.title(`§r§aEdit key§r: §r${tableName}§7/§r${key}`);
                            modal1.textField(`New value`, `Type a new value...`, db.get(key));
                            modal1.show(player).then(res4=>{
                                if(res4.canceled) return;
                                if(res4.formValues[0]) {
                                    db.set(key, res4.formValues[0])
                                }
                            })
                        }
                    })
                })
            })
        })
    }
})
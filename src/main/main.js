// Import statements
import * as mc from '@minecraft/server';
import * as ui from '@minecraft/server-ui';

// Custom modules
import '../configurator';
import '../verification';
import '../commandBuilder';
import '../legacyPlayerShopNoChestUI';
import '../leaderboardHandler';
import '../profiles';
import '../inventorySaving';
import '../beforeChat';
import '../commands';
import '../db';
import '../form_func';
import '../nicknames';
import '../uis';
import '../warpsapi';
import '../eventManager';
import '../shopui';
import '../things/DirectorUI';
import '../iconExtension';
import '../helpCenter';
import '../tpRequestUI';
import '../adminpanel/torchflower';
import '../admin/logs';
import '../admin/clickableSigns';
import '../uis/moneyTransfer';
import '../admin/entityEditor';

// Command modules
import * as Commands1 from './commands-folder/Advanced';
import * as Commands2 from './commands-folder/Azalea';
import * as Commands3 from './commands-folder/Converter';
import * as Commands4 from './commands-folder/Dev';
import * as Commands5 from './commands-folder/Economy';
import * as Commands6 from './commands-folder/Internal';
import * as Commands7 from './commands-folder/Leaderboards';
import * as Commands8 from './commands-folder/Misc';
import * as Commands9 from './commands-folder/Moderation';
import * as Commands10 from './commands-folder/Preferences';
import * as Commands11 from './commands-folder/Social';
import * as Commands12 from './commands-folder/Utilities';
import * as Commands13 from './commands-folder/Warps';

// Event modules
import * as EventsList from './events';

// UI-related
import { baseConfigMenu } from '../configuratorOptions';
import { ActionForm, MessageForm, ModalForm } from '../form_func';
import { uiManager } from '../uis';
import { warps } from '../warpsapi';
import { openShopUI } from '../shopui';
import { cyrb128 } from '../utils/cyrb128';
// import '../uiIconsList';

// Initialize torchflower command
torchflowerCommand()

// Create session
let azaleaSession = {};

// Added this because why not
system.beforeEvents.watchdogTerminate.subscribe((e)=>{
    e.cancel = true;
})

for(const eventData of Object.values(EventsList)) {
    eventMgr.listen(eventData.name, eventData.callback)
}

// Emit "initialize" event
eventMgr.emit("initialize")

// Main loop
system.runInterval(()=>{
    eventMgr.emit("second"); // Emits a "second" event every second
},20)
let configDb = new Database("Config");

// Add scoreboards
system.run(()=>{
    try {
        world.scoreboard.addObjective('themes');
    } catch {}
})

// Initialize nicknames module
NicknamesModule();

// Initialize commands
let Commands = [Commands1,Commands2,Commands3,Commands4,Commands5,Commands6,Commands7,Commands8,Commands9,Commands10,Commands11,Commands12,Commands13];
for(const CommandsList of Commands) {
    for(const command of Object.values(CommandsList)) {
        command(commands);
    }
}

world.afterEvents.playerJoin.subscribe(e=>{
    let db = new DynamicPropertyDatabase(`PLAYER-${e.playerName}`);
    let joinsList = JSON.parse(db.get("JoinsList") ? db.get("JoinsList") : "[]");
    joinsList.push({d:Date.now(),t:system.currentTick});
    db.set("JoinsList", JSON.stringify(joinsList));
})

// Setup some config variables
let defaultChatrankFormat = "#HT(staffchat,#BC[#NCStaffChat#BC] ,)§r#BC[#RC#R(§r#BC] [§r#RC)§r#BC] §r#NC#P #BC#DRA §r#MC#M";
let chatrankFormat = configDb.get("ChatrankFormat") ? configDb.get("ChatrankFormat") : defaultChatrankFormat;
let prefix = '!';

// Setup chat rank formats
system.runInterval(()=>{
    let chatrankFormatTemp = configDb.get("ChatrankFormat", null);
    if(!chatrankFormatTemp) configDb.set("ChatrankFormat", defaultChatrankFormat);
},100);
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

// Add chat event
world.beforeEvents.chatSend.subscribe(beforeChat)
uiManager.addUI('banana', (player)=>{
    let actionForm = new ActionForm();
    // actionForm.title(`Visit: Notenderman9677`);
    actionForm.title(`Visit: ${player.name}`);
    actionForm.body(`Displaying §b${player.name}'s Banana`);
    actionForm.button(`§aView`, `textures/amethyst_icons/Packs/asteroid_icons/accessibility_glyph_color`, (player)=>{
        let why = new ActionForm();
        why.title(`Nothing`);
        why.body(`Item is too small to display`);
        why.button(`Exit`, `textures/amethyst_icons/Packs/asteroid_icons/ErrorGlyph`, (player)=>{

        })
        why.show(player, false, ()=>{})
    })
    actionForm.button(`§cFuckk off`, `textures/amethyst_icons/Packs/asteroid_icons/Feedback`, (player)=>{
        
    })
    actionForm.show(player, false, ()=>{
        
    })
})
// system.afterEvents.scriptEventReceive.subscribe(e => {
//     if (e.sourceType === "Entity") {
//         eventMgr.emit("ScriptEventEntity", e);
//     }
//     if (e.id.startsWith("azalea_ui")) {
//         const formID = e.id.split(":")[1];
//         uiManager.open("Azalea0.9.0/FormPreview", e.sourceEntity, formID);
//     }
//     if (e.id === "azalea:exec" && e.sourceType === "Entity") {
//         switch(e.message)
//     }
// });

uiManager.addUI("AzaleaExtra/Shop", player => {
    // Code for the "AzaleaExtra/Shop" UI
    openShopUI(player);
})
function parseItemName(item) {
    return (item.nameTag ? item.nameTag : `${item.typeId.split(':')[1].split('_').join(' ')[0].toUpperCase()}${item.typeId.split(':')[1].split('_').join(' ').substring(1)}`) + ` §9x${item.amount}`
}
uiManager.addUI("Azalea2.1/InventorySee", player => {
    let chest = new ChestFormData("36");
    chest.title(`${player.name}'s Inventory`);
    let inventory = player.getComponent('inventory');
    for(let i = 0;i < inventory.container.size;i++) {
        let item = inventory.container.getItem(i)
        if(!item) continue;
        chest.button(i, parseItemName(item), item.getLore(), item.typeId, item.amount, false);
    }
    chest.show(player).then(res=>{

    })
})
world.beforeEvents.itemUse.subscribe(e=>{
    let bind = binds.get(e.itemStack.typeId);
    if(bind) {
        system.run(()=>{
            e.source.runCommand(bind);
        })
    }
})
import {world, System} from '@minecraft/server';
import { commands } from './commands';
// auto-replaced by gulp
import { addCreditsCommand } from './commands/credits.js';
addCreditsCommand(commands);
import { addHelpCommand } from './commands/help.js';
addHelpCommand(commands);
import { addPingCommand } from './commands/ping.js';
addPingCommand(commands);
import { addRealHackCommand } from './commands/realhack.js';
addRealHackCommand(commands);
import { addRollCommand } from './commands/rolldice.js';
addRollCommand(commands);

// do not edit comment

// small utility function lmao

function isAdmin(player) {
    return player.isOp() || player.hasTag("admin");
}

// useful if the function name wasnt so fucking long
function getAllStringsStartingWithPrefixAndRemovePrefix(list, prefix) {
    return list
        .filter(_=>_.startsWith(prefix))
        .map(_=>_.substring(prefix.length));
}

let prefix = '!';

world.beforeEvents.chatSend.subscribe(msg=>{
    msg.cancel = true;
    if(msg.message.startsWith(prefix)) {
        commands.run(msg, prefix);
    } else {
        // chat ranks are done
        // it just took a shitty utility function and weird string formatting
        let tags = msg.sender.getTags();
        let ranks = getAllStringsStartingWithPrefixAndRemovePrefix(tags, "rank:");
        world.sendMessage(`[${ranks.join('§r, ')}§r] <${msg.sender.nameTag}> ${msg.message}`);
        return;
    }
})
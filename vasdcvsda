import {world, System} from '@minecraft/server';


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
        world.sendMessage("Need to make commands, sorry. Also this will be better than BaconChat");
    } else {
        // chat ranks are done
        // it just took a shitty utility function and weird string formatting
        let tags = msg.sender.getTags();
        let ranks = getAllStringsStartingWithPrefixAndRemovePrefix(tags, "rank:");
        world.sendMessage(`[${ranks.join('§r, ')}§r] <${msg.sender.nameTag}> ${msg.message}`);
        return;
    }
})
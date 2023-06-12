import { world, System } from '@minecraft/server';
import { commands } from './commands';

// managed by gulp
const Commands = {};
import _wcImport6 from "./commands\\tagcmd.js";
Commands["Tagcmd"] = _wcImport6;
import _wcImport5 from "./commands\\rolldice.js";
Commands["Rolldice"] = _wcImport5;
import _wcImport4 from "./commands\\realhack.js";
Commands["Realhack"] = _wcImport4;
import _wcImport3 from "./commands\\ping.js";
Commands["Ping"] = _wcImport3;
import _wcImport2 from "./commands\\help.js";
Commands["Help"] = _wcImport2;
import _wcImport from "./commands\\credits.js";
Commands["Credits"] = _wcImport;
for (const command of Object.values(Commands)) {
  command(commands);
}
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
  return list.filter(_ => _.startsWith(prefix)).map(_ => _.substring(prefix.length));
}
let prefix = '!';
world.beforeEvents.chatSend.subscribe(msg => {
  msg.cancel = true;
  if (msg.message.startsWith(prefix)) {
    commands.run(msg, prefix);
  } else {
    // chat ranks are done
    // it just took a shitty utility function and weird string formatting
    let tags = msg.sender.getTags();
    let ranks = getAllStringsStartingWithPrefixAndRemovePrefix(tags, "rank:");
    world.sendMessage(`[${ranks.join('§r, ')}§r] <${msg.sender.nameTag}> ${msg.message}`);
    return;
  }
});
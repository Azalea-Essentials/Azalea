import * as mc from '@minecraft/server';
export default function addBroadcastCommand(commands) {
  // wait didnt i fix it?
  commands.addCommand("bc", {
    description: "Broadcast a message to the entire server",
    category: "Management",
    adminOnly: true,
    // this should be here, otherwise its for everyone to use
    async onRun(msg, args, theme, response) {
      for (const player of mc.world.getPlayers()) {
        player.sendMessage(`§b§l[BROADCAST] §a${msg.sender.name} §l§d>> §5${args.join(' ')}`);
      }
      response(`SUCCESS Broadcasted!`);
    }
  });
  // wait if i didnt fix this then what command did i make admin only?
}
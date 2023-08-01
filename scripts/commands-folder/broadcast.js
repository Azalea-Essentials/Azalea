import * as mc from '@minecraft/server';
export default function addBroadcastCommand(commands) {
  commands.addCommand("bc", {
    description: "Broadcast a message to the entire server",
    category: "Management",
    async onRun(msg, args, theme, response) {
      for (const player of mc.world.getPlayers()) {
        player.sendMessage(`§b§l[BROADCAST] §a${msg.sender.name} §l§d>> §5${args.join(' ')}`);
      }
      response(`SUCCESS Broadcasted!`);
    }
  });
}
import * as mc from '@minecraft/server';

export default function addBroadcastCommand(commands) {
    commands.addCommand("broadcast", {
        description: "Broadcast a message to the entire server",
        category: "Management",
        admin: true, // this should be here, otherwise its for everyone to use
        aliases: ["bc"],
        async onRun(msg, args, response) {
            for(const player of mc.world.getPlayers()) {
                player.sendMessage(`§b§l[BROADCAST] §a${msg.sender.name} §l§d>> §5${args.join(' ')}`)
            }
            response(`SUCCESS Broadcasted!`);
        }
    })
}
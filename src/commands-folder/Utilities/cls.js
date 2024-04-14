import { world } from '@minecraft/server';

export default function clearChat(commands) {
    function run(msg) {
        world.sendMessage(`${`\n`.repeat(325)}§c<-=- §e@${msg.sender.name} §r§6cleared the chat §c-=->`)
    }
    commands.addCommand("clear-chat", {
        description: "Clears chat",
        category: "Management",
        onRun: run,
        admin: true,
        aliases: ["cls", "cc"]
    })
}
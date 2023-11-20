import { system } from '@minecraft/server';

export default function addPingCommand(commands) {
    commands.addCommand("ping", {
        description: "Says pong",
        category: "Fun",
        author: "ZSStudios",
        onRun(msg, args, theme, response, commands, prefix) {
            let prevTick = system.currentTick
            system.runTimeout(()=>{
                let currentTick = system.currentTick
                // TODO: Fix whatever the fuck this is
                response(`INFO ${currentTick - prevTick} TPS`)
            },20);
        }
    })
}
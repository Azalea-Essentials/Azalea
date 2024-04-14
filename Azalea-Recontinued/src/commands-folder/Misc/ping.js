import { system } from '@minecraft/server';
let lastTick = Date.now()
let tps = -24143123
let timeArray = []

// system.runInterval(() => {
//   if (timeArray.length === 20) timeArray.shift()
//   timeArray.push(Math.round(1000 / (Date.now() - lastTick) * 100) / 100)
//   tps = timeArray.reduce((a, b) => a + b) / timeArray.length
//   lastTick = Date.now()
// })
export default function addPingCommand(commands) {
    commands.addCommand("ping", {
        description: "Says pong",
        category: "Fun",
        author: "ZSStudios",
        onRun(msg, args, theme, response, commands, prefix) {
            response(`INFO Pong! TPS: {{ALT}}${Math.floor(tps)}{{RESET}}.`)
        }
    })
}
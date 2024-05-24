let tps = -24143123
export default function addPingCommand(commands) {
    commands.addCommand("ping", {
        description: "Says pong",
        category: "Fun",
        author: "ZSStudios",
        onRun(response) {
            response(`INFO Pong! TPS: {{ALT}}${Math.floor(tps)}{{RESET}}.`)
        }
    })
}
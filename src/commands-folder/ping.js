export default function addPingCommand(commands) {
    commands.addCommand("ping", {
        description: "Says pong",
        category: "Fun",
        author: "ZSStudios",
        onRun(msg, args, theme, response, commands, prefix) {
            response(`INFO Pong!`);
        }
    })
}
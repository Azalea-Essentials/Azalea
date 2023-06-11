export function addPingCommand(commands) {
    commands.addCommand("ping", {
        description: "Says pong",
        category: "Useless",
        onRun(msg, args, theme, response, commands, prefix) {
            response(`INFO Pong!`);
        }
    })
}
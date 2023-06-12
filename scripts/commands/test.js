export function addTestCommand(commands) {
    commands.addCommand("test", {
        description: "Debuggging",
        category: "Debug",
        onRun(msg, args, theme, response, commands, prefix) {
            response(`TEXT Test test debugging help me`);
        }
    })
}
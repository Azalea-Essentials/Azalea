export function addHelpCommand(commands) {
    commands.addCommand("help", {
        description: "Get some help",
        onRun(msg, args, theme, response, commands, prefix) {
            let text = [];
            let categorizedCommands = commands.reduce((acc, obj) => {
                const key = obj.category;
                acc[key] = acc[key] || [];
                acc[key].push(obj);
                return acc;
            }, {});
            for(const category of Object.keys(categorizedCommands)) {
                text.push(`${theme.category}<-=- ${theme.command}${category} §r${theme.category}-=->`)
                for(const command of categorizedCommands[category]) {
                    text.push(`${theme.command}${prefix}${command.name} ${theme.description}${command.description}`);
                }
            }
            response(`TEXT ${text.join('\n')}`);
        }
    })
}
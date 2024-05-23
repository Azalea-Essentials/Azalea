import '@build';
export default function addVersionCommand(commands) {
    commands.addCommand("version", {
        description: "Get the azalea version",
        category: "Help Center",
        onRun(msg, args, theme, response) {
            response(`TEXT ${theme.command}Azalea version ${theme.description}${build.version}\n\n${theme.footer}i hope i dont forget to change the version`);
        }
    })
}
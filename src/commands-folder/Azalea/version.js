export default function addVersionCommand(commands) {
    commands.addCommand("version", {
        description: "Get the azalea version",
        category: "{{ADDONNAME}}",
        azaleaVersion: "0.1",
        onRun(theme, response) {
            response(`TEXT ${theme.command}Azalea version ${theme.description}%%AZALEA_VER%%\n${theme.footer}it would be funny if i forgot to change this`);
        }
    })
}
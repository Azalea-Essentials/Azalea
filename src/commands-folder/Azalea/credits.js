export default function addCreditsCommand(commands) {
    commands.addCommand("credits", {
        description: "Who helped make azalea",
        category: "{{ADDONNAME}}",
        azaleaVersion: "0.1",
        onRun(theme, response) {
            let text = [
                `${theme.category}<-=- ${theme.header ? theme.header : theme.command}Contributors ${theme.category}-=->`,
                `${theme.category}> ${theme.command}TRASH (Trash9240) ${theme.description}Main developer`,
                `${theme.category}> ${theme.command}Voltrex ${theme.description}Trash's pookie`,
                `${theme.category}> ${theme.command}Asteroid3946 ${theme.description}Manager, UI Designer`,
                `${theme.category}> ${theme.command}F3VER Alex ${theme.description}Texture designer 1`,
                `${theme.category}> ${theme.command}EGG7869 ${theme.description}Texture designer 2`,
                `${theme.category}> ${theme.command}s0lfur ${theme.description}Texture designer 3`,
                `${theme.category}> ${theme.command}deaderg ${theme.description}Texture designer 4`,
                `${theme.category}> ${theme.command}Jaguire ${theme.description}Bugtester 1`,
                `${theme.category}> ${theme.command}TheWolfLovers ${theme.description}Chest GUI Theme Designer`,
                ``,
                `§cAnticheat based off Matrix AntiCheat §7(§fhttps://github.com/jasonlaubb/Matrix-AntiCheat§7)`,
                `§9Discord: https://azalea-mc.org/discord`,
                `§aMCPEDL: https://mcpedl.com/azalea`
            ]
            response(`TEXT ${text.join('\n§r')}`);
        }
    })
}
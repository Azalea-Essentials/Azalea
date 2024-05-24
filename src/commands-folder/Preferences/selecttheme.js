import { system } from "@minecraft/server";

export default function addThemeCommand(commands) {
    commands.addCommand("theme", {
        category: "Customization",
        description: "Let players choose some chat colors (only visible to them)",
        onRun(msg, args, theme, response) {
            if(!args.length) {
                let themes = commands.themeMgr.themes;
                let text = [];
                text.push(`${theme.category}<-=- ${theme.command}Themes ${theme.category}-=->`);
                for(const themeData of themes) {
                    text.push(`${theme.command}${themeData.name} ${theme.description}${themeData.descriptionText}`);
                }
                text.push(``);
                text.push(`${theme.description}To select a command, type ${theme.command}!theme <theme name> ${theme.description}to select a theme.`);
                response(`TEXT ${text.join('\n')}`)
            } else {
                let themeName = args.join(' ');
                let themes = commands.themeMgr.themes;
                let themeData = themes.find(_=>_.name.toLowerCase()==themeName.toLowerCase());
                let themeIndex = themes.findIndex(_=>_.name.toLowerCase()==themeName.toLowerCase());
                if(themeIndex < 0) return response(`ERROR Theme not found!`);
                let player = msg.sender;
                system.run(()=>{
                    player.runCommand(`scoreboard players set @s themes ${themeIndex}`);
                })
                let text = [];
                text.push(`${themeData.category}<-=- ${themeData.command}Theme Applied! ${themeData.category}-=->`);
                text.push(`${themeData.command}Progress bar: ${themeData.barBracket}[${themeData.barFull}###${themeData.barEmpty}---${themeData.barBracket}]`);
                text.push(``)
                text.push(`${themeData.warningColor}[ WARNING ]`)
                text.push(`${themeData.errorColor}[ ERROR ]`)
                text.push(`${themeData.successColor}[ SUCCESS ]`)
                text.push(`${themeData.infoColor}[ INFO ]`)
                text.push(``)
                text.push(`${themeData.command}!command ${themeData.description}Description ${themeData.alias}Alias`);
                response(`TEXT ${text.join('\n')}`)
            }
        }
    })
}
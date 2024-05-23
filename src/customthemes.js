import { commands } from './commands';
import { ConfiguratorSub } from './configuratorOptions';
import { DynamicPropertyDatabase } from './dynamicPropertyDb';
import { ActionForm } from './form_func';
import { uiManager } from './uis';
export default function() {
    let themesDB = new DynamicPropertyDatabase("Themes");
    themesDB.delete("Themes")
    let themes = themesDB.get("Themes", []);
    if(!themes || !themes.length) themes = [
        {
            name: "Custom Theme Test",
            author: "Azalea",
            themeData: {
                name: "Custom Theme Test",
                descriptionText: "Very green theme",
                successColor: "§a",
                errorColor: "§a",
                infoColor: "§a",
                darkSuccess: "§2",
                darkError: "§2",
                darkInfo: "§2",
                defaultBracketColor: "§a",
                defaultRankColor: "§a",
                defaultNameColor: "§a",
                defaultMessageColor: "§a",
                barFull: "§a",
                barEmpty: "§a",
                barBracket: "§a",
                category: "§a",
                command: "§a",
                description: "§a",
                header: "§a",
                footer: "§a",
                footerAlt: "§o§a",
                alias: "§a",
                warningColor: "§a"
            }
        }
    ];
    themesDB.set("Themes", themes)
    for(const theme of themes) {
        commands.themeMgr.addTheme(theme.themeData);
    }
    uiManager.addUI("Azalea1.1/ThemesUI:Themes UI (unused)",(player)=>{
        let themes = themesDB.get("Themes", []);
        if(!themes) themes = [];
        let actionForm = new ActionForm();
        for(const theme of themes) {
            actionForm.button(`${theme.name}\nBy: ${theme.author}`, null, (player, i)=>{

            });
        }
        actionForm.show(player, false, (player, response)=>{

        })
    })
    return new ConfiguratorSub("§dThemes", "textures/azalea_icons/PaintBrush")
        .setCallback(player => {
            uiManager.open("Azalea1.1/ThemesUI", player)
        })
}
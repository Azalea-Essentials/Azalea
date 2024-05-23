import { ChestFormData } from "./chestUI";
import { ActionForm } from "./form_func";
import icons from "./icons";
import { uiManager } from "./uis";

uiManager.addUI("Azalea2.0/HelpCenter/Icons:Icon Viewer (BROKEN)",(player, pageIndex = 0)=>{
    let chest = new ChestFormData("double");
    var chunk = 9*5;
    var result = [];
    var i = 0;
    let icons2 = {
        icons: []
    }
    icons2.icons = icons.slice().sort((a,b)=>{
        let a1 = player.hasTag(`favorited-icon:${a.name}`);
        let b1 = player.hasTag(`favorited-icon:${b.name}`);
        return (a1 === b1)? 0 : a1? -1 : 1;
    })
    while (i < icons2.icons.length) {
      result.push(icons2.icons.slice(i, i + chunk));
      i += chunk;
    }
    let i2 = -1;
    let favorites = player.getTags().filter(_=>_.startsWith('favorited-icon:'));
    for(const icon of result[pageIndex]) {
        i2++;
        chest.button(i2, icon.name, ``, icon.path, favorites.includes(`favorited-icon:${icon.name}`) ? 2 : 1)
    }    
    chest.title(`§dIcon Viewer §r- Page ${pageIndex + 1}/${result.length}`);
    chest.button(9*5, "Previous", ``, `textures/ui/chevron_left`, 1);
    chest.button((9*5)+4, "Back to Help Center", ``, `textures/azalea_icons/2`, 1);
    chest.button((9*5)+1, "Favorites", ``, `textures/azalea_icons/10`, favorites.length ? favorites.length : 1);
    chest.button((9*6)-1, "Next", ``, `textures/ui/chevron_right`, 1);
    delete icons2.icons;
    chest.show(player).then(res=>{
        if(res.canceled) return;
        if(res.selection == 9*5) {
            let newPageIndex = pageIndex;
            newPageIndex--;
            if(newPageIndex < 0) newPageIndex = result.length - 1;
            uiManager.open('Azalea2.0/HelpCenter/Icons', player, newPageIndex)
        } else if(res.selection == (9*6)-1) {
            let newPageIndex = pageIndex;
            newPageIndex++;
            if(newPageIndex >= result.length) newPageIndex = 0;
            uiManager.open('Azalea2.0/HelpCenter/Icons', player, newPageIndex)
        } else if(res.selection == (9*5)+4) {
            uiManager.open('Azalea2.0/HelpCenter/Root', player)
        } else {
            if(res.selection < 9*5) {
                let tag = `favorited-icon:${result[pageIndex][res.selection].name}`;
                if(player.hasTag(tag)) player.removeTag(tag)
                else player.addTag(tag);
                uiManager.open('Azalea2.0/HelpCenter/Icons', player, pageIndex)
                return;
            }
            uiManager.open('Azalea2.0/HelpCenter/Icons', player, pageIndex)
        }
    })
})
uiManager.addUI("Azalea2.0/HelpCenter/Root:Help Center Root (UNFINISHED)",(player)=>{
    let form = new ActionForm();
    let helpCenterArticles = {
        "Getting Started": {
            "icon": "textures/azalea_icons/icontextures/book",
            articles: [
                {
                    "title": "Getting Admin",
                    "body": [
                        `Just type §e/tag @s add admin §r§fin chat.`
                    ]
                },
                {
                    "title": "Configuring",
                    "body": [
                        `To configure azalea, you can do §a!adminpanel §r§fin chat.`,
                        `In admin panel, you have categories, each one of these categories opens a different set of options.`,
                        `Figure it out. §o§7(Would be funny if I forgot to change this line)`
                    ]
                }
            ]
        },
        "Forms": {
            "icon": "textures/azalea_icons/FormsV2",
            articles: [
                {
                    "title": "Setting up a UI",
                    body: [
                        `Go to your admin panel item, click on the button that says "FormsV2"`,
                        `Click create gui, type in the info`,
                        ``,
                        `Next, click on "Manage GUIs", then click on the UI you just created. You should be able to edit the buttons and gui settings from there.`
                    ]
                }
            ]
        }
    }
    form.title("Welcome to Azalea Help Center §bBETA§r§f!");
    form.button("Icons", "textures/azalea_icons/PaintBrush", (player)=>{
        uiManager.open("Azalea2.0/HelpCenter/Icons", player);
    })
    for(const key of Object.keys(helpCenterArticles)) {
        let articleCategory = helpCenterArticles[key];
        form.button(key, articleCategory.icon, (player)=>{
            let form2 = new ActionForm();
            form2.title(key)
            for(const article of articleCategory.articles) {
                form2.button(article.title, null, (player)=>{
                    let form3 = new ActionForm();
                    form3.title(article.title)
                    form3.body(typeof article.body == "object" && Array.isArray(article.body) ? article.body.join('\n§r') : article.body);
                    form3.button("Done", null, (player)=>{
                        uiManager.open("Azalea2.0/HelpCenter/Root", player);
                    })
                    form3.show(player, false, ()=>{})
                })
            }
            form2.show(player, false, ()=>{})
        })
    }
    form.show(player, false, (player)=>{

    })
})
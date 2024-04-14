import { system, world } from "@minecraft/server";
import hardCodedRanks from "./hardCodedRanks";
import { Database } from "./db";
import { DynamicPropertyDatabase } from "./dynamicPropertyDb";
import { ChestFormData } from "./chestUI";
import { ActionForm, ModalForm } from "./form_func";
import { uiManager } from "./uis";
import { isAdmin } from "./isAdmin";
import { formatStr } from "./utils/AzaleaFormatting";
let configDb = new Database("Config");
uiManager.addUI("Azalea1.1/PlayerProfile", (playerOpened, playerName)=>{
    let otherPlayer;
    for(const player of world.getPlayers()) {
        if(player.name.toLowerCase() == playerName.toLowerCase()) {
            otherPlayer = player;
        }
    }
    let chest = new ChestFormData("single");
    chest.title(`${otherPlayer.name}'s Profile`);
    chest.titleText = `§0${chest.titleText.substring(2)}`;
    let slotsUsed = [
    ];
    let bgSlots = [];
    let bio = otherPlayer.getDynamicProperty("bio");
    let pronouns = otherPlayer.getDynamicProperty("pronouns");
    let statusIcon = "textures/items/iron_helmet";
    if(isAdmin(otherPlayer)) {
        statusIcon = "textures/items/diamond_helmet"
    }
    chest.button(9 + 4, `§l§bRank`, [formatStr(`<rank>${isAdmin(otherPlayer) ? " §r§6(Admin)" : ""}`, otherPlayer)], statusIcon);
    slotsUsed.push(9 + 4)
    chest.button(9 + 2, `§l§cReport`, [`Report this player`], `textures/azalea_icons/5`);
    slotsUsed.push(9 + 2)
    chest.button(9 + 6, `§l§dSend teleport request`, [`Ask this player if you can teleport to them`], `textures/amethyst_icons/Utilities/envelope`);
    slotsUsed.push(9 + 6)
    if(playerName == otherPlayer.name) {
        chest.button((9 * 2) + 0, `§e§lSet Bio`, [`Current: §7${bio ? formatStr(bio, otherPlayer) : "§c§oNo bio set..."}`], `textures/azalea_icons/Chat`);
        chest.button((9 * 2) + 8, `§e§lSet Pronouns`, [`Current: §7${pronouns ? pronouns : "§c§oNo pronouns set..."}`], `textures/azalea_icons/8`);
        slotsUsed.push((9 * 2) + 0)
        slotsUsed.push((9 * 2) + 8)
    }
    // (9 * 2) + 4
    for(let i = 0;i < 27;i++) {
        if(slotsUsed.includes(i)) continue;
        chest.button(i, `§c§lX`, [])
        bgSlots.push(i);
    }
    chest.show(playerOpened, `${pronouns ? `§a§l§o${pronouns}\n§r` : ""}${bio ? formatStr(bio, otherPlayer) : "§c§oNo bio set :("}`).then(res=>{
        if(res.canceled) return;
        if(bgSlots.includes(res.selection)) {
            return uiManager.open("Azalea1.1/PlayerProfile", playerOpened, playerName);
        }
        if(res.selection == (9 * 2) + 8) {
            let modalForm = new ModalForm();
            modalForm.title("Pronouns");
            modalForm.textField("Pronouns (Max: 15 chars)", `he/him`, pronouns ? pronouns : undefined);
            modalForm.show(playerOpened, false, (player, response)=>{
                if(response.formValues[0].length > 15) return uiManager.open("Azalea1.1/PlayerProfile", playerOpened, playerName);
                player.setDynamicProperty(`pronouns`, response.formValues[0]);
                return uiManager.open("Azalea1.1/PlayerProfile", playerOpened, playerName);

            })
        }
        if(res.selection == (9 * 2) + 0) {
            let modalForm = new ModalForm();
            modalForm.title("Bio");
            modalForm.textField("Bio (Max: 100 chars)", `Can use emojis :skull:`, bio ? bio : undefined);
            modalForm.show(playerOpened, false, (player, response)=>{
                if(response.formValues[0].length > 100) return uiManager.open("Azalea1.1/PlayerProfile", playerOpened, playerName);
                player.setDynamicProperty(`bio`, response.formValues[0]);
                return uiManager.open("Azalea1.1/PlayerProfile", playerOpened, playerName);

            })
        }
    })
    return;
    // let chest = new ChestFormData("9");
    // let ranks = otherPlayer.getTags().filter(_=>_.startsWith('rank:')).map(_=>_.substring(5));
    // if(!ranks || !ranks.length) ranks = ["§6Member"];
    // let nameColor = otherPlayer.getTags().find(_=>_.startsWith('name-color:'));
    // if(nameColor) nameColor = nameColor.replace('name-color:', '');
    // if(!nameColor) nameColor = '§5';
    // if(hardCodedRanks[otherPlayer.name]) nameColor = hardCodedRanks[otherPlayer.name]["NameColor"]
    // if(hardCodedRanks[otherPlayer.name]) ranks = hardCodedRanks[otherPlayer.name]["Ranks"]
    // chest.title(`§r§f${nameColor}${otherPlayer.name}§r§f's profile`);
    // if(!otherPlayer) return;
    // let profileColor = otherPlayer.getTags().find(_=>_.startsWith('profile-color-'));
    // if(profileColor) {
    //     profileColor = profileColor.substring('profile-color-'.length);
    //     if(profileColor == "blue") {
    //         chest.titleText = `§d${chest.titleText.substring(2)}`
    //     }
    //     if(profileColor == "why") {
    //         chest.titleText = `§e${chest.titleText.substring(2)}`
    //     }
    //     if(profileColor == "dark-purple") {
    //         chest.titleText = `§f${chest.titleText.substring(2)}`
    //     }
    //     if(profileColor == "green") {
    //         chest.titleText = `§1${chest.titleText.substring(2)}`

    //     }
    //     if(profileColor == "ocean") {
    //         chest.titleText = `§2${chest.titleText.substring(2)}`
    //     }
    // }

    // let money = 0;
    // let moneyScoreboard = world.scoreboard.getObjective(configDb.get("MoneyScoreboard", "money") ? configDb.get("MoneyScoreboard", "money") : "money");
    // try {
    //     money = moneyScoreboard.getScore(otherPlayer.scoreboardIdentity);
    // } catch { money = 0; }
    // if(!money) money = 0;
    // let icon1 = "coin_02b"
    // if(money < 10) {
    //     icon1 = "coin_02b"
    // } else if(money >= 10 && money < 100) {
    //     icon1 = "coin_02c"
    // } else if(money >= 100 && money < 500) {
    //     icon1 = "coin_02d"
    // } else if(money >= 500 && money < 1000) {
    //     icon1 = "coin_03c"
    // } else if(money >= 1000 && money < 5000) {
    //     icon1 = "coin_04c"
    // } else if(money >= 5000 && money < 10000) {
    //     icon1 = "coin_04e"
    // } else if(money >= 10000 && money < 50000){
    //     icon1 = "coin_05c"
    // } else if(money >= 50000 && money < 100000) {
    //     icon1 = "crystal_01c"
    // } else if(money >= 100000 && money < 1000000) {
    //     icon1 = "crystal_01d"
    // } else if(money >= 1000000 && money < 5000000) {
    //     icon1 = "crystal_01j"
    // } else {
    //     icon1 = "crystal_01f"
    // }
    // let baltop = new DynamicPropertyDatabase("Baltop");
    // let keys2 = baltop.keys();
    // let place = -1;
    // let done = false;
    // let scores = [];
    // for(const key of keys2) {
    //     scores.push(baltop.get(key));
    // }
    // scores = scores.sort((a,b)=>b.money-a.money);
    // place = (scores.findIndex(_=>_.playerName == otherPlayer.name))+1;
    // chest.button(0, `§6\uE117 ${money}`, [`\n§a#${place} §ron baltop`], `textures/azalea_icons/icontextures/${icon1}`, 1, false);
    // let pshop = new DynamicPropertyDatabase("player_shop");
    // let shopText = [];
    // let keys = pshop.keys().filter(_=>_.startsWith(`${otherPlayer.id}`));
    // if(keys && keys.length) {
    //     for(const key of keys) {
    //         let shopData = pshop.get(key);
    //         shopText.push(`${shopData.isFeatured ? "§6" : "§r§f"}${shopData.name}`)
    //     }
    // }
    // let pshop_colors = ["playershop","playershop_green","playershop_blue","playershop_purple"];
    // if(keys.length)
    //     chest.button(
    //         1,
    //         `§c${keys.length} shop(s)`,
    //         shopText,
    //         "textures/azalea_icons/PlayerShop/Normal/Online/playershop",
    //         1
    //     );
    // else {
    //     chest.button(
    //         1,
    //         `§cNo shops :(`,
    //         "",
    //         "textures/azalea_icons/PlayerShop/Normal/Offline/playershop",
    //         1
    //     )
    // }
    // chest.button(
    //     2,
    //     `${hardCodedRanks[otherPlayer.name] ? `§aAzalea Member` : isAdmin(otherPlayer) ? `§6Admin` : `§bPlayer`}`,
    //     [
    //         `${hardCodedRanks[otherPlayer.name] ? `This player is a staff member/contributor for Azalea Essentials.` : isAdmin(otherPlayer) ? `This player is an admin!` : `This player is not an admin.`}`
    //     ],
    //     hardCodedRanks[otherPlayer.name] ? `textures/azalea_icons/Azalea` : isAdmin(otherPlayer) ? `textures/items/gold_helmet` : `textures/items/iron_helmet`,
    //     1
    // )
    // chest.button(
    //     3,
    //     `§dRanks`,
    //     ranks,
    //     "textures/items/book_enchanted",
    //     1
    // )
    // let blocked = playerOpened.hasTag(`blocked:${otherPlayer.id}`);
    // chest.button(
    //     8,
    //     `${blocked ? `§aUnblock` : `§cBlock`}`,
    //     [
    //         otherPlayer.name == playerOpened.name ? `You cant block yourself...` : blocked ? `This player is blocked!` : `This player is not blocked!`
    //     ],
    //     `textures/blocks/barrier`,
    //     1
    // )
    // // let pshop = new DynamicPropertyDatabase("player_shop")
    // // chest.button(0, "sword", "sword", "minecraft:diamond_sword", 1, false)
    // // chest.button(0, `§6${pshop.keys().length} Player Shops`, "", "textures/azalea_icons/PlayerShop/Normal/Online/playershop", 1, false)
    // let otherPlayerName = otherPlayer.name;
    // chest.show(playerOpened).then(response =>{
    //     if(response.canceled) return;
    //     if(keys.length && response.selection == 1) {
    //         uiManager.open("Azalea1.1/PlayerProfile/Shops", playerOpened, playerName)
    //     } else if(!keys.length && response == 1) {
    //         uiManager.open("Azalea1.1/PlayerProfile", playerOpened, otherPlayer.name);
    //     } else if(response.selection == 0) {
    //         uiManager.open("Azalea0.9.1/MoneyTransfer", playerOpened, null, world.getPlayers().findIndex(_=>_.name == otherPlayerName), null)
    //     } else if(response.selection == 2) {
    //         if(hardCodedRanks[otherPlayer.name])
    //             return uiManager.open("Azalea1.1/AzaleaMemberUI", playerOpened, otherPlayer);

    //         if(isAdmin(otherPlayer)) {
    //             return uiManager.open("Azalea1.1/OnlineAdmins", playerOpened, otherPlayer.name);
    //         }
    //         if(!isAdmin(otherPlayer)) {
    //             uiManager.open("Azalea1.1/Online", playerOpened, otherPlayer.name)
    //         }
    //     } else {
    //         uiManager.open("Azalea1.1/PlayerProfile", playerOpened, otherPlayer.name);
    //     }
    // })
})

uiManager.addUI("Azalea1.1/OnlineAdmins", (player, otherPlayer)=>{
    let actionForm = new ActionForm();
    actionForm.title("§cOnline Admins");
    let admins = [];
    for(const potentialAdmin of world.getPlayers()) {
        if(isAdmin(potentialAdmin)) admins.push(potentialAdmin.name);
    }
    actionForm.body(`§cAdmins:\n§r§f- ${admins.join('\n§r- ')}`);
    actionForm.button("Back", null, (player)=>{
        uiManager.open("Azalea1.1/PlayerProfile", player, otherPlayer.name);
    })
    actionForm.show(player, false, (player)=>{
        
    })
})
uiManager.addUI("Azalea1.1/Online", (player, otherPlayer)=>{
    let actionForm = new ActionForm();
    actionForm.title("§cOnline Players");
    let players = [];
    for(const otherPlayer2 of world.getPlayers()) {
        players.push(otherPlayer2.name);
    }
    actionForm.body(`§bPlayers:\n§r§f- ${players.join('\n§r- ')}`);
    actionForm.button("Back", null, (player)=>{
        uiManager.open("Azalea1.1/PlayerProfile", player, otherPlayer.name);
    })
    actionForm.show(player, false, (player)=>{
        
    })
})
uiManager.addUI("Azalea1.1/AzaleaMemberUI", (player, otherPlayer)=>{
    let actionForm = new ActionForm();
    actionForm.title("§aAzalea Member");
    actionForm.body(`${otherPlayer.name} is an azalea contributor/staff member.\n\nHow to contribute:\n- Go over to https://github.com/Ant767/Azalea\n- Start a pull request or fork\n- Make some changes!`)
    actionForm.button("Back", null, (player)=>{
        uiManager.open("Azalea1.1/PlayerProfile", player, otherPlayer.name);
    })
    actionForm.show(player, false, (player)=>{

    })
})
uiManager.addUI("Azalea1.1/PlayerProfile/Shops", (playerOpened, playerName)=>{
    let otherPlayer;
    for(const player of world.getPlayers()) {
        if(player.name.toLowerCase() == playerName.toLowerCase()) {
            otherPlayer = player;
        }
    }
    let nameColor = otherPlayer.getTags().find(_=>_.startsWith('name-color:'));
    if(nameColor) nameColor = nameColor.replace('name-color:', '');
    if(!nameColor) nameColor = '§5';
    if(hardCodedRanks[otherPlayer.name]) nameColor = hardCodedRanks[otherPlayer.name]["NameColor"]

    let chest = new ChestFormData("5");
    chest.title(`${nameColor}${otherPlayer.name}§r§f's Shops`)
    let pshop = new DynamicPropertyDatabase("player_shop");
    let pshop_colors = ["playershop","playershop_green","playershop_blue","playershop_purple"];
    let keys = pshop.keys().filter(_=>_.startsWith(`${otherPlayer.id}`));
    for(let i = 0;i < keys.length;i++) {
        let shopData = pshop.get(keys[i]);
        chest.button(
            i,
            `${shopData.isFeatured ? `§6` : `§r§7`}${shopData.name}`,
            [
                `${shopData.items.join('§r§7, ')}`,
                ``,
                `§r§fItems Count: §7${shopData.mcItems && shopData.mcItems.length ? shopData.mcItems.length : 0}`
            ],
            `textures/azalea_icons/PlayerShop/${shopData.isFeatured ? "Gold" : "Normal"}/Online/${pshop_colors[shopData.color]}`
        )
    }
    chest.button(
        4,
        "Back",
        ["Go back to player profile"],
        "textures/azalea_icons/2",
        1
    )
    chest.show(playerOpened).then(res=>{
        if(res.selection == 4) {
            return uiManager.open("Azalea1.1/PlayerProfile", playerOpened, playerName)
        }
        uiManager.open("Azalea0.9.1/PlayerShop/OpenShop", playerOpened, keys[res.selection]);
    })
})
world.afterEvents.entityHitEntity.subscribe(e=>{
    if(e.damagingEntity.typeId == 'minecraft:player' && e.hitEntity.typeId == 'minecraft:player' && e.damagingEntity.hasTag("open-profiles-by-punch")) {
        uiManager.open("Azalea1.1/PlayerProfile", e.damagingEntity, e.hitEntity.name);
    }
})

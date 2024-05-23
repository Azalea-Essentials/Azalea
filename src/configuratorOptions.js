import moment from './moment';

import { system } from '@minecraft/server';
import { PLAYER_REPORTS } from './adminpanel/reports';
import { REVIEWS } from './adminpanel/reviews';
import { TAGCMD_UI } from './adminpanel/tagcmd_ui';
import { ADMIN_TEST } from './adminpanel/test';
import { Database } from './db';
import { ActionForm } from './form_func';
import { POLLS } from './adminpanel/polls';
import { LB } from './adminpanel/leaderboardthemes';
import { QUESTS } from './adminpanel/quests';
import { commands } from './commands';
import { CUSTOM_COMMANDS } from './adminpanel/customcommands';
import warpEditor from './adminpanel/warpEditor';
import FormsV2 from './things/FormsV2';
import customthemes from './customthemes';
import logs from './adminpanel/logs';
// import chestguis from './adminpanel/chestguis';
import formsv3 from './adminpanel/formsv3';
import sidebar from './adminpanel/sidebar';
import guimaker from './adminpanel/guimaker';
import suggestionBox from './adminpanel/suggestionBox';
import modalforms from './adminpanel/modalforms';
import giftcodes from './adminpanel/giftcodes';
import { combatlogsettings } from './adminpanel/combatlog';

export class ConfiguratorBase {
    constructor() {
        this.options = {};
    }
    addSub(submenu) {
        this.options[submenu.name] = {
            options: submenu.options,
            icon: submenu.icon,
            type: submenu.type
        }
        return this;
    }
    toOptions() {
        return this.options;
    }
}

export class ConfiguratorSub {
    constructor(name, icon = null) {
        this.name = name;
        this.icon = icon;
        this.options = [];
        this.type = 'normal';
    }
    setCallback(fn) {
        this.type = 'func';
        this.options = [ { fn } ];
        return this;
    }
    addTextInput(key, label, placeholder) {
        this.options.push({
            type: 'text-input',
            key: key,
            label,
            placeholder
        });
        console.log(this.options)
        return this;
    }
    addDropdown(key, options, keys, label) {
        this.options.push({
            type: 'dropdown',
            keyOptions: keys,
            cliOptions: options,
            label,
            key
        });
        return this;
    }
    addSlider(key, minVal, maxVal, step, label, defaultVal = 1) {
        this.options.push({
            type: 'slider',
            maxVal,
            minVal,
            label,
            key,
            step,
            default: defaultVal
        })
        return this;
    }
    addToggle(key, label) {
        this.options.push({
            type: 'toggle',
            label,
            key
        })
        return this;
    }
}
ADMIN_TEST()

export function handleConfigurator(configuratorBase) {
    if(configuratorBase instanceof ConfiguratorBase) {
        let opts = configuratorBase.toOptions();
        let actionForm = new ActionForm();
        for(const key of Object.keys(opts)) {
            actionForm.button(key, null, (player)=>{
                let ui = opts[key]
                if(ui.type == 'func')
                    return ui.options[0].fn(player);
                if(ui.type == 'hardcoded-playermenu')
                    return;
                for(const option of ui.options) {
                    // if(option.type == "")
                }
            })
        }
    }
}

let base = new ConfiguratorBase()
// .addSub(suggestionBox())
.addSub(
    new ConfiguratorSub("§dAzalea Settings", "textures/azalea_icons/Azalea")
        .addTextInput("ServerName", "Server Name", "Type a server name...")
        .addTextInput("ServerDescription", "Server Description", "Type a server description...")
        .addTextInput("ReportReasons", "Report Reasons", "New")
        .addTextInput("MoneyScoreboard", "Money Scoreboard (default: money)", "Type the scoreboard here")
        .addTextInput("Prefix", "Prefix", "Type a prefix")
        .addToggle("DisableServerCommunity", "Disable Server Community")
        .addToggle("WelcomeMessageEnabled", "Welcome message enabled?")
        .addTextInput("ServerWelcomeMessage", "Welcome message text, remember: §d[@username] §r= joined user ", "Type a welcome message.")
        .addToggle("TeleportPlayerToSpawnOnRejoin", "Teleport players to spawn when joining")
        .addToggle("IgnoreSetupMessage", "Disable Setup Message")
)
// .addSub(
//     new ConfiguratorSub("§cFeatures", null)
//         .addToggle("BackToDeathLocationCommand", "Enable !death §7- allows players to teleport back to their death location")
//         .addTextInput("DeathCommandMessage", "!death message §7- Sent to players when they die §cRequires !death enabled", "type")
// )
    // .addSub(QUESTS())
    // .addSub(guimaker())
    // .addSub(chestguis())
    .addSub(FormsV2())
    // .addSub(modalforms())
    // .addSub(combatlogsettings())
    // .addSub(logs())
    .addSub(POLLS())
    // .addSub(QUESTS())
    // .addSub(
    //     new ConfiguratorSub("§bChat", "textures/azalea_icons/Chat")
    //         .addToggle("EnableAntiSpam", "Enable Anti-Spam?")
    //         .addSlider("MessageLimit", 1, 10, 1, "Message limit (per 3 seconds)", 1)
    //         .addTextInput("SpamLimitReachedMessage", "Anti-Spam message", "Shows a message user when spam")
    //         .addTextInput("StartingRank", "Starting Rank", "Rank that players start with")
    //         .addDropdown("DefaultBC", [
    //             "§0Black",
    //             "§1Blue",
    //             "§2Green",
    //             "§3Aqua",
    //             "§4Red",
    //             "§5Purple",
    //             "§6Gold",
    //             "§7Light Gray",
    //             "§8Dark Gray",
    //             "§9Bright Blue",
    //             "§aBright Green",
    //             "§bBright Aqua",
    //             "§cBright Red",
    //             "§dBright Purple",
    //             "§eYellow",
    //             "§fWhite",
    //             "§gMinecoin Gold",
    //             "§mMaterial Redstone",
    //             "§nMaterial Copper",
    //             "§jMaterial Netherite",
    //             "§iMaterial Iron",
    //             "§hMaterial Quartz",
    //             "§pMaterial Gold",
    //             "§qMaterial Emerald",
    //             "§sMaterial Diamond",
    //             "§tMaterial Lapis",
    //             "§uMaterial Amethyst"
    //         ], [
    //             "§0",
    //             "§1",
    //             "§2",
    //             "§3",
    //             "§4",
    //             "§5",
    //             "§6",
    //             "§7",
    //             "§8",
    //             "§9",
    //             "§a",
    //             "§b",
    //             "§c",
    //             "§d",
    //             "§e",
    //             "§f",
    //             "§g",
    //             "§m",
    //             "§n",
    //             "§j",
    //             "§i",
    //             "§h",
    //             "§p",
    //             "§q",
    //             "§s",
    //             "§t",
    //             "§u",
    //         ], "Default Bracket Color")
    //         .addDropdown("DefaultNC", [
    //             "§0Black",
    //             "§1Blue",
    //             "§2Green",
    //             "§3Aqua",
    //             "§4Red",
    //             "§5Purple",
    //             "§6Gold",
    //             "§7Light Gray",
    //             "§8Dark Gray",
    //             "§9Bright Blue",
    //             "§aBright Green",
    //             "§bBright Aqua",
    //             "§cBright Red",
    //             "§dBright Purple",
    //             "§eYellow",
    //             "§fWhite",
    //             "§gMinecoin Gold",
    //             "§mMaterial Redstone",
    //             "§nMaterial Copper",
    //             "§jMaterial Netherite",
    //             "§iMaterial Iron",
    //             "§hMaterial Quartz",
    //             "§pMaterial Gold",
    //             "§qMaterial Emerald",
    //             "§sMaterial Diamond",
    //             "§tMaterial Lapis",
    //             "§uMaterial Amethyst"
    //         ], [
    //             "§0",
    //             "§1",
    //             "§2",
    //             "§3",
    //             "§4",
    //             "§5",
    //             "§6",
    //             "§7",
    //             "§8",
    //             "§9",
    //             "§a",
    //             "§b",
    //             "§c",
    //             "§d",
    //             "§e",
    //             "§f",
    //             "§g",
    //             "§m",
    //             "§n",
    //             "§j",
    //             "§i",
    //             "§h",
    //             "§p",
    //             "§q",
    //             "§s",
    //             "§t",
    //             "§u",
    //         ], "Default Name Color")
    //         .addDropdown("DefaultMC", [
    //             "§0Black",
    //             "§1Blue",
    //             "§2Green",
    //             "§3Aqua",
    //             "§4Red",
    //             "§5Purple",
    //             "§6Gold",
    //             "§7Light Gray",
    //             "§8Dark Gray",
    //             "§9Bright Blue",
    //             "§aBright Green",
    //             "§bBright Aqua",
    //             "§cBright Red",
    //             "§dBright Purple",
    //             "§eYellow",
    //             "§fWhite",
    //             "§gMinecoin Gold",
    //             "§mMaterial Redstone",
    //             "§nMaterial Copper",
    //             "§jMaterial Netherite",
    //             "§iMaterial Iron",
    //             "§hMaterial Quartz",
    //             "§pMaterial Gold",
    //             "§qMaterial Emerald",
    //             "§sMaterial Diamond",
    //             "§tMaterial Lapis",
    //             "§uMaterial Amethyst"
    //         ], [
    //             "§0",
    //             "§1",
    //             "§2",
    //             "§3",
    //             "§4",
    //             "§5",
    //             "§6",
    //             "§7",
    //             "§8",
    //             "§9",
    //             "§a",
    //             "§b",
    //             "§c",
    //             "§d",
    //             "§e",
    //             "§f",
    //             "§g",
    //             "§m",
    //             "§n",
    //             "§j",
    //             "§i",
    //             "§h",
    //             "§p",
    //             "§q",
    //             "§s",
    //             "§t",
    //             "§u",
    //         ], "Default Message Color")

    //     )
    .addSub(REVIEWS())
    .addSub(
        new ConfiguratorSub("§2Verification", "textures/azalea_icons/4")
            .addToggle("EnableVerification", "Enable Verification?")
            .addDropdown("VerificationType", ["Private (Requires Code + Command)", "Public (Requires Command)"], ["private", "public"], "Verification Type")
            .addTextInput("VerificationCode", "Verification Code (Requires private verification type)", "Type a verification code...")
    )
    .addSub(
        new ConfiguratorSub("§dExperimental Toggles", "textures/azalea_icons/3")
            .addToggle("AuctionHouse", "§bAuction House")
            .addToggle("FirstTimeJoinUI", "§bFirst Time Join UI")
            .addToggle("ImprovedNametagsEnabled", "§bImproved nametags")
            .addToggle("QuestsEnabled", "Quests §6§o(Unfinished V1.0 Feature)")
    )
    .addSub(giftcodes())
    .addSub(PLAYER_REPORTS())
    .addSub(warpEditor())
    .addSub(LB())
    .addSub(
        new ConfiguratorSub("§mPlayer Shops", "textures/azalea_icons/PlayerShop/Normal/Online/playershop")
            .addToggle("DisablePlayerShops", "Disable player shops")
            .addDropdown("Sorting", ["Default", "Newest First", "Oldest First", "Player", "Lowest Avg. Price", "Highest Avg. Price"], ["NF","NF","OF","P","LAP","HAP"], "Default Sorting")
            .addSlider("PlayerShopLimit", 1, 10, 1, "Shop Limit (Per Player)", 3)
    )
    .addSub(
        new ConfiguratorSub("§6Command Perms", "textures/azalea_icons/CommandPerms")
    )
    .addSub(CUSTOM_COMMANDS())
    .addSub(sidebar());
base.options["§2Players"] = {
    "type": "hardcoded-playermenu",
    "icon": "textures/azalea_icons/8"
}
base.options["§eDeveloper Settings"] = {
    icon: "textures/azalea_icons/Wrench",
    options: [
            {
                "label": "Dev Environment",
                "type": "toggle",
                "key": "DevEnvironment"
            },
    ]
}
system.runTimeout(()=>{
    commands._cmds.forEach(item=>{
        if(item.private || item.isDev || item.name == "toggle" || item.name == "help" || item.name == "version" || item.name == "credits") return;
        base.options["§6Command Perms"].options.push({
            type: 'dropdown-command',
            command: item.name
        })
    })
},90);
export const baseConfigMenu = base;

system.run(()=>{
    // let configuratorDb = new Database("Config");
    // configuratorDb.tableVars = {
    //     "AZALEA_VERSION": "%%AZALEA_VER%%",
    //     "NOW": Date.now().toString(),
    //     "BUILDTIME": `${moment(/*BUILDTIME*/).format('MMMM Do YYYY, h:mm:ss a [UTC]')}`
    // }
})
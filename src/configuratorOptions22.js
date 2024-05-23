import { Database } from "./db";
import { DynamicPropertyDatabase } from "./dynamicPropertyDb";
import { defaultNicknameFormat } from "./nicknames";

let chests = new DynamicPropertyDatabase("ChestUIs");
let formsv2 = new DynamicPropertyDatabase("FormsV2");
export const OptionTypes = {
    SubmenuMain: "submenu_main",
    OptionsMenu: "options_menu",
    Panel: "panel",
    Dropdown: "dropdown",
    Func: "func",
    TextField: "text_field",
    Slider: "slider",
    Toggle: "toggle",
    ui: "UI"
}
export const options22 = {
    version: 2,
    title: "§dConfig UI",
    options: [
        {
            name: "§qAzalea Settings",
            subtext: "Settings for Azalea",
            type: OptionTypes.Panel,
            icon: "textures/azalea_icons/Settings",
            panel: {
                version: 1,
                title: "§aAzalea Settings",
                options: [
                    {
                        name: "§sImportant",
                        subtext: "Important Options",
                        icon: "textures/azalea_icons/5-oldmaybe",
                        permRequired: "important.edit",
                        type: OptionTypes.OptionsMenu,
                        panel: {
                            title: "§sImportant",
                            options: [
                                {
                                    type: OptionTypes.TextField,
                                    label: "Money Scoreboard (default: money)",
                                    placeholder: "Type the scoreboard here",
                                    id: "MoneyScoreboard"
                                },
                                {
                                    type: OptionTypes.TextField,
                                    label: "Prefix",
                                    placeholder: "!",
                                    id: "Prefix",
                                    default: "!"
                                },
                                {
                                    type: OptionTypes.Toggle,
                                    id: "IgnoreSetupMessage",
                                    label: "Disable Setup Message"
                                },
                                {
                                    type: OptionTypes.Toggle,
                                    id: "TeleportPlayerToSpawnOnRejoin",
                                    label: "Teleport players to spawn on join?"
                                }
                            ]
                        }
                    },
                    {
                        name: "§2Verification",
                        subtext: "Verification Options",
                        type: OptionTypes.OptionsMenu,
                        permRequired: "verification.edit",
                        icon: "textures/azalea_icons/4",
                        panel: {
                            title: "§2Verification Options",
                            options: [
                                {
                                    type: OptionTypes.Toggle,
                                    id: "EnableVerification",
                                    label: "Enable Verification?"
                                },
                                {
                                    type: OptionTypes.Dropdown,
                                    keys: ["private", "public"],
                                    display: ["Private (Requires Code + Command)", "Public (Requires Command)"],
                                    label: "Verification Type",
                                    id: "VerificationType"
                                },
                                {
                                    type: OptionTypes.TextField,
                                    label: "Verification Code (Requires private verification type)",
                                    placeholder: "Type a verification code...",
                                    id: "VerificationCode"
                                }
                            ]
                        }
                    },
                    {
                        name: "§uCustom Commands",
                        subtext: "Edit commands",
                        permRequired: "customcmds.edit",
                        type: OptionTypes.ui,
                        ui: "Azalea1.0/CustomCommands/Main",
                        icon: "textures/azalea_icons/CustomCommands2"
                    },
                    {
                        name: "§9Warp Editor",
                        subtext: "Edit warps",
                        permRequired: "warps.edit",
                        type: OptionTypes.ui,
                        ui: "Azalea1.0/WarpEditor",
                        icon: "textures/items/ender_pearl"
                    },
                    {
                        name: "§eChat Options",
                        subtext: "Change chat options",
                        type: OptionTypes.OptionsMenu,
                        permRequired: "chatoptions.edit",
                        icon: "textures/azalea_icons/Chat",
                        panel: {
                            title: "§eChat Options",
                            options: [
                                {
                                    label: "Enable anti-spam",
                                    type: OptionTypes.Toggle,
                                    id: "EnableAntiSpam"
                                },
                                {
                                    id: "MessageLimit",
                                    label: "Message Limit (per 3 seconds)",
                                    type: OptionTypes.Slider
                                },
                                {
                                    type: OptionTypes.TextField,
                                    label: "Anti-Spam message",
                                    placeholder: "Shows a message user when spam",
                                    id: "SpamLimitReachedMessage"
                                },
                                {
                                    label: "Starting Rank",
                                    type: OptionTypes.TextField,
                                    placeholder: "Member",
                                    default: "Member",
                                    id: "StartingRank"
                                },
                                {
                                    type: OptionTypes.Dropdown,
                                    display: [
                                        "§0Black",
                                        "§1Blue",
                                        "§2Green",
                                        "§3Aqua",
                                        "§4Red",
                                        "§5Purple",
                                        "§6Gold",
                                        "§7Light Gray",
                                        "§8Dark Gray",
                                        "§9Bright Blue",
                                        "§aBright Green",
                                        "§bBright Aqua",
                                        "§cBright Red",
                                        "§dBright Purple",
                                        "§eYellow",
                                        "§fWhite",
                                        "§gMinecoin Gold",
                                        "§mMaterial Redstone",
                                        "§nMaterial Copper",
                                        "§jMaterial Netherite",
                                        "§iMaterial Iron",
                                        "§hMaterial Quartz",
                                        "§pMaterial Gold",
                                        "§qMaterial Emerald",
                                        "§sMaterial Diamond",
                                        "§tMaterial Lapis",
                                        "§uMaterial Amethyst"
                                    ],
                                    keys: [
                                        "§0",
                                        "§1",
                                        "§2",
                                        "§3",
                                        "§4",
                                        "§5",
                                        "§6",
                                        "§7",
                                        "§8",
                                        "§9",
                                        "§a",
                                        "§b",
                                        "§c",
                                        "§d",
                                        "§e",
                                        "§f",
                                        "§g",
                                        "§m",
                                        "§n",
                                        "§j",
                                        "§i",
                                        "§h",
                                        "§p",
                                        "§q",
                                        "§s",
                                        "§t",
                                        "§u",
                                    ],
                                    label: "Default Bracket Color",
                                    id: "DefaultBC"
                                },
                                {
                                    type: OptionTypes.Dropdown,
                                    display: [
                                        "§0Black",
                                        "§1Blue",
                                        "§2Green",
                                        "§3Aqua",
                                        "§4Red",
                                        "§5Purple",
                                        "§6Gold",
                                        "§7Light Gray",
                                        "§8Dark Gray",
                                        "§9Bright Blue",
                                        "§aBright Green",
                                        "§bBright Aqua",
                                        "§cBright Red",
                                        "§dBright Purple",
                                        "§eYellow",
                                        "§fWhite",
                                        "§gMinecoin Gold",
                                        "§mMaterial Redstone",
                                        "§nMaterial Copper",
                                        "§jMaterial Netherite",
                                        "§iMaterial Iron",
                                        "§hMaterial Quartz",
                                        "§pMaterial Gold",
                                        "§qMaterial Emerald",
                                        "§sMaterial Diamond",
                                        "§tMaterial Lapis",
                                        "§uMaterial Amethyst"
                                    ],
                                    keys: [
                                        "§0",
                                        "§1",
                                        "§2",
                                        "§3",
                                        "§4",
                                        "§5",
                                        "§6",
                                        "§7",
                                        "§8",
                                        "§9",
                                        "§a",
                                        "§b",
                                        "§c",
                                        "§d",
                                        "§e",
                                        "§f",
                                        "§g",
                                        "§m",
                                        "§n",
                                        "§j",
                                        "§i",
                                        "§h",
                                        "§p",
                                        "§q",
                                        "§s",
                                        "§t",
                                        "§u",
                                    ],
                                    label: "Default Name Color",
                                    id: "DefaultNC"
                                },
                                {
                                    type: OptionTypes.Dropdown,
                                    display: [
                                        "§0Black",
                                        "§1Blue",
                                        "§2Green",
                                        "§3Aqua",
                                        "§4Red",
                                        "§5Purple",
                                        "§6Gold",
                                        "§7Light Gray",
                                        "§8Dark Gray",
                                        "§9Bright Blue",
                                        "§aBright Green",
                                        "§bBright Aqua",
                                        "§cBright Red",
                                        "§dBright Purple",
                                        "§eYellow",
                                        "§fWhite",
                                        "§gMinecoin Gold",
                                        "§mMaterial Redstone",
                                        "§nMaterial Copper",
                                        "§jMaterial Netherite",
                                        "§iMaterial Iron",
                                        "§hMaterial Quartz",
                                        "§pMaterial Gold",
                                        "§qMaterial Emerald",
                                        "§sMaterial Diamond",
                                        "§tMaterial Lapis",
                                        "§uMaterial Amethyst"
                                    ],
                                    keys: [
                                        "§0",
                                        "§1",
                                        "§2",
                                        "§3",
                                        "§4",
                                        "§5",
                                        "§6",
                                        "§7",
                                        "§8",
                                        "§9",
                                        "§a",
                                        "§b",
                                        "§c",
                                        "§d",
                                        "§e",
                                        "§f",
                                        "§g",
                                        "§m",
                                        "§n",
                                        "§j",
                                        "§i",
                                        "§h",
                                        "§p",
                                        "§q",
                                        "§s",
                                        "§t",
                                        "§u",
                                    ],
                                    label: "Default Message Color",
                                    id: "DefaultMC"
                                }
                            ]
                        }
                    },
                    {
                        name: "§dMisc Options",
                        subtext: "Miscellaneous options",
                        type: OptionTypes.OptionsMenu,
                        permRequired: "miscoptions.edit",
                        icon: "textures/azalea_icons/Info",
                        panel: {
                            title: "§dMisc Options",
                            options: [
                                // {
                                //     label: "Testing Dropdown",
                                //     type: OptionTypes.Dropdown,
                                //     keys: ["key1", "key2"],
                                //     display: ["Key 1", "Key 2"],
                                //     label: "Dropdown",
                                //     default: "key1",
                                //     id: "drop1"
                                // },
                                {
                                    label: "Improved Nametags",
                                    type: OptionTypes.Toggle,
                                    default: false,
                                    id: "ImprovedNametagsEnabled"
                                },
                                {
                                    label: "Nickname Format (ADVANCED)",
                                    type: OptionTypes.TextField,
                                    placeholder: "Type a nickname format here",
                                    default: defaultNicknameFormat,
                                    id: "NicknameFormat"
                                },
                                {
                                    type: OptionTypes.TextField,
                                    label: "Server name",
                                    placeholder: "Example Skygen",
                                    id: "ServerName"
                                },
                                {
                                    type: OptionTypes.TextField,
                                    label: "Server description",
                                    placeholder: "10/10 server fr",
                                    id: "ServerDescription"
                                },
                                {
                                    label: "Report Reasons (Comma Separated)",
                                    type: OptionTypes.TextField,
                                    placeholder: "Hacking, Toxicity",
                                    default: "Hacking, Toxicity",
                                    id: "ReportReasons"
                                }
                            ]
                        }
                    },
                    {
                        name: "§nSidebar",
                        subtext: "Make animated sidebars",
                        permRequired: "sidebar.edit",
                        type: OptionTypes.ui,
                        ui: "Azalea2.1/SidebarEditor/Root",
                        icon: "textures/azalea_icons/Sidebar"
                    },
                    {
                        name: "§9Leaderboards",
                        subtext: "Edit leaderboards",
                        type: OptionTypes.ui,
                        ui: "Azalea0.9/Leaderboards/Root",
                        permRequired: "leaderboards.edit",
                        icon: "textures/azalea_icons/13"
                    },
                    {
                        name: "§gGifts",
                        subtext: "Gift Codes",
                        permRequired: "giftcodes.edit",
                        type: OptionTypes.ui,
                        ui: "Azalea2.2/Gift/Root",
                        icon: "textures/azalea_icons/confetti"
                    },
                ]
            }
        },
        {
            name: "§5PvP Settings",
            subtext: "Settings for combat",
            type: OptionTypes.Panel,
            permRequired: "pvpsettings.edit",
            icon: "textures/items/iron_sword",
            panel: {
                title: "PvP Settings",
                version: 1,
                options: [
                    {
                        name: "§bCombat Log",
                        subtext: "Stop combat logging",
                        type: OptionTypes.OptionsMenu,
                        requiresFlag: "combatlog",
                        icon: "textures/items/iron_sword",
                        panel: {
                            title: "§6Combat Log",
                            options: [
                                {
                                    label: "Combat Log Enabled",
                                    type: OptionTypes.Toggle,
                                    id: "CombatlogEnabled"
                                },
                                {
                                    id: "CombatlogSeconds",
                                    label: "Exit Combat Delay (Seconds)",
                                    type: OptionTypes.Slider
                                },
                                {
                                    label: "Enter Combat Message",
                                    type: OptionTypes.TextField,
                                    placeholder: "You have entered combat",
                                    default: "§aYou have entered combat",
                                    id: "CLEnter"
                                },
                                {
                                    label: "Exit Combat Message",
                                    type: OptionTypes.TextField,
                                    placeholder: "You have exited combat",
                                    default: "§cYou have exited combat",
                                    id: "CLExit"
                                }
                            ]
                        }
                    },
                    // {
                    //     name: "§eKill Rewards",
                    //     subtext: "kill",
                    //     type: OptionTypes.OptionsMenu,
                    //     icon: "textures/azalea_icons/icontextures/skull_01a",
                    //     panel: {
                    //         title: "§6Combat Log",
                    //         options: [
                    //             {
                    //                 label: "Heal on kill",
                    //                 type: OptionTypes.Toggle,
                    //                 id: "HealOnKill"
                    //             },
                    //             {
                    //                 id: "MoneyToKill",
                    //                 label: "Money on kill",
                    //                 type: OptionTypes.TextField
                    //             },
                    //             {
                    //                 id: "CommandOnKill",
                    //                 label: "Command on kill",
                    //                 type: OptionTypes.TextField
                    //             }
                    //         ]
                    //     }
                    // },
                    // {
                    //     name: "§cAnticheat",
                    //     subtext: "stop cheating :(",
                    //     type: OptionTypes.Panel,
                    //     icon: "textures/amethyst_icons/Packs/asteroid_icons/anvil_icon",
                    //     panel: {
                    //         title: "§cAnticheat",
                    //         version: 1,
                    //         options: [
                    //             {
                    //                 name: "§cAnti-reach",
                    //                 subtext: "Stop players from reaching",
                    //                 icon: "textures/amethyst_icons/Packs/asteroid_icons/random29",
                    //                 type: OptionTypes.OptionsMenu,
                    //             },
                    //             {
                    //                 name: "§dAnti-autoclicker",
                    //                 icon: "textures/amethyst_icons/Packs/asteroid_icons/random28",
                    //                 subtext: "no fast clicky clicky",
                    //                 type: OptionTypes.OptionsMenu
                    //             },
                    //             {
                    //                 name: "§eAnti-Kill Aura",
                    //                 icon: "textures/amethyst_icons/Packs/asteroid_icons/random6",
                    //                 subtext: "no kill aura",
                    //                 type: OptionTypes.OptionsMenu
                    //             },
                    //             {
                    //                 name: "§aAnti-Speed",
                    //                 icon: "textures/amethyst_icons/Packs/asteroid_icons/random20",
                    //                 subtext: "no very speedy",
                    //                 type: OptionTypes.OptionsMenu
                    //             },
                    //             {
                    //                 name: "§bAnti-Phase",
                    //                 icon: "textures/amethyst_icons/Packs/asteroid_icons/random37",
                    //                 subtext: "no phase",
                    //                 type: OptionTypes.OptionsMenu
                    //             }
                    //         ]
                    //     }
                    // }

                ]
            }
        },
        {
            name: "§nGUIs",
            subtext: "Make GUIs",
            type: OptionTypes.Panel,
            icon: "textures/azalea_icons/GUIMaker/ModalForm",
            panel: {
                version: 1,
                title: "§nGUIs",
                options: [
                    {
                        name: "§bChest GUIs",
                        subtext: "Make Chest GUIs",
                        type: OptionTypes.ui,
                        permRequired: "chestguis.edit",
                        ui: "Azalea2.0/ChestGUIs/Root",
                        icon: "textures/azalea_icons/ChestLarge"
                    },
                    {
                        name: "§eNormal GUIs",
                        subtext: "Make GUIs",
                        type: OptionTypes.ui,
                        permRequired: "formsv2.edit",
                        ui: "Azalea1.1/FormsV2/Root",
                        icon: "textures/azalea_icons/GUIMaker/FormsV2"
                    },
                    {
                        name: "§nShop UI",
                        subtext: "Edit Shop UI",
                        type: OptionTypes.ui,
                        permRequired: "shop.edit",
                        ui: "Azalea1.1/Shop/Root/AdminManage",
                        icon: "textures/azalea_icons/PlayerShop/Normal/Online/playershop"
                    },
                ]
            }
        },
        {
            name: "§gMisc",
            subtext: "Misc Options",
            type: OptionTypes.Panel,
            icon: "textures/azalea_icons/Info",
            panel: {
                title: "§gMisc Options",
                version: 1,
                options: [
                    {
                        name: "§6First Time Join UI",
                        subtext: "funny",
                        icon: "textures/azalea_icons/GUIMaker/FormsV2",
                        type: OptionTypes.OptionsMenu,
                        panel: {
                            title: "First Time Join UI",
                            options: [
                                {
                                    label: "GUI",
                                    type: OptionTypes.Dropdown,
                                    get keys() {
                                        let forms1 = chests.get("Forms", []);
                                        let forms2 = formsv2.get("Forms", []);
                                        let tags = [...forms1.map(_=>`chest:${_.tag}`),...forms2.map(_=>`fv2:${_.tag}`)];
                                        return tags;
                                    },
                                    get display() {
                                        let forms1 = chests.get("Forms", []);
                                        let forms2 = formsv2.get("Forms", []);
                                        let tags = [...forms1.map(_=>`Chest: ${_.title}`),...forms2.map(_=>`FormsV2: ${_.title}`)];
                                        return tags;
                                    },
                                    label: "Dropdown",
                                    default: "key1",
                                    id: "drop1"
                                }
                            ]
                        }
                    },
                    {
                        name: "§cReports",
                        subtext: "View reported players",
                        icon: "textures/azalea_icons/5",
                        type: OptionTypes.ui,
                        permRequired: "reports.view",
                        ui: "Azalea0.9/ReportViewer"
                    },
                    {
                        name: "§eReviews",
                        subtext: "View server reviews",
                        icon: "textures/azalea_icons/10",
                        type: OptionTypes.ui,
                        ui: "Azalea0.9/ReviewViewer"
                    }
                ]

            }
        },
        {
            name: "§uPlayers",
            subtext: "Edit ranks",
            icon: "textures/azalea_icons/8",
            type: OptionTypes.ui,
            permRequired: "players.edit",
            ui: "Azalea2.2/NewPlayerUI/Root"
        },
        // {
        //     name: "§sPrismarineDB",
        //     subtext: "Edit PrismarineDB data",
        //     type: OptionTypes.ui,
        //     icon: "textures/amethyst_icons/Packs/asteroid_icons/prismarine_bricks",
        //     ui: "Azalea2.2/PrismarineDB/Editor"
        // }
    ]
}
import { system, world } from "@minecraft/server";
import { ChestFormData } from "../chestUI";
import { ConfiguratorSub } from "../configuratorOptions";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
import { ActionForm, ModalForm } from "../form_func";
import icons from "../icons";
import { uiManager } from "../uis";
import { sounds } from "../soundLib";
import { FormCancelationReason } from "@minecraft/server-ui";
import { formatStr } from "../utils/AzaleaFormatting";
import { prismarineDb } from "../lib/@trash/PrismarineDB/prismarine-db";

export default {
    namespace: "ChestGUIs",
    icon: "https://azalea.trashdev.org/img/textures/amethyst_icons/Packs/asteroid_icons/storageIconColor.png",
    description: "Make Chest GUIs ingame. It is very easy to use, and does not require file editing",
    main: class {
        constructor() {
            uiManager.addUI("Azalea2.0/ChestGUIs/OpenForm:NOT FOR USE USING /SCRIPTEVENT. USE THE CUSTOM UI SCRIPTEVENTS INSTEAD", (player, form) => {
                if (form.advanced) {
                    player.removeTag(form.tag)
                    let iconsList = [];
                    function rowColToSlotNumber(r, c) {
                        return 9 * (r - 1) + (c - 1);
                    }
                    let size = 9 * form.rows;
                    let chestForm = new ChestFormData(size.toString());
                    chestForm.title(form.title);
                    for (let i = 0; i < form.icons.length; i++) {
                        let icon = form.icons[i];
                        if (!icon) continue;
                        let data = {};
                        eval(`(({ignore,playerHasTag,setPos,world,formatStr,player,setIcon,setName, setStackSize, setOnclick, setLore})=>{${icon}})`)({
                            setPos(col, row) { data.row = row; data.col = col },
                            setIcon(iconID) { data.icon = iconID },
                            setName(name) { data.name = name },
                            ignore(bool = true) { data.ignore = bool },
                            setLore(lore) { data.lore = lore },
                            setStackSize(stackSize) { data.stackSize = stackSize },
                            setOnclick(fn) { data.onclick = fn },
                            player: player,
                            playerHasTag(tag) {
                                return player.hasTag(tag)
                            },
                            world,
                            formatStr
                        });
                        if (data.ignore) continue;
                        let iconTexture = icons.get(data.icon);
                        chestForm.button(rowColToSlotNumber(data.row, data.col), data.name ? data.name : "Unknown", data.lore ? data.lore : [], iconTexture ? iconTexture.path : "textures/azalea_icons/Info", data.stackSize ? data.stackSize : 1);
                        iconsList.push([rowColToSlotNumber(data.row, data.col), i, data.onclick]);
                    }
                    let backgroundIndexes = [];
                    if (form.background && icons.get(form.background)) {
                        for (let i = 0; i < size; i++) {
                            if (iconsList.find(_ => _[0] == i)) continue;
                            backgroundIndexes.push(i);
                            chestForm.button(i, `§cX`, [], icons.get(form.background).path, 1);
                        }
                    }

                    chestForm.show(player).then(res => {
                        if (res.canceled) return;
                        let item = iconsList.find(_ => _[0] == res.selection);
                        if (item) {
                            item[2](player, { uiManager });
                        } else if (backgroundIndexes.includes(res.selection)) {
                            if (form.backgroundClickCommand) try { player.runCommand(form.backgroundClickCommand) } catch { }
                            player.addTag(form.tag);
                        }
                    })
                    return;
                }
                if (player.hasTag("no-chest-guis")) {
                    let form2 = new ActionForm();
                    form2.title(form.title);
                    form2.body(`You have chest GUIs disabled. If you want them re-enabled, do §r§a!chest §r§fin chat to enable them.`);
                    for (const icon of form.icons.sort((a, b) => 9 * (a.row - 1) + (a.column - 1) - 9 * (b.row - 1) + (b.column - 1))) {
                        if (typeof icon != "object") continue;
                        let iconData = icons.get(icon.icon);
                        if (icon.icon.includes('glass') || (icon.command.includes('tag') && icon.command.includes(form.tag))) continue;
                        form2.button(icon.itemName, icon.icon.startsWith('minecraft:') ? icon.icon : iconData.path, player => {
                            let sound = sounds[icon.sound ? icon.sound : 0];
                            if (!(sound.type && sound.type == 1)) {
                                player.playSound(sound.sound.type, {
                                    "pitch": sound.sound.pitch,
                                    "volume": sound.sound.volume
                                });
                            }
                            let commands = icon.command.split(';').map(_ => _.trim()).map(_ => _.startsWith('/') ? _.substring(1) : _);
                            for (const command of commands) {
                                player.runCommand(command.replaceAll('<tag>', form.tag));
                            }
                        });
                    }
                    player.removeTag(form.tag);
                    form2.show(player, false, response => { });
                    return;
                }
                let size = 9 * form.rows;
                let chestForm = new ChestFormData(size.toString());
                let iconsList = [];
                let iconIndexCurr = -1;
                let iconIndexes = [];
                let formIcons = form.icons.sort((b, a) => (a.priority ? a.priority : 0) - (b.priority ? b.priority : 0));
                for (const icon of formIcons) {
                    iconIndexCurr++;
                    if (icon.conditionalDisplay && !matchesConditionalDisplay(player, icon.conditionalDisplay)) continue;
                    if (iconsList.includes(9 * (icon.row - 1) + (icon.column - 1))) continue;
                    if (typeof icon != "object") continue;
                    let iconData = icons.get(icon.icon);
                    chestForm.button(9 * (icon.row - 1) + (icon.column - 1), icon.itemName, icon.itemLore && icon.itemLore.filter(_ => _.length ? true : false) ? icon.itemLore.filter(_ => _.length ? true : false) : [], icon.icon.startsWith('minecraft:') ? icon.icon : iconData.path, icon.itemAmount ? icon.itemAmount : 1);
                    iconsList.push(9 * (icon.row - 1) + (icon.column - 1));
                    iconIndexes.push([9 * (icon.row - 1) + (icon.column - 1), iconIndexCurr]);
                }
                let backgroundIndexes = [];
                if (form.background && icons.get(form.background)) {
                    for (let i = 0; i < size; i++) {
                        if (iconIndexes.find(_ => _[0] == i)) continue;
                        backgroundIndexes.push(i);
                        chestForm.button(i, `§cX`, [], icons.get(form.background).path, 1);
                    }
                }
                chestForm.title(form.title);
                if (form.color && form.color == 1) chestForm.titleText = `§d${chestForm.titleText.substring(2)}`;
                if (form.color && form.color == 2) chestForm.titleText = `§e${chestForm.titleText.substring(2)}`;
                if (form.color && form.color == 3) chestForm.titleText = `§f${chestForm.titleText.substring(2)}`;
                if (form.color && form.color == 4) chestForm.titleText = `§1${chestForm.titleText.substring(2)}`;
                if (form.color && form.color == 5) chestForm.titleText = `§2${chestForm.titleText.substring(2)}`;
                if (form.color && form.color == 6) chestForm.titleText = `§l${chestForm.titleText.substring(2)}`;
                if (form.color && form.color == 7) chestForm.titleText = `§g${chestForm.titleText.substring(2)}`;
                if (form.color && form.color == 8) chestForm.titleText = `§h${chestForm.titleText.substring(2)}`;
                chestForm.show(player).then(res => {
                    if (res.canceled) return;
                    if (backgroundIndexes.includes(res.selection)) {
                        if (form.backgroundClickCommand) try { player.runCommand(form.backgroundClickCommand) } catch { }
                        return player.addTag(form.tag);
                    }
                    // let iconClickedIndex = form.icons.findIndex(_ => {
                    //   return 9 * (_.row - 1) + (_.column - 1) == res.selection;
                    // });
                    let iconClicked = iconIndexes.find(_ => _[0] == res.selection);
                    if (!iconClicked) return;
                    let iconClickedIndex = iconClicked[1];
                    if (iconClickedIndex >= 0) {
                        let icon = formIcons[iconClickedIndex];
                        let commands = icon.command.split(';').map(_ => _.trim()).map(_ => _.startsWith('/') ? _.substring(1) : _);
                        let sound = sounds[icon.sound ? icon.sound : 0];
                        if (!(sound.type && sound.type == 1)) {
                            player.playSound(sound.sound.type, {
                                "pitch": sound.sound.pitch,
                                "volume": sound.sound.volume
                            });
                        }
                        for (const command of commands) {
                            player.runCommand(command);
                        }
                    }
                });

            })
            // let chestGUIs = prismarineDb.table("ChestGUIs");
            // uiManager.addUI("Azalea2.0/ChestGUIs/Root", (player)=>{

            // })
            // return;
            let chestFormsDB = new DynamicPropertyDatabase("ChestUIs");
            let forms = chestFormsDB.get("Forms", []);
            uiManager.registerExtension("chest_guis", () => {
                return {
                    getUIs() {
                        return forms.map(_ => {
                            return {
                                name: `AzaleaCustom/Chest/${_.tag}`,
                                description: `${_.description}`,
                                onOpen(player) {
                                    uiManager.open("Azalea2.0/ChestGUIs/OpenForm", player, _);
                                }
                            }
                        })
                    }
                }
            })
            const HOPPER_MODE_MULTIPLIER = 0.5555555555555556;
            let presetUIs = [
                {
                    "author": "Trash9240",
                    "presetID": 0,
                    "icons": [
                        {
                            "row": 2,
                            "column": 2,
                            "itemAmount": 1,
                            "itemLore": [
                                "Changes your gamemode to Creative"
                            ],
                            "icon": "Packs/Asteroid/creative_icon",
                            "command": "gamemode c",
                            "itemName": "§eCreative Mode",
                            "sound": 1
                        },
                        {
                            "row": 2,
                            "column": 5,
                            "itemAmount": 1,
                            "itemLore": [
                                "Changes your gamemode to spectator"
                            ],
                            "sound": 1,
                            "icon": "Packs/Asteroid/random9",
                            "command": "gamemode spectator",
                            "itemName": "§eSpectator Mode"
                        },
                        {
                            "row": 2,
                            "column": 8,
                            "itemAmount": 1,
                            "itemLore": [
                                "Changes your gamemode to Survival"
                            ],
                            "sound": 1,
                            "icon": "Packs/Asteroid/creator_glyph_color",
                            "command": "gamemode s",
                            "itemName": "§eSurvival Mode"
                        },
                        {
                            "row": 1,
                            "column": 1,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        {
                            "row": 1,
                            "column": 2,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 1,
                            "column": 3,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 1,
                            "column": 4,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 1,
                            "column": 5,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 1,
                            "column": 6,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 1,
                            "column": 7,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 1,
                            "column": 8,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 1,
                            "column": 9,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 2,
                            "column": 9,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 3,
                            "column": 9,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 3,
                            "column": 8,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 3,
                            "column": 7,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 2,
                            "column": 7,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        {
                            "row": 2,
                            "column": 6,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 3,
                            "column": 6,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 3,
                            "column": 5,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 3,
                            "column": 4,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 2,
                            "column": 4,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        {
                            "row": 2,
                            "column": 3,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 3,
                            "column": 3,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 3,
                            "column": 2,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 3,
                            "column": 1,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        },
                        1,
                        {
                            "row": 2,
                            "column": 1,
                            "itemAmount": 1,
                            "itemLore": [
                                ""
                            ],
                            "icon": "gray_glass",
                            "command": "tag @s add <tag>",
                            "itemName": "§c§oX",
                            "sound": 4
                        }
                    ],
                    "title": "§eGamemode §6Switcher",
                    "tag": "gamemode-switcher",
                    "rows": 3,
                    "color": 0
                },
                {
                    "author": "justinhangae",
                    "icons": [
                        {
                            "row": 1,
                            "column": 1,
                            "itemAmount": 1,
                            "itemLore": [""],
                            "sound": 0,
                            "icon": "lime_glass",
                            "command": "tag @s add az_itemmenu", "itemName": " "
                        },
                        {
                            "row": 1,
                            "column": 2,
                            "itemAmount": 1,
                            "itemLore": [""],
                            "sound": 0,
                            "icon": "lime_glass",
                            "command": "tag @s add az_itemmenu", "itemName": " "
                        },
                        { "row": 1, "column": 3, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, { "row": 1, "column": 4, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 1, "column": 5, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 1, "column": 6, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 1, "column": 7, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 1, "column": 8, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 1, "column": 9, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 2, "column": 9, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 3, "column": 9, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 4, "column": 9, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 5, "column": 9, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 5, "column": 8, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 5, "column": 7, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 5, "column": 6, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 5, "column": 5, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 5, "column": 4, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 5, "column": 3, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 5, "column": 2, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 5, "column": 1, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 4, "column": 1, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, { "row": 3, "column": 1, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, { "row": 2, "column": 1, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, { "row": 3, "column": 2, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 3, "column": 3, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 3, "column": 4, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 3, "column": 5, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 3, "column": 6, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 3, "column": 7, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 3, "column": 8, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 2, "column": 7, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 4, "column": 7, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 2, "column": 5, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 4, "column": 5, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 2, "column": 3, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 4, "column": 3, "itemAmount": 1, "itemLore": [""], "sound": 0, "icon": "lime_glass", "command": "tag @s add az_itemmenu", "itemName": " " }, 1, { "row": 2, "column": 4, "itemAmount": 1, "itemLore": [""], "sound": 1, "icon": "emerald", "command": "scriptevent azalea:open_ui Azalea0.9.1/PlayerShop/Main", "itemName": "§6Player Shop" }, { "row": 4, "column": 4, "itemAmount": 1, "itemLore": [""], "sound": 1, "icon": "diamond", "command": "scriptevent azalea:open_ui AzaleaExtra/Shop", "itemName": "§3Shop" }, { "row": 2, "column": 2, "itemAmount": 1, "itemLore": [""], "sound": 1, "icon": "ender_pearl", "command": "scriptevent azalea:open_ui Azalea2.0/TeleportRequests/Root", "itemName": "§cTeleport Requests" }, { "row": 4, "column": 2, "itemAmount": 1, "itemLore": [""], "sound": 1, "icon": "ender_eye", "command": "scriptevent azalea:open_ui Azalea1.1/warps", "itemName": "§5Warps" }, { "row": 2, "column": 6, "itemAmount": 1, "itemLore": [""], "sound": 1, "icon": "anvil", "command": "scriptevent azalea:open_ui AzaleaExtra/Report", "itemName": "§dReport" }, { "row": 4, "column": 8, "itemAmount": 1, "itemLore": [""], "sound": 1, "icon": "Packs/Asteroid/Feedback", "command": "scriptevent azalea:open_ui Dev:SuggestionBox", "itemName": "§eSuggestions" }, { "row": 2, "column": 8, "itemAmount": 1, "itemLore": [""], "sound": 1, "icon": "book_01g", "command": "scriptevent azalea:open_ui Azalea0.9.1/CommunityCenter/Root", "itemName": "§5Annoucements & Polls" }, { "row": 4, "column": 6, "itemAmount": 1, "itemLore": [""], "sound": 1, "icon": "map", "command": "scriptevent azalea:open_ui AzaleaExtra/Review", "itemName": "§cReview" }], "title": "Azalea Menu Portal", "tag": "az_itemmenu", "rows": 5, "color": 4
                },
                { "author": "EGNET500", "icons": [{ "row": 1, "column": 2, "itemAmount": 1, "itemLore": ["§aThe Richest player has this rank", "use !sell-shop to sell."], "icon": "coin_05d", "command": "/testfor @r", "itemName": "§aRichest", "sound": 4 }, { "row": 1, "column": 5, "itemAmount": 1, "itemLore": ["§eBe in the server", "§5ur server"], "icon": "gem_01j", "command": "/testfor @r", "itemName": "§5Discord Member", "sound": 4 }, { "row": 1, "column": 8, "itemAmount": 1, "itemLore": ["§aHave 200+ §bDiamonds", "§cImpossible (jk)"], "sound": 4, "icon": "diamond", "command": "/testfor @r", "itemName": "§bDiamonder" }], "title": "§aRanks", "tag": "ranks", "rows": 1, "color": 0 },
                { "author": "Trash9240", "icons": [{ "row": 2, "column": 7, "itemAmount": 1, "itemLore": ["§7- Teleports you randomly"], "sound": 0, "icon": "gold_ingot", "command": "scriptevent azalea:wild", "itemName": "§gRTP" }, { "row": 2, "column": 3, "itemAmount": 1, "itemLore": ["§7- Teleports you to spawn"], "sound": 0, "icon": "emerald", "command": "scriptevent azalea:warpto spawn", "itemName": "§aSpawn" }, { "row": 2, "column": 5, "itemAmount": 1, "itemLore": ["§7- Fight other players"], "sound": 0, "icon": "iron_sword", "command": "scriptevent azalea:warpto pvp", "itemName": "§cPvP Area" }], "title": "§dWarps §5UI", "tag": "warps-ui", "rows": 3, "color": 0, "background": "gray_glass" },
                { "icons": [{ "row": 1, "column": 1, "itemAmount": 1, "itemLore": [""], "icon": "gray_glass", "command": " ", "itemName": " ", "sound": 0, "conditionalDisplay": "", "priority": 1 }, 1, 1, 1, 1, 1, 1, 1, { "row": 1, "column": 9, "itemAmount": 1, "itemLore": [""], "icon": "gray_glass", "command": " ", "itemName": " ", "sound": 0, "conditionalDisplay": "", "priority": 1 }, 1, { "row": 2, "column": 1, "itemAmount": 1, "itemLore": [""], "icon": "gray_glass", "command": " ", "itemName": " ", "sound": 0, "conditionalDisplay": "", "priority": 1 }, 1, 1, { "row": 4, "column": 1, "itemAmount": 1, "itemLore": [""], "icon": "gray_glass", "command": " ", "itemName": " ", "sound": 0, "conditionalDisplay": "", "priority": 1 }, 1, { "row": 5, "column": 1, "itemAmount": 1, "itemLore": [""], "icon": "gray_glass", "command": " ", "itemName": " ", "sound": 0, "conditionalDisplay": "", "priority": 1 }, 1, { "row": 5, "column": 2, "itemAmount": 1, "itemLore": [""], "icon": "gray_glass", "command": " ", "itemName": " ", "sound": 0, "conditionalDisplay": "", "priority": 1 }, 1, 1, 1, 1, 1, 1, { "row": 5, "column": 8, "itemAmount": 1, "itemLore": [""], "icon": "gray_glass", "command": " ", "itemName": " ", "sound": 0, "conditionalDisplay": "", "priority": 1 }, 1, { "row": 5, "column": 9, "itemAmount": 1, "itemLore": [""], "icon": "gray_glass", "command": " ", "itemName": " ", "sound": 0, "conditionalDisplay": "", "priority": 1 }, 1, { "row": 2, "column": 9, "itemAmount": 1, "itemLore": [""], "icon": "gray_glass", "command": " ", "itemName": " ", "sound": 0, "conditionalDisplay": "", "priority": 1 }, 1, 1, { "row": 4, "column": 9, "itemAmount": 1, "itemLore": [""], "icon": "gray_glass", "command": " ", "itemName": " ", "sound": 0, "conditionalDisplay": "", "priority": 1 }, 1, { "row": 1, "column": 2, "itemAmount": 1, "itemLore": ["§8Category", "§8", "§rExamples:", "> Dirt", "> Stone", "> and all other blocks", "§r", "§eClick to view the category!"], "sound": 0, "icon": "block_row_1_column_13", "command": " ", "itemName": "§eBlocks", "conditionalDisplay": "", "priority": 1 }, { "row": 1, "column": 3, "itemAmount": 1, "itemLore": ["§8Category", "§8", "Examples:", "> Swords", "> Bows", "> Magical Weapons", "§8", "§eClick to view the category!"], "sound": 0, "icon": "diamond_sword", "command": " ", "itemName": "§6Weapons", "conditionalDisplay": "", "priority": 1 }, { "row": 5, "column": 7, "itemAmount": 1, "itemLore": ["§8Resets all filters exculding the auction type"], "sound": 0, "icon": "Packs/Asteroid/garbage", "command": " ", "itemName": "§aReset Filters", "conditionalDisplay": "", "priority": 1 }, { "row": 5, "column": 5, "itemAmount": 1, "itemLore": ["§8", "§b> Highest bid/price", "§8Lowest bid/price", "§8Ending soon", "§8Most bids", "§8", "§eClick to change!"], "sound": 0, "icon": "Packs/Asteroid/mediumg", "command": " ", "itemName": "§aSorting", "conditionalDisplay": "", "priority": 1 }, { "row": 5, "column": 6, "itemAmount": 1, "itemLore": ["§8", "§b> All", "§8Common", "§8Uncommon", "§8Rare", "§8Epic", "§8Legendary", "§8Mythic", "§8Special", "§8", "§eClick to change!"], "sound": 0, "icon": "Packs/Asteroid/timer", "command": " ", "itemName": "§aRarity", "conditionalDisplay": "", "priority": 1 }, { "row": 5, "column": 4, "itemAmount": 1, "itemLore": ["§8", "§b> Both", "§8Buy It Now", "§8Classic Auction", "§8", "§eClick to change!"], "sound": 0, "icon": "Packs/Asteroid/magnifyingGlass", "command": " ", "itemName": "§aAuction Type", "conditionalDisplay": "", "priority": 1 }, { "row": 5, "column": 3, "itemAmount": 1, "itemLore": ["§8Search items by their names ot descriptions."], "sound": 0, "icon": "Packs/Asteroid/spyglass_flat", "command": " ", "itemName": "§aSearch", "conditionalDisplay": "", "priority": 1 }, { "row": 3, "column": 9, "itemAmount": 2, "itemLore": ["§8You are on page 1. click to get to the next page!"], "sound": 0, "icon": "arrow", "command": " ", "itemName": "§aNext page", "conditionalDisplay": "", "priority": 1 }, { "row": 3, "column": 1, "itemAmount": 1, "itemLore": ["§8You are on page 1. you cannot go back more!"], "sound": 0, "icon": "arrow", "command": " ", "itemName": "§aPrevious page", "conditionalDisplay": "§8You are on page 1. you cannot go back more!", "priority": 1 }, { "row": 1, "column": 4, "itemAmount": 1, "itemLore": ["§8Category", "§8", "Examples:", "> Helmets", "> Chestplates", "> Leggings", "> Boots", "§8", "§eClick to view the category!"], "sound": 0, "icon": "diamond_chestplate", "command": " ", "itemName": "§bArmors", "conditionalDisplay": "", "priority": 1 }, { "row": 1, "column": 5, "itemAmount": 1, "itemLore": ["§8Category", "§8", "Examples:", "> Potions", "> Foods", "> Books", "§8", "§eClick to vew category!"], "sound": 0, "icon": "potion_03a", "command": " ", "itemName": "§cConsumables", "conditionalDisplay": "", "priority": 1 }, { "row": 1, "column": 6, "itemAmount": 1, "itemLore": ["§8Category", "§8", "Examples:", "> Talismans", "> Rings", "> Orbs", "> Artifacts", "§8", "§eClick to view the category!"], "sound": 0, "icon": "ring_01b", "command": " ", "itemName": "§2Accessories", "conditionalDisplay": "", "priority": 1 }, { "row": 1, "column": 7, "itemAmount": 1, "itemLore": ["§8Category", "§8", "Examples:", "> Showcase Block", "> Chairs", "> Tables", "> Statue", "§8", "§eClick to view the category!"], "sound": 0, "icon": "block_row_27_column_13", "command": " ", "itemName": "§sFurnitures", "conditionalDisplay": "", "priority": 1 }, { "row": 1, "column": 8, "itemAmount": 1, "itemLore": ["§8Category", "§8", "Examples:", "> Pickaxes", "> Shovles", "> Hoes", "> Axes", "§8", "§eClick to view the category!"], "sound": 0, "icon": "diamond_pickaxe", "command": " ", "itemName": "§9Tools", "conditionalDisplay": "", "priority": 1 }], "title": "Auctions", "tag": "ah", "rows": 5, "background": null, "color": 6 },
                { "icons": ["setPos(5,3) // middle bottom of chest\n\nif(!playerHasTag(\"admin\")) ignore() // ignore icon if the player is not an admin\n\nif(playerHasTag(\"staffchat\")) {\n  setIcon(\"red_dye\")\n  setName(\"§cExit Staffchat§r\")\n  setLore([\"- You are currently in staffchat\"])\n  setOnclick(player => player.removeTag(\"staffchat\"))\n} else {\n  setIcon(\"emerald\")\n  setName(\"§aEnter Staffchat§r\")\n  setLore([\"- You are not in staffchat\"])\n  setOnclick(player => player.addTag(\"staffchat\"))\n}", "// Extra\nsetPos(2,2) // Col 2, Row 2\nsetOnclick((player,{uiManager})=>{\n uiManager.open(\"AzaleaExtra/Shop\", player);\n});\n\n// Set Name\nsetName(\"§l§aShop§r\")\nsetLore([\"- Visit the §aServer Shop§r\"])\nsetIcon(\"Packs/Asteroid/market\")\n\n/*\n§dIcon made by Trash9240 on April 9, 2024\n§eMade for Chest Server GUI Template§r\n*/", "setPos(8,2) // Col 8, Row 2\n\nsetName(\"§l§dPlayer Shop§r\")\nsetLore([\"- Open the §ePlayer Shops§r\"])\nsetIcon(\"Packs/Asteroid/vender\")\nsetOnclick((player,{uiManager})=>{\n  uiManager.open(\"Azalea0.9.1/PlayerShop/Main\", player)\n})", "// Autogenerated code\nsetPos(4,2)\n//Azalea2.0/ServerCommunity/Root\nsetIcon(\"Packs/Asteroid/accessibility_glyph_color\")\nsetName(\"§l§9Server Community§r\")\nsetLore([\"- Make posts that other people can view\"])\nsetOnclick(player=>{\nplayer.runCommand(`scriptevent azalea:open_ui Azalea2.0/ServerCommunity/Root`)\n})", "// Autogenerated code\nsetPos(6,2)\n\nsetName(\"§l§5Warps§r\")\nsetIcon(\"Packs/Asteroid/icon_recipe_item\")\nsetLore([\"- View warps\"])\nsetOnclick(player =>{\n  player.runCommand(`scriptevent azalea:open_ui Azalea1.1/Warps`)\n});", "// Autogenerated code\nsetPos(3,2)\n\nsetName(\"§l§cMy Profile§r\")\nsetLore([\"- View your profile\"])\nsetIcon(\"Packs/Asteroid/profile_glyph_color\")\nsetOnclick((player,{uiManager}) => {\n  uiManager.open(\"Azalea1.1/PlayerProfile\", player, player.name)\n});", "// Autogenerated code\nsetPos(7,2)\nsetName(\"§p§lAuction House§r\")\nsetLore([\"- It would be funny if I dont finish this\"])\nsetIcon(\"Packs/Asteroid/win\")\nsetOnclick((player,{uiManager})=>{\nuiManager.open(\"Azalea1.1/AuctionHouse/Root\", player);\n})", "// Autogenerated code\nsetPos(5,2)\nsetName(\"§b§lMy Vault§r\")\nsetLore([\"- Beta\"])\nsetIcon(\"Packs/Asteroid/vault\")\nsetOnclick((player, {uiManager})=>{\n\n})"], "title": "§eServer §aGUI", "tag": "chest-server-gui", "rows": 3, "author": "Trash9240", "background": null, "advanced": true, "color": 0 },
                { "icons": ["function getScore(e,r){try{let t=world.scoreboard.getObjective(e);if(!t)return 0;let o=0;try{o=t.getScore(r.scoreboardIdentity)}catch{o=0}return o||(o=0),o}catch{return 0}}function setScore(e,r,t){try{let o=world.scoreboard.getObjective(e);o||(o=world.scoreboard.addObjective(e,e)),o.setScore(r,t)}catch{return 0}}setPos(Math.floor(9*Math.random())+1,Math.floor(6*Math.random())+1),setName(\"\\xa7e\\xa7lClick me!\\xa7r\"),setLore([formatStr(\"\\xa77- You have \\xa7a{{score points}} \\xa7dPoints\\xa7r\",player)]),setIcon(\"green_glass\"),setOnclick(e=>{setScore(\"points\",e,getScore(\"points\",e)+1),e.addTag(\"minigame\")});"], "title": "§7[ §cRandom §aMinigame §7]", "tag": "minigame", "advanced": true, "rows": 6, "author": "Trash9240", "background": "red_glass", "color": 0, "backgroundClickCommand": "scoreboard players add @s points -5" }
            ]
            let uis = [];
            uis = chestFormsDB.get("Forms", []);
            system.runInterval(() => {
                uis = chestFormsDB.get("Forms", []);
            }, 100);
            function matchesConditionalDisplay(player, str) {
                if (!str) return true;
                let parts = str.split(',').map(_ => _.trim());
                return parts.every((value) => {
                    if (value.startsWith('!')) return !player.hasTag(value.substring(1));
                    return player.hasTag(value);
                })
            }
            system.runInterval(() => {
                for (const player of world.getPlayers()) {
                    for (const form of uis) {
                        if (player.hasTag(form.tag)) {
                            player.removeTag(form.tag);
                            uiManager.open("Azalea2.0/ChestGUIs/OpenForm", player, form);
                        }
                    }
                }
            }, 20);
            uiManager.addUI("Azalea2.0/ChestGUIs/EditItem", (player, index, itemIndex) => {
                let forms = chestFormsDB.get("Forms", []);
                let form = forms[index];
                let actionForm = new ActionForm();
                actionForm.title(`§f§u§l§l§s§c§r§e§e§n§rEdit Item`)
                actionForm.body(form.advanced ? `Editing JS item` : `Editing: ${form.icons[itemIndex].itemName}`);
                actionForm.button("Delete", `textures/azalea_icons/Delete`, player => {
                    forms[index].icons.splice(itemIndex, 1);
                    chestFormsDB.set("Forms", forms);
                    uiManager.open("Azalea2.0/ChestGUIs/Edit", player, index);
                });
                actionForm.button("Edit", `textures/azalea_icons/EditShop`, player => {
                    uiManager.open("Azalea2.0/ChestGUIs/AddItem", player, index, itemIndex);
                });
                if (!form.advanced) {
                    actionForm.button("Add Extra", `textures/azalea_icons/AddItem`, player => {
                        uiManager.open("Azalea2.0/ChestGUIs/AddItem", player, index, -1, forms[index].icons[itemIndex].row, forms[index].icons[itemIndex].column);
                    });
                    actionForm.button("Duplicate Right", `textures/azalea_icons/DuplicateRight`, player => {
                        let maxColumns = forms[index].rows >= 1 ? 9 : 5;
                        let maxRows = forms[index].rows >= 1 ? forms[index.rows] : 1;
                        let newIcon = JSON.parse(JSON.stringify(forms[index].icons[itemIndex]));
                        newIcon.column++;
                        if (newIcon.column > maxColumns) return uiManager.open("Azalea2.0/ChestGUIs/Edit", player, index);
                        forms[index].icons.push(newIcon);
                        chestFormsDB.set("Forms", forms);
                        uiManager.open("Azalea2.0/ChestGUIs/Edit", player, index);
                    });
                    actionForm.button("Duplicate Left", `textures/azalea_icons/DuplicateLeft`, player => {
                        let maxColumns = forms[index].rows >= 1 ? 9 : 5;
                        let maxRows = forms[index].rows >= 1 ? forms[index.rows] : 1;
                        let newIcon = JSON.parse(JSON.stringify(forms[index].icons[itemIndex]));
                        newIcon.column--;
                        if (newIcon.column < 0) return uiManager.open("Azalea2.0/ChestGUIs/Edit", player, index);
                        forms[index].icons.push(newIcon);
                        chestFormsDB.set("Forms", forms);
                        uiManager.open("Azalea2.0/ChestGUIs/Edit", player, index);
                    });
                    actionForm.button("Duplicate Down", `textures/azalea_icons/DuplicateDown`, player => {
                        let maxColumns = forms[index].rows >= 1 ? 9 : 5;
                        let maxRows = forms[index].rows >= 1 ? forms[index.rows] : 1;
                        let newIcon = JSON.parse(JSON.stringify(forms[index].icons[itemIndex]));
                        newIcon.row++;
                        if (newIcon.row > maxRows) return uiManager.open("Azalea2.0/ChestGUIs/Edit", player, index);
                        forms[index].icons.push(newIcon);
                        chestFormsDB.set("Forms", forms);
                        uiManager.open("Azalea2.0/ChestGUIs/Edit", player, index);
                    });
                    actionForm.button("Duplicate Up", `textures/azalea_icons/DuplicateUp`, player => {
                        let maxColumns = forms[index].rows >= 1 ? 9 : 5;
                        let maxRows = forms[index].rows >= 1 ? forms[index.rows] : 1;
                        let newIcon = JSON.parse(JSON.stringify(forms[index].icons[itemIndex]));
                        newIcon.row--;
                        if (newIcon.row < 0) return uiManager.open("Azalea2.0/ChestGUIs/Edit", player, index);
                        forms[index].icons.push(newIcon);
                        chestFormsDB.set("Forms", forms);
                        uiManager.open("Azalea2.0/ChestGUIs/Edit", player, index);
                    });

                }


                actionForm.show(player, false, (player, response) => { });
            });
            uiManager.addUI("Azalea2.0/ChestGUIs/AddItem", (player, index, itemIndex = -1, defaultRow = 1, defaultColumn = 1) => {
                let forms = chestFormsDB.get("Forms", []);
                let form = forms[index];

                if (form.advanced) {
                    let modal = new ModalForm("Code Editor");
                    modal.title("Code Editor")
                    let defaultValue = undefined;
                    if (itemIndex < 0) {
                        defaultValue = `// Autogenerated code\nsetPos(${defaultColumn},${defaultRow})`;
                    } else {
                        defaultValue = form.icons[itemIndex]
                    }
                    modal.textField("Code Editor", "Type some code here...", defaultValue);
                    modal.show(player, false, (player, response) => {
                        if (response.canceled) return;
                        if (itemIndex >= 0) forms[index].icons[itemIndex] = response.formValues[0]
                        else forms[index].icons.push(response.formValues[0]);
                        chestFormsDB.set("Forms", forms);
                        uiManager.open("Azalea2.0/ChestGUIs/Edit", player, index)
                    })
                    return;
                }
                let size = 9 * form.rows;
                let modalForm = new ModalForm();
                modalForm.title(itemIndex >= 0 ? "Edit Item" : "Add Item");
                modalForm.textField("Icon ID (§7from §ehttps://azalea.trashdev.org/id-lists/ui-icons§r§7§r)", "icon id", itemIndex >= 0 ? form.icons[itemIndex].icon : undefined);
                modalForm.textField("Command", "Command to run", itemIndex >= 0 ? form.icons[itemIndex].command : undefined);
                modalForm.textField("Item Name", "Item Name", itemIndex >= 0 ? form.icons[itemIndex].itemName : undefined);
                modalForm.slider("Row (§aY§r§f)", 1, Math.max(Math.floor(form.rows), 1), 1, itemIndex >= 0 ? form.icons[itemIndex].row : defaultRow);
                modalForm.slider("Column (§cX§r§f)", 1, size > 5 ? 9 : 5, 1, itemIndex >= 0 ? form.icons[itemIndex].column : defaultColumn);
                modalForm.slider("Item Amount", 1, 100, 1, itemIndex >= 0 ? form.icons[itemIndex].itemAmount ? form.icons[itemIndex].itemAmount : 1 : 1);
                modalForm.textField("Item Lore (§7Comma Separated§r§f)", "Example: Line 1,Line 2", itemIndex >= 0 ? form.icons[itemIndex].itemLore && form.icons[itemIndex].itemLore.length ? form.icons[itemIndex].itemLore.join(',') : undefined : undefined);
                modalForm.dropdown("Click Sound", sounds.map(_ => {
                    return {
                        callback() { },
                        option: _.name
                    };
                }), itemIndex >= 0 ? form.icons[itemIndex].sound ? form.icons[itemIndex].sound : 0 : 0);
                modalForm.textField(`Conditional Display §7- show icon if the player has these tags §f[Examples: §etag1,!tag2 §f| §e!tag2 §f| §etag1]`, `Optional`, itemIndex >= 0 ? form.icons[itemIndex].conditionalDisplay ? form.icons[itemIndex].conditionalDisplay : undefined : undefined)
                modalForm.slider(`Multislot Priority`, 1, 12, 1, itemIndex >= 0 ? form.icons[itemIndex].priority ? form.icons[itemIndex].priority : 1 : 1);
                modalForm.show(player, false, (player, response) => {
                    if (response.formValues[0] == "furry") {
                        let actionForm = new ActionForm();
                        actionForm.title("bad");
                        actionForm.body("dont make fapdos angry :(");
                        actionForm.button("ok", null, (player) => {
                            uiManager.open("Azalea2.0/ChestGUIs/AddItem", player, index, itemIndex, defaultRow, defaultColumn)
                        });
                        actionForm.show(player, false, () => { });
                        return;
                    }
                    if (!response.formValues[0] || (!icons.get(response.formValues[0]) && !response.formValues[0].startsWith('minecraft:'))) return uiManager.open("Azalea2.0/ChestGUIs/Edit", player, index);
                    if (!response.formValues[1]) return uiManager.open("Azalea2.0/ChestGUIs/Edit", player, index);
                    if (!response.formValues[2]) return uiManager.open("Azalea2.0/ChestGUIs/Edit", player, index);
                    // if (itemIndex < 0 && form.icons.find(_ => _.column == response.formValues[4] && _.row == response.formValues[3])) return uiManager.open("Azalea2.0/ChestGUIs/Edit", player, index);
                    if (itemIndex >= 0) {
                        forms[index].icons.splice(itemIndex, 1);
                        forms[index].icons.push({
                            row: response.formValues[3],
                            column: response.formValues[4],
                            itemAmount: response.formValues[5],
                            itemLore: response.formValues[6].split(',').map(_ => _.trim()),
                            sound: response.formValues[7],
                            icon: response.formValues[0],
                            command: response.formValues[1],
                            itemName: response.formValues[2],
                            conditionalDisplay: response.formValues[8] ? response.formValues[8] : "",
                            priority: response.formValues[9]
                        });
                    } else {
                        forms[index].icons.push({
                            row: response.formValues[3],
                            column: response.formValues[4],
                            itemAmount: response.formValues[5],
                            itemLore: response.formValues[6].split(',').map(_ => _.trim()),
                            icon: response.formValues[0],
                            command: response.formValues[1],
                            itemName: response.formValues[2],
                            sound: response.formValues[7],
                            conditionalDisplay: response.formValues[8] ? response.formValues[8] : "",
                            priority: response.formValues[9]
                        });
                    }
                    chestFormsDB.set("Forms", forms);
                    return uiManager.open("Azalea2.0/ChestGUIs/Edit", player, index);
                });
            });
            // uiManager.open("Azalea2.1/ChestGUIs/Multislot", player, res.selection)
            uiManager.addUI("Azalea2.1/ChestGUIs/Multislot", (player, index, multiSlotIndex) => {
                //9 * (icon.row - 1) + (icon.column - 1)
                let forms = chestFormsDB.get("Forms", []);
                let form = forms[index];
                let indexes = [];
                let iconsList = form.icons.filter((_, i) => {
                    if ((9 * (_.row - 1) + (_.column - 1)) == multiSlotIndex) {
                        indexes.push(i);
                        return true;
                    } else {
                        return false;
                    }
                })
                let chestGUI = new ChestFormData("54");
                chestGUI.title(`Dynamic Slot - ${iconsList.length} icon(s)`)
                let nothingSlots = [];
                for (let i = 45; i < 54; i++) {
                    if (i == 46 || i == 52) continue;
                    nothingSlots.push(i);
                    chestGUI.button(i, `§c§oX`, [], `textures/blocks/glass_gray`, 1, false);
                }
                let iconIndex = -1;
                for (const icon of iconsList) {
                    iconIndex++;
                    chestGUI.button(iconIndex, icon.itemName, icon.itemLore && icon.itemLore.filter(_ => _.length ? true : false) ? icon.itemLore.filter(_ => _.length ? true : false) : [], icons.get(icon.icon).path, icon.amount, false)
                }
                chestGUI.button(46, `§eGet Help`, [`Get help with dynamic slots`], `textures/3d_icons/EnderChest`, 1, false);
                // chestGUI.button(49, `§aAdd More`, [`Add more`], `textures/azalea_icons/1`, 1, false);
                chestGUI.button(52, `§aAdd More`, [`Add more`], `textures/azalea_icons/1`, 1, false);
                chestGUI.show(player).then(res => {
                    if (res.canceled) return uiManager.open("Azalea2.0/ChestGUIs/Edit", player, index)
                    if (nothingSlots.includes(res.selection)) {
                        uiManager.open("Azalea2.1/ChestGUIs/Multislot", player, index, multiSlotIndex)
                    }
                    if (iconsList[res.selection]) {
                        uiManager.open("Azalea2.0/ChestGUIs/EditItem", player, index, indexes[res.selection])
                    }
                })
            });
            uiManager.addUI("Azalea2.0/ChestGUIs/Edit", (player, index) => {
                let forms = chestFormsDB.get("Forms", []);
                let form = forms[index];
                let size = 9 * form.rows;
                function rowColToSlotNumber(r, c) {
                    return 9 * (r - 1) + (c - 1);
                }
                if (form.advanced) {
                    let chestForm = new ChestFormData(size.toString());
                    chestForm.title(size > 5 ? `Edit Chest GUI` : `Edit Hopper GUI`);
                    let slotsUsed = [];
                    let iconsList = [];
                    let errors = [];
                    for (let i = 0; i < form.icons.length; i++) {
                        let icon = form.icons[i]
                        if (!icon) continue;
                        console.warn(icon)
                        let data = {};
                        try {
                            eval(`(({ignore,playerHasTag,player,setPos,world,formatStr,setIcon,setName, setStackSize, setOnclick, setLore})=>{${icon}})`)({
                                setPos(col, row) { data.row = row; data.col = col },
                                setIcon(iconID) { data.icon = iconID },
                                setName(name) { data.name = name },
                                setLore(lore) { data.lore = lore },
                                ignore(bool = true) { data.ignore = bool },
                                setStackSize(stackSize) { data.stackSize = stackSize },
                                setOnclick() { },
                                player: player,
                                playerHasTag(tag) {
                                    return player.hasTag(tag)
                                },
                                world,
                                formatStr

                            })
                        } catch (e) {
                            errors.push([i, `${e} ${e.stack}`]);
                        }
                        if (data.ignore) continue;
                        console.warn(JSON.stringify(data, null, 2))
                        let iconTexture = icons.get(data.icon);
                        chestForm.button(rowColToSlotNumber(data.row ?? 0, data.col ?? 0), data.name ? data.name : "Unknown", data.lore ? data.lore : [], iconTexture ? iconTexture.path : "textures/azalea_icons/Info", data.stackSize ? data.stackSize : 1);
                        slotsUsed.push(rowColToSlotNumber(data.row ?? 0, data.col ?? 0))
                        iconsList.push([rowColToSlotNumber(data.row ?? 0, data.col ?? 0), i]);
                    }
                    for (let i = 0; i < size; i++) {
                        if (!slotsUsed.includes(i))
                            chestForm.button(i, `§l§aAdd JS item`, ["Advanced mode"], `textures/azalea_icons/Glass/glass_lime`, 1);
                    }
                    if (errors.length) {
                        chestForm.button(0, `§c§lErrors found!`, errors.map(_ => {
                            return `§7> Icon ${_[0]}\n§r§f${_[1]}`
                        }), `textures/azalea_icons/icontextures/block_row_10_column_16`, errors.length)
                    }
                    chestForm.show(player).then(res => {
                        if (errors && errors.length && res.selection == 0) {
                            let actionForm = new ActionForm();
                            for (const error of errors) {
                                actionForm.button(`§c§lIcon ${error[0]}`, `textures/azalea_icons/Info`, (player) => {
                                    uiManager.open("Azalea2.0/ChestGUIs/AddItem", player, index, error[0]);
                                })
                            }
                            actionForm.show(player, false, (player, response) => {

                            })
                            return;
                        }
                        if (res.canceled) return;
                        if (slotsUsed.includes(res.selection)) {
                            let icon = iconsList.find(_ => _[0] == res.selection);
                            return uiManager.open("Azalea2.0/ChestGUIs/EditItem", player, index, icon[1]);
                        } else {
                            return uiManager.open("Azalea2.0/ChestGUIs/AddItem", player, index, -1, Math.floor(res.selection / 9) + 1, res.selection % 9 + 1);

                        }
                    })
                    return;
                }
                let chestForm = new ChestFormData(size.toString());
                chestForm.title(size > 5 ? `Edit Chest GUI` : `Edit Hopper GUI`);
                // world.sendMessage(JSON.stringify(form, null, 2))
                let multislots = [];
                for (const icon of form.icons) {
                    if (typeof icon != "object") continue;
                    let iconData = icons.get(icon.icon);
                    let otherIconsInSlot = form.icons.filter(_ => _.row == icon.row && _.column == icon.column);
                    // world.sendMessage(JSON.stringify(icon.itemLore))
                    if (otherIconsInSlot.length > 1) {
                        multislots.push(9 * (icon.row - 1) + (icon.column - 1));
                    }
                    chestForm.button(9 * (icon.row - 1) + (icon.column - 1), otherIconsInSlot.length > 1 ? "§aDynamic Slot" : icon.itemName, otherIconsInSlot.length > 1 ? [`${otherIconsInSlot.length} icon(s)`] : icon.itemLore && icon.itemLore.filter(_ => _.length ? true : false) ? icon.itemLore.filter(_ => _.length ? true : false) : [], otherIconsInSlot.length > 1 ? "textures/azalea_icons/1" : icon.icon.startsWith('minecraft:') ? icon.icon : iconData.path, icon.itemAmount ? icon.itemAmount : 1);
                }
                if (form.color && form.color == 1) chestForm.titleText = `§d${chestForm.titleText.substring(2)}`;
                if (form.color && form.color == 2) chestForm.titleText = `§e${chestForm.titleText.substring(2)}`;
                if (form.color && form.color == 3) chestForm.titleText = `§f${chestForm.titleText.substring(2)}`;
                if (form.color && form.color == 4) chestForm.titleText = `§1${chestForm.titleText.substring(2)}`;
                if (form.color && form.color == 5) chestForm.titleText = `§2${chestForm.titleText.substring(2)}`;
                if (form.color && form.color == 6) chestForm.titleText = `§l${chestForm.titleText.substring(2)}`;
                if (form.color && form.color == 7) chestForm.titleText = `§g${chestForm.titleText.substring(2)}`;
                if (form.color && form.color == 8) chestForm.titleText = `§h${chestForm.titleText.substring(2)}`;
                let addItemIconPath = !form.color ? "textures/azalea_icons/Glass/glass_lime" : form.color == 1 ? "textures/azalea_icons/Glass/glass_light_blue" : form.color == 2 ? "textures/azalea_icons/Glass/glass_light_blue" : form.color == 3 ? "textures/azalea_icons/Glass/glass_magenta" : "textures/azalea_icons/Glass/glass_lime";
                for (let i = 0; i < size; i++) {
                    if (form.icons.find(_ => 9 * (_.row - 1) + (_.column - 1) == i)) continue;
                    chestForm.button(i, "§l§aClick to add an item", [`This will add an §eitem`, `on the slot you are §bcurrently selecting`], addItemIconPath, 1);
                }
                // chestForm.button(9*form.rows, "§dAdd a Button", ["Adds a button to the Chest GUI"], "textures/azalea_icons/1", 1);
                chestForm.show(player).then(res => {
                    if (res.canceled) {
                        if (res.cancelationReason == FormCancelationReason.UserClosed) {
                            uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                        }
                        return;
                    }
                    ;
                    if (multislots.includes(res.selection)) {
                        return uiManager.open("Azalea2.1/ChestGUIs/Multislot", player, index, res.selection)
                    }
                    let itemFound = form.icons.find(icon => 9 * (icon.row - 1) + (icon.column - 1) == res.selection);
                    if (itemFound) {
                        let itemFoundIndex = form.icons.findIndex(icon => 9 * (icon.row - 1) + (icon.column - 1) == res.selection);
                        uiManager.open("Azalea2.0/ChestGUIs/EditItem", player, index, itemFoundIndex);
                        return;
                    } else {
                        return uiManager.open("Azalea2.0/ChestGUIs/AddItem", player, index, -1, Math.floor(res.selection / 9) + 1, res.selection % 9 + 1);
                    }
                });
            });
            uiManager.addUI("Azalea2.2/ChestGUIs/Folder", (player, folderName) => {
                let forms = chestFormsDB.get("Forms", []);
                let folders = chestFormsDB.get("Folders", []);
                let actionForm = new ActionForm();
                actionForm.title(`§f§u§l§l§s§r§e§e§n§r${folderName}`)
                let folder = folders.find(_ => _.name == folderName);
                let folderIndex = folders.findIndex(_ => _.name == folderName);
                actionForm.button(`Edit Folder`, `textures/azalea_icons/Pencil`, (player) => {
                    let modalForm = new ModalForm();
                    modalForm.title("Edit Folder");
                    modalForm.textField("Folder Name", "Example: Utility GUIs", folder.name)
                    for (const form of forms) {
                        modalForm.toggle(`${form.title}${form.advanced ? " §7[ §6ADVANCED §7]" : ""}`, folder.forms.includes(form.tag));
                    }
                    modalForm.show(player, false, (player, response) => {
                        if (!response.formValues[0]) {
                            folders.splice(folderIndex, 1)
                            chestFormsDB.set("Folders", folders);
                            return uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                        }
                        // if(folders.find(_=>_.name == response.formValues[0])) return uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                        let formsToAddBool = response.formValues.slice(1);
                        let formsToAdd = [];
                        let i = -1;
                        for (const formToAdd of formsToAddBool) {
                            i++;
                            if (formToAdd)
                                formsToAdd.push(forms[i].tag);
                        }
                        folders[folderIndex] = {
                            name: response.formValues[0],
                            forms: formsToAdd
                        };
                        chestFormsDB.set("Folders", folders);
                        uiManager.open("Azalea2.2/ChestGUIs/Folder", player, folderName);
                    })
                })
                let i = -1;
                for (const form of forms) {
                    i++;
                    if (!folder.forms.includes(form.tag)) continue;
                    actionForm.button(`${form.title}\n${form.rows >= 1 ? `§a${form.rows} Row${form.rows > 1 ? "s" : ""}` : `§aHopper Mode`}${form.advanced ? " §7[§6Advanced§7]" : ""}`, `${form.rows >= 1 ? `textures/azalea_icons/Chest/${form.advanced ? "Advanced/" : ""}Chest${form.rows}` : `textures/items/hopper`}`, player => {
                        let actionForm = new ActionForm();
                        actionForm.title(form.rows >= 1 ? "Edit Chest GUI" : "Edit Hopper GUI");
                        actionForm.button("Edit Items", "textures/azalea_icons/AddItem", player => {
                            uiManager.open("Azalea2.0/ChestGUIs/Edit", player, i);
                        });
                        //Code Editor
                        actionForm.button("Export", `textures/amethyst_icons/Packs/asteroid_icons/creator_glyph_color`, (player) => {
                            let modalForm = new ModalForm();
                            modalForm.title("Code Editor");
                            modalForm.textField("Code", "Code", JSON.stringify(form));
                            modalForm.show(player, false, (player, response) => {
                                if (response.canceled) return;
                                try {
                                    forms[i] = JSON.parse(response.formValues[0]);
                                    chestFormsDB.set("Forms", forms);
                                } catch { }
                            })
                        })
                        actionForm.button(form.rows >= 1 ? "Edit Chest GUI Settings" : "Edit Hopper GUI Settings", "textures/azalea_icons/ClickyClick", player => {
                            // let actionForm = new ActionForm();
                            // actionForm.title("Coming Soon!");
                            // actionForm.body("This feature is not finished yet, remind me to finish it lmao");
                            // actionForm.button("Ok", null, (player)=>{
                            //     uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                            // })
                            // actionForm.show(player, false, (player, response)=>{

                            // })
                            let modalForm = new ModalForm();
                            modalForm.textField("Title", "UI Title", form.title);
                            modalForm.textField("Tag", "Tag to open UI", form.tag);
                            modalForm.slider("Rows", 1, 6, 1, form.rows < 1 ? 1 : form.rows);
                            modalForm.dropdown("Color", [{
                                "option": "Default",
                                callback() { }
                            }, {
                                "option": "Blue",
                                callback() { }
                            }, {
                                'option': "Why",
                                callback() { }
                            }, {
                                'option': "Dark Purple",
                                callback() { }
                            }, {
                                option: "Green",
                                callback() { }
                            }, {
                                option: "Ocean",
                                callback() { }
                            },
                            {
                                option: "Light",
                                callback() { }
                            },
                            {
                                option: "Glass",
                                callback() { }
                            },
                            {
                                option: "Garbage",
                                callback() { }
                            }], form.color ? form.color : 0);
                            modalForm.toggle("Hopper Mode", form.rows < 1 ? true : false);
                            modalForm.textField(`Form Background (Requires Icon ID)`, `Type icon ID here`, form.background ? form.background : undefined);
                            modalForm.toggle("Advanced Mode §c(Dangerous)", form.advanced ? true : false)
                            modalForm.textField(`Background Click Command`, `Background click command`, form.backgroundClickCommand ? form.backgroundClickCommand : undefined);
                            modalForm.title("Chest GUI Settings");
                            modalForm.show(player, false, (player, response) => {
                                if (!response.formValues[0]) return uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                                if (!response.formValues[1]) return uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                                if (response.formValues[6]) {
                                    let actionForm = new ActionForm();
                                    if (form.advanced) {
                                        forms[i].rows = response.formValues[4] ? HOPPER_MODE_MULTIPLIER : response.formValues[2];
                                        forms[i].background = response.formValues[5] ? response.formValues[5] : null
                                        forms[i].backgroundClickCommand = response.formValues[7] ? response.formValues[7] : null
                                        forms[i].advanced = response.formValues[6];
                                        forms[i].title = response.formValues[0];
                                        forms[i].tag = response.formValues[1];
                                        forms[i].color = response.formValues[3];
                                        chestFormsDB.set("Forms", forms);
                                        return;
                                    }
                                    actionForm.title("Advanced mode will remove all current items. Please make sure that this is what you want to do.");
                                    actionForm.button("yes", null, (player) => {
                                        forms[i].icons = [];
                                        forms[i].rows = response.formValues[4] ? HOPPER_MODE_MULTIPLIER : response.formValues[2];
                                        forms[i].background = response.formValues[5] ? response.formValues[5] : null
                                        forms[i].backgroundClickCommand = response.formValues[7] ? response.formValues[7] : null
                                        forms[i].advanced = response.formValues[6];
                                        forms[i].title = response.formValues[0];
                                        forms[i].tag = response.formValues[1];
                                        forms[i].color = response.formValues[3];
                                        // forms[i].advanced = true;
                                        chestFormsDB.set("Forms", forms);
                                    })
                                    actionForm.show(player, false, (player, response) => { })
                                    return;
                                }
                                if (response.formValues[2] < form.rows && !response.formValues[3]) {
                                    let actionForm = new ActionForm();
                                    actionForm.title("Are you sure?");
                                    let items = form.icons.filter(_ => _.row > response.formValues[2]);
                                    actionForm.body(`Clicking yes will delete ${items.length} item(s) in the chest UI!`);
                                    actionForm.button(`§aYes`, null, player => {
                                        forms[i].icons = forms[i].icons.filter(_ => !(_.row > response.formValues[2]));
                                        forms[i].rows = response.formValues[4] ? HOPPER_MODE_MULTIPLIER : response.formValues[2];
                                        forms[i].background = response.formValues[5] ? response.formValues[5] : null
                                        forms[i].backgroundClickCommand = response.formValues[7] ? response.formValues[7] : null
                                        forms[i].advanced = response.formValues[6];
                                        forms[i].title = response.formValues[0];
                                        forms[i].tag = response.formValues[1];
                                        forms[i].color = response.formValues[3];
                                        chestFormsDB.set("Forms", forms);
                                        return uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                                    });
                                    actionForm.button(`§cNo`, null, player => {
                                        return uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                                    });
                                    actionForm.show(player, false, () => { });
                                } else {
                                    forms[i].title = response.formValues[0];
                                    forms[i].background = response.formValues[5] ? response.formValues[5] : null
                                    forms[i].advanced = response.formValues[6];
                                    forms[i].tag = response.formValues[1];
                                    forms[i].rows = response.formValues[4] ? HOPPER_MODE_MULTIPLIER : response.formValues[2];
                                    forms[i].color = response.formValues[3];
                                    chestFormsDB.set("Forms", forms);
                                    return uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                                }
                            });
                        });

                        actionForm.button("Delete", "textures/azalea_icons/Delete", player => {
                            forms.splice(i, 1);
                            chestFormsDB.set("Forms", forms);
                            uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                        });
                        actionForm.show(player, false, (player, response) => { });

                    });
                }
                actionForm.show(player, false, (player, response) => { })
            })
            uiManager.addUI("Azalea2.0/ChestGUIs/Root", player => {
                let actionForm2 = new ActionForm();
                actionForm2.title("§f§u§l§l§s§c§r§e§e§n§rChest GUIs");
                actionForm2.body("Manage §eChest GUIs §r§fhere. Click §aadd §r§fto §aadd §r§fa §eChest GUI§r§f. All your §eChest GUIs§r§f will show up here. Click on any existing §eChest GUI §r§fto edit it.");
                actionForm2.button("§bAdd chest GUI\n§7Adds a basic chest GUI", "textures/azalea_icons/Chest/ChestAdd", player => {
                    let modalForm = new ModalForm();
                    modalForm.title("Add Chest GUI");
                    modalForm.slider("Rows", 1, 6, 1, 3, player => { });
                    modalForm.textField("Title", "Title", undefined);
                    modalForm.textField("Tag", "Tag to open UI", undefined);
                    modalForm.toggle("Hopper Mode? §7- ignores rows and enables full hopper mode!", undefined);
                    modalForm.show(player, false, (player, response) => {
                        if (!response.formValues[1]) {
                            return player.sendMessage("§cTitle must be defined.");
                        }
                        if (!response.formValues[2]) {
                            return player.sendMessage("§cTag must be defined.");
                        }
                        let rows = response.formValues[0];
                        let title = response.formValues[1];
                        let tag = response.formValues[2];
                        let formData = {
                            icons: [],
                            title,
                            tag,
                            rows: response.formValues[3] ? HOPPER_MODE_MULTIPLIER : rows,
                            author: player.name
                        };
                        let forms = chestFormsDB.get("Forms", []);
                        forms.push(formData);
                        chestFormsDB.set("Forms", forms);
                    });
                });
                actionForm2.button("§eAdd advanced chest GUI\n§7Adds an advanced chest GUI", "textures/azalea_icons/Chest/ChestAddAdvanced", player => {
                    let modalForm = new ModalForm();
                    modalForm.title("Add Chest GUI");
                    modalForm.slider("Rows", 1, 6, 1, 3, player => { });
                    modalForm.textField("Title", "Title", undefined);
                    modalForm.textField("Tag", "Tag to open UI", undefined);
                    modalForm.toggle("Hopper Mode? §7- ignores rows and enables full hopper mode!", undefined);
                    modalForm.show(player, false, (player, response) => {
                        if (!response.formValues[1]) {
                            return player.sendMessage("§cTitle must be defined.");
                        }
                        if (!response.formValues[2]) {
                            return player.sendMessage("§cTag must be defined.");
                        }
                        let rows = response.formValues[0];
                        let title = response.formValues[1];
                        let tag = response.formValues[2];
                        let formData = {
                            icons: [],
                            title,
                            tag,
                            advanced: true,
                            rows: response.formValues[3] ? HOPPER_MODE_MULTIPLIER : rows,
                            author: player.name
                        };
                        let forms = chestFormsDB.get("Forms", []);
                        forms.push(formData);
                        chestFormsDB.set("Forms", forms);
                    });
                });
                let forms = chestFormsDB.get("Forms", []);
                let folders = chestFormsDB.get("Folders", []);
                actionForm2.button("§dAdd Folder", `textures/azalea_icons/LogsAdd`, (player) => {
                    let modalForm = new ModalForm();
                    modalForm.title("Create Folder");
                    modalForm.textField("Folder Name", "Example: Utility GUIs")
                    for (const form of forms) {
                        modalForm.toggle(`${form.title}${form.advanced ? " §7[ §6ADVANCED §7]" : ""}`, false);
                    }
                    modalForm.show(player, false, (player, response) => {
                        if (!response.formValues[0]) return uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                        if (folders.find(_ => _.name == response.formValues[0])) return uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                        let formsToAddBool = response.formValues.slice(1);
                        let formsToAdd = [];
                        let i = -1;
                        for (const formToAdd of formsToAddBool) {
                            i++;
                            if (formToAdd)
                                formsToAdd.push(forms[i].tag);
                        }
                        folders.push({
                            name: response.formValues[0],
                            forms: formsToAdd
                        });
                        chestFormsDB.set("Folders", folders);
                        uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                    })
                })
                for (const folder of folders) {
                    let formsInFolder = folder.forms;
                    formsInFolder = formsInFolder.filter(_ => {
                        if (forms.find(_ => _.tag == _)) return true
                        else return false;
                    })
                    actionForm2.button(`§n${folder.name}\n§7${folder.forms.length} form(s)`, `textures/azalea_icons/Logs`, (player) => {
                        uiManager.open("Azalea2.2/ChestGUIs/Folder", player, folder.name);
                    })
                }
                actionForm2.button("§dAdd Preset Chest GUI\n§7Adds a chest GUI from the preset list", "textures/azalea_icons/Import", player => {
                    let presetForm = new ActionForm();
                    presetForm.title(`Chest GUI Presets`);
                    for (const ui of presetUIs) {
                        let iconID = ui.advanced ? "Advanced" : ui.icons.find(_ => typeof _ == "object" && _.icon && !_.icon.includes("glass"));
                        presetForm.button(`§b${ui.title}\n§r§7By ${ui.author}${ui.advanced ? ` §6[ADVANCED]` : ``}`, iconID == "Advanced" ? "textures/azalea_icons/Chest/Advanced/Chest2" : icons.get(iconID.icon).path, (player) => {
                            let editUI = new ModalForm();
                            editUI.title(`Edit Properties`);
                            editUI.textField("Title", "Title", ui.title);
                            editUI.textField("Tag", "Tag", ui.tag);
                            editUI.show(player, false, (player, response) => {
                                if (forms.find(_ => _.tag == response.formValues[1])) return;
                                let ui2 = JSON.parse(JSON.stringify(ui));
                                ui2.title = response.formValues[0];
                                ui2.tag = response.formValues[1];
                                forms.push(ui2);
                                chestFormsDB.set("Forms", forms);
                            })
                        });
                    }
                    presetForm.show(player, false, () => {

                    })
                });
                if (forms.length) {
                    for (let i = 0; i < forms.length; i++) {
                        let form = forms[i];
                        actionForm2.button(`${form.title}\n${form.rows >= 1 ? `§a${form.rows} Row${form.rows > 1 ? "s" : ""}` : `§aHopper Mode`}${form.advanced ? " §7[§6Advanced§7]" : ""}`, `${form.rows >= 1 ? `textures/azalea_icons/Chest/${form.advanced ? "Advanced/" : ""}Chest${form.rows}` : `textures/items/hopper`}`, player => {
                            let actionForm = new ActionForm();
                            actionForm.title(form.rows >= 1 ? "Edit Chest GUI" : "Edit Hopper GUI");
                            actionForm.button("Edit Items", "textures/azalea_icons/AddItem", player => {
                                uiManager.open("Azalea2.0/ChestGUIs/Edit", player, i);
                            });
                            //Code Editor
                            actionForm.button("Export", `textures/amethyst_icons/Packs/asteroid_icons/creator_glyph_color`, (player) => {
                                let modalForm = new ModalForm();
                                modalForm.title("Code Editor");
                                modalForm.textField("Code", "Code", JSON.stringify(form));
                                modalForm.show(player, false, (player, response) => {
                                    if (response.canceled) return;
                                    try {
                                        forms[i] = JSON.parse(response.formValues[0]);
                                        chestFormsDB.set("Forms", forms);
                                    } catch { }
                                })
                            })
                            actionForm.button(form.rows >= 1 ? "Edit Chest GUI Settings" : "Edit Hopper GUI Settings", "textures/azalea_icons/ClickyClick", player => {
                                // let actionForm = new ActionForm();
                                // actionForm.title("Coming Soon!");
                                // actionForm.body("This feature is not finished yet, remind me to finish it lmao");
                                // actionForm.button("Ok", null, (player)=>{
                                //     uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                                // })
                                // actionForm.show(player, false, (player, response)=>{

                                // })
                                let modalForm = new ModalForm();
                                modalForm.textField("Title", "UI Title", form.title);
                                modalForm.textField("Tag", "Tag to open UI", form.tag);
                                modalForm.slider("Rows", 1, 6, 1, form.rows < 1 ? 1 : form.rows);
                                modalForm.dropdown("Color", [{
                                    "option": "Default",
                                    callback() { }
                                }, {
                                    "option": "Blue",
                                    callback() { }
                                }, {
                                    'option': "Why",
                                    callback() { }
                                }, {
                                    'option': "Dark Purple",
                                    callback() { }
                                }, {
                                    option: "Green",
                                    callback() { }
                                }, {
                                    option: "Ocean",
                                    callback() { }
                                },
                                {
                                    option: "Light",
                                    callback() { }
                                },
                                {
                                    option: "Glass",
                                    callback() { }
                                },
                                {
                                    option: "Garbage",
                                    callback() { }
                                }], form.color ? form.color : 0);
                                modalForm.toggle("Hopper Mode", form.rows < 1 ? true : false);
                                modalForm.textField(`Form Background (Requires Icon ID)`, `Type icon ID here`, form.background ? form.background : undefined);
                                modalForm.toggle("Advanced Mode §c(Dangerous)", form.advanced ? true : false)
                                modalForm.textField(`Background Click Command`, `Background click command`, form.backgroundClickCommand ? form.backgroundClickCommand : undefined);
                                modalForm.title("Chest GUI Settings");
                                modalForm.show(player, false, (player, response) => {
                                    if (!response.formValues[0]) return uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                                    if (!response.formValues[1]) return uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                                    if (response.formValues[6]) {
                                        let actionForm = new ActionForm();
                                        if (form.advanced) {
                                            forms[i].rows = response.formValues[4] ? HOPPER_MODE_MULTIPLIER : response.formValues[2];
                                            forms[i].background = response.formValues[5] ? response.formValues[5] : null
                                            forms[i].backgroundClickCommand = response.formValues[7] ? response.formValues[7] : null
                                            forms[i].advanced = response.formValues[6];
                                            forms[i].title = response.formValues[0];
                                            forms[i].tag = response.formValues[1];
                                            forms[i].color = response.formValues[3];
                                            chestFormsDB.set("Forms", forms);
                                            return;
                                        }
                                        actionForm.title("Advanced mode will remove all current items. Please make sure that this is what you want to do.");
                                        actionForm.button("yes", null, (player) => {
                                            forms[i].icons = [];
                                            forms[i].rows = response.formValues[4] ? HOPPER_MODE_MULTIPLIER : response.formValues[2];
                                            forms[i].background = response.formValues[5] ? response.formValues[5] : null
                                            forms[i].backgroundClickCommand = response.formValues[7] ? response.formValues[7] : null
                                            forms[i].advanced = response.formValues[6];
                                            forms[i].title = response.formValues[0];
                                            forms[i].tag = response.formValues[1];
                                            forms[i].color = response.formValues[3];
                                            // forms[i].advanced = true;
                                            chestFormsDB.set("Forms", forms);
                                        })
                                        actionForm.show(player, false, (player, response) => { })
                                        return;
                                    }
                                    if (response.formValues[2] < form.rows && !response.formValues[3]) {
                                        let actionForm = new ActionForm();
                                        actionForm.title("Are you sure?");
                                        let items = form.icons.filter(_ => _.row > response.formValues[2]);
                                        actionForm.body(`Clicking yes will delete ${items.length} item(s) in the chest UI!`);
                                        actionForm.button(`§aYes`, null, player => {
                                            forms[i].icons = forms[i].icons.filter(_ => !(_.row > response.formValues[2]));
                                            forms[i].rows = response.formValues[4] ? HOPPER_MODE_MULTIPLIER : response.formValues[2];
                                            forms[i].background = response.formValues[5] ? response.formValues[5] : null
                                            forms[i].backgroundClickCommand = response.formValues[7] ? response.formValues[7] : null
                                            forms[i].advanced = response.formValues[6];
                                            forms[i].title = response.formValues[0];
                                            forms[i].tag = response.formValues[1];
                                            forms[i].color = response.formValues[3];
                                            chestFormsDB.set("Forms", forms);
                                            return uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                                        });
                                        actionForm.button(`§cNo`, null, player => {
                                            return uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                                        });
                                        actionForm.show(player, false, () => { });
                                    } else {
                                        forms[i].title = response.formValues[0];
                                        forms[i].background = response.formValues[5] ? response.formValues[5] : null
                                        forms[i].backgroundClickCommand = response.formValues[7] ? response.formValues[7] : null
                                        forms[i].advanced = response.formValues[6];
                                        forms[i].tag = response.formValues[1];
                                        forms[i].rows = response.formValues[4] ? HOPPER_MODE_MULTIPLIER : response.formValues[2];
                                        forms[i].color = response.formValues[3];
                                        chestFormsDB.set("Forms", forms);
                                        return uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                                    }
                                });
                            });

                            actionForm.button("Delete", "textures/azalea_icons/Delete", player => {
                                forms.splice(i, 1);
                                chestFormsDB.set("Forms", forms);
                                uiManager.open("Azalea2.0/ChestGUIs/Root", player);
                            });
                            actionForm.show(player, false, (player, response) => { });
                        });
                    }
                }
                // actionForm2.button("Test",null,(player)=>{})
                actionForm2.show(player, false, (player, response) => { });
            });
        }
    }
}
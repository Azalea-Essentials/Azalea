import { system, world } from "@minecraft/server";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
import { ActionForm, ModalForm } from "../form_func";
import { uiManager } from "../uis";
import { formatStr } from "../utils/AzaleaFormatting";

export default {
    namespace: "Sidebar",
    description: "Custom sidebar editor. This will make it easy to make animated sidebars that look good.",
    icon: "https://azalea.trashdev.org/img/textures/amethyst_icons/Packs/asteroid_icons/beacon.png",
    main: class {
        constructor() {
            function array_move(arr, old_index, new_index) {
                while (old_index < 0) {
                    old_index += arr.length;
                }
                while (new_index < 0) {
                    new_index += arr.length;
                }
                if (new_index >= arr.length) {
                    var k = new_index - arr.length + 1;
                    while (k--) {
                        arr.push(undefined);
                    }
                }
                arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
                return arr; // for testing purposes
            };
            function getScore(objective, player) {
                try {
                    let scoreboard = world.scoreboard.getObjective(objective);
                    if (!scoreboard) return 0;
                    let score = 0;
                    try {
                        score = scoreboard.getScore(player.scoreboardIdentity);
                    } catch {
                        score = 0;
                    }
                    if (!score) score = 0;
                    return score;
                } catch {
                    return 0;
                }
            }
            function setScore(objective, player, score) {
                try {
                    let scoreboard = world.scoreboard.getObjective(objective);
                    if (!scoreboard) scoreboard = world.scoreboard.addObjective(objective, objective);
                    scoreboard.setScore(player, score);
                } catch {
                    return 0;
                }
            }
            let lastTick = Date.now();
            let tps = 20;
            let timeArray = [];
            system.runInterval(() => {
                if (timeArray.length === 20) timeArray.shift();
                timeArray.push(Math.round(1000 / (Date.now() - lastTick) * 100) / 100);
                tps = timeArray.reduce((a, b) => a + b) / timeArray.length;
                lastTick = Date.now();
            });
            let animationTick = 0;
            world.afterEvents.entityDie.subscribe(e => {
                if (e.deadEntity.typeId == "minecraft:player") {
                    setScore("azalea:deaths", e.deadEntity, getScore("azalea:deaths", e.deadEntity) + 1);
                    if (e.damageSource.damagingEntity && e.damageSource.damagingEntity.typeId == "minecraft:player") {
                        setScore("azalea:kills", e.damageSource.damagingEntity, getScore("azalea:kills", e.damageSource.damagingEntity) + 1);
                    }
                }
            });
            world.afterEvents.entityHitEntity.subscribe(e => {
                if (e.damagingEntity.typeId === "minecraft:player") setScore("azalea:cps", e.damagingEntity, getScore("azalea:cps", e.damagingEntity) + 1);
            });
            system.runInterval(() => {
                for (const player of world.getPlayers()) {
                    setScore("azalea:cps", player, 0);
                }
            }, 20);
            function parseSidebarLine(player, line) {
                let animations = line.split('\n').filter(_ => _.length ? true : false);
                if (!animations.length) return "";
                let newText = animations[animationTick % animations.length];
                return formatStr(newText, player)
            }
            let sidebarDb = new DynamicPropertyDatabase("Sidebar");
            uiManager.addUI("Azalea2.1/SidebarEditor/Settings", player => {
                let modal = new ModalForm();
                modal.title("Sidebar Settings");
                let sidebarSettings = sidebarDb.get("Settings", {});
                modal.toggle("Enabled?", sidebarSettings.enabled ? true : false);
                modal.dropdown("Display Type", [{
                    option: "Actionbar",
                    callback() { }
                }, {
                    option: "Title",
                    callback() { }
                }]);
                modal.show(player, false, (player, response) => {
                    sidebarSettings.enabled = response.formValues[0];
                    sidebarDb.set("Settings", sidebarSettings);
                    uiManager.open('Azalea2.1/SidebarEditor/Root', player);
                });
            });

            let animationTickDelay = 0;
            system.runInterval(() => {
                let sidebarSettings = sidebarDb.get("Settings", {});
                if (sidebarSettings.enabled) {
                    let lines = sidebarSettings.lines ? sidebarSettings.lines : [];
                    for (const player of world.getPlayers()) {
                        let text = [];
                        for (const line of lines) {
                            text.push(parseSidebarLine(player, line));
                        }
                        player.onScreenDisplay.setTitle(text.join('\n§r'));
                    }
                }
                animationTickDelay++;
                if (animationTickDelay % 10 == 0) animationTick++;
            }, 1);
            uiManager.addUI("Azalea2.1/SidebarEditor/EditLine", (player, index = -1) => {
                let sidebarSettings = sidebarDb.get("Settings", {});
                let lines = sidebarSettings.lines ? sidebarSettings.lines : [];
                let action = new ActionForm();
                action.title(`Edit line`);
                action.body(parseSidebarLine(player, lines[index]));
                action.button("Edit Line", null, player => {
                    uiManager.open("Azalea2.1/SidebarEditor/AddLine", player, index);
                });
                action.button("Move Up", "textures/azalea_icons/Up", player => {
                    if (index - 1 < 0) return;
                    array_move(lines, index, index - 1);
                    sidebarSettings.lines = lines;
                    sidebarDb.set("Settings", sidebarSettings);
                    uiManager.open("Azalea2.1/SidebarEditor/Root", player);
                });
                action.button("Move Down", "textures/azalea_icons/Down", player => {
                    if (index + 1 >= lines.length) return;
                    array_move(lines, index, index + 1);
                    // moveDown(lines, index);
                    sidebarSettings.lines = lines;
                    sidebarDb.set("Settings", sidebarSettings);
                    uiManager.open("Azalea2.1/SidebarEditor/Root", player);
                });
                action.button("Delete", "textures/azalea_icons/Delete", player => {
                    lines.splice(index, 1);
                    sidebarSettings.lines = lines;
                    sidebarDb.set("Settings", sidebarSettings);
                    uiManager.open("Azalea2.1/SidebarEditor/Root", player);
                });
                action.show(player, false, () => { });
            });
            uiManager.addUI("Azalea2.1/SidebarEditor/AddLine", (player, index = -1) => {
                let sidebarSettings = sidebarDb.get("Settings", {});
                let lines = sidebarSettings.lines ? sidebarSettings.lines : [];
                let modal = new ModalForm();
                modal.title(index > -1 ? "Edit Line" : "Add Line");
                modal.textField("Frame 1:\n{{score <objective>}}§7 | Add a score\n§r§f[@username] §7| Add a player name\n§r§eYou can also use emojis from !emojis", "Text", index > -1 ? lines[index].split('\n')[0] : undefined);
                modal.textField("Frame 2:", "Text", index > -1 ? lines[index].split('\n')[1] : undefined);
                modal.textField("Frame 3:", "Text", index > -1 ? lines[index].split('\n')[2] : undefined);
                modal.textField("Frame 4:", "Text", index > -1 ? lines[index].split('\n')[3] : undefined);
                modal.textField("Frame 5:", "Text", index > -1 ? lines[index].split('\n')[4] : undefined);
                modal.textField("Frame 6:", "Text", index > -1 ? lines[index].split('\n')[5] : undefined);
                modal.textField("Frame 7:", "Text", index > -1 ? lines[index].split('\n')[6] : undefined);
                modal.textField("Frame 8:", "Text", index > -1 ? lines[index].split('\n')[7] : undefined);
                modal.textField("Frame 9:", "Text", index > -1 ? lines[index].split('\n')[8] : undefined);
                modal.textField("Frame 10:", "Text", index > -1 ? lines[index].split('\n')[9] : undefined);
                modal.textField("Frame 11:", "Text", index > -1 ? lines[index].split('\n')[10] : undefined);
                modal.textField("Frame 12:", "Text", index > -1 ? lines[index].split('\n')[11] : undefined);
                modal.textField("Frame 13:", "Text", index > -1 ? lines[index].split('\n')[12] : undefined);
                modal.textField("Frame 14:", "Text", index > -1 ? lines[index].split('\n')[13] : undefined);
                modal.textField("Frame 15:", "Text", index > -1 ? lines[index].split('\n')[14] : undefined);
                modal.show(player, false, (player, response) => {
                    // if(!response.formValues[0])
                    if (index > -1) {
                        lines[index] = response.formValues.join('\n');
                    } else {
                        lines.push(response.formValues.join('\n'));
                    }
                    sidebarSettings.lines = lines;
                    sidebarDb.set("Settings", sidebarSettings);
                    uiManager.open("Azalea2.1/SidebarEditor/Root", player);
                }).then(res => {
                    if (res.canceled) {
                        uiManager.open("Azalea2.1/SidebarEditor/Root", player);
                    }
                });
            });
            uiManager.addUI("Azalea2.1/SidebarEditor/Root", player => {
                let sidebarSettings = sidebarDb.get("Settings", {});
                let actionForm = new ActionForm();
                actionForm.body(`Enabled: ${sidebarSettings.enabled ? "§aYes" : "§cNo"}`);
                actionForm.button(`Settings`, "textures/azalea_icons/Settings", player => {
                    uiManager.open("Azalea2.1/SidebarEditor/Settings", player);
                });
                let lines = sidebarSettings.lines ? sidebarSettings.lines : [];
                for (let i2 = 0; i2 < lines.length; i2++) {
                    let line = lines[i2];
                    let text = parseSidebarLine(player, line);
                    actionForm.button(text.length ? text : "<EMPTY>", null, player => {
                        uiManager.open("Azalea2.1/SidebarEditor/EditLine", player, i2);
                    });
                }
                actionForm.button("Add", "textures/azalea_icons/1", player => {
                    uiManager.open("Azalea2.1/SidebarEditor/AddLine", player);
                });
                actionForm.show(player, false, () => { });
            });
        }
    }
}
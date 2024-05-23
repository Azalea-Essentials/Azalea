import {
    Player,
    system,
    world,
} from '@minecraft/server';
import {
    ActionFormData,
    ModalFormData,
} from '@minecraft/server-ui';
import { warps } from './warpsapi';
import { baseConfigMenu } from './configuratorOptions';
import { Database } from './db';
import {
    ActionForm,
    MessageForm,
    ModalForm,
} from './form_func';
import { isAdmin } from './isAdmin';
import { openShopUI } from './shopui';
import { uiManager } from './uis';
import icons from './icons';
import { openConfigUI } from './configuratorBase';
import { OptionTypes, options22 } from './configuratorOptions22';
import { DynamicPropertyDatabase } from './dynamicPropertyDb';
import { worldTags } from './apis/WorldTags';

world.afterEvents.playerSpawn.subscribe((e) => {
})
world.afterEvents.playerLeave.subscribe(e => {
    if (!WelcomeMessageEnabled) return;
    for (const player of world.getPlayers()) {
        player.playSound("note.bit", {
            "pitch": 0.5
        })
    }
})
// do not question the code
// system.runInterval(() => {
// let items = world.getDimension('overworld').getEntities({
//     "type": "item"
// })
// for (const item of items) {
// let itemStack = item.getComponent('item').itemStack
// item.nameTag = `§d${itemStack.amount}x §r${itemStack.typeId.split(':').slice(1).join(':').split('_').map(_ => `${_[0].toUpperCase()}${_.substring(1)}`).join(' ')}`;
// itemStack.nameTag = "a"//
// }
// }, 20);
// broken code
// function openConfigPanel(player, page = 0) {
//     if(!(player instanceof Player)) return;
//     let uiMain = new ActionForm();
//     let configItems = [];
//     for(const key in baseConfigMenu) {
//         configItems.push({
//             name: key,
//             data: baseConfigMenu[key]
//         })
//     }
//     var arrays = [], size = 3;
//     for (let i = 0; i < configItems; i += size)
//        arrays.push(configItems.slice(i, i + size));

//     let pageItems = arrays[page];
//     for(const item of pageItems) {
//         let submenu = item.data;
//         uiMain.button(item.name, submenu.icon ? submenu.icon : null, (player, i)=>{
//             new MessageForm().body("A").title("ExampleText").button1("BTN1").button2("BTN2").show(player, false, ()=>{})
//         })
//     }
//     let pages = arrays.length;
//     if(page < pages) {
//         uiMain.button("Next Page", null, (player,i)=>{
//             openConfigPanel(player, page+1);
//         });
//     }
//     if(page > 0) {
//         uiMain.button("Previous Page", null, (player,i)=>{
//             openConfigPanel(player, page-1);
//         })
//     }
//     uiMain.show(player, false, (player, response)=>{

//     })
// }

world.beforeEvents.itemUse.subscribe((e) => {
    if(!(e.source instanceof Player)) return;
    system.run(() => {
        if(e.itemStack.typeId == 'azalea:floating_text_editor') {
            let entities1 = worldTags.getTags().filter(_=>_.startsWith(`floating_text:`)).map(_=>_.replace(`floating_text:`, ``));
            let entities = [];
            for(const entity of entities1) {
                try {
                    let entity2 = world.getEntity(entity);
                    if(!entity2) continue;
                    entities.push(entity2);
                } catch {}
            }
            let form = new ActionForm();
            for(const entity of entities) {
                form.button(entity.nameTag, null, (player)=>{
                    let modalForm = new ModalForm();
                    modalForm.title("Code Editor");
                    modalForm.textField("M", "Type some text...", entity.nameTag)
                    modalForm.show(player, false, (player, response)=>{
                        if(response.formValues[0] || response.formValues[0].toLowerCase().includes('trash')) entity.nameTag = response.formValues[0];
                    })
                })
            }
            form.show(e.source, false, (player, response)=>{

            })
        }
        if (e.itemStack.typeId == "azalea:player_shop") {
            uiManager.open("Azalea0.9.1/PlayerShop/Main", e.source)
        }
        if(e.itemStack.typeId == "azalea:boost_feather") {
            e.source.applyKnockback(e.source.getViewDirection().x, e.source.getViewDirection().z, 2.5, 1.5)
            // e.source.applyKnockback(e.source.getViewDirection().x, e.source.getViewDirection().z, 1, -100)
        }
        if(e.itemStack.typeId == "azalea:tp_requests") {
            uiManager.open("Azalea2.0/TeleportRequests/Root", e.source)
        }
        if (e.itemStack.typeId == 'azalea:warp') {
            uiManager.open("Azalea1.1/Warps", e.source);
        }
        // console.warn(e.itemStack.typeId);
        // if(e.itemStack.typeId == 'minecraft:flint') {
        //     uiManager.open("Azalea0.9.1/MoneyTransfer", e.source)
        // }
        if (e.itemStack.typeId == 'azalea:shop') {
            openShopUI(e.source);
        }
        // if (e.itemStack.typeId == 'minecraft:emerald' && isAdmin(e.source) && e.itemStack.nameTag && e.itemStack.nameTag.toLowerCase() == "admin panel") {
        //     e.itemStack.nameTag = "§r§bAdmin Panel";
        //     e.itemStack.setLore(["§aOpens admin panel", "", "§e§oCan only be used by admins"]);
        //     e.source.getComponent('inventory').container.setItem(e.source.selectedSlot, e.itemStack)
        //     return e.source.sendMessage("§bClick again to open admin panel!");
        // }
        if(e.itemStack.typeId == "azalea:config_ui") {
            system.run(()=>{
                function openOptionsPanel(player, panelData) {
                    let modalForm = new ModalForm();
                    modalForm.title(panelData.title);
                    let cfgDb = new Database("Config");
                    let configData = cfgDb.allData;
                    for(const option of panelData.options) {
                        if(option.type == OptionTypes.Dropdown) {
                            let keySelected = configData[option.id] ? configData[option.id] : option.default ? option.default : "unknownkey";
                            let displayOptionI = option.keys.indexOf(keySelected);
                            let displayOption = option.display[option.keys.indexOf(keySelected)];
                            let displayOptions = ["Select an option...", ...option.display];
                            modalForm.dropdown(option.label, displayOptions.map(_=>{
                                return {
                                    callback() {},
                                    option: _
                                }
                            }), displayOptionI + 1);
                        } else if(option.type == OptionTypes.Slider) {
                            let num = typeof configData[option.id] == "string" && configData[option.id].startsWith('NUM:') ? parseInt(configData[option.id].substring(4)) : null
                            let min = option.min ? option.min : 1;
                            let max = option.max ? option.max : 10;
                            let step = option.step ? option.step : 1;
                            let val = num ? num : option.default ? option.default : min;
                            modalForm.slider(option.label, min, max, step, val);
                        } else if(option.type == OptionTypes.Toggle) {
                            let val = configData[option.id] && typeof configData[option.id] == "string" ? configData[option.id] == "true" ? true : false : option.default ? option.default : false;
                            modalForm.toggle(option.label, val);
                        } else if(option.type == OptionTypes.TextField) {
                            let val = configData[option.id] ? configData[option.id] : option.default ? option.default : undefined;
                            modalForm.textField(option.label, option.placeholder ? option.placeholder : "Type something...", val);
                        }
                    }
                    modalForm.show(player, false, (player, response)=>{
                        let i = -1;
                        for(const option of response.formValues) {
                            i++;
                            let configOption = panelData.options[i];
                            if(configOption.type == OptionTypes.Toggle) {
                                if(option) {
                                    configData[configOption.id] = "true";
                                } else {
                                    configData[configOption.id] = "false";
                                }
                            } else if(configOption.type == OptionTypes.Dropdown) {
                                if(option) {
                                    configData[configOption.id] = option == 0 ? null : configOption.keys[option - 1];
                                } else {
                                    configData[configOption.id] = null;
                                }
                            } else if(configOption.type == OptionTypes.TextField) {
                                if(option) {
                                    configData[configOption.id] = option;
                                } else {
                                    configData[configOption.id] = null;
                                }
                            } else if(configOption.type == OptionTypes.Slider) {
                                if(option) {
                                    configData[configOption.id] = `NUM:${option}`;
                                } else {
                                    configData[configOption.id] = `NUM:${min}`;
                                }
                            }
                        }
                        for(const key in configData) {
                            cfgDb.set(key, configData[key])
                        }
                    })
                }
                function openPanel(player, panelData) {
                    let actionForm = new ActionForm();
                    actionForm.title(`${panelData.title ? panelData.title : "Config"} §7- §bV${panelData.version}`)
                    for(const panelOption of panelData.options) {
                        if(panelOption.permRequired && !isAdmin(player, panelOption.permRequired)) continue;
                        actionForm.button(`${panelOption.name}${panelOption.subtext ? `\n§7${panelOption.subtext}` : ``}`, panelOption.icon ? panelOption.icon : null, (player)=>{
                            if(panelOption.type == "panel") {
                                openPanel(player, panelOption.panel);
                            } else if(panelOption.type == "options_menu") {
                                openOptionsPanel(player, panelOption.panel);
                            } else if(panelOption.type == OptionTypes.ui) {
                                uiManager.open(panelOption.ui, player);
                            }
                        });
                    }
                    actionForm.show(player, false, (player, response)=>{
    
                    })
                }
                openPanel(e.source, options22);
    
            });
        }
    });
})
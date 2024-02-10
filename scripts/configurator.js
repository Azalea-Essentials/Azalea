import { Player, system, world } from '@minecraft/server';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui';
import { warps } from './warpsapi';
import { baseConfigMenu } from './configuratorOptions';
import { Database } from './db';
import { ActionForm, MessageForm, ModalForm } from './form_func';
import { isAdmin } from './isAdmin';
import { openShopUI } from './shopui';
import { uiManager } from './uis';
import icons from './icons';
import { openConfigUI } from './configuratorBase';
world.afterEvents.playerSpawn.subscribe(e => {});
world.afterEvents.playerLeave.subscribe(e => {
  if (!WelcomeMessageEnabled) return;
  for (const player of world.getPlayers()) {
    player.playSound("note.bit", {
      "pitch": 0.5
    });
  }
});
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
uiManager.addUI("Azalea1.1/Warps", player => {
  let warps2 = warps.getAllWarps();
  let warpUIDB = new Database("WarpUI");
  let warpUI = new ActionForm();
  warpUI.title(warpUIDB.get("Title", "§dWarp UI") ? warpUIDB.get("Title", "§dWarp UI") : "§dWarp UI");
  if (!warps2.length) {
    warpUI.title("Warps - Not Configured");
    warpUI.body("§cIt looks like warps are not configured on this server.\n§bFor admins: do §e!spawn set §bto set spawn, and §e!warp set <name> §bto set a warp.");
    warpUI.button("§cLeave", "textures/azalea_icons/2", (player, i) => {});
  }
  for (const warpName of warps2) {
    let warpData = warps.get2(warpName);
    let icon = icons.find(_ => _.name == warpData.icon);
    if (icon && icon.path) icon = icon.path;else icon = null;
    warpUI.button(`§a${warpData.displayName ? warpData.displayName : warpName == "spawn" ? "§dWorld Spawn" : warpName}`, icon ? icon : warpName == "spawn" ? `textures/azalea_icons/icontextures/nether_star` : `textures/azalea_icons/icontextures/ender_pearl`, player => {
      warps.tpDB(player, warpName);
    });
  }
  warpUI.show(player, false, (player, response) => {});
});
world.beforeEvents.itemUse.subscribe(e => {
  system.run(() => {
    if (e.itemStack.typeId == "azalea:player_shop") {
      uiManager.open("Azalea0.9.1/PlayerShop/Main", e.source);
    }
    if (e.itemStack.typeId == "azalea:tp_requests") {
      uiManager.open("Azalea2.0/TeleportRequests/Root", e.source);
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
    if (e.itemStack.typeId == 'azalea:config_ui' && isAdmin(e.source)) {
      // Enable this line if you really hate config UI!
      // return openConfigPanel(e.source);
      let configOptions = baseConfigMenu.options;
      if (e.source.hasTag("experiment-1")) {
        // let mainForm = new ActionForm()
        //     .title("Config UI V2");
        // mainForm.button("Panel Settings", "textures/azalea_icons/Settings", (player) => {
        //     let form2 = new ActionForm();
        //     form2.button("Hidden Items", null, (player)=>{
        //         let modal = new ModalForm();
        //         for(const key of keys) {
        //             modal.toggle(key, hiddenItems.includes(keys.indexOf(key)) ? true : false);
        //         }
        //         modal.show(player, false, (player, response)=>{
        //             hiddenItems = [];
        //             let i = -1;
        //             for(const bool of response.formValues) {
        //                 i++;
        //                 if(bool) hiddenItems.push(i)
        //                 e.itemStack.setLore([
        //                     `I:${itemArangement.map(_=>_.toString()).join(';')}`,
        //                     `H:${hiddenItems.map(_=>_.toString()).join(';')}`
        //                 ])
        //                 let inventory = e.source.getComponent('inventory');
        //                 inventory.container.setItem(e.source.selectedSlot, e.itemStack);
        //             }
        //         })
        //     })
        //     form2.show(player, false, ()=>{})
        // })
        // mainForm.show(e.source, true)
        openConfigUI(e.source, baseConfigMenu.toOptions(), "Config UI V2");
        return;
      }
      e.cancel = true;
      let player = e.source;
      // let e = e2;
      system.run(() => {
        let actionForm = new ActionFormData();
        actionForm.title("§dConfig Menu");
        // actionForm.body("");
        for (const key of Object.keys(configOptions)) {
          // if (key == "§eDeveloper Settings" && (!e.itemStack.getLore() || !e.itemStack.getLore().length || !e.itemStack.getLore().includes("§r§bDevPanel"))) continue;
          actionForm.button(key, configOptions[key].icon);
        }
        // let player = e.source;
        // let configOptions2 = configOptions;
        actionForm.show(player).then(res => {
          if (res.canceled) return;
          let cfg = configOptions[Object.keys(configOptions)[res.selection]];
          if (cfg.type && cfg.type == "func") {
            cfg.options[0].fn(player, res);
            return;
          }
          if (cfg.type && cfg.type == "hardcoded-playermenu") {
            let action2 = new ActionFormData();
            let btns = [];
            for (const player of world.getPlayers()) {
              btns.push(player);
              action2.button(`${player.name} ${isAdmin(player) ? "§t(ADMIN)" : "§n(MEMBER)"}`);
            }
            action2.show(player).then(res2 => {
              if (res2.canceled) return;
              let action3 = new ActionFormData();
              action3.button("Color info");
              action3.button("Ranks");
              action3.show(player).then(res3 => {
                if (res3.canceled) return;
                if (res3.selection == 0) {
                  let modal = new ModalFormData();
                  let colors = ["Default Color", "§0Color 0", "§1Color 1", "§2Color 2", "§3Color 3", "§4Color 4", "§5Color 5", "§6Color 6", "§7Color 7", "§8Color 8", "§9Color 9", "§aColor A", "§bColor B", "§cColor C", "§dColor D", "§eColor E", "§fColor F", "§gColor G", "§hColor H", "§jColor J", "§mColor M", "§nColor N", "§tColor T", "§uColor U", "§iColor I", "§pColor P", "§qColor Q"];
                  let nameColor = btns[res2.selection].getTags().find(_ => _.startsWith('name-color:'));
                  let nameIndex = nameColor ? colors.findIndex(_ => _.startsWith(nameColor.substring('name-color:'.length))) : 0;
                  modal.dropdown("Name color", colors, nameIndex);
                  let messageColor = btns[res2.selection].getTags().find(_ => _.startsWith('message-color:'));
                  let messageIndex = messageColor ? colors.findIndex(_ => _.startsWith(messageColor.substring('message-color:'.length))) : 0;
                  modal.dropdown("Message color", colors, messageIndex);
                  let bracketColor = btns[res2.selection].getTags().find(_ => _.startsWith('bracket-color:'));
                  let bracketIindex = bracketColor ? colors.findIndex(_ => _.startsWith(bracketColor.substring('bracket-color:'.length))) : 0;
                  modal.dropdown("Bracket color", colors, bracketIindex);
                  let dropdowns = ["name-color:", "message-color:", "bracket-color:"];
                  modal.show(player).then(res => {
                    if (res.canceled) return;
                    for (let i = 0; i < res.formValues.length; i++) {
                      let value = res.formValues[i];
                      if (typeof value == 'number') {
                        let color = colors[value];
                        if (!color.startsWith('D')) {
                          let tags = btns[res2.selection].getTags().filter(_ => _.startsWith(dropdowns[i]));
                          if (tags && tags.length) {
                            for (const tag of tags) {
                              btns[res2.selection].removeTag(tag);
                            }
                          }
                          btns[res2.selection].addTag(`${dropdowns[i]}${colors[value][0]}${colors[value][1]}`);
                        } else {
                          let tags = btns[res2.selection].getTags().filter(_ => _.startsWith(dropdowns[i]));
                          if (tags && tags.length) {
                            for (const tag of tags) {
                              btns[res2.selection].removeTag(tag);
                            }
                          }
                        }
                      }
                    }
                  });
                } else if (res3.selection == 1) {
                  let player2 = btns[res2.selection];
                  let rankActionForm = new ActionFormData();
                  rankActionForm.title(`${player2.name} - Rank Actions`);
                  rankActionForm.button(`Add rank`);
                  rankActionForm.button(`Remove rank`);
                  rankActionForm.show(player).then(res4 => {
                    if (res4.canceled) return;
                    if (res4.selection == 0) {
                      let modal2 = new ModalFormData();
                      modal2.textField("Rank name (you can use & instead of the normal character for color codes)", "Type a rank name");
                      modal2.show(player).then(modal2Response => {
                        if (modal2Response.canceled) return;
                        let rankName = modal2Response.formValues[0];
                        if (rankName) {
                          player2.addTag(`rank:${rankName.replace(/\&/g, "§")}`);
                          player2.sendMessage(`You have been given a rank: ${rankName}`);
                        }
                      });
                    } else if (res4.selection == 1) {
                      let action3 = new ActionFormData();
                      let ranks = player2.getTags().filter(_ => _.startsWith('rank:')).map(_ => _.substring(5));
                      for (const rank of ranks) {
                        action3.button(rank);
                      }
                      action3.show(player).then(res17million => {
                        if (res17million.canceled) return;
                        let rank = ranks[res17million.selection];
                        player2.removeTag(`rank:${rank}`);
                      });
                    }
                  });
                }
              });
            });
            return;
          }
          let modal = new ModalFormData();
          let cfgDb = new Database("Config");
          let cmdtoggles = world.scoreboard.getObjective("cmdtoggles");
          if (!cmdtoggles) cmdtoggles = world.scoreboard.addObjective("cmdtoggles");
          for (const option of cfg.options) {
            if (option.type == "toggle") {
              let optionValue = cfgDb.get(option.key) ? cfgDb.get(option.key) : null;
              modal.toggle(option.label, optionValue ? optionValue == "true" ? true : false : false);
            } else if (option.type == "text-input") {
              let optionValue = cfgDb.get(option.key) ? cfgDb.get(option.key) : null;
              modal.textField(option.label, option.placeholder, optionValue);
            } else if (option.type == "dropdown") {
              let optionValue = cfgDb.get(option.key) ? cfgDb.get(option.key) : null;
              let index = option.keyOptions.findIndex(_ => _ == optionValue);
              modal.dropdown(option.label, ["Select an option", ...option.cliOptions], index < 0 ? null : index + 1);
            } else if (option.type == "dropdown-command") {
              /*
              if (cmdStatus == 0) response(`TEXT ${theme.successColor}§l[TOGGLED] §r${theme.successColor}Default permissions`)
              else if (cmdStatus == 1) response(`TEXT ${theme.warningColor}§l[TOGGLED] §r${theme.warningColor}Admins only`)
              else if (cmdStatus == 2) response(`TEXT ${theme.errorColor}§l[TOGGLED] §r${theme.errorColor}Completely disabled`)
              else if (cmdStatus == 3) response(`TEXT ${theme.infoColor}§l[TOGGLED] §r${theme.infoColor}Enabled for everyone (BETA)`)
              */
              let toggleScore = 0;
              try {
                toggleScore = cmdtoggles.getScore(option.command);
                if (!toggleScore) toggleScore = 0;
              } catch {
                toggleScore = 0;
              }
              modal.dropdown("!" + option.command + " toggle", ["Default permissions", "Force admins only", "Completely disabled", "Enabled for everyone"], toggleScore);
            } else if (option.type == "slider") {
              modal.slider(option.label, option.minVal, option.maxVal, option.step, cfgDb.get(option.key) == `NUM:${option.default}` ? option.default : cfgDb.get(option.key) ? parseInt(cfgDb.get(option.key).substring(4)) : option.default);
            }
          }
          modal.title("Config menu - " + Object.keys(configOptions)[res.selection]);
          modal.show(player).then(result => {
            if (result.canceled) return;
            for (let i = 0; i < result.formValues.length; i++) {
              let formValue = result.formValues[i];
              if (typeof formValue == 'string') {
                console.warn(cfg.options[i].key);
                let currVal = cfgDb.get(cfg.options[i].key);
                if (formValue != currVal) cfgDb.set(cfg.options[i].key, formValue);
              } else if (typeof formValue == 'boolean') {
                cfgDb.set(cfg.options[i].key, formValue ? "true" : "false");
              } else if (typeof formValue == "number") {
                if (cfg.options[i].type == "dropdown-command") {
                  cmdtoggles.setScore(cfg.options[i].command, formValue);
                } else if (cfg.options[i].type == "slider") {
                  cfgDb.set(cfg.options[i].key, `NUM:${formValue}`);
                } else {
                  if (formValue > 0) {
                    cfgDb.set(cfg.options[i].key, cfg.options[i].keyOptions[formValue - 1]);
                  }
                }
              }
            }
          });
        });
      });
    }
  });
});
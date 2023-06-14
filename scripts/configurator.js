import { system, world } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { Database } from "./db";
import { isAdmin } from "./isAdmin";
world.afterEvents.playerSpawn.subscribe(e => {
  let player = e.player;
  let configDb = new Database("Config");
  let WelcomeMessageEnabled = configDb.get("WelcomeMessageEnabled");
  let ServerWelcomeMessage = configDb.get("ServerWelcomeMessage") ? configDb.get("ServerWelcomeMessage") : `§cWelcome §e@[@username] §cto the server, and tell the admins to configure this message`;
  if (!WelcomeMessageEnabled) return;
  player.sendMessage(ServerWelcomeMessage.replace(/\[\@username\]/g, player.name));
});
world.beforeEvents.itemUse.subscribe(e => {
  if (e.itemStack.typeId == 'azalea:config_ui' && isAdmin(e.source)) {
    let configOptions = {
      "Server": {
        "icon": "textures/ui/servers",
        "options": [{
          "label": "Server Name",
          "type": "text-input",
          "key": "ServerName",
          "placeholder": "Type a server name"
        }, {
          "label": "Server Description",
          "type": "text-input",
          "key": "ServerDescription",
          "placeholder": "Type a server description"
        }, {
          "label": "Welcome message enabled?",
          "type": "toggle",
          "key": "WelcomeMessageEnabled"
        }, {
          "label": "Welcome message text\n§e( [@username] = joined user )",
          "type": "text-input",
          "key": "ServerWelcomeMessage",
          "placeholder": "Type a welcome message"
        }]
      },
      "General": {
        "icon": "textures/ui/settings_glyph_color_2x",
        "options": [{
          "label": "Permission system",
          "type": "dropdown",
          "key": "PermissionSystem",
          "keyOptions": ["v2", "legacy"],
          "cliOptions": ["V2", "Legacy"]
        }]
      },
      "Staffchat": {
        "icon": "textures/ui/permissions_op_crown",
        "options": [{
          "label": "View global messages while in staffchat",
          "type": "toggle",
          "key": "ViewGlobalSC"
        }, {
          "label": "Log joins/leaves",
          "type": "toggle",
          "key": "LogJoinsLeavesSC"
        }]
      },
      "Experiments": {
        "icon": "textures/gui/newgui/settings/radio_checked",
        "options": [{
          "label": "Enable experimental commands §c(Rquires Reload)",
          "type": "toggle",
          "key": "ExperimentalCommands"
        }, {
          "label": "Enable command permission system §c(Rquires Reload)",
          "type": "toggle",
          "key": "CommandPermSystem"
        }, {
          "label": "Improved Nametags",
          "type": "toggle",
          "key": "ImprovedNametagsEnabled"
        }]
      },
      "Verification": {
        "icon": "textures/ui/realms_slot_check",
        "options": [{
          "label": "Enable verification",
          "type": "toggle",
          "key": "EnableVerification"
        }, {
          "label": "Verification Type",
          "type": "dropdown",
          "key": "VerificationType",
          "keyOptions": ["private", "public"],
          "cliOptions": ["Private (Requires Code + Command)", "Public (Requires Command)"]
        }, {
          "label": "Verification Code (Requires private verification type)",
          "type": "text-input",
          "key": "VerificationCode",
          "placeholder": "Type a verification code"
        }]
      },
      "Players": {
        "type": "hardcoded-playermenu"
      }
    };
    e.cancel = true;
    let player = e.source;
    // let e = e2;
    system.run(() => {
      let actionForm = new ActionFormData();
      actionForm.title("Config menu");
      for (const key of Object.keys(configOptions)) {
        actionForm.button(key, configOptions[key].icon);
      }
      // let player = e.source;
      // let configOptions2 = configOptions;
      actionForm.show(player).then(res => {
        if (res.canceled) return;
        let cfg = configOptions[Object.keys(configOptions)[res.selection]];
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
          }
        }
        modal.title("Config menu - " + Object.keys(configOptions)[res.selection]);
        modal.show(player).then(result => {
          if (result.canceled) return;
          for (let i = 0; i < result.formValues.length; i++) {
            let formValue = result.formValues[i];
            if (typeof formValue == 'string') {
              cfgDb.set(cfg.options[i].key, formValue);
            } else if (typeof formValue == 'boolean') {
              cfgDb.set(cfg.options[i].key, formValue ? "true" : "false");
            } else if (typeof formValue == "number") {
              if (formValue > 0) {
                cfgDb.set(cfg.options[i].key, cfg.options[i].keyOptions[formValue - 1]);
              }
            }
          }
        });
      });
    });
  }
});
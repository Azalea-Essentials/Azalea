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
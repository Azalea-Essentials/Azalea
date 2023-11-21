import moment from './moment';
// let configOptions = {
//     "Server": {
//         "icon": "textures/ui/servers",
//         "options": [
//             {
//                 "label": "Server Name",
//                 "type": "text-input",
//                 "key": "ServerName",
//                 "placeholder": "Type a server name"
//             },
//             {
//                 "label": "Server Description",
//                 "type": "text-input",
//                 "key": "ServerDescription",
//                 "placeholder": "Type a server description"
//             },
//             {
//                 "label": "Welcome message enabled?",
//                 "type": "toggle",
//                 "key": "WelcomeMessageEnabled"
//             },
//             {
//                 "label": "Welcome message text\n§e( [@username] = joined user )",
//                 "type": "text-input",
//                 "key": "ServerWelcomeMessage",
//                 "placeholder": "Type a welcome message"
//             }
//         ]
//     },
//     "General": {
//         "icon": "textures/ui/settings_glyph_color_2x",
//         "options": [
//             {
//                 "label": "Permission system",
//                 "type": "dropdown",
//                 "key": "PermissionSystem",
//                 "keyOptions": ["v2", "legacy"],
//                 "cliOptions": ["V2", "Legacy"]
//             }
//         ]
//     },
//     "Staffchat": {
//         "icon": "textures/ui/permissions_op_crown",
//         "options": [
//             {
//                 "label": "View global messages while in staffchat",
//                 "type": "toggle",
//                 "key": "ViewGlobalSC"
//             },
//             {
//                 "label": "Log joins/leaves",
//                 "type": "toggle",
//                 "key": "LogJoinsLeavesSC"
//             }
//         ]
//     },
//     "Experiments": {
//         "icon": "textures/gui/newgui/settings/radio_checked",
//         "options": [
//             {
//                 "label": "Enable experimental commands §c(Rquires Reload)",
//                 "type": "toggle",
//                 "key": "ExperimentalCommands"
//             },
//             {
//                 "label": "Enable command permission system §c(Rquires Reload)",
//                 "type": "toggle",
//                 "key": "CommandPermSystem"
//             },
//             {
//                 "label": "Improved Nametags",
//                 "type": "toggle",
//                 "key": "ImprovedNametagsEnabled"
//             }
//         ]
//     },
//     "Verification": {
//         "icon": "textures/ui/realms_slot_check",
//         "options": [
//             {
//                 "label": "Enable verification",
//                 "type": "toggle",
//                 "key": "EnableVerification"
//             },
//             {
//                 "label": "Verification Type",
//                 "type": "dropdown",
//                 "key": "VerificationType",
//                 "keyOptions": ["private", "public"],
//                 "cliOptions": ["Private (Requires Code + Command)", "Public (Requires Command)"]
//             },
//             {
//                 "label": "Verification Code (Requires private verification type)",
//                 "type": "text-input",
//                 "key": "VerificationCode",
//                 "placeholder": "Type a verification code"
//             }
//         ]
//     },
//     "Players": {
//         "type": "hardcoded-playermenu"
//     },
//     "Misc": {
//         options: [
//             {
//                 type: "dropdown",
//                 label: "Azalea Conditional Language Version",
//                 key: "AzaleaConditionalLanguageVersion",
//                 keyOptions: ["v1", "experimental"],
//                 cliOptions: ["V1", "Experimental"]
//             }
//         ]
//     }
// }

import { system } from '@minecraft/server';
import { PLAYER_REPORTS } from './adminpanel/reports';
import { REVIEWS } from './adminpanel/reviews';
import { TAGCMD_UI } from './adminpanel/tagcmd_ui';
import { ADMIN_TEST } from './adminpanel/test';
import { Database } from './db';
import { ActionForm } from './form_func';
import { POLLS } from './adminpanel/polls';
import { LB } from './adminpanel/leaderboardthemes';

/*
    "Misc": {
        options: [
            {
                type: "dropdown",
                label: "Azalea Conditional Language Version",
                key: "AzaleaConditionalLanguageVersion",
                keyOptions: ["v1", "experimental"],
                cliOptions: ["V1", "Experimental"]
            }
        ]
    }
}
*/

export class ConfiguratorBase {
  constructor() {
    this.options = {};
  }
  addSub(submenu) {
    this.options[submenu.name] = {
      options: submenu.options,
      icon: submenu.icon,
      type: submenu.type
    };
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
    this.options = [{
      fn
    }];
    return this;
  }
  addTextInput(key, label, placeholder) {
    this.options.push({
      type: 'text-input',
      key: key,
      label,
      placeholder
    });
    console.log(this.options);
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
  addToggle(key, label) {
    this.options.push({
      type: 'toggle',
      label,
      key
    });
    return this;
  }
}
export function handleConfigurator(configuratorBase) {
  if (configuratorBase instanceof ConfiguratorBase) {
    let opts = configuratorBase.toOptions();
    let actionForm = new ActionForm();
    for (const key of Object.keys(opts)) {
      actionForm.button(key, null, player => {
        let ui = opts[key];
        if (ui.type == 'func') return ui.options[0].fn(player);
        if (ui.type == 'hardcoded-playermenu') return;
        for (const option of ui.options) {
          // if(option.type == "")
        }
      });
    }
  }
}
let base = new ConfiguratorBase().addSub(new ConfiguratorSub("§6Commands\n§8Prefix", "azalea_icons/7").addTextInput("Prefix", "Prefix", "Type a prefix").addTextInput("MoneyScoreboard", "Money Scoreboard (default: money)", "Type the scoreboard here")).addSub(new ConfiguratorSub("§bServer\n§8Configure the server options", "azalea_icons/6").addTextInput("ServerName", "Server Name", "Type a server name...").addTextInput("ServerDescription", "Server Description", "Type a server description...").addToggle("WelcomeMessageEnabled", "Welcome message enabled?").addTextInput("ServerWelcomeMessage", "Welcome message text, remember: §d[@username] §r= joined user ", "Type a welcome message.").addToggle("DevEnvironment", "§c§l[DANGER] §rDev Commands").addToggle("TeleportPlayerToSpawnOnRejoin", "Teleport players to spawn when joining")).addSub(new ConfiguratorSub("§2Verification\n§8Make users go through a verification process.", "azalea_icons/4").addToggle("EnableVerification", "Enable Verification?").addDropdown("VerificationType", ["Private (Requires Code + Command)", "Public (Requires Command)"], ["private", "public"], "Verification Type").addTextInput("VerificationCode", "Verification Code (Requires private verification type)", "Type a verification code...")).addSub(new ConfiguratorSub("§dExperimental Toggles\n§8These could break.", "azalea_icons/3").addToggle("TranslationSupport", "§bTranslation Support (Requires Reload)").addToggle("NewShop", "§bNew shop (Requires Reload)").addToggle("ImprovedNametagsEnabled", "§bImproved nametags")).addSub(new ConfiguratorSub("§6More §cconfiguration\n§8Why", "azalea_icons/1").addDropdown("FormsExperiment", ["Enabled", "Disabled", "Enabled, but better"], ["enabled", "disabled", "enabled-2"], "Forms Experiment")).addSub(PLAYER_REPORTS()).addSub(TAGCMD_UI()).addSub(REVIEWS()).addSub(ADMIN_TEST()).addSub(POLLS()).addSub(new ConfiguratorSub("§3Developer Settings\n§8Ignore", "azalea_icons/Wrench").addDropdown("DevelopmentMessage", ["Disabled", "Dev Server", "Dev World", "Public Preview"], ["disabled", "dev-server", "dev-world", "public-preview"], "Development message").addToggle("ShittyCode", "Use sh!tty code i abandoned?").addToggle("Uwuify", "Im running out of ideas §7§o(dont enable if you care about your sanity)")).addSub(new ConfiguratorSub("§mPlayer Shops\n§8Why", "azalea_icons/playershop").addToggle("DisablePlayerShops", "Disable player shops").addDropdown("Sorting", ["None", "Trusted"], ["None", "Trusted"], "Sorting")).addSub(LB());
base.options["§2Players\n§8Manage players"] = {
  "type": "hardcoded-playermenu",
  "icon": "azalea_icons/8"
};
export const baseConfigMenu = base.toOptions();
system.run(() => {
  let configuratorDb = new Database("Config");
  configuratorDb.tableVars = {
    "AZALEA_VERSION": "V1.0",
    "NOW": Date.now().toString(),
    "BUILDTIME": `${moment( 1700540721480).format('MMMM Do YYYY, h:mm:ss a [UTC]')}`
  };
});
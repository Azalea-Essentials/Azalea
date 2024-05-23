import { system } from "@minecraft/server";
import { OptionTypes, options22 } from "../configuratorOptions22";
import { Database } from "../db";
import { ActionForm, ModalForm } from "../form_func";
import { isAdmin } from "../isAdmin";
import { uiManager } from "../uis";

export default {
    namespace: "Configurator",
    icon: "https://azalea.trashdev.org/img/textures/amethyst_icons/Packs/asteroid_icons/ultra.png",
    description: "The config UI in Azalea. It is highly recommended to have this enabled.",
    main: class {
        constructor(azaleaAPI) {
            this.azalea = azaleaAPI;
            this.azalea.bindManager.setBind('azalea:config_ui', (player)=>{
                system.run(()=>{
                    this.openPanel(player, options22);
                })
            })
        }

        openOptionsPanel(player, panelData) {
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

        openPanel(player, panelData) {
            let actionForm = new ActionForm();
            actionForm.title(`${panelData.title ? panelData.title : "Config"} §7- §bV${panelData.version}`)
            for(const panelOption of panelData.options) {
                if(panelOption.permRequired && !isAdmin(player, panelOption.permRequired)) continue;
                if(panelOption.type == OptionTypes.ui) {
                    if(!uiManager.uis.find(_=>_.id == panelOption.ui)) continue;
                }
                if(panelOption.requiresFlag && !this.azalea.getFlag(panelOption.requiresFlag)) continue;
                if(panelOption.type == "panel" && !this.includesAnything(player, panelOption.panel)) continue;
                actionForm.button(`${panelOption.name}${panelOption.subtext ? `\n§7${panelOption.subtext}` : ``}`, panelOption.icon ? panelOption.icon : null, (player)=>{
                    if(panelOption.type == "panel") {
                        this.openPanel(player, panelOption.panel);
                    } else if(panelOption.type == "options_menu") {
                        this.openOptionsPanel(player, panelOption.panel);
                    } else if(panelOption.type == OptionTypes.ui) {
                        uiManager.open(panelOption.ui, player);
                    }
                });
            }
            actionForm.show(player, false, (player, response)=>{

            })
        }

        includesAnything(player, panelData) {
            let allowedAnything = false;
            for(const panelOption of panelData.options) {
                if(panelOption.permRequired && !isAdmin(player, panelOption.permRequired)) continue;
                if(panelOption.type == OptionTypes.ui) {
                    if(!uiManager._uis.find(_=>_.id == panelOption.ui)) continue;
                }
                if(panelOption.requiresFlag && !this.azalea.getFlag(panelOption.requiresFlag)) continue;
                allowedAnything = true;
            }
            return allowedAnything;
        }
    }
}
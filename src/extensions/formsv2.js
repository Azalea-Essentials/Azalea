import { system, world } from "@minecraft/server";
import { ConfiguratorBase, ConfiguratorSub } from "../configuratorOptions";
import { Database } from "../db";
import { ActionForm, ModalForm } from "../form_func";
import icons from "../icons";
import { uiManager } from "../uis";
import { beforeChat } from "../beforeChat";
import { FormCancelationReason } from "@minecraft/server-ui";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
import { formatStr } from "../utils/AzaleaFormatting";

export default {
    namespace: "Normal GUIs",
    description: "Chest GUIs, but in a list/grid form instead of chests.",
    icon: "https://azalea.trashdev.org/img/textures/amethyst_icons/Packs/asteroid_icons/ui.png",
    main: class {
        constructor() {
            let formsV2Database = new DynamicPropertyDatabase("FormsV2");
            let formsV2Database2 = new Database("FormsV2");
            let converted = formsV2Database2.get("converted", "false") == "true" ? true : false;
            if(!converted) {
                let forms = [];
                forms = formsV2Database2.get("Forms", []);
                if(!forms) forms = [];
                formsV2Database.set("Forms", forms);
                formsV2Database2.set("converted", "true");
            }
            var move = function(array, element, delta) {
                var index = element;
                var newIndex = index + delta;
                if (newIndex < 0  || newIndex == array.length) return; //Already at the top or bottom.
                var indexes = [index, newIndex].sort(); //Sort the indixes
                array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order
              };
              
              var moveUp = function(array, element) {
                move(array, element, -1);
              };
              
              var moveDown = function(array, element) {
                move(array, element, 1);
              };
            let uis = [];
            let forms = formsV2Database.get("Forms", []);
            if(!forms || !forms.length) forms = [];
            uis = forms;
            system.runInterval(()=>{
                let forms = formsV2Database.get("Forms", []);
                if(!forms || !forms.length) forms = [];
                uis = forms;
            
            },100);
            function openUI(ui, player) {
                let actionForm = new ActionForm();
                let UIPrefix = ``;
                if(ui.type) {
                    if(ui.type == 1) {
                        UIPrefix = `§f§u§l§l§s§c§r§e§e§n§r`;
                    } else if(ui.type == 2) {
                        UIPrefix = `§g§r§i§d§u§i§r`;
                    }
                }
                actionForm.title(`${UIPrefix}${ui.title}`);
                actionForm.body(ui.body);
                if(!ui.buttons.length) actionForm.button("Leave", "textures/azalea_icons/1", ()=>{});
                for(const button of ui.buttons) {
                    let icon = icons.get(button.icon);
                    
                    actionForm.button(`${button.text}${button.subtext ? `\n§r§7${button.subtext}` : ``}`, icon && icon.path ? icon.path : undefined, (player,i)=>{
                        if(button.command.startsWith('!')) {
                            let config = new Database("Config");
                            let prefix = config.get("Prefix", "!") ? config.get("Prefix", "!") : "!";
                            beforeChat({
                                cancel: true,
                                sender: player,
                                message: `${prefix}${button.command.substring(1)}`
                            })
                        } else {
                            
                            player.runCommand(formatStr(button.command, player));
        
                        }
                    });
                }
                actionForm.show(player, false, (player, response)=>{
                })
                player.removeTag(ui.tag)
            }
            system.runInterval(()=>{
                for(const player of world.getPlayers()) {
                    for(const ui of uis) {
                        if(player.hasTag(ui.tag)) {
                            openUI(ui, player);
                        }
                    }
                }
            
            },10)
            world.beforeEvents.itemUse.subscribe(e=>{
                for(const ui of uis) {
                    if(ui.item && e.itemStack.typeId == ui.item) {
                        system.run(()=>{
                            openUI(ui, e.source);
        
                        })
                    }
                }
            })
            
            uiManager.addUI("Azalea1.1/FormsV2/Root/Create",(player, error = "")=>{
                let modalform = new ModalForm();
                modalform.title(`Create GUI${error.length ? ` - §c${error}` : ``}`);
                modalform.textField("Title§c*", "Title text")
                modalform.textField("Tag§c*", "Tag to open")
                modalform.textField("Body (Optional)", "Body text")
                modalform.textField("Item (Optional)", "Item binded to UI");
                modalform.show(player, false, (player,response)=>{
                    if(!response.formValues[0]) return uiManager.open("Azalea1.1/FormsV2/Root/Create", player, "Title cant be empty");
                    if(!response.formValues[1]) return uiManager.open("Azalea1.1/FormsV2/Root/Create", player, "Tag cant be empty");
                    let forms = formsV2Database.get("Forms", []);
                    if(!forms || !forms.length) forms = [];
            
                    forms.push({
                        buttons: [],
                        title: response.formValues[0],
                        tag: response.formValues[1],
                        body: response.formValues[2],
                        item: response.formValues[3],
                        id: Date.now().toString()
                    })
                    formsV2Database.set("Forms", forms)
                    uis = forms;
                    uiManager.open("Azalea1.1/FormsV2/Root", player)
                })
            })
            uiManager.addUI("Azalea1.1/FormsV2/Root/ManageUI/DeleteConfirm", (player,id)=>{
                let forms = formsV2Database.get("Forms", []);
                if(!forms || !forms.length) forms = [];
                let form = forms.findIndex(_=>_.id == id);
                let ui = new ActionForm();
                ui.title("Are you sure?")
                ui.body(`Are you sure you want to delete UI: ${forms[form].title}§r§f?`);
                ui.button("§aYes",null,(player)=>{
                    forms.splice(form, 1);
                    formsV2Database.set("Forms", forms);
                    uis = forms;
                });
                ui.button("§cNo", null, (player, i)=>{
                    uiManager.open("Azalea1.1/FormsV2/Root", player);
                })
                ui.show(player, false, ()=>{})
            });
            uiManager.addUI("Azalea1.1/FormsV2/Root/ManageUI/GUISettings",(player,id,error = "")=>{
                let ui = new ModalForm();
                let forms = formsV2Database.get("Forms", []);
                if(!forms || !forms.length) forms = [];
                let form = forms.find(_=>_.id == id);
                let formIndex = forms.findIndex(_=>_.id == id);
                ui.textField("Title§c*", "Title text", form.title ? form.title : undefined)
                ui.textField("Tag§c*", "Tag to open", form.tag ? form.tag : undefined)
                ui.textField("Body (Optional)", "Body text", form.body ? form.body : undefined)
                ui.textField("Item (Optional)", "Item binded to UI", form.item ? form.item : undefined);
                ui.dropdown("UI Type", [
                    {
                        "option": "List",
                        callback() {}
                    },
                    {
                        "option": "List (Fullscreen)",
                        callback() {}
                    },
                    {
                        "option": "Grid",
                        callback() {}
                    }
                ], form.type ? form.type : 0);
                ui.title(`Settings${error.length ? ` - §c${error}` : ``}`)
                ui.show(player, false, (player, response)=>{
                    if(!response.formValues[0]) return uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/GUISettings", player, id, "Title cant be empty");
                    if(!response.formValues[1]) return uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/GUISettings", player, id, "Tag cant be empty");
                    form.title = response.formValues[0];
                    form.tag = response.formValues[1];
                    form.body = response.formValues[2];
                    form.item = response.formValues[3];
                    form.type = response.formValues[4];
                    forms[formIndex] = form;
                    uis = forms;
                    formsV2Database.set("Forms", forms);
                })
            })
            uiManager.addUI("Azalea1.1/FormsV2/Root/ManageUI", (player,id)=>{
                let ui = new ActionForm();
                let forms = formsV2Database.get("Forms", []);
                if(!forms || !forms.length) forms = [];
                let form = forms.find(_=>_.id == id);
                ui.title(`Manage - ${form.title}`);
                ui.body("Do things")
                ui.button("GUI Settings", "textures/azalea_icons/Settings", (player)=>{
                    uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/GUISettings", player, id)
                })
                ui.button("GUI Buttons", "textures/azalea_icons/ClickyClick", (player)=>{
                    uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/Buttons", player, id)
                })
                ui.button("Delete GUI", "textures/azalea_icons/Delete", (player)=>{
                    uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/DeleteConfirm", player, id);
                })
                ui.button("Export", "textures/azalea_icons/Settings", (player)=>{
                    let modalForm = new ModalForm();
                    modalForm.title("Code Editor")
                    modalForm.textField("Code", "code", JSON.stringify(form, null, 2));
                    modalForm.show(player, false, (player, response)=>{
                        if(response.canceled) return;
                        try {
                            forms[forms.findIndex(_=>_.id == id)] = JSON.parse(response.formValues[0]);
                            formsV2Database.set("Forms", forms)
                        } catch {}
                    })
                })
                ui.show(player, false, (player)=>{
        
                })
            });
            uiManager.addUI("Azalea1.1/FormsV2/Root/ManageUI/Buttons/Add", (player, id, formIndex, form, error = "")=>{
                let modalForm = new ModalForm();
                modalForm.title(`Add Button${error.length ? ` - §c${error}` : ``}`)
                modalForm.textField("Button Title", "Text on button")
                modalForm.textField("Button Subtitle", "Text on button")
                modalForm.textField("Button Command", "Command to run when clicking button");
                modalForm.textField("UI Icon", "UI Icon ID");
                modalForm.show(player, false, (player, response)=>{
                    if(!response.formValues[0]) return uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/Buttons/Add", player, id, formIndex, form, "Title cant be empty")
                    if(!response.formValues[2]) return uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/Buttons/Add", player, id, formIndex, form, "Command cant be empty")
                    let forms = formsV2Database.get("Forms", []);
                    if(!forms || !forms.length) forms = [];
                    let form = forms.findIndex(_=>_.id == id);
                    forms[form].buttons.push({
                        icon: response.formValues[3],
                        command: response.formValues[2],
                        subtext: response.formValues[1],
                        text: response.formValues[0]
                    })
                    formsV2Database.set("Forms", forms)
                    uis = forms;
                })
            })
            uiManager.addUI("Azalea1.1/FormsV2/Root/ManageUI/Buttons/EditProperties", (player, id, formIndex, form, buttonIndex, error = "")=>{
                let forms = formsV2Database.get("Forms", []);
                if(!forms || !forms.length) forms = [];
                let form2 = forms.find(_=>_.id == id);
                let ui = new ModalForm();
                ui.title(`Edit Button${error.length ? ` - §c${error}` : ``}`);
                ui.textField("Button Title", "Text on button", form2.buttons[buttonIndex].text ? form2.buttons[buttonIndex].text : undefined);
                ui.textField("Button Subtitle", "Text on button", form2.buttons[buttonIndex].subtext ? form2.buttons[buttonIndex].subtext : undefined)
                ui.textField("Button Command", "Command to run when clicking button", form2.buttons[buttonIndex].command ? form2.buttons[buttonIndex].command : undefined);
                ui.textField("UI Icon", "UI Icon ID", form2.buttons[buttonIndex].icon ? form2.buttons[buttonIndex].icon : undefined);
                ui.show(player, false, (player, response)=>{
                    if(!response.formValues[0]) return uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/Buttons/EditProperties", player, id, formIndex, form, buttonIndex, "Title cant be empty");
                    if(!response.formValues[2]) return uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/Buttons/EditProperties", player, id, formIndex, form, buttonIndex, "Command cant be empty");
                    form2.buttons[buttonIndex].icon = response.formValues[3];
                    form2.buttons[buttonIndex].command = response.formValues[2];
                    form2.buttons[buttonIndex].subtext = response.formValues[1];
                    form2.buttons[buttonIndex].text = response.formValues[0];
                    forms[forms.findIndex(_=>_.id == id)] = form2;
                    formsV2Database.set("Forms", forms);
                    uis = forms;
                })
            });
            uiManager.addUI("Azalea1.1/FormsV2/Root/ManageUI/Buttons/Edit", (player, id, formIndex, form, buttonIndex)=>{
                let forms = formsV2Database.get("Forms", []);
                if(!forms || !forms.length) forms = [];
                let form2 = forms.find(_=>_.id == id);
                let ui = new ActionForm();
                ui.title("Edit Button")
                ui.button("Move Up", "textures/azalea_icons/Up", (player,i)=>{
                    moveUp(form2.buttons, buttonIndex);
                    forms[formIndex] = form2;
                    formsV2Database.set("Forms", forms);
                    uis = forms;
                    uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/Buttons", player, id);
                })
                ui.button("Move Down", "textures/azalea_icons/Down", (player,i)=>{
                    move(form2.buttons, buttonIndex, 1);
                    forms[formIndex] = form2;
                    formsV2Database.set("Forms", forms);
                    uis = forms;
                    uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/Buttons", player, id);
                })
                ui.button("Edit Properties", "textures/azalea_icons/ClickyClick", (player, i)=>{
                    uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/Buttons/EditProperties", player, id, formIndex, form, buttonIndex)
                })
                ui.button("Delete", "textures/azalea_icons/Delete", (player,i)=>{
                    form2.buttons.splice(buttonIndex, 1);
                    forms[formIndex] = form2;
                    formsV2Database.set("Forms", forms);
                    uis = forms;
                    uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/Buttons", player, id);
        
                })
                ui.show(player, false, (player, response)=>{
        
                })
            })
            uiManager.addUI("Azalea1.1/FormsV2/Root/ManageUI/Buttons/Remove",(player, id)=>{
                let ui = new ActionForm();
                let forms = formsV2Database.get("Forms", []);
                if(!forms || !forms.length) forms = [];
                let form = forms.findIndex(_=>_.id == id);
                ui.button("Back", "textures/azalea_icons/2", (player,i)=>{
                    uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/Buttons", player, id);
                })
                for(let i = 0;i < forms[form].buttons.length;i++) {
                    let button = forms[form].buttons[i];
                    ui.button(`Delete ${button.text}`, null, (player, i)=>{
                        let form2 = forms[form];
                        form2.buttons.splice(i, 1);
                        forms[form] = form2;
                        formsV2Database.set("Forms", forms)
                        uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/Buttons", player, id)
                    })
                }
                ui.show(player, false, (player, response)=>{
        
                })
            })
            uiManager.addUI("Azalea1.1/FormsV2/Root/ManageUI/Buttons", (player, id)=>{
                let ui = new ActionForm();
                let forms = formsV2Database.get("Forms", []);
                if(!forms || !forms.length) forms = [];
                let form = forms.findIndex(_=>_.id == id);
                ui.title("Manage - Buttons");
                ui.body("Manage the buttons of " + forms[form].title);
                ui.button("Add Button", "textures/azalea_icons/1", (player)=>{
                    uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/Buttons/Add", player, id, form, forms[form]);
                })
                for(let i = 0;i < forms[form].buttons.length;i++) {
                    let button = forms[form].buttons[i];
                    let iconData = icons.get(button.icon);
                    ui.button(button.text, iconData && iconData.path ? iconData.path : null, (player)=>{
                        uiManager.open("Azalea1.1/FormsV2/Root/ManageUI/Buttons/Edit", player, id, form, forms[form],i);
                    });
                }
                ui.show(player,false,(player,response)=>{
                    uis = forms;
        
                })
            })
            uiManager.addUI("Azalea1.1/FormsV2/Root/Manage", (player)=>{
                let ui = new ActionForm();
                let forms = formsV2Database.get("Forms", []);
                if(!forms || !forms.length) forms = [];
                ui.title("Manage UIs");
                ui.body("Go manage these UIs")
                ui.button("Back", "textures/azalea_icons/2", (player)=>{
                    uiManager.open("Azalea1.1/FormsV2/Root", player)
                    uis = forms;
                })
                for(const form of forms) {
                    ui.button(form.title, "textures/azalea_icons/FormsV2", (player,i)=>{
                        uiManager.open("Azalea1.1/FormsV2/Root/ManageUI", player, form.id)
                        uis = forms;
                    })
                }
                ui.show(player, false, (player,response)=>{
        
                })
            })
            uiManager.addUI("Azalea1.1/FormsV2/Root", (player)=>{
                let ui = new ActionForm();
                ui.title("FormsV2 - Root");
                ui.body("You can manage Forms here.");
                ui.button("Legacy GUIs", "textures/azalea_icons/9", (player)=>{
                    uiManager.open("Azalea0.9.0/FormcmdRoot", player);
                })
                ui.button("Create GUI", "textures/azalea_icons/1", (player)=>{
                    uiManager.open("Azalea1.1/FormsV2/Root/Create", player)
                    uis = forms;
                });
                ui.button("Manage GUIs", "textures/azalea_icons/Pencil", (player)=>{
                    uiManager.open("Azalea1.1/FormsV2/Root/Manage", player)
                    uis = forms;
                });
        
                ui.show(player, false, (player,response)=>{});
            })
         
        }
    }
}
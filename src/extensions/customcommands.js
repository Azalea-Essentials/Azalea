import { commands } from "../commands";
import { ConfiguratorSub } from "../configuratorOptions";
import { customCommandsActions } from "../customcmds/actionsDefinition";
import { Database } from "../db";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
import { ActionForm, ModalForm } from "../form_func";
import { uiManager } from "../uis";

export default {
    namespace: "CustomCommands",
    description: "Make custom commands ingame. Very easy to use",
    icon: "https://azalea.trashdev.org/img/textures/amethyst_icons/Packs/asteroid_icons/change.png",
    main: class {
        constructor() {
            //TODO Make message that stops custom commands ui from opening when it detects that the command extension is disabled.
            let db = new DynamicPropertyDatabase("CustomCommands");
            commands.registerExtension("custom_commands");
            commands.registerExtensionEvent("custom_commands", "run_command", (msg, args, theme, response, cmdsList, prefix, cmdName) => {
                let commands = db.get("Commands", []);
                function clean(str) {
                    return str.toLowerCase().replaceAll(' ', '-');
                }
                if (!commands.find(_ => clean(_.name) == clean(cmdName))) return false;
                let cmdData = commands.find(_ => clean(_.name) == clean(cmdName));
                for (const action of cmdData.actions) {
                    let actionData = customCommandsActions.find(_ => _.id == action.id);
                    actionData.cb(...action.params.map(_ => {
                        if (typeof _ !== "string") return;
                        let toReturn = _;
                        for (let i = 0; i < args.length; i++) {
                            toReturn = toReturn.replaceAll(`$${i + 1}`, args[i]);
                        }
                        return toReturn;
                    }), msg.sender, response);
                }
                return true;

            })
            commands.registerExtensionEvent("custom_commands", "get_commands", () => {
                let commands = db.get("Commands", []);
                function clean(str) {
                    return str.toLowerCase().replaceAll(' ', '-');
                }
                return commands.map(_ => {
                    return {
                        name: clean(_.name),
                        description: _.description,
                        category: _.category,
                        aliases: [],
                        admin: false,
                        isDev: false,
                        private: false,
                        deprecated: false
                    }
                })
            })
            // commands.use((isCheckingCommandsList, cmdName, msg, args, theme, response, cmdsList, prefix)=>{
            //     let commands = db.get("Commands", []);
            //     if(isCheckingCommandsList) {
            //         return commands.map(_=>{
            //             return {
            //                 name: clean(_.name),
            //                 description: _.description,
            //                 category: _.category,
            //                 aliases: [],
            //                 admin: false,
            //                 isDev: false,
            //                 private: false,
            //                 deprecated: false
            //             }
            //         })
            //     } else {
            //         if(!commands.find(_=>clean(_.name) == clean(cmdName))) return false;
            //         let cmdData = commands.find(_=>clean(_.name) == clean(cmdName));
            //         for(const action of cmdData.actions) {
            //             let actionData = customCommandsActions.find(_=>_.id == action.id);
            //             actionData.cb(...action.params.map(_=>{
            //                 if(typeof _ !== "string") return;
            //                 let toReturn = _;
            //                 for(let i = 0;i < args.length;i++) {
            //                     toReturn = toReturn.replaceAll(`$${i+1}`, args[i]);
            //                 }
            //                 return toReturn;
            //             }), msg.sender, response);
            //         }
            //         return true;
            //     }
            // })
            uiManager.addUI("Azalea1.0/CustomCommands/Add", player => {
                let modalForm = new ModalForm();
                modalForm.title("Add a command");
                modalForm.textField("Command name", "", undefined, (player, text, i) => { })
                modalForm.textField("Command description", "", undefined, (player, text, i) => { })
                modalForm.textField("Command category", "", undefined, (player, text, i) => { })
                modalForm.show(player, false, (player, response) => {
                    let commands = db.get("Commands", []);
                    let cmdName = response.formValues[0];
                    let cmdDescription = response.formValues[1];
                    let cmdCategory = response.formValues[2];
                    commands.push({
                        name: cmdName,
                        description: cmdDescription,
                        category: cmdCategory,
                        author: player.name,
                        actions: [],
                        aliases: []
                    })
                    db.set("Commands", commands);
                })
            })
            uiManager.addUI("Azalea1.0/CustomCommands/Edit/AddAction/Configure", (player, actionID, name) => {
                let action = customCommandsActions.find(_ => _.id == actionID);
                let modalForm = new ModalForm();
                for (const actionParam of action.params) {
                    if (actionParam.type == "text") {
                        modalForm.textField(actionParam.label, actionParam.placeholder, undefined, () => { })
                    }
                }
                modalForm.show(player, false, (player, response) => {
                    let commands = db.get("Commands", []);
                    let commandData = commands.find(_ => _.name == name);
                    let commandIndex = commands.findIndex(_ => _.name == name);
                    let params = [];
                    for (const input of response.formValues) {
                        params.push(input);
                    }
                    commandData.actions.push({
                        params,
                        id: actionID
                    })
                    commands[commandIndex] = commandData;
                    db.set("Commands", commands);
                    uiManager.open('Azalea1.0/CustomCommands/Edit', player, name)
                })
            });
            uiManager.addUI("Azalea1.0/CustomCommands/Edit/AddAction", (player, name) => {
                let commands = db.get("Commands", []);
                let commandData = commands.find(_ => _.name == name);
                let commandIndex = commands.findIndex(_ => _.name == name);
                let form = new ActionForm();
                for (const action of customCommandsActions) {
                    form.button(action.ingameName, null, (player, i) => {
                        uiManager.open("Azalea1.0/CustomCommands/Edit/AddAction/Configure", player, action.id, name)
                    })
                }
                form.show(player, false, (player, response) => {
                })
            })
            uiManager.addUI("Azalea1.0/CustomCommands/EditAction", (player, name, actionIndex) => {
                let actionform = new ActionForm();
                actionform.button("Remove", null, (player, i) => {
                    let commands = db.get("Commands", []);
                    let commandData = commands.find(_ => _.name == name);
                    let commandIndex = commands.findIndex(_ => _.name == name);
                    commandData.actions.splice(actionIndex, 1);
                    commands[commandIndex] = commandData;
                    db.set("Commands", commands)
                    uiManager.open('Azalea1.0/CustomCommands/Edit', player, name)
                })
                actionform.show(player, false, () => { })
            });
            uiManager.addUI("Azalea1.0/CustomCommands/Edit", (player, name) => {
                let commands = db.get("Commands", []);
                let commandData = commands.find(_ => _.name == name);
                let commandIndex = commands.findIndex(_ => _.name == name);
                let actionForm = new ActionForm();
                actionForm.button("Add Action", "textures/azalea_icons/1", (player, i) => {
                    uiManager.open("Azalea1.0/CustomCommands/Edit/AddAction", player, name);
                })
                let i = 0;
                for (const action of commandData.actions) {
                    i++;
                    actionForm.button(`ACTION ${i}`, null, (player, i2) => {
                        uiManager.open("Azalea1.0/CustomCommands/EditAction", player, name, i - 1);
                    });
                }
                actionForm.button(`Delete`, null, (player, i2) => {
                    commands.splice(commandIndex, 1);
                    db.set("Commands", commands);
                });
                actionForm.show(player, false, () => { })
            })
            function getIsntEnabled() {
                return commands.$extensions[commands.getExtensionIndexByID("custom_commands")].disabled;
            }
            uiManager.addUI("Azalea1.0/CustomCommands/Main", (player) => {
                if (getIsntEnabled()) {
                    let messageForm = new ActionForm();
                    messageForm.title("DISABLED");
                    messageForm.body("You can't configure this because custom commands have been disabled. Do §a!extensions enable custom_commands §r§fto enable this.");
                    messageForm.button("Ok", null, (player) => {

                    })
                    messageForm.show(player, false, (player) => { })
                    return;
                }
                let commands = db.get("Commands", []);
                if (!commands.length) {
                    let form = new ActionForm();
                    form.title("No commands")
                    form.body("Imagine not creating commands")
                    form.button("Create a command", null, (player, i) => {
                        uiManager.open("Azalea1.0/CustomCommands/Add", player);
                    })
                    form.button("Exit", "textures/azalea_icons/2")
                    form.show(player, false, () => { })
                    return;
                }
                let actionform = new ActionForm();
                actionform.button("Create a command", null, (player, i) => {
                    uiManager.open("Azalea1.0/CustomCommands/Add", player);
                })
                for (const command of commands) {
                    actionform.button(command.name, null, (player, i) => {
                        uiManager.open("Azalea1.0/CustomCommands/Edit", player, command.name)
                    });
                }
                actionform.show(player, false, (player, response) => {

                })
            })
        }
    }
}
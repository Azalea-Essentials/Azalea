import { Database } from "./db";
import { ActionForm, ModalForm } from "./form_func";

export function openConfigUI(player, configOptions, title, configTable = "Config") {
    return;
    let mainForm = new ActionForm()
        .title(title);
    for (const key of Object.keys(configOptions)) {
        mainForm.button(key, configOptions[key].icon, (player, i) => {
            if (configOptions[key].type)
                if (configOptions[key].type == "func" && configOptions[key].options[0].fn) {
                    configOptions[key].options[0].fn(player, i);
                    return;
                }
            let configDb = new Database(configTable);
            let modalForm = new ModalForm().title(key.split('\n')[0]);
            for (const option of configOptions[key].options)
                if (option.type == 'text-input') modalForm.textField(option.label, option.placeholder, configDb.get(option.key) ? configDb.get(option.key) : null, (player, text, i) => { let configDb = new Database(configTable); configDb.set(option.key, text) });
                else if (option.type == 'dropdown') modalForm.dropdown(option.label, [{
                    option: "Select an option",
                    callback() { }
                }, ...option.cliOptions.map((v, i) => {
                    return {
                        option: v,
                        callback() { let configDb = new Database(configTable); configDb.set(option.key, option.keyOptions[i]) }
                    }
                })], option.keyOptions.findIndex((v) => v == configDb.get(option.key)) > -1 ? option.keyOptions.findIndex((v) => v == configDb.get(option.key)) : 0, (player, selection, i) => { })
                else if (option.type == 'toggle') modalForm.toggle(option.label, configDb.get(option.key) == "true" ? true : false, (player, state) => { let configDb = new Database(configTable); configDb.set(option.key, state ? 'true' : 'false') })
                else if (option.type == 'slider') {
                    modalForm.slider(option.label, option.minVal, option.maxVal, option.step, configDb.get(option.key) == `NUM:${option.default}` ? option.default : configDb.get(option.key) ? parseInt(configDb.get(option.key).substring(4)) : option.default, (player, selection) => {
                        configDb.set(option.key, `NUM:${selection}`);
                    });
                }
            modalForm.show(player, false, (player, response) => { })
        })
    }
    mainForm.show(player, false, (player, response) => {

    })
}

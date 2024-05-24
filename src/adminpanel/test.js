import { system } from '@minecraft/server';
import { ConfiguratorSub } from '../configuratorOptions';
import { Database } from '../db';
import { ActionForm, ModalForm } from '../form_func';
import { uiManager } from '../uis';
import icons from '../icons';
export const ADMIN_TEST = function () {
  uiManager.addUI("Azalea0.9.0/FormcmdAdd", function (player) {
    let modal = new ModalForm().textField("ID", "Type a form ID", null, () => {}).textField("Title", "Type a form title", null, () => {}).textField("Body", "Type a form body", null, () => {});
    modal.show(player, false, (player, response) => {
      if (response.canceled) return;
      let id = response.formValues[0];
      let title = response.formValues[1];
      let body = response.formValues[2];
      let actionFormsDb = new Database("ActionForms");
      let forms = actionFormsDb.get("ActionForms", []);
      if (forms.find(_ => _.id == id)) return;
      forms.push({
        id,
        title,
        body,
        commands: []
      });
      actionFormsDb.set("ActionForms", forms);
      uiManager.open("Azalea0.9.0/FormcmdRoot", player);
    });
  });
  uiManager.addUI("Azalea0.9.0/FormcmdFormEditCommandsRoot", function (player, formID) {
    let actionFormsDb = new Database("ActionForms");
    let forms = actionFormsDb.get("ActionForms", []);
    let formDataIndex = forms.findIndex(_ => _.id == formID);
    if (!formDataIndex < 0) return uiManager.open("Azalea0.9.0/FormcmdRoot", player);
    let formData = forms[formDataIndex];
    let form = new ActionForm();
    let commands = formData.commands ? formData.commands : [];
    form.button(`Add button`, null, player => {
      let commandEditor = new ModalForm();
      commandEditor.title("Add command");
      commandEditor.textField("Text", "Type the text of the button", null);
      commandEditor.textField("Command", "Type the command of the button", null);
      commandEditor.textField("Icon", "Type the icon name", null);
      commandEditor.show(player, false, (_player, response) => {
        let toPush = {
          text: response.formValues[0],
          command: response.formValues[1],
        };
        if(response.formValues[2]) toPush.icon = response.formValues[2];
        commands.push(toPush);
        forms[formDataIndex].commands = commands;
        actionFormsDb.set("ActionForms", forms);
      });
    });
    for (let i = 0; i < commands.length; i++) {
      let button = commands[i];
      form.button(`${button.text}\n${button.command}`, null, player => {
        let commandEditor = new ModalForm();
        commandEditor.title("Edit command");
        //Azalea0.9.0/FormcmdFormEditCommandsRoot
        commandEditor.textField("Text", "Type the text of the button", button.text);
        commandEditor.textField("Command", "Type the command of the button", button.command);
        commandEditor.textField("Icon", "Type the icon name", button.icon ? button.icon : null);
        commandEditor.toggle("Remove?", null);
        commandEditor.show(player, false, (_player, response) => {
          if (response.formValues[2]) {
            commands[i].icon = response.formValues[2];
            forms[formDataIndex].commands = commands;
            actionFormsDb.set("ActionForms", forms);
          }
          if (response.formValues[3]) {
            commands.splice(i, 1);
            forms[formDataIndex].commands = commands;
            actionFormsDb.set("ActionForms", forms);
            return;
          }
          commands[i].text = response.formValues[0];
          commands[i].command = response.formValues[1];
          forms[formDataIndex].commands = commands;
          actionFormsDb.set("ActionForms", forms);
        });
      });
    }
    form.show(player, false, (_player) => {});
  });
  uiManager.addUI("Azalea0.9.0/FormPreview", function (player, formID) {
    let actionFormsDb = new Database("ActionForms");
    let forms = actionFormsDb.get("ActionForms", []);
    let formDataIndex = forms.findIndex(_ => _.id == formID);
    if (!formDataIndex < 0) return uiManager.open("Azalea0.9.0/FormcmdRoot", player);
    let formData = forms[formDataIndex];
    let commands = formData.commands ? formData.commands : [];
    let form = new ActionForm().title(formData.title).body(formData.body);
    if(!commands.length)
      form.button("§4Exit", "textures/azalea_icons/2", () => {});
    for (const command of commands) {
      let icon = command.icon ? icons.get(command.icon) : null;
      form.button(command.text, icon ? icon.path : null, player => {
        system.run(() => {
          player.runCommand(command.command);
        });
      });
    }
    form.show(player, false, () => {});
  });
  uiManager.addUI("Azalea0.9.0/FormcmdFormEditDisplay", function (player, formID) {
    let actionFormsDb = new Database("ActionForms");
    let forms = actionFormsDb.get("ActionForms", []);
    let formDataIndex = forms.findIndex(_ => _.id == formID);
    if (!formDataIndex < 0) return uiManager.open("Azalea0.9.0/FormcmdRoot", player);
    let formData = forms[formDataIndex];
    let form = new ModalForm();
    form.textField("Title", "Enter a form title", formData.title, () => {});
    form.textField("Body", "Enter a form body", formData.body, () => {});
    form.show(player, false, (player, response) => {
      if (response.canceled) return;
      forms[formDataIndex].title = response.formValues[0];
      forms[formDataIndex].body = response.formValues[1];
      actionFormsDb.set("ActionForms", forms);
      uiManager.open("Azalea0.9.0/FormcmdRoot", player);
    });
  });
  uiManager.addUI("Azalea0.9.0/FormcmdFormEditOptions", function (player, formID) {
    let actionFormsDb = new Database("ActionForms");
    let forms = actionFormsDb.get("ActionForms", []);
    let formData = forms.find(_ => _.id == formID);
    if (!formData) return uiManager.open("Azalea0.9.0/FormcmdRoot", player);
    let form = new ActionForm();
    form.button("Edit Commands", null, player => {
      uiManager.open("Azalea0.9.0/FormcmdFormEditCommandsRoot", player, formID);
    });
    form.button("Edit Display", null, player => {
      uiManager.open("Azalea0.9.0/FormcmdFormEditDisplay", player, formID);
    });
    form.show(player, false, () => {});
  });
  uiManager.addUI("Azalea0.9.0/FormcmdFormEditRoot", function (player, formID) {
    let actionFormsDb = new Database("ActionForms");
    let forms = actionFormsDb.get("ActionForms", []);
    let formDataIndex = forms.findIndex(_ => _.id == formID);
    if (formDataIndex < 0) return uiManager.open("Azalea0.9.0/FormcmdRoot", player);
    let formData = forms[formDataIndex];
    let form = new ActionForm();
    form.title(`Edit "${formData.title}"`)
    form.button("Edit", null, (player) => {
      uiManager.open("Azalea0.9.0/FormcmdFormEditOptions", player, formData.id);
    });
    form.button("Preview", null, (player) => {
      uiManager.open("Azalea0.9.0/FormPreview", player, formData.id);
    });
    form.button("Delete", null, (_player) => {
      forms.splice(formDataIndex, 1);
      actionFormsDb.set("ActionForms", forms);
    });
    form.show(player, false, () => {});
  });
  uiManager.addUI("Azalea0.9.0/FormcmdRoot", function (player) {
    let form = new ActionForm();
    let actionFormsDb = new Database("ActionForms");
    let forms = actionFormsDb.get("ActionForms", []);
    form.button("§4Exit", "textures/azalea_icons/2", () => {});
    form.button("§2Add", "textures/azalea_icons/1", () => {
      uiManager.open("Azalea0.9.0/FormcmdAdd", player);
    });
    for (const formData of forms) {
      form.button(`§8${formData.title}\n${formData.id}`, null, (player) => {
        uiManager.open("Azalea0.9.0/FormcmdFormEditRoot", player, formData.id);
      });
    }
    form.show(player, false, () => {});
  });
  return new ConfiguratorSub("§tForms", "textures/azalea_icons/9").setCallback(player => {
    uiManager.open("Azalea0.9.0/FormcmdRoot", player);
  });
};
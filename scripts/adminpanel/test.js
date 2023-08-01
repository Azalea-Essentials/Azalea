import { system } from '@minecraft/server';
import { ConfiguratorSub } from '../configuratorOptions';
import { Database } from '../db';
import { ActionForm, ModalForm } from '../form_func';
import { uiManager } from '../uis';
export const ADMIN_TEST = function () {
  uiManager.addUI("admin_test_add", function (player) {
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
      uiManager.open("admin_test_root", player);
    });
  });
  uiManager.addUI("admin_test_form_edit_commands_root", function (player, formID) {
    let actionFormsDb = new Database("ActionForms");
    let forms = actionFormsDb.get("ActionForms", []);
    let formDataIndex = forms.findIndex(_ => _.id == formID);
    if (!formDataIndex < 0) return uiManager.open("admin_test_root", player);
    let formData = forms[formDataIndex];
    let form = new ActionForm();
    let commands = formData.commands ? formData.commands : [];
    form.button(`Add button`, null, player => {
      let commandEditor = new ModalForm();
      commandEditor.title("Add command");
      //admin_test_form_edit_commands_root
      commandEditor.textField("Text", "Type the text of the button", null);
      commandEditor.textField("Command", "Type the command of the button", null);
      commandEditor.show(player, false, (player, response) => {
        commands.push({
          text: response.formValues[0],
          command: response.formValues[1]
        });
        forms[formDataIndex].commands = commands;
        actionFormsDb.set("ActionForms", forms);
      });
    });
    for (let i = 0; i < commands.length; i++) {
      let button = commands[i];
      form.button(`${button.text}\n${button.command}`, null, player => {
        let commandEditor = new ModalForm();
        commandEditor.title("Edit command");
        //admin_test_form_edit_commands_root
        commandEditor.textField("Text", "Type the text of the button", button.text);
        commandEditor.textField("Command", "Type the command of the button", button.command);
        commandEditor.toggle("Remove?", null);
        commandEditor.show(player, false, (player, response) => {
          if (response.formValues[2]) {
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
    form.show(player, false, (player, response) => {});
  });
  uiManager.addUI("admin_test_form_preview", function (player, formID) {
    let actionFormsDb = new Database("ActionForms");
    let forms = actionFormsDb.get("ActionForms", []);
    let formDataIndex = forms.findIndex(_ => _.id == formID);
    if (!formDataIndex < 0) return uiManager.open("admin_test_root", player);
    let formData = forms[formDataIndex];
    let commands = formData.commands ? formData.commands : [];
    let form = new ActionForm().title(formData.title).body(formData.body);
    form.button("§4Exit", null, () => {});
    for (const command of commands) {
      form.button(command.text, null, player => {
        system.run(() => {
          player.runCommand(command.command);
        });
      });
    }
    form.show(player, false, () => {});
  });
  uiManager.addUI("admin_test_form_edit_display", function (player, formID) {
    let actionFormsDb = new Database("ActionForms");
    let forms = actionFormsDb.get("ActionForms", []);
    let formDataIndex = forms.findIndex(_ => _.id == formID);
    if (!formDataIndex < 0) return uiManager.open("admin_test_root", player);
    let formData = forms[formDataIndex];
    let form = new ModalForm();
    form.textField("Title", "Enter a form title", formData.title, () => {});
    form.textField("Body", "Enter a form body", formData.body, () => {});
    form.show(player, false, (player, response) => {
      if (response.canceled) return;
      forms[formDataIndex].title = response.formValues[0];
      forms[formDataIndex].body = response.formValues[1];
      actionFormsDb.set("ActionForms", forms);
      uiManager.open("admin_test_root", player);
    });
  });
  uiManager.addUI("admin_test_form_edit_options", function (player, formID) {
    let actionFormsDb = new Database("ActionForms");
    let forms = actionFormsDb.get("ActionForms", []);
    let formData = forms.find(_ => _.id == formID);
    if (!formData) return uiManager.open("admin_test_root", player);
    let form = new ActionForm();
    form.button("Edit Commands", null, player => {
      uiManager.open("admin_test_form_edit_commands_root", player, formID);
    });
    form.button("Edit Display", null, player => {
      uiManager.open("admin_test_form_edit_display", player, formID);
    });
    form.show(player, false, () => {});
  });
  uiManager.addUI("admin_test_form_edit_root", function (player, formID) {
    let actionFormsDb = new Database("ActionForms");
    let forms = actionFormsDb.get("ActionForms", []);
    let formDataIndex = forms.findIndex(_ => _.id == formID);
    if (formDataIndex < 0) return uiManager.open("admin_test_root", player);
    let formData = forms[formDataIndex];
    let form = new ActionForm();
    form.button("Edit", null, (player, i) => {
      uiManager.open("admin_test_form_edit_options", player, formData.id);
    });
    form.button("Preview", null, (player, i) => {
      uiManager.open("admin_test_form_preview", player, formData.id);
    });
    form.button("Delete", null, (player, i) => {
      forms.splice(formDataIndex, 1);
      actionFormsDb.set("ActionForms", forms);
    });
    form.show(player, false, () => {});
  });
  uiManager.addUI("admin_test_root", function (player) {
    let form = new ActionForm();
    let actionFormsDb = new Database("ActionForms");
    let forms = actionFormsDb.get("ActionForms", []);
    form.button("§4Exit", "azalea_icons/2", () => {});
    form.button("§2Add", "azalea_icons/1", () => {
      uiManager.open("admin_test_add", player);
    });
    for (const formData of forms) {
      form.button(`§8${formData.title}\n${formData.id}`, null, (player, i) => {
        uiManager.open("admin_test_form_edit_root", player, formData.id);
      });
    }
    form.show(player, false, () => {});
  });
  return new ConfiguratorSub("§tForms\n§8Buttons", "azalea_icons/9").setCallback(player => {
    uiManager.open("admin_test_root", player);
  });
};
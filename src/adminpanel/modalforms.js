import { ConfiguratorSub } from "../configuratorOptions";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
import { ActionForm, ModalForm } from "../form_func";
import { uiManager } from "../uis";

export default function() {
    let modalForms = new DynamicPropertyDatabase("Modals");
    uiManager.addUI("Azalea2.2/ModalFormEditor/Root/Edit/AddSlider", (player, index)=>{
        let modal = new ModalForm();
        modal.textField("Label", "Money Hacks Fr", undefined, ()=>{});
        modal.textField("Scoreboard", "money", undefined, ()=>{});
        modal.textField("Min Value", "1", undefined, ()=>{});
        modal.textField("Max Value", "1000", undefined, ()=>{});
        modal.slider("Step Value", 1, 50, 1, 1, ()=>{});
        modal.show(player, false, (player, response)=>{
            if(!/^\d+$/.test(response.formValues[1])) uiManager.open("Azalea2.2/ModalFormEditor/Root/Edit/AddSlider", player, index);
            if(!/^\d+$/.test(response.formValues[2])) uiManager.open("Azalea2.2/ModalFormEditor/Root/Edit/AddSlider", player, index);
            let forms = modalForms.get("forms", []);
            forms[index].controls.push({
                type: 0,
                label: response.formValues[0],
                objective: response.formValues[1],
                min: parseInt(response.formValues[2]),
                max: parseInt(response.formValues[3]),
                step: response.formValues[4]
            });
            modalForms.set("forms", forms);
        })
    });
    uiManager.addUI("Azalea2.2/ModalFormEditor/Root/Edit/Controls", (player, index)=>{
        let actionForm = new ActionForm();
        let forms = modalForms.get("forms", []);
        actionForm.button("Add Slider", `textures/azalea_icons/GUIMaker/Modals/AddSlider`, (player)=>{
            uiManager.open("Azalea2.2/ModalFormEditor/Root/Edit/AddSlider", player, index);
        })
        actionForm.button("Add Dropdown", `textures/azalea_icons/GUIMaker/Modals/AddDropdown`, (player)=>{
            uiManager.open("Azalea2.2/ModalFormEditor/Root/Edit/AddSlider", player, index);
        })
        actionForm.button("Add Toggle", `textures/azalea_icons/GUIMaker/Modals/AddToggle`, (player)=>{
            uiManager.open("Azalea2.2/ModalFormEditor/Root/Edit/Controls/AddSlider", player, index);
        })
        for(let i = 0;i < forms[index].controls.length;i++)  {
            let control = forms[index].controls[i]
            let type = control.type ? control.type : 0;
            if(type == 0) {
                actionForm.button(`§d${control.label ?? "NoLabel"}\n§7Slider`)
            }
        }
        actionForm.show(player, false, (_player)=>{

        })
    });
    uiManager.addUI("Azalea2.2/ModalFormEditor/Root/Edit", (player, index)=>{
        let actionForm = new ActionForm();
        let forms = modalForms.get("forms", []);
        actionForm.title(forms[index].title);
        actionForm.button(`§cDelete\n§7Deletes the form`, `textures/azalea_icons/Delete`, ()=>{

        });
        actionForm.button(`§eEdit Controls\n§7Yes`, `textures/azalea_icons/Pencil`, (player)=>{
            uiManager.open("Azalea2.2/ModalFormEditor/Root/Edit/Controls", player, index);
        });
        actionForm.show(player, false, (_player)=>{});
    });
    uiManager.addUI("Azalea2.2/ModalFormEditor/Root/Add", (player)=>{
        let modal = new ModalForm();
        modal.title("Create Modal Form");
        modal.textField("Title", "My Form");
        modal.textField("Tag", "my_form");
        modal.toggle("Force Light Mode", false);
        modal.show(player, false, (player, response)=>{
            if(!response.formValues[0] || !response.formValues[1]) return uiManager.open("Azalea2.2/ModalFormEditor/Root", player);
            let forms = modalForms.get("forms", []);
            forms.push({
                title: response.formValues[0],
                tag: response.formValues[1],
                forceLight: response.formValues[2],
                controls: [],
            })
            modalForms.set("forms", forms);
            return uiManager.open("Azalea2.2/ModalFormEditor/Root", player);
        })
    });
    uiManager.addUI("Azalea2.2/ModalFormEditor/Root", (player)=>{
        let forms = modalForms.get("forms", []);
        let actionForm = new ActionForm();
        actionForm.button("§eNew Form\n§7Creates a modal form.", `textures/azalea_icons/GUIMaker/Modals/AddModalForm`, (player)=>{
            uiManager.open("Azalea2.2/ModalFormEditor/Root/Add", player)
        });
        for(let i = 0;i < forms.length;i++) {
            let form = forms[i];
            actionForm.button(`§6${form.title}\n§7${form.tag}`, `textures/azalea_icons/GUIMaker/ModalForm`, (player)=>{
                uiManager.open("Azalea2.2/ModalFormEditor/Root/Edit", player, i);
            });
        }
        actionForm.show(player, false, (_player)=>{
            
        });
    })
    return new ConfiguratorSub("Modal Forms", "textures/azalea_icons/GUIMaker/ModalForm")
        .setCallback((player)=>{
            uiManager.open("Azalea2.2/ModalFormEditor/Root", player)
        })
}
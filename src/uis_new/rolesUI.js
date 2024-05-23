import { ActionForm, ModalForm } from "../form_func"
import { permList, permissionDb } from "../isAdmin";
import { uiManager } from "../uis";

export default {
    name: "Azalea2.2/RolesUI/Root",
    description: "Player UI",
    onOpen(player) {
        let form = new ActionForm();
        form.title("Roles");
        let roles = permissionDb.findDocuments({
            type: "role"
        });
        form.button(`§l§aAdd Role\n§r§7Adds a role`, `textures/azalea_icons/1`, (player)=>{
            let modalForm = new ModalForm();
            modalForm.submitButton("Add role")
            modalForm.textField("Tag", "tag for the role", undefined);
            modalForm.show(player, false, (player, response)=>{
                if(response.canceled) return uiManager.open("Azalea2.2/RolesUI/Root", player);
                if(!response.formValues[0] || roles.find(_=>_.data.tag == response.formValues[0])) return uiManager.open("Azalea2.2/RolesUI/Root", player);
                permissionDb.insertDocument({
                    type: "role",
                    tag: `${response.formValues[0]}`,
                    isDefault: false,
                    isAdmin: false,
                    isAzalea: false,
                    perms: [],
                    version: `2.2:0`
                })
                return uiManager.open("Azalea2.2/RolesUI/Root", player);
            })
        })
        for(const doc of roles) {
            form.button(`§l§b${doc.data.tag}\n§r§7${doc.data.isDefault ? "Default Role" : doc.data.isAdmin ? "Admin Role" : "Custom Role"}`, null, (player)=>{
                if(doc.data.tag == "admin") {
                    let infoUI = new ActionForm();
                    infoUI.title("Not supported");
                    infoUI.body(`Editing the admin role is not supported`)
                    infoUI.button(`Back`, `textures/azalea_icons/2`, (player)=>{
                            uiManager.open("Azalea2.2/RolesUI/Root", player);

                    })
                    infoUI.show(player, false, ()=>{})
                    return;
                }
                let actions = new ActionForm();
                actions.button(`§e§lEdit\n§r§7Edit this role`, `textures/amethyst_icons/Packs/2.2/chest_small`, (player)=>{
                    let modalForm = new ModalForm();
                    modalForm.title("Edit permissions");
                    modalForm.submitButton("Edit Permissions");
                    for(const perm of permList.getList()) {
                        modalForm.toggle(perm.displayName, doc.data.isAdmin ? true : doc.data.perms.includes(perm.id));
                    }
                    modalForm.show(player, false, (player, response)=>{
                        if(response.canceled) {
                            uiManager.open("Azalea2.2/RolesUI/Root", player);
                            return;
                        }
                        if(response.formValues.every((value)=>value==true)) {
                            doc.data.isAdmin = true;
                            permissionDb.overwriteDataByID(doc.id, doc.data);
                        } else {
                            let newPerms = [];
                            for(let i = 0;i < response.formValues.length;i++) {
                                let perm = response.formValues[i];
                                if(perm) {
                                    newPerms.push(permList.getList()[i].id);
                                }
                            }
                            doc.data.perms = newPerms;
                            permissionDb.overwriteDataByID(doc.id, doc.data);
                        }
                        uiManager.open("Azalea2.2/RolesUI/Root", player);
                    })
                })
                if(!doc.data.isDefault) {
                    actions.button(`§c§lDelete\n§r§7Delete this role`, `textures/azalea_icons/Delete`, (player)=>{
                        let actionForm = new ActionForm();
                        actionForm.title("Confirmation");
                        actionForm.body("Are you sure?")
                        actionForm.button(`§l§aYes\n§r§7Delete this role`, `textures/amethyst_icons/Packs/2.2/accept`, (player)=>{
                            permissionDb.deleteDocumentByID(doc.id);
                            uiManager.open("Azalea2.2/RolesUI/Root", player);
                        });
                        actionForm.button(`§l§cNo\n§r§7Go back`, `textures/azalea_icons/Delete`, (player)=>{
                            uiManager.open("Azalea2.2/RolesUI/Root", player);
                        })
                        actionForm.show(player, false, ()=>{})
                    })
                }
                actions.show(player, false, ()=>{})
            })
        }
        form.show(player, false, ()=>{})
    }
}
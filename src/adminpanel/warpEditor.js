import { system } from '@minecraft/server';
import { ConfiguratorSub } from '../configuratorOptions';
import { Database } from '../db';
import { ActionForm, ModalForm } from '../form_func';
import { uiManager } from '../uis';
import icons from '../icons';
import { warps } from '../warpsapi';
export default function() {
    let warpUI = new Database("WarpUI");
    uiManager.addUI("Azalea1.0/WarpEditor",(player)=>{
        let form = new ActionForm();
        form.title("Warp Editor / Home");
        form.body("Welcome to the new warp editor. You cant create warps here, but you can edit info associated with them!")
        form.button("Exit", null, (player,i)=>{})
        form.button(`§eWarp UI`, null, (player)=>{
            let modal = new ModalForm();
            modal.title(`Warp UI Config`);
            modal.textField("Title", "Title of Warp UI", warpUI.get("Title", "§dWarp UI") ? warpUI.get("Title", "§dWarp UI") : "§dWarp UI");
            modal.toggle("Show teleport requests", warpUI.get("TPR", "false") == "true" ? true : false);
            modal.show(player, false, (player,response)=>{
                warpUI.set("Title", response.formValues[0]);
                warpUI.set("TPR", response.formValues[1] ? "true" : "false");
            })
        })
        for(const warpName of warps.getAllWarpsOld()) {
            form.button(`§d${warpName}`, null, (player)=>{
                let modal = new ModalForm();
                let warp = warps.getDB(warpName);
                modal.title(`Edit ${warp.rotX ? "§dRotation-Preserved" : "§aClassic"} §rwarp`);
                modal.toggle("Hidden (May cause bugs with other features)", warp.hidden ? true : false, (player,state,i)=>{});
                modal.textField("Required Tag", "Tag required to use warp", warp.requiredTag ? warp.requiredTag : undefined, (player,text,i)=>{

                })
                modal.textField("Teleport Tag", "Tag used to teleport", warp.teleportTag ? warp.teleportTagw : undefined, (player,text,i)=>{
                    
                })
                let isRotationPreservedWarp = false;
                if(warp.rotX) {
                    isRotationPreservedWarp = true;
                    modal.textField("Rot§dX", "Rotation X", warp.rotX.toString(), (player, text, i)=>{

                    });
                    modal.textField("Rot§eY", "Rotation Y", warp.rotY.toString(), (player, text, i)=>{

                    });
                }
                modal.textField("Loc§cX", "Location X", warp.x.toString(), (player, text, i)=>{
                        
                });
                modal.textField("Loc§aY", "Location Y", warp.y.toString(), (player, text, i)=>{
                        
                });
                modal.textField("Loc§bZ", "Location Z", warp.z.toString(), (player, text, i)=>{
                        
                });
                modal.textField("Warps UI Icon", "Icon (In Warps UI)", warp.icon ? warp.icon : undefined, (player)=>{})
                modal.textField("Warps UI Display Name", "Display Name (In Warps UI)", warp.displayName ? warp.displayName : undefined, player=>{})
                modal.show(player,false,(player,response)=>{
                    if(isRotationPreservedWarp) {
                        warps.setHidden(warpName, response.formValues[0]);
                        let warp = warps.warpsDb.get(warpName);
                        if(response.formValues[1]) {
                            warp.requiredTag = response.formValues[1];
                        }
                        if(!response.formValues[1]) {
                            warp.requiredTag = "";
                        }
                        if(response.formValues[2]) {
                            warp.teleportTag = response.formValues[2];
                        }
                        if(!response.formValues[2]) {
                            warp.teleportTag = warpName;
                        }
                        warp.hidden = response.formValues[0];
                        warp.rotX = parseFloat(response.formValues[3])
                        warp.rotY = parseFloat(response.formValues[4]);
                        warp.x = parseFloat(response.formValues[5]);
                        warp.y = parseFloat(response.formValues[6]);
                        warp.z = parseFloat(response.formValues[7]);
                        warp.icon = response.formValues[8] ? response.formValues[8] : "";
                        warp.displayName = response.formValues[9] ? response.formValues[9] : "";
                        warps.warpsDb.set(warpName, warp);
                    } else {
                        warps.setHidden(warpName, response.formValues[0]);
                        let warp = warps.warpsDb.get(warpName);
                        if(response.formValues[1]) {
                            warp.requiredTag = response.formValues[1];
                        }
                        if(!response.formValues[1]) {
                            warp.requiredTag = "";
                        }
                        if(response.formValues[2]) {
                            warp.teleportTag = response.formValues[2];
                        }
                        if(!response.formValues[2]) {
                            warp.teleportTag = warpName;
                        }
                        warp.hidden = response.formValues[0];
                        warp.x = parseFloat(response.formValues[3]);
                        warp.y = parseFloat(response.formValues[4]);
                        warp.z = parseFloat(response.formValues[5]);
                        warp.icon = response.formValues[6] ? response.formValues[6] : "";
                        warp.displayName = response.formValues[7] ? response.formValues[7] : "";
                        warps.warpsDb.set(warpName, warp);

                    }
                })
            })
        }
        form.show(player, false, (player,response)=>{

        })

    })
    return new ConfiguratorSub("§dWarp Editor", "textures/azalea_icons/WarpEditor")
        .setCallback((player)=>{
       })
}
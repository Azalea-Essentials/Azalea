import { system, world } from "@minecraft/server";
import { prismarineDb } from "../lib/@trash/PrismarineDB/prismarine-db";
import { ModalForm } from "../form_func";
import { isAdmin } from "../isAdmin";

export default {
    namespace: "DynamicSigns",
    description: "Signs that update in realtime",
    icon: "https://azalea.trashdev.org/img/textures/amethyst_icons/Packs/asteroid_icons/accessibility_glyph_color.png",
    main: class {
        constructor() {
            function vec3tostring(vector3) {
                return `${vector3.x};${vector3.y};${vector3.z}`;
            }
            function stringtovec3(string) {
                return {
                    x: parseFloat(string.split(';')[0]),
                    y: parseFloat(string.split(';')[1]),
                    z: parseFloat(string.split(';')[2]),
                }
            }
            let dynamicSign = prismarineDb.table("DynamicSign");
            world.beforeEvents.itemUseOn.subscribe(e=>{
                if(e.itemStack.typeId == 'azalea:sign_editor') {
                    if(!isAdmin(e.source, "signeditor")) return;
                    if(e.block.getComponent('sign')) {
                        e.cancel = true;
                        system.run(()=>{
                            let signComponent = e.block.getComponent('sign');
                            // if(!(signComponent instanceof mc))
                            let modalForm = new ModalForm();
                            modalForm.title("Code Editor");
                            let sign = dynamicSign.findFirst({loc:vec3tostring(e.block.location)})
                            modalForm.textField("Sign Text", "Dynamic Sign Text", sign && sign.data ? sign.data.format : signComponent.getText());
                            modalForm.submitButton("Edit Sign Text")
                            modalForm.show(e.source, false, (player, response)=>{
                                if(response.canceled) return;
                                if(sign && sign.data) {
                                    sign.data.format = response.formValues[0];
                                    dynamicSign.overwriteDataByID(sign.id, sign.data);
                                } else {
                                    dynamicSign.insertDocument({
                                        loc: vec3tostring(e.block.location),
                                        format: response.formValues[0]
                                    })
                                }
                            })
                        })
                    }
                }
            })
            world.afterEvents.playerBreakBlock.subscribe(e=>{
                let doc = dynamicSign.findFirst({loc:vec3tostring(e.block.location)});
                if(doc) {
                    try {
                        dynamicSign.deleteDocumentByID(doc.id);
                    } catch {}
                }
            })
            world.afterEvents.explosion.subscribe(e=>{
                let blocks = e.getImpactedBlocks();
                for(const block of blocks) {
                    let doc = dynamicSign.findFirst({loc:vec3tostring(block.location)});
                    if(doc) {
                        try {
                            dynamicSign.deleteDocumentByID(doc.id);
                        } catch {}
                    }
                        
                }
            })
        }
    }
}
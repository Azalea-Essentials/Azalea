import { Database } from "../../db";
import { ActionForm, ModalForm } from "../../form_func";

export class DirectorUI {
    constructor(player) {
        this.player = player;
    }
    crates() {

    }
    build() {
        let ui = new ActionForm();
        ui.title("§aDirector §bUI");
        ui.body("§r§fWelcome to §aDirector §bUI§r§f, configure crates now or bad");
        ui.button("Chat Format", null, (player)=>{
            let db = new Database("Config");
            let chatrankFormat = db.get("ChatrankFormat") ? db.get("ChatrankFormat") : "";
            let modal = new ModalForm();
            modal.title("Code Editor - Chat Format");
            modal.textField("Chat Format", "Type a chat rank format", chatrankFormat)
            modal.show(player, false, (_player,response)=>{
                db.set("ChatrankFormat", response.formValues[0])
            })
        })
        return ui;
    }
    open() {
        let ui = this.build();
        ui.show(this.player, false, (_player)=>{

        })
    }
}
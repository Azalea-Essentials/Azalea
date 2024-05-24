import { CommandBuilder } from "../../commandBuilder";
import { Database } from "../../db";

export default function() {
    let db = new Database("BindableNames");
    new CommandBuilder("set-bindable-name")
        .category("Customization")
        .desc("change bindable name")
        .requiresAdmin(true)
        .callback(({msg,args,response})=>{
            let inventory = msg.sender.getComponent('inventory');
            let container = inventory.container;
            let item = container.getItem(msg.sender.selectedSlot);
            if(!item.typeId.startsWith('azalea:bindable')) return response("ERROR Item is not bindable");
            db.set(item.typeId, args.join(' '));
            return response("SUCCESS Name set!")
        })
        .register();
}
import { CommandBuilder } from '../commandBuilder';
import { Database } from '../db';

export default function bindCommands() {
    new CommandBuilder("bind")
        .desc("Bind an item to a command")
        .category("Customization")
        .requiresAdmin(true)
        .callback(({msg,args,theme,response})=>{
            if(args[0] == "set") {
                let binds = new Database("Binds");
                let inventory = msg.sender.getComponent("inventory");
                let item = inventory.container.getItem(msg.sender.selectedSlot);
                binds.set(`${item.typeId}`, args.slice(1).join(' '));
                return response(`SUCCESS Binded ${item.typeId} to /${args.slice(1).join(' ')}`)
            } else if(args[0] == "list") {
                let binds = new Database("Binds");
                let text = [`${theme.category}+--- ${theme.header}Binds ${theme.category}---+`];
                for(const key of binds.gkeys) {
                    text.push(`${theme.category}> ${theme.command}${key} ${theme.description}${binds.get(key)}`);
                }
                return response(`TEXT ${text.join('\n§r')}`);
            }
        })
        .register()
    new CommandBuilder("unbind")
        .desc("Unbind an item from a command")
        .category("Customization")
        .requiresAdmin(true)
        .callback(({msg,args,theme,response})=>{
            let binds = new Database("Binds");
            let inventory = msg.sender.getComponent("inventory");
            let item = inventory.container.getItem(msg.sender.selectedSlot);
            let bind = binds.get(item.typeId);
            if(bind) {
                binds.hardDelete(item.typeId);
                return response(`SUCCESS Removed bind for ${item.typeId}`);
            } else {
                return response(`ERROR ${item.typeId} isn't binded to anything`)
            }
        })
        .register()
}
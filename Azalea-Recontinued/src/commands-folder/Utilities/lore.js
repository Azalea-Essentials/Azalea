import { CommandBuilder } from '../../commandBuilder';


export default function lore() {
    new CommandBuilder("lore")
        .desc("Item lore")
        .category("Customization")
        .requiresAdmin(true)
        .callback(({msg,args,theme,response})=>{
            if(args.length && args[0] == "set") {
                let inventory = msg.sender.getComponent("inventory");
                let item = inventory.container.getItem(msg.sender.selectedSlot);
                item.setLore(args.slice(1).join(' ').split('\\n'));
                inventory.container.setItem(msg.sender.selectedSlot, item);
                response('SUCCESS Added!')
            } else {
                let text = [`${theme.category}+--- ${theme.header}Lore ${theme.category}---+`];
                let inventory = msg.sender.getComponent("inventory");
                let item = inventory.container.getItem(msg.sender.selectedSlot);
                let lore = item.getLore();
                for(const line of lore) {
                    text.push(`${theme.category}> §r${line}`);
                }
                response(`TEXT ${text.join('\n§r')}`)
            }
        })
        .register();
}
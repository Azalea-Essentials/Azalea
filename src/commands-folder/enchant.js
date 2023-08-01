import { Enchantment } from '@minecraft/server';

import { commands } from '../commands';

export default function enchant() {
    commands.addCommand("enchant", {
        description: "better than /enchant fr",
        category: "Item Utilities",
        admin: true,
        async onRun(msg, args, theme, response) {
            try {
                if(args.length < 2) return response("ERROR You must have 2 arguments. Example: !enchant sharpness 50")
                if(!/^\d+$/.test(args[1])) return response("ERROR Level must be a number.")
                let inventory = msg.sender.getComponent("inventory");
                let item = inventory.container.getItem(msg.sender.selectedSlot);
                let enchants = item.getComponent("minecraft:enchantments");
                const enchList = enchants.enchantments
                let enchant = new Enchantment(`${args[0]}`, parseInt(args[1]));
                let successful = enchList.addEnchantment(enchant);
                if(!successful) {
                    return response("ERROR Error")
                } else {
                    enchants.enchantments = enchList;
                    inventory.container.setItem(msg.sender.selectedSlot, item);
                    return response("SUCCESS Enchanted");
                }
            } catch(e) {
                return response(`ERROR ${e}, STACK: ${e.stack}`);
            }
        }
    })
}
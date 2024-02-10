import {
    Player,
  system,
  world,
} from '@minecraft/server';

export default function addHomeCommand(commands) {
    commands.addCommand("home", {
        description: "Dont be homeless",
        category: "Warps",
        aliases: ["homes", "h"],
        async onRun(msg, args, theme, response) {
            let player = msg.sender;
            if(!(player instanceof Player)) return;
            let tag = player.getTags().find(_=>_.startsWith("home:"));
            if(tag) {
                let tagData = tag.substring("home:".length).split(',')
                player.setDynamicProperty(`home-default`, {
                    x: parseInt(tagData[0]),
                    y: parseInt(tagData[1]),
                    z: parseInt(tagData[2])
                })
                response("INFO We saw you had a home before Azalea V2.1. We converted it for you so you can still access it.")
                player.removeTag(tag);
            }
            if(args.length) {
                if(args[0] == "list") {
                    let properties = player.getDynamicPropertyIds().filter(_=>_.startsWith('home-'));
                    let text = [`${theme.category}+----- §r${theme.header ? theme.header : theme.command}Homes §r${theme.category}-----+`];
                    if(properties.length) {
                        for(const property of properties) {
                            let data = player.getDynamicProperty(property);
                            text.push(`${property.substring(5)} §7§o(${Math.floor(data.x)}, ${Math.floor(data.y)}, ${Math.floor(data.z)})`)
                        }
                    } else {
                        text.push(`§o${theme.errorColor}You are homeless.... Do §r§e!home set [name] §o${theme.errorColor}now or bad`)
                    }
                    return response(`TEXT ${text.join('\n§r')}`)
                }
            }
        }
    })
}
// import {
//     Player,
//   system,
//   world,
// } from '@minecraft/server';

// export default function addHomeCommand(commands) {
//     commands.addCommand("home", {
//         description: "Dont be homeless",
//         category: "Warps",
//         aliases: ["homes", "h"],
//         async onRun(msg, args, theme, response) {
//             let player = msg.sender;
//             if(!(player instanceof Player)) return;
//             let tag = player.getTags().find(_=>_.startsWith("home:"));
//             if(tag) {
//                 let tagData = tag.substring("home:".length).split(',')
//                 player.setDynamicProperty(`home-default`, {
//                     x: parseInt(tagData[0]),
//                     y: parseInt(tagData[1]),
//                     z: parseInt(tagData[2])
//                 })
//                 response("INFO We saw you had a home before Azalea V2.1. We converted it for you so you can still access it.")
//                 player.removeTag(tag);
//             }
//             if(args.length) {
//                 if(args[0] == "list") {
//                     let properties = player.getDynamicPropertyIds().filter(_=>_.startsWith('home-'));
//                     let text = [`${theme.category}+----- §r${theme.header ? theme.header : theme.command}Homes §r${theme.category}-----+`];
//                     if(properties.length) {
//                         for(const property of properties) {
//                             let data = player.getDynamicProperty(property);
//                             text.push(`${property.substring(5)} §7§o(${Math.floor(data.x)}, ${Math.floor(data.y)}, ${Math.floor(data.z)})`)
//                         }
//                     } else {
//                         text.push(`§o${theme.errorColor}You are homeless.... Do §r§e!home set [name] §o${theme.errorColor}now or bad`)
//                     }
//                     return response(`TEXT ${text.join('\n§r')}`)
//                 }
//             }
//         }
//     })
// }
import {
    system,
    world,
} from '@minecraft/server';

export default function addHomeCommand(commands) {
    commands.addCommand("home", {
        description: "Dont be homeless",
        category: "Warps",
        async onRun(msg, args, theme, response) {
            let player = msg.sender;
            if (!args.length) {
                let isHomeless = player.getTags().find(_ => _.startsWith("home:")) ? false
                    : true;
                if (isHomeless) return response(`ERROR You are homeless, that means you have no home to teleport to. Try !home set to not be homeless anymore.`);
                let tag = player.getTags().find(_ => _.startsWith("home:")).substring("home:".length).split(',');
                let x = parseInt(tag[0]);
                let y = parseInt(tag[1]);
                let z = parseInt(tag[2]);
                system.run(() => {
                    player.teleport({
                        x,
                        y,
                        z
                    }, {
                        dimension: world.getDimension("overworld")
                    });
                })
                return response("SUCCESS Teleporting....")
                return;
                
            }
            if (args[0] == "set") {
                if (player.dimension.id != "minecraft:overworld") return response("ERROR You need to be in the overworld to set a home!");
                let isHomeless = player.getTags().find(_ => _.startsWith("home:")) ? false
                    : true;
                system.run(() => {
                    for (const tag of player.getTags()) {
                        if (tag.startsWith("home:")) player.removeTag(tag);
                    }
                    player.addTag(`home:${Math.floor(player.location.x)},${Math.floor(player.location.y)},${Math.floor(player.location.z)}`);
                })
                if (isHomeless) return response(`SUCCESS You are no longer homeless!`);
                if (!isHomeless) return response(`SUCCESS You have changed your home.`);
            } else if (args[0] == "remove") {
                let isHomeless = player.getTags().find(_ => _.startsWith("home:")) ? false
                    : true;
                if (isHomeless) return response(`ERROR You are already homeless`);
                system.run(() => {
                    for (const tag of player.getTags()) {
                        if (tag.startsWith("home:")) player.removeTag(tag);
                    }
                })
                return response(`SUCCESS You are now homeless!`);
            } else if (args[0] == "tp") {
                let isHomeless = player.getTags().find(_ => _.startsWith("home:")) ? false
                    : true;
                if (isHomeless) return response(`ERROR You are homeless, that means you have no home to teleport to. Try !home set to not be homeless anymore.`);
                let tag = player.getTags().find(_ => _.startsWith("home:")).substring("home:".length).split(',');
                let x = parseInt(tag[0]);
                let y = parseInt(tag[1]);
                let z = parseInt(tag[2]);
                system.run(() => {
                    player.teleport({
                        x,
                        y,
                        z
                    }, {
                        dimension: world.getDimension("overworld")
                    });
                })
                return response("SUCCESS Teleporting....")
            }
        }
    })
}
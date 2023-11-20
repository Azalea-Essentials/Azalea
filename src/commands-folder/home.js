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
            if(!args.length) {
                let isHomeless = player.getTags().find(_=>_.startsWith("home:")) ? false
                    : true;
                if(isHomeless) return response(`ERROR You are homeless, that means you have no home to teleport to. Try !home set to not be homeless anymore.`);
                let tag = player.getTags().find(_=>_.startsWith("home:")).substring("home:".length).split(',');
                let x = parseInt(tag[0]);
                let y = parseInt(tag[1]);
                let z = parseInt(tag[2]);
                system.run(()=>{
                    player.teleport({
                        x,
                        y,
                        z
                    }, {
                        dimension: world.getDimension("overworld")
                    });
                })
                return;
            }
            if(args[0] == "set") {
                if(player.dimension.id != "minecraft:overworld") return response("ERROR You need to be in the overworld to set a home!");
                let isHomeless = player.getTags().find(_=>_.startsWith("home:")) ? false
                    : true;
                system.run(()=>{
                    for(const tag of player.getTags()) {
                        if(tag.startsWith("home:")) player.removeTag(tag);
                    }
                    player.addTag(`home:${Math.floor(player.location.x)},${Math.floor(player.location.y)},${Math.floor(player.location.z)}`);
                })
                if(isHomeless) return response(`SUCCESS You are no longer homeless!`);
                if(!isHomeless) return response(`SUCCESS You have changed your home.`);
            } else if(args[0] == "remove") {
                let isHomeless = player.getTags().find(_=>_.startsWith("home:")) ? false
                    : true;
                if(isHomeless) return response(`ERROR You are already homeless`);
                system.run(()=>{
                    for(const tag of player.getTags()) {
                        if(tag.startsWith("home:")) player.removeTag(tag);
                    }
                })
                return response(`SUCCESS You are now homeless!`);
            } else if(args[0] == "tp") {
                let isHomeless = player.getTags().find(_=>_.startsWith("home:")) ? false
                    : true;
                if(isHomeless) return response(`ERROR You are homeless, that means you have no home to teleport to. Try !home set to not be homeless anymore.`);
                let tag = player.getTags().find(_=>_.startsWith("home:")).substring("home:".length).split(',');
                let x = parseInt(tag[0]);
                let y = parseInt(tag[1]);
                let z = parseInt(tag[2]);
                system.run(()=>{
                    player.teleport({
                        x,
                        y,
                        z
                    }, {
                        dimension: world.getDimension("overworld")
                    });
                })
            }
        }
    })
}
import {
  system,
  world,
} from '@minecraft/server';

export default function AddRankCommand(commands) {
    commands.addCommand("rank", {
        description: "Add / remove ranks",
        category: "Management",
        deprecated: true,
        admin: true,
        onRun(msg, args, theme, response) {
            return response("DEPRINFO Bro just use admin panel. §9§o!adminpanel")
            // if(!isAdmin(msg.sender)) return response(`ERROR You need admin!`);
            if(args.length) {
                if(args[0] == "add") {
                    let playerName = args[1].replace(/_/g," ");
                    let rankName = args.slice(2).join(' ');
                    for(let player of world.getPlayers()) {
                        if(player.name.toLowerCase() == playerName.toLowerCase()) {
                            system.run(()=>player.addTag(`rank:${rankName}`))
                            response(`TEXT ${theme.infoColor}Added rank: ${theme.defaultRankColor}${rankName} §r${theme.infoColor}to ${playerName}`);
                        }
                    }
                } else if(args[0] == "remove") {
                    let playerName = args[1].replace(/_/g," ");
                    let rankName = args.slice(2).join(' ');
                    for(let player of world.getPlayers()) {
                        if(player.name.toLowerCase() == playerName.toLowerCase()) {
                            if(player.hasTag(`rank:${rankName}`)) {
                                system.run(()=>player.removeTag(`rank:${rankName}`))
                                response(`TEXT ${theme.infoColor}Removed rank: ${theme.defaultRankColor}${rankName} §r${theme.infoColor}from ${playerName}`);    
                            } else {
                                response(`ERROR Player does not have that rank! Remember that ranks are case sensitive and color code sensitive.`);
                            }
                        }
                    }
                }
            }
        }
    })
}
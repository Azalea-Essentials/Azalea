import {
  system,
  world,
} from '@minecraft/server';

import { Database } from '../db';

export default function AddStaffChatCommand(commands) {
    commands.addCommand("staffchat",{
        description: "Staff chat, its a chat for staff",
        category: "Staff",
        admin: true,
        onRun(msg, args, theme, response) {
            // if(!isAdmin(msg.sender)) return response(`ERROR You need admin!`);
            let player = msg.sender;
            let config = new Database("Config");
            let LogJoinsLeavesSC = config.get("LogJoinsLeavesSC") == "true" ? true : false;
            let responsefn = response;
                if(player.hasTag("staffchat")) {
                    if(LogJoinsLeavesSC) {
                        for(const player of world.getPlayers()) {
                            if(player.hasTag("staffchat")) player.sendMessage(`§e${player.name} left staff chat`);
                        }
                    }
                    system.run(()=>player.removeTag("staffchat"));
                    responsefn(`INFO Left staff chat!`);
                } else {
                    if(LogJoinsLeavesSC) {
                        for(const player of world.getPlayers()) {
                            if(player.hasTag("staffchat")) player.sendMessage(`§e${player.name} joined staff chat`);
                        }
                    }
                    system.run(()=>player.addTag("staffchat"));
                    responsefn(`INFO Joined staff chat!`);
                }
        }
    })
}
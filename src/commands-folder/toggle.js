import {
  system,
  world,
} from '@minecraft/server';

import { isAdmin } from '../isAdmin';

export default function addToggleCmd(commands) {
    system.run(() => {
        try {
            world.scoreboard.addObjective("cmdtoggles", "Command Toggles");
        } catch { }
    })

    commands.addCommand("toggle", {
        description: "Toggle a command",
        admin: true,
        category: "Management",
        async onRun(msg, args, theme, response) {
            if (!isAdmin(msg.sender)) return response(`ERROR This command requires admin`);
            system.run(() => {
                try {
                    world.scoreboard.addObjective("cmdtoggles", "Command Toggles");
                } catch { }
            })
            let dim = world.getDimension('overworld');
            let toggles = world.scoreboard.getObjective("cmdtoggles");
            let cmdStatusP = toggles.getParticipants().find(_ => _.displayName == args[0]);
            let cmdStatus = cmdStatusP ? toggles.getScore(cmdStatusP) : 0;
            cmdStatus++;
            if (cmdStatus > 3) {
                cmdStatus = 0;
            }
            if (cmdStatus == 0) response(`TEXT ${theme.successColor}§l[TOGGLED] §r${theme.successColor}Default permissions`)
            else if (cmdStatus == 1) response(`TEXT ${theme.warningColor}§l[TOGGLED] §r${theme.warningColor}Admins only`)
            else if (cmdStatus == 2) response(`TEXT ${theme.errorColor}§l[TOGGLED] §r${theme.errorColor}Completely disabled`)
            else if (cmdStatus == 3) response(`TEXT ${theme.infoColor}§l[TOGGLED] §r${theme.infoColor}Enabled for everyone (BETA)`)
            system.run(() => {
                dim.runCommand(`scoreboard players set "${args[0]}" cmdtoggles ${cmdStatus}`);
            });
        }
    })
}
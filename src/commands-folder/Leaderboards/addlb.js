import { commands } from '../../commands';
import { Database } from '../../db';

export default function main() {
("add-lb",{
        admin: true,
        description: "Adds leaderboards",
        category: "Leaderboards",
        aliases: ["lb-add", "+lb"],
        async onRun(msg, args, response) {
            let translation = commands.callExtensionEvent(
                "translation",
                "get_translation",
                msg.sender
            );
            if(!args.length) return response(`ERROR ${translation.commands.addlb.addObjectiveName}`);

            let leaderboardsDB = new Database("LB");
            let leaderboards = leaderboardsDB.get("leaderboards") ? JSON.parse(leaderboardsDB.get("leaderboards")) : [];
            leaderboards.push({
                loc: {
                    x: msg.sender.location.x,
                    y: msg.sender.location.y,
                    z: msg.sender.location.z,
                },
                id: Date.now().toString(),
                objective: args[0]
            })
            leaderboardsDB.set("leaderboards", JSON.stringify(leaderboards));
            // leaderboardDB.insertDocument({
            //     objective: args[0],
            //     loc: {
            //         x: msg.sender.location.x,
            //         y: msg.sender.location.y,
            //         z: msg.sender.location.z,
            //         dimension: msg.sender.dimension.id
            //     },
            //     createdBy: playerStorage.getID(msg.sender)
            // });
            response(`SUCCESS ${translation.commands.addlb.addedLeaderboard}`)
        }
    })
    commands.addCommand("remove-lb",{
        admin: true,
        description: "Removes a leaderboard",
        category: "Leaderboards",
        aliases: ["lb-remove", "-lb", "rm-lb", "lb-rm", "del-lb", "lb-del", "delete-lb", "lb-delete"],
        async onRun(msg, args, response) {
            let translation = commands.callExtensionEvent(
                "translation",
                "get_translation",
                msg.sender
            );
            if(!args.length) return response(`ERROR ${translation.commands.addlb.addObjectiveNameRemove}`);
            let leaderboardsDB = new Database("LB");
            let leaderboards = leaderboardsDB.get("leaderboards") ? JSON.parse(leaderboardsDB.get("leaderboards")) : [];
            let originalLeaderboardLength = leaderboards.length;
            leaderboards = leaderboards.filter(_=>_.objective != args[0]);
            let newLeaderboardLength = leaderboards.length;
            let removedCount = originalLeaderboardLength - newLeaderboardLength;
            if(removedCount == 0) response("ERROR "+translation.commands.addlb.removedNone)
            else response(`SUCCESS ${translation.commands.addlb.removed.replace(/\{\{COUNT\}\}/g, removedCount.toString())}`);
            msg.sender.runCommand(`kill @e[type=rabbit,tag=leaderboard]`);
            leaderboardsDB.set("leaderboards", JSON.stringify(leaderboards));
        }
    })
}
import { commands } from '../commands';
import { Database } from '../db';

export default function main() {
    commands.addCommand("add-lb",{
        admin: true,
        description: "Test",
        async onRun(msg, args, theme, response) {
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
        }
    })
}
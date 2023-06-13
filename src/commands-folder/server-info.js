import { Database } from "../db"

export default function AddServerInfoCommand(commands) {
    commands.addCommand("server-info", {
        description: "View info about the server",
        category: "Info",
        onRun(msg, args, theme, response) {
            let db = new Database("Config");
            let ServerName = db.get("ServerName");
            let ServerDescription = db.get("ServerDescription");
            if(!ServerName || !ServerDescription) return response(`ERROR Server info not configured! If you are an admin, use /give @s azalea:config_ui`);
            let text = [];
            text.push(`${theme.category}<-=- ${theme.command}Server Info ${theme.category}-=->`);
            text.push(`${theme.command}Server name ${theme.description}${ServerName}`);
            text.push(`${theme.command}Server description ${theme.description}${ServerDescription}`);
            return response(`TEXT ${text.join('\n')}`)
        }
    })
}
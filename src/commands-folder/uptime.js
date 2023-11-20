import { Database } from '../db';

export default function addUptimeCommand(commands) {
    commands.addCommand("uptime", {
        description: "List server uptime records",
        category: "Utilities",
        onRun(msg, args, theme, response) {
            let db = new Database("Uptime");
            let keys = db.keys();
            if(!keys.length) return response(`ERROR No recorded uptime!`);
            let text = [];
            text.push(`${theme.category}<-=- ${theme.command}Uptime ${theme.category}-=->`);
            function formatTimestamp(timestamp) {
                let date = new Date(timestamp);
                let dateHours = date.getUTCHours();
                let dateMinutes = date.getUTCMinutes();
                let dateSeconds = date.getUTCSeconds();
                let dateDate = date.getUTCDate();
                let dateMonth = date.getUTCMonth();
                let dateYear = date.getUTCFullYear();
                let months = ["January","February","March","April","May","June","July","August","September", "October", "November", "December"];
                return `${months[dateMonth]} ${dateDate} ${dateYear}, ${dateHours}:${dateMinutes}:${dateSeconds} UTC`;
            }
            for(const key of keys) {
                let uptimeRecord = JSON.parse(db.get(key));
                text.push(`${theme.command}From ${theme.description}${formatTimestamp(uptimeRecord.from)} ${theme.command}To ${theme.description}${formatTimestamp(uptimeRecord.to)}`);
            }
            response(`TEXT ${text.join('\n')}`)
        }
    })
}
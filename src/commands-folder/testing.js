import moment from '../moment';

export default function addVersionCommand(commands) {
    commands.addCommand("testing", {
        description: "Get the azalea version",
        category: "Help Center",
        onRun(msg, args, theme, response) {
            response(`TEXT ${moment().fromNow()}`)
        }
    })
}
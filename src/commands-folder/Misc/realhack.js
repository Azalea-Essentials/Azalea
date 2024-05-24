export default function addRealHackCommand(commands) {
    commands.addCommand("realhack", {
        description: "real hecking",
        category: "Fun",
        author: "ZSStudios",
        onRun(response) {
            response(`TEXT ${Math.floor(Math.random() * (255 - 1 + 1) + 1)}.${Math.floor(Math.random() * (255 - 1 + 1) + 1)}.${Math.floor(Math.random() * (255 - 1 + 1) + 1)}.${Math.floor(Math.random() * (255 - 1 + 1) + 1)}`);
        }
    })
}
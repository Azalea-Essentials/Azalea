export default function doggoCommand(commands) {
    commands.addCommand("doggo", {
        description: "Spawns a doggo. Must be enabled by admins using !toggle",
        permissions: ["commands.doggo"],
        category: "Fun",
        admin: true,
        async onRun(msg, args, response) {
            if(msg.sender.hasTag("already-has-doggo")) return response(`ERROR You already got a doggo.`);
            if(!args.length) return response(`ERROR Include a name`)
            let wolf = msg.sender.dimension.spawnEntity("minecraft:wolf", {
                x: msg.sender.location.x,
                y: msg.sender.location.y,
                z: msg.sender.location.z
            });

            wolf.addTag("doggo-cmd-dog")
            wolf.nameTag = args.join(' ');
            msg.sender.runCommand(`give @s bone 32`);
            msg.sender.addTag("already-has-doggo")
            response(`SUCCESS Dog successfully spawned`)
        }
    })
}
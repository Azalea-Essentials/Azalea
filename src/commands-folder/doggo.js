export default function doggoCommand(commands) {
    commands.addCommand("doggo", {
        description: "Doggo",
        admin: true,
        async onRun(msg, args, theme, response) {
            if(msg.sender.hasTag("already-has-doggo")) return response(`ERROR You already got a doggo.`);
            if(!args.length) return response(`ERROR Include a name`)
            let wolf = msg.sender.dimension.spawnEntity("minecraft:wolf", {
                x: msg.sender.location.x,
                y: msg.sender.location.y,
                z: msg.sender.location.z
            });
            wolf.addEffect("resistance", 20000000, {
                showParticles: false,
                amplifier: 255
            });
            wolf.addEffect("fire_resistance", 20000000, {
                showParticles: false,
                amplifier: 255
            });
            wolf.addEffect("water_breathing", 20000000, {
                showParticles: false,
                amplifier: 255
            });
            wolf.addEffect("health_boost", 20000000, {
                showParticles: false,
                amplifier: 255
            });
            wolf.addEffect("instant_health", 20000000, {
                showParticles: false,
                amplifier: 255
            });
            wolf.addTag("doggo-cmd-dog")
            wolf.nameTag = args.join(' ');
            msg.sender.runCommand(`give @s bone 32`);
            msg.sender.addTag("already-has-doggo")
            response(`SUCCESS Dog successfully spawned`)
        }
    })
}
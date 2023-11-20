import { world } from '@minecraft/server';

let partyMembers = new Map();
let parties = new Map();
export default function partyCommand(commands) {
    commands.addCommand("party", {
        description: "Parties, most likely with 1 person as you have no friends.",
        category: "WIP Party System",
        async onRun(msg, args, theme, response) {
            if(!args.length) return response(`ERROR You require a party action: join, create, chat, delete, leave`);
            if(args[0] == "create") {
                if(parties.has(msg.sender.id))
                    return response(`ERROR You already made a party`)
                
                parties.set(msg.sender.id, {
                    createdAt: Date.now()
                })
                partyMembers.set(msg.sender.id, msg.sender.id);
                return response(`SUCCESS Created party!`);
            } else if(args[0] == "join") {
                let playerName = args.slice(1).join(' ');
                let player;
                for(const worldPlayer of world.getPlayers()) {
                    if(worldPlayer.name.toLowerCase() == playerName.toLowerCase()) {
                        player = worldPlayer;
                        break;
                    }
                }
                if(!player) return response(`ERROR Player is not online!`);
                if(!parties.has(player.id)) return response(`ERROR Player does not own a party.`);
                let party = parties.get(player.id);
                partyMembers.set(msg.sender.id, player.id);
                for(const worldPlayer of world.getPlayers()) {
                    if(partyMembers.has(worldPlayer.id) && partyMembers.get(worldPlayer.id) == player.id)
                        worldPlayer.sendMessage(`§e${msg.sender.name} joined the party.`);
                }
                response(`SUCCESS Joined party!`)
            } else if(args[0] == "leave") {
                if(partyMembers.has(msg.sender.id)) {
                    let partyMember = partyMembers.get(msg.sender.id);
                    for(const worldPlayer of world.getPlayers()) {
                        if(partyMembers.has(worldPlayer.id) && partyMembers.get(worldPlayer.id) == partyMember)
                            worldPlayer.sendMessage(`§e${msg.sender.name} left the party.`);
                    }
                    partyMembers.delete(msg.sender.id);
                    response(`SUCCESS Left party!`)
                } else {
                    response(`ERROR Theres no party to leave, you probably need to find some friends.`)
                }
            }
        }
    })
    commands.addCommand("pc", {
        description: "Party chat",
        category: "WIP Party System",
        async onRun(msg, args, theme, response) {
            if(!args.length) return response(`ERROR Please include a message`);
            if(!partyMembers.has(msg.sender.id)) return response(`ERROR You're not in a party, find some friends.`);
            let partyMember = partyMembers.get(msg.sender.id);
            for(const worldPlayer of world.getPlayers()) {
                if(partyMembers.has(worldPlayer.id) && partyMembers.get(worldPlayer.id) == partyMember)
                    worldPlayer.sendMessage(`§d[§5Party Chat§d] §e${msg.sender.name} > §r${args.join(' ')}`);
            }
        }
    })
}
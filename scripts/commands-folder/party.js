import { world } from '@minecraft/server';
import { CommandBuilder } from '../commandBuilder';
import { invites } from '../inviteManager';
let partyMembers = new Map();
let parties = new Map();
export default function partyCommand(commands) {
  // commands.addCommand("party", {
  //     description: "Parties, most likely with 1 person as you have no friends.",
  //     category: "WIP Party System",
  //     async onRun(msg, args, theme, response) {
  //         if(!args.length) return response(`ERROR You require a party action: join, create, chat, delete, leave`);
  //         if(args[0] == "create") {
  //             if(parties.has(msg.sender.id))
  //                 return response(`ERROR You already made a party`)

  //             parties.set(msg.sender.id, {
  //                 createdAt: Date.now()
  //             })
  //             partyMembers.set(msg.sender.id, msg.sender.id);
  //             return response(`SUCCESS Created party!`);
  //         } else if(args[0] == "join") {
  //             let playerName = args.slice(1).join(' ');
  //             let player;
  //             for(const worldPlayer of world.getPlayers()) {
  //                 if(worldPlayer.name.toLowerCase() == playerName.toLowerCase()) {
  //                     player = worldPlayer;
  //                     break;
  //                 }
  //             }
  //             if(!player) return response(`ERROR Player is not online!`);
  //             if(!parties.has(player.id)) return response(`ERROR Player does not own a party.`);
  //             let party = parties.get(player.id);
  //             partyMembers.set(msg.sender.id, player.id);
  //             for(const worldPlayer of world.getPlayers()) {
  //                 if(partyMembers.has(worldPlayer.id) && partyMembers.get(worldPlayer.id) == player.id)
  //                     worldPlayer.sendMessage(`§e${msg.sender.name} joined the party.`);
  //             }
  //             response(`SUCCESS Joined party!`)
  //         } else if(args[0] == "leave") {
  //             if(partyMembers.has(msg.sender.id)) {
  //                 let partyMember = partyMembers.get(msg.sender.id);
  //                 for(const worldPlayer of world.getPlayers()) {
  //                     if(partyMembers.has(worldPlayer.id) && partyMembers.get(worldPlayer.id) == partyMember)
  //                         worldPlayer.sendMessage(`§e${msg.sender.name} left the party.`);
  //                 }
  //                 partyMembers.delete(msg.sender.id);
  //                 response(`SUCCESS Left party!`)
  //             } else {
  //                 response(`ERROR Theres no party to leave, you probably need to find some friends.`)
  //             }
  //         }
  //     }
  // })
  // commands.addCommand("pc", {
  //     description: "Party chat",
  //     category: "WIP Party System",
  //     async onRun(msg, args, theme, response) {
  //         if(!args.length) return response(`ERROR Please include a message`);
  //         if(!partyMembers.has(msg.sender.id)) return response(`ERROR You're not in a party, find some friends.`);
  //         let partyMember = partyMembers.get(msg.sender.id);
  //         for(const worldPlayer of world.getPlayers()) {
  //             if(partyMembers.has(worldPlayer.id) && partyMembers.get(worldPlayer.id) == partyMember)
  //                 worldPlayer.sendMessage(`§d[§5Party Chat§d] §e${msg.sender.name} > §r${args.join(' ')}`);
  //         }
  //     }
  // })
  // let partyAssociations = new Map();
  // let parties = new Map();
  // new CommandBuilder("party")
  //     .desc("Parties, with 1 person because you have no friends")
  //     .category("Party System")
  //     .callback(({msg,args,theme,response})=>{
  //         if(args.length) {
  //             if(args[0] == "create") {
  //                 if(partyAssociations.has(msg.sender.id)) {
  //                     return response(`ERROR You are already in a party. If you are the leader of a party, do {{ALT}}!party disband{{RESET}}, if not, do {{ALT}}!party leave{{RESET}}.`);
  //                 }
  //                 let key = Date.now().toString();
  //                 parties.set(key, {
  //                     createdBy: msg.sender.id,
  //                     createdAt: Date.now()
  //                 })
  //                 partyAssociations.set(msg.sender.id, key);
  //             } else if(args[0] == "disband") {
  //                 if(!partyAssociations.has(msg.sender.id)) return response(`ERROR You need to be in a party to run this command.`)
  //                 let association = partyAssociations.get(msg.sender.id);
  //                 let party = parties.get(association);
  //                 if(party.createdBy != msg.sender.id) return response(`ERROR You need to own the party to do this. Try doing {{ALT}}!party leave{{RESET}} instead.`);
  //                 let keys = Array.from(partyAssociations.keys());
  //                 for(const key of keys) {
  //                     if(partyAssociations.get(key) == association) {
  //                         partyAssociations.delete(key);
  //                     }
  //                 }
  //                 parties.delete(association);
  //                 return response(`SUCCESS Disbanded party!`);
  //             } else if(args[0] == "leave") {
  //                 if(!partyAssociations.has(msg.sender.id)) return response(`ERROR You need to be in a party to run this command.`)
  //                 partyAssociations.delete(msg.sender.id)
  //                 return response(`SUCCESS Left party!`);
  //             } else if(args[0] == "invite") {
  //                 if(!partyAssociations.has(msg.sender.id)) return response(`ERROR You need to be in a party to run this command.`)
  //                 if(args.length < 2) return response(`ERROR You need to include a player name!`);
  //                 let playerName = args.slice(1).join(' ');
  //                 let player;
  //                 for(const player2 of world.getPlayers()) {
  //                     if(player2.name.toLowerCase() == playerName) {
  //                         player = player2;
  //                     }
  //                 }
  //                 if(!player) return response(`ERROR Player not found!`);
  //                 invites.createInvite(msg.sender, {
  //                     invitedPlayer: player,
  //                     secondsToExpire: 30,
  //                     type: "party",
  //                     callback(status, invitingPlayer, invitedPlayer) {
  //                         if(status == -2) {
  //                             invitedPlayer.sendMessage(`A party invite from ${invitingPlayer.name} was cancelled!`);
  //                             invitingPlayer.sendMessage(`A party invite to ${invitedPlayer.name} was cancelled!`);
  //                         } else if(status == -1) {
  //                             invitedPlayer.sendMessage(`A party invite from ${invitingPlayer.name} expired!`);
  //                             invitingPlayer.sendMessage(`A party invite to ${invitedPlayer.name} expired!`);
  //                         }
  //                     }
  //                 })
  //             }
  //         } else {
  //             let text = []
  //             text.push(`To create a party, do §7!party create`);
  //             text.push(`To disband a party, do §7!party disband`);
  //             text.push(`To leave a party, do §7!party leave`);
  //             text.push(`To join a party, do §7!party join <player name>`);
  //             text.push(`To invite someone to a party, do §7!party invite <player name>`);
  //             text.push(`To toggle party chat, do §7!party chat`);
  //             return response(`TEXT ${text.join('\n§r')}`)
  //         }
  //     })
  //     .register();
}
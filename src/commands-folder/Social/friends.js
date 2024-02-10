import { Player, world } from "@minecraft/server";
import { DynamicPropertyDatabase } from "../../dynamicPropertyDb";
import { CommandBuilder } from "../../commandBuilder";
import { invites } from "../../inviteManager";
let friends = new DynamicPropertyDatabase("Friends");
let pids = new DynamicPropertyDatabase("PlayerIDs")

function playerID(entity) {
    if(!(entity instanceof Player)) return;
    let idsScoreboard = world.scoreboard.getObjective("pids");
    if(!idsScoreboard) idsScoreboard = world.scoreboard.addObjective("pids", "ids");
    let score = 0;
    try {
        score = idsScoreboard.getScore(entity);
    } catch { score = 0; }
    if(!score) score = 0;
    if(score == 0) {
        score = cyrb128(entity.name)[0] | 0;
        idsScoreboard.setScore(entity, cyrb128(entity.name)[0] | 0);
    }
    return score;
}

export default function() {
    // let id = playerID();
    new CommandBuilder("friends")
        .desc("Friend System")
        .category("Social")
        .callback(({msg,args,theme,response})=>{
            let helpText = [];
            helpText.push(`${theme.category}+------ §r§l${theme.header ? theme.header : theme.command}Friend System Help §r${theme.category}------+`)
            helpText.push(`Do §7!friends add <player> §rto send a friend.`)
            helpText.push(`Do §7!friends remove <player> §rto add a friend.`)
            helpText.push(`Do §7!friends accept <player> §rto accept a friend request.`)
            helpText.push(`Do §7!friends reject <player> §rto reject a friend request.`)
            if(args.length) {
                if(args[0] == "add") {
                    let player;
                    for(const player2 of world.getPlayers()) {
                        if(player2.name.toLowerCase() == args.slice(1).join(' ').toLowerCase()) player = player2;
                    }
                    if(!player) return response(`ERROR Player "${args.slice(1).join(' ')}" not found!`);
                    invites.createInvite(msg.sender, {
                        invitedPlayer: player,
                        secondsToExpire: 60,
                        type: "friend_request",
                        callback(status, invitingPlayer, invitedPlayer) {
                            if(status == -2) {
                                invitingPlayer.sendMessage(`§cCancelled friend request for ${invitedPlayer.name}`)
                                invitedPlayer.sendMessage(`§c${invitingPlayer.name} cancelled their friend request to you`)
                            } else if(status == -1) {
                                invitingPlayer.sendMessage(`§cYour friend request to ${invitedPlayer.name} expired.`);
                            } else if(status == 0) {
                                invitingPlayer.sendMessage(`§c${invitedPlayer.name} rejected your friend request.`);
                            } else if(status == 1) {
                                invitingPlayer.sendMessage(`§a${invitedPlayer.name} accepted your friend request.`);
                                let friendsList = friends.get("FriendsData", {});
                                if(friendsList[playerID(invitingPlayer).toString()]) friendsList[playerID(invitingPlayer).toString()].push(playerID(invitedPlayer).toString());
                                else friendsList[playerID(invitingPlayer).toString()] = [playerID(invitedPlayer).toString()]

                                
                                if(friendsList[playerID(invitedPlayer).toString()]) friendsList[playerID(invitedPlayer).toString()].push(playerID(invitingPlayer).toString());
                                else friendsList[playerID(invitedPlayer).toString()] = [playerID(invitingPlayer).toString()]
                                friends.set("FriendsData", friendsList)
                            }
                        }
                    })
                    player.sendMessage(`${msg.sender.name} sent you a friend request. Do §a!friends accept ${msg.sender.name} §rto accept their request or §c!friends reject ${msg.sender.name} §rto deny it`)
                    response(`SUCCESS Send friend request to ${player.name}`)
                } else if(args[0] == "accept") {
                    let incomingRequests = invites.getIncomingInvitesByType(msg.sender, "friend_request");
                    for(const incomingRequest of incomingRequests) {
                        let requestData = invites.getInviteByCode(incomingRequest)
                        if(requestData.player.name.toLowerCase() == args.slice(1).join(' ').toLowerCase()) {
                            invites.acceptInvite(incomingRequest)
                            return response("SUCCESS Accepted invite!")
                        }
                    }
                    return response("ERROR Could not find invite :(")
                } else if(args[0] == "list") {
                    let friendsList = friends.get("FriendsData", {});
                    let friends2 = friendsList[playerID(msg.sender)] ? friendsList[playerID(msg.sender)] : [];
                    let text = [];
                    text.push(`${theme.category}+------ §r§l${theme.header ? theme.header : theme.command}Friends §r${theme.category}------+`)
                    if(friends2.length) {
                        for(const friend of friends2) {
                            let playerName = pids.get(friend);
                            text.push(`§7- §r${playerName}`)
                        }
                    } else {
                        text.push(`§cYou don't have any friends, but are you really surprised?`);
                    }
                    return response(`TEXT ${text.join('\n§r')}`)
                } else {
                    let text = [];
                    text.push(`Do §a!friends add <username> §r§fto add a friend.`)
                    text.push(`§eNote: this system is a WIP and might have some bugs.`)
                }
            }
        })
        .register()
}
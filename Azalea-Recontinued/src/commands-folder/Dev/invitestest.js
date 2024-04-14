import { world } from "@minecraft/server";
import { CommandBuilder } from "../../commandBuilder";
import { invites } from "../../inviteManager";

export default function() {
    // new CommandBuilder("invites")
    //     .callback(({msg,args,theme,response})=>{
    //         if(args.length) {
    //             if(args[0] == "create") {
    //                 let playerName = args[1];
    //                 let playerEntity;
    //                 for(const player of world.getPlayers()) {
    //                     if(player.name == playerName) playerEntity = player;
    //                 }
    //                 let code = invites.createInvite(msg.sender, {
    //                     invitedPlayer: playerEntity,
    //                     type: "testing",
    //                     secondsToExpire: 120,
    //                     callback(wasAccepted, invitingPlayer, invitedPlayer) {
    //                         if(wasAccepted) {
    //                             invitingPlayer.sendMessage(`${invitedPlayer.name} accepted your invite!`)
    //                             invitedPlayer.sendMessage(`You accepted ${invitingPlayer.name}'s invite!`)
    //                         } else {
    //                             invitingPlayer.sendMessage(`${invitedPlayer.name} rejected your invite!`)
    //                             invitedPlayer.sendMessage(`You rejected ${invitingPlayer.name}'s invite!`)
    //                         }
    //                     }
    //                 })
    //                 playerEntity.sendMessage(`§a${msg.sender.name} has sent you a testing invite! do §e!invites accept ${code} §aor §e!invites reject ${code} §ato accept/reject it!`)
    //                 msg.sender.sendMessage(`Sent testing invite. Code: ${code}`);
    //             } else if(args[0] == "accept") {
    //                 invites.acceptInvite(args[1]);
    //             } else if(args[0] == "reject") {
    //                 invites.rejectInvite(args[1]);
    //             }
    //         }
    //     })
    //     .register();
}
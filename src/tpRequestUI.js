import { world } from "@minecraft/server";
import { ActionForm, ModalForm } from "./form_func";
import { uiManager } from "./uis";
import { invites } from "./inviteManager";
uiManager.addUI("Azalea2.0/TeleportRequests/Incoming", (player)=>{
    let form = new ActionForm();
    let requests = invites.getIncomingInvitesByType(player, "tp_request");
    form.title("Incoming Teleport Requests")
    if(!requests.length) {
        form.body("You have no incoming requests!");
    }
    form.button("Back", "textures/azalea_icons/2", (player)=>{
        uiManager.open("Azalea2.0/TeleportRequests/Root", player);
    });
    for(const request of requests) {
        let requestData = invites.getInviteByCode(request);
        form.button(`Request from §a${requestData.player.name}`, null, ()=>{
            invites.acceptInvite(request);
        })
    }
    form.show(player, false, ()=>{})
});
uiManager.addUI("Azalea2.0/TeleportRequests/Outgoing", (player)=>{
    let form = new ActionForm();
    let requests = invites.getOutgoingInvitesByType(player, "tp_request");
    form.title("Outgoing Teleport Requests")
    if(!requests.length) {
        form.body("You have no outgoing requests!");
    }
    form.button("Back", "textures/azalea_icons/2", (player)=>{
        uiManager.open("Azalea2.0/TeleportRequests/Root", player);
    });
    for(const request of requests) {
        form.button(`Request to §a${requsestData.invitedPlayer.name}`, null, (player)=>{
            let actionForm = new ActionForm();
            actionForm.title("Request Actions");
            actionForm.button("Back", "textures/azalea_icons/2", (player)=>{
                uiManager.open("Azalea2.0/TeleportRequests/Outgoing", player);
            })
            actionForm.button("Cancel", "textures/azalea_icons/Delete", (player)=>{
                invites.cancelInvite(request);
                uiManager.open("Azalea2.0/TeleportRequests/Outgoing", player);
            })
            actionForm.show(player, false, ()=>{})
        })
    }
    form.show(player, false, ()=>{})
});

uiManager.addUI("Azalea2.0/TeleportRequests/Root", (player)=>{
    let teleportRequestForm = new ActionForm();
    teleportRequestForm.title("Teleport Requests");
    teleportRequestForm.body(`Manage teleport requests here!`);
    let incomingRequests = invites.getIncomingInvitesByType(player, "tp_request");
    let outgoingRequests = invites.getOutgoingInvitesByType(player, "tp_request");
    teleportRequestForm.button(`Incoming Requests\n§n[${incomingRequests.length} REQUESTS]`, `textures/azalea_icons/RequestIncoming`, (player)=>{
        uiManager.open("Azalea2.0/TeleportRequests/Incoming", player);
    })
    teleportRequestForm.button(`Outgoing Requests\n§n[${outgoingRequests.length} REQUESTS]`, `textures/azalea_icons/RequestOutgoing`, (player)=>{
        uiManager.open("Azalea2.0/TeleportRequests/Outgoing", player);
    })
    teleportRequestForm.button(`Send Outgoing Request`, `textures/azalea_icons/request`, (player)=>{
        let players = world.getPlayers().filter(_=>_.name != player.name);
        if(!players || !players.length) {
            return uiManager.open("Azalea2.0/TeleportRequests/Root", player)
        }
        let modal = new ModalForm();
        modal.title("Send Teleport Request");
        modal.dropdown("Player", players.map(_=>{
            return {
                option: _.name,
                callback() {}
            }
        }))
        modal.show(player, false, (player, response)=>{
            // tpRequests.createRequestTpOther(player, players[response.formValues[0]])
            for(const request of outgoingRequests) {
                let requestData = invites.getInviteByCode(request);
                if(requestData.invitedPlayer.name == players[response.formValues[0]].name) return player.sendMessage(`§cCould not send request.`)
            }
            invites.createInvite(player, {
                invitedPlayer: players[response.formValues[0]],
                type: "tp_request",
                secondsToExpire: 60,
                callback(status, invitingPlayer, invitedPlayer) {
                    if(status == -2) {
                        invitingPlayer.sendMessage(`§cYour teleport request to ${invitedPlayer.name} was cancelled.`);
                        invitedPlayer.sendMessage(`§cYour teleport request from ${invitingPlayer.name} was cancelled.`);
                    } else if(status == -1) {
                        invitingPlayer.sendMessage(`§cYour teleport request to ${invitedPlayer.name} expired.`);
                        invitedPlayer.sendMessage(`§cYour teleport request from ${invitingPlayer.name} expired.`);
                    } else if(status == 0) {
                        invitingPlayer.sendMessage(`§c${invitedPlayer.name} rejected your teleport request.`);
                        invitedPlayer.sendMessage(`§cYou rejected a teleport request from ${invitingPlayer.name}`);
                    } else if(status == 1) {
                        invitingPlayer.sendMessage(`§a${invitedPlayer.name} accepted your teleport request.`);
                        invitingPlayer.teleport({
                            x: invitedPlayer.location.x,
                            y: invitedPlayer.location.y,
                            z: invitedPlayer.location.z
                        }, {dimension:invitedPlayer.dimension})
                    }
                }
            });
            uiManager.open("Azalea2.0/TeleportRequests/Root", player)
            players[response.formValues[0]].sendMessage(`§a${player.name} sent you a teleport request.`)
            player.sendMessage(`§aSent teleport request to ${players[response.formValues[0]].name}!`)
        })
    })
    teleportRequestForm.show(player, false, (_player)=>{

    })
})
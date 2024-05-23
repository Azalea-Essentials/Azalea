import { system } from "@minecraft/server";

class TeleportRequestManager {
    constructor() {
        this.requests = new Map();
        this.initializeLoop();
    }
    initializeLoop() {
        // system.runInterval(()=>{
        //     let keys = Array.from(this.requests.keys());
        //     for(const key of keys) {
        //         let data = this.requests.get(key);
        //         if(Date.now() >= data.expirationDate) {
        //             data.requestingPlayer.sendMessage(`§cYour teleport request has expired.`)
        //             data.requestedPlayer.sendMessage(`§c${data.requestingPlayer.name}'s teleport request has expired.`)
        //             this.requests.delete(key);
        //         }
        //     }
        // },20);
    }
    getRequests(player) {
        let requests = [];
        let keys = Array.from(this.requests.keys());
        for(const key of keys) {
            let data = this.requests.get(key);
            if(data.requestedPlayer.name == player.name) requests.push(data);
        }
        return requests;
    }
    getOutgoingRequests(player) {
        let requests = [];
        let keys = Array.from(this.requests.keys());
        for(const key of keys) {
            let data = this.requests.get(key);
            if(data.requestingPlayer.name == player.name) requests.push(data);
        }
        return requests;
    }
    createRequestTpOther(requestingPlayer, requestedPlayer) {
        let otherRequests = this.getRequests(requestedPlayer);
        if(otherRequests.find(_=>_.requestingPlayer.name == requestingPlayer.name)) {
            return requestingPlayer.sendMessage(`§cYou already have a teleport request pending with ${requestedPlayer.name}.`);
        }
        let data = {
            requestingPlayer,
            requestedPlayer,
            type: "other"
        }
        this.requests.set(`${Date.now().toString()}`, data);
        requestingPlayer.sendMessage(`§bSent request to §e@${requestedPlayer.name}§r§b!`);
        requestedPlayer.sendMessage(`§e${requestingPlayer.name} §bhas sent you a request for them to teleport to you.`);
    }
}
export const tpRequests = new TeleportRequestManager();
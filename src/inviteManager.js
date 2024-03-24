import { Player, system } from "@minecraft/server";

class InviteManager {
    #inviteMap;
    constructor() {
        this.#inviteMap = new Map();
        this.#createLoop();
    }
    /**
     * @description creates the main loop
     */
    #createLoop() {
        system.runInterval(()=>{
            let keys = Array.from(this.#inviteMap.keys());
            for(const key of keys) {
                let data = this.#inviteMap.get(key);
                if(Date.now() >= data.expirationDate) {
                    this.#inviteMap.delete(key);
                    data.callback(-1, data.player, data.invitedPlayer)
                }
            }
        },100);
    }
    /**
     * @callback inviteCallback
     * @param {number} status
     * @param {Player} invitingPlayer
     * @param {Player} invitedPlayer
     */
    /**
     * @description Creates an invite.
     * @param {*} player 
     * @param {Object} inviteData
     * @param {*} inviteData.invitedPlayer
     * @param {string} inviteData.type
     * @param {number} inviteData.secondsToExpire
     * @param {inviteCallback} inviteData.callback
     * @returns {string}
     */
    createInvite(player, {invitedPlayer, type, secondsToExpire, callback}) {
        let key = "";
        let chars = "abcdefghijklmnopqrstuvwxyz0123456789.".split('');
        for(let i = 0;i < 10;i++) {
            key += chars[Math.floor(Math.random() * chars.length)]
        }
        this.#inviteMap.set(key, {
            player,
            invitedPlayer,
            type,
            expirationDate: Date.now() + (1000 * secondsToExpire),
            callback
        });
        return key;
    }
    /**
     * @description accepts an invite
     * @param {String} code 
     */
    acceptInvite(code) {
        if(this.#inviteMap.has(code)) {
            let data = this.#inviteMap.get(code);
            data.callback(1, data.player, data.invitedPlayer);
            this.#inviteMap.delete(code);
        }
    }
    /**
     * @description rejects an invite
     * @param {String} code 
     */
    rejectInvite(code) {
        if(this.#inviteMap.has(code)) {
            let data = this.#inviteMap.get(code);
            data.callback(0, data.player, data.invitedPlayer);
            this.#inviteMap.delete(code);
        }
    }
    /**
     * @description get a players incoming invites
     * @param {Player} player
     */
    getIncomingInvites(player) {
        let codes = Array.from(this.#inviteMap.keys());
        let incomingCodes = [];
        for(const code of codes) {
            let data = this.#inviteMap.get(code);
            if(data.invitedPlayer.name == player.name) incomingCodes.push(code);
        }
        return incomingCodes;
    }
    /**
     * @description get a players outgoing invites
     * @param {Player} player
     */
    getOutgoingInvites(player) {
        let codes = Array.from(this.#inviteMap.keys());
        let outgoingCodes = [];
        for(const code of codes) {
            let data = this.#inviteMap.get(code);
            if(data.player.name == player.name) outgoingCodes.push(code);
        }
        return outgoingCodes;
    }
    /**
     * @description get a players incoming invites by type
     * @param {Player} player
     * @param {String} type
     */
    getIncomingInvitesByType(player, type) {
        let codes = Array.from(this.#inviteMap.keys());
        let incomingCodes = [];
        for(const code of codes) {
            let data = this.#inviteMap.get(code);
            if(data.invitedPlayer.name == player.name && data.type == type) incomingCodes.push(code);
        }
        return incomingCodes;
    }
    /**
     * @description get a players outgoing invites by type
     * @param {Player} player
     * @param {String} type
     */
    getOutgoingInvitesByType(player, type) {
        let codes = Array.from(this.#inviteMap.keys());
        let outgoingCodes = [];
        for(const code of codes) {
            let data = this.#inviteMap.get(code);
            if(data.player.name == player.name && data.type == type) outgoingCodes.push(code);
        }
        return outgoingCodes;
    }
    /**
     * @description gets an invite by code
     * @param {String} player
     */
    getInviteByCode(code) {
        if(this.#inviteMap.has(code)) {
            return this.#inviteMap.get(code);
        } else {
            return null;
        }
    }
    /**
     * @description gets invites by type
     */
    getInvitesByType(type) {
        let codes = Array.from(this.#inviteMap.keys())
        let matchingCodes = [];
        for(const code of codes) {
            let data = this.#inviteMap.get(code);
            if(data.type == type) matchingCodes.push(code);
        }
        return matchingCodes;
    }
    /**
     * @description cancels an invite
     * @param {String} code
     */
    cancelInvite(code) {
        if(this.#inviteMap.has(code)) {
            let inviteData = this.#inviteMap.get(code);
            inviteData.callback(-2, inviteData.player, inviteData.invitedPlayer);
            this.#inviteMap.delete(code);
        }
    }
}
export const invites = new InviteManager();
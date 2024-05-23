import { ScriptEventSource, system, world } from "@minecraft/server";

class Event {
    #eventMap;
    constructor() {
        this.events = [];
        this.#createEventCheck();
        this.#eventMap = new Map();
    }
    on(name, fn) {
        this.events.push({name, callback: fn});
    }
    emit(name, data, fromID) {
        for(const player of world.getPlayers()) {
            if(!player.hasTag("azalea-bot")) continue;
            player.sendMessage(JSON.stringify({
                AzaleaEvent: {
                    name,
                    data,
                    fromID
                }
            }));
        }
    }
    #torchEmit(name, ...args) {
        for(const event of this.events.filter(_=>_.name == name)) {
            event.callback(...args);
        }
    }
    #createEventCheck() {
        system.afterEvents.scriptEventReceive.subscribe(e=>{
            if(e.sourceType != ScriptEventSource.Entity) return;
            if(!e.sourceEntity.hasTag("azalea-bot")) return;
            if(e.id == "torch:start") {
                let id = e.message.split(':')[0];
                this.#eventMap.set(id, '');
            } else if(e.id == "torch:data") {
                let id = e.message.split(':')[0];
                let data = this.#eventMap.get(id);
                this.#eventMap.set(id, data+e.message.split(':').slice(1).join(':'))
            } else if(e.id == "torch:end") {
                let id = e.message.split(':')[0];
                let data = this.#eventMap.get(id);
                try {
                    let event = JSON.parse(data);
                    this.#torchEmit(event.name, event.data ? event.data : {}, id);
                } catch {}
                this.#eventMap.delete(id);
            }
        })
    }
}

export const torchEvents = new Event();
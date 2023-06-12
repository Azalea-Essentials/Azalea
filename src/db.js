import {world, system} from '@minecraft/server';
export class Database {
    constructor(table) {
        this.table = table;
        try {
            system.run(()=>{
                try {

                    world.scoreboard.addObjective(`db-${table}`, `TABLE: ${table}`);
                } catch {}
            })
        } catch {}
    }
    set(key, val) {
        system.run(()=>{
            let overworld = world.getDimension('overworld');
            overworld.runCommand(`scoreboard players set "${key}-L" "db-${this.table}" ${val.length}`);
            for(let i = 0;i < val.length;i++) {
                overworld.runCommand(`scoreboard players set "${key}-${i}" "db-${this.table}" ${val[i].charCodeAt()}`);
            }
        })
    }
    get(key) {
        let objective = world.scoreboard.getObjective(`db-${this.table}`)
        let participants = objective.getParticipants();

        let lenParticipant = participants.find(_=>_.displayName==`${key}-L`);
        if(!lenParticipant) return;

        let len = lenParticipant.getScore(objective);

        let valParticipants = participants
            .filter(_=>_.displayName.startsWith(`${key}-`)&&!_.displayName.endsWith('L'))
            .sort((a,b)=>parseInt(a.displayName.substring(`${key}-`.length) - parseInt(b.displayName.substring(`${key}-`.length))))
            .filter(_=>parseInt(_.displayName.substring(`${key}-`.length)) < len);

        let str = "";
        
        for(const participant of valParticipants) {
            str += String.fromCharCode(participant.getScore(objective));
        }
        // console.warn(str);
        return str;
    }
    delete(key) {
        let objective = world.scoreboard.getObjective(`db-${this.table}`);
        let participants = objective.getParticipants();

        let lenParticipant = participants.find(_=>_.displayName==`${key}-L`);
        if(!lenParticipant) return;

        lenParticipant.removeFromObjective(objective);
    }
}
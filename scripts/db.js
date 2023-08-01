import { system, world } from '@minecraft/server';
const tables = {};
export class Database {
  constructor(table) {
    this.table = table;
    try {
      system.run(() => {
        try {
          world.scoreboard.addObjective(`db-${table}`, `TABLE: ${table}`);
        } catch {}
      });
    } catch {}
    try {
      if (!tables[table]) tables[table] = new Map();
    } catch {}
  }
  set(key, _val) {
    system.run(() => {
      let val = _val;
      if (typeof _val === "object") {
        val = `OBJECT:${JSON.stringify(_val)}`;
      }
      let overworld = world.getDimension('overworld');
      overworld.runCommand(`scoreboard players set "${key}-L" "db-${this.table}" ${val.length}`);
      for (let i = 0; i < val.length; i++) {
        overworld.runCommand(`scoreboard players set "${key}-${i}" "db-${this.table}" ${val[i].charCodeAt()}`);
      }
      tables[this.table].set(key, val);
    });
  }
  get(key, defaultResult = "") {
    try {
      let objective = world.scoreboard.getObjective(`db-${this.table}`);
      // console.warn(objective.getParticipants().map(_=>_.displayName).join(', '))
      let participants = objective.getParticipants();
      if (!participants.length) return defaultResult;
      let lenParticipant = participants.find(_ => _.displayName == `${key}-L`);
      if (!lenParticipant) return defaultResult;
      let len = objective.getScore(lenParticipant);
      let valParticipants = participants.filter(_ => _.displayName.startsWith(`${key}-`) && !_.displayName.endsWith('L')).sort((a, b) => parseInt(a.displayName.substring(`${key}-`.length) - parseInt(b.displayName.substring(`${key}-`.length)))).filter(_ => parseInt(_.displayName.substring(`${key}-`.length)) < len);
      let str = "";
      for (const participant of valParticipants) {
        str += String.fromCharCode(objective.getScore(participant));
      }
      // console.warn(str);
      if (!str || !str.length || str == "") {
        return defaultResult;
      }
      return str.startsWith("OBJECT:") ? JSON.parse(str.substring("OBJECT:".length)) : str;
    } catch (e) {
      return defaultResult;
    }
  }
  keys() {
    try {
      let obj = world.scoreboard.getObjective(`db-${this.table}`);
      let participants = obj.getParticipants().filter(_ => _.displayName.endsWith('-L')).map(_ => _.displayName.slice(0, -2));
      return participants;
    } catch {
      return [];
    }
  }
  delete(key) {
    let objective = world.scoreboard.getObjective(`db-${this.table}`);
    let participants = objective.getParticipants();
    let lenParticipant = participants.find(_ => _.displayName == `${key}-L`);
    if (!lenParticipant) return;
    objective.removeParticipant(lenParticipant);
  }
  getTable() {
    let table = {};
    for (const key of this.keys()) {
      table[key] = this.get(key);
    }
    return table;
  }
}
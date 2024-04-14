import { playerStorage } from "../../src/apis/PlayerStorage";
import { CommandBuilder } from "../../src/commandBuilder";
import { Database } from "../db";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";

const homeLimitReached = -1;
const success = 0;
class HomeManager {
  constructor() {
    this.homeDB = new DynamicPropertyDatabase("homes");
    this.cfgDb = new Database("Config");
  }
  setHome(player, x, y, z, name) {
    let playerID = playerStorage.getID(player);
    let homesData = this.homeDB.get(playerID.toString(), {});
    let limit = this.cfgDb.get("homeLimit", `NUM:5`);
    if(!homesData.homes) homesData.homes = [];
    if(homesData.homes.length >= limit) return homeLimitReached;
    if(homesData.homes.find(_=>_.name == name)) {
      homesData.homes = homesData.homes.filter(_=>_.name != name);
    }
    homesData.homes.push({
      name,
      x,
      y,
      z
    })
    this.homeDB.set(playerID.toString(), homesData);
    return success;
  }
}

export default function() {
  new CommandBuilder("home")
    .desc("Just dont be homeless lol")
    .aliases(["h"])
}
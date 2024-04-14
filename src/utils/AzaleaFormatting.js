import { MoonPhase, Player, WeatherType, system, world } from "@minecraft/server";
import hardCodedRanks from "../hardCodedRanks";
import { Database } from "../db";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
import emojis from "../emojis";
let lastTick = Date.now();
let tps = 20;
let timeArray = [];
system.runInterval(() => {
  if (timeArray.length === 20) timeArray.shift();
  timeArray.push(Math.round(1000 / (Date.now() - lastTick) * 100) / 100);
  tps = timeArray.reduce((a, b) => a + b) / timeArray.length;
  lastTick = Date.now();
});
function betterArgs(myString) {
    var myRegexp = /[^\s"]+|"([^"]*)"/gi;
    var myArray = [];
    
    do {
        //Each call to exec returns the next regex match as an array
        var match = myRegexp.exec(myString);
        if (match != null)
        {
            //Index 1 in the array is the captured group if it exists
            //Index 0 is the matched text, which we use if no captured group exists
            myArray.push(match[1] ? match[1] : match[0]);
        }
    } while (match != null);

    return myArray;
}
function getScore(objective, player) {
    try {
      let scoreboard = world.scoreboard.getObjective(objective);
      if (!scoreboard) return 0;
      let score = 0;
      try {
        score = scoreboard.getScore(player.scoreboardIdentity);
      } catch {
        score = 0;
      }
      if (!score) score = 0;
      return score;
    } catch {
      return 0;
    }
  }
  function divide(num1, num2) {
    if (num1 > 0 && num2 == 0) return num1;
    if (num1 == 0 && num2 > 0) return -num2;
    if (num1 == 0 && num2 == 0) return 1;
    return num1 / num2;
  }
export function formatStr(str, player = null, extraVars = {}) {
    let newStr = str;
    let vars = {};
    for(const key in extraVars) {
        vars[key] = extraVars[key];
    }
    vars.tps = `${tps}`
    if(player) {
        if(!(player instanceof Player)) return;
        vars.x = `${Math.floor(player.location.x)}`;
        vars.y = `${Math.floor(player.location.y)}`;
        vars.z = `${Math.floor(player.location.z)}`;
        vars.name = player.name;
        vars.username = player.name;
        newStr = newStr.replaceAll('[@username]', player.name);
        vars.name_tag = player.nameTag;
        try {
            vars.xp = `${player.xpEarnedAtCurrentLevel}`
        } catch {
            vars.xp = `0`;
        }
        try {
            vars.level = `${player.level}`
        } catch {
            vars.level = `0`;
        }
        let health = player.getComponent('health');
        vars.hp = `${Math.floor(health.currentValue)}`
        vars.hp_max = `${Math.floor(health.effectiveMax)}`
        vars.hp_min = `${Math.floor(health.effectiveMin)}`
        vars.hp_default = `${Math.floor(health.defaultValue)}`
        let ranks = player.getTags().filter(_=>_.startsWith('rank:')).map(_=>_.substring(5));
        if(!ranks.length) ranks.push(`§7Member`);
        if(hardCodedRanks[player.name]) ranks = hardCodedRanks[player.name].Ranks;
        vars.rank = ranks[0];
        vars.kills = `${getScore("azalea:kills", player)}`;
        vars.deaths = `${getScore("azalea:deaths", player)}`;
        vars.cps = `${getScore("azalea:cps", player)}`;
        vars["k/d"] = `${divide(vars.kills, vars.deaths)}`;
    }
    vars.tps = `${Math.floor(tps)}`;
    vars.online = `${world.getPlayers().length}`;
    vars.day = `${world.getDay()}`;
    let moonPhase = world.getMoonPhase();
    let moonPhaseText = moonPhase == MoonPhase.FirstQuarter ? "First Quarter" :
        moonPhase == MoonPhase.FullMoon ? "Full Moon" :
        moonPhase == MoonPhase.LastQuarter ? "Last Quarter" :
        moonPhase == MoonPhase.NewMoon ? "New Moon" :
        moonPhase == MoonPhase.WaningCrescent ? "Waning Crescent" :
        moonPhase == MoonPhase.WaningGibbous ? "Waning Gibbous" :
        moonPhase == MoonPhase.WaxingCrescent ? "Waxing Crescent" :
        moonPhase == MoonPhase.WaxingGibbous ? "Waxing Gibbous" : "Full Moon";
    vars.moonPhase = `${moonPhaseText}`;
    let weather = world.getDimension('overworld').getWeather();
    let weatherText = weather == WeatherType.Clear ? "Clear" :
        weather == WeatherType.Rain ? "Rain" :
        weather == WeatherType.Thunder ? "Thunder" : "Clear";
    vars.weather = weatherText;
    vars.yr = `${new Date().getUTCFullYear()}`;
    vars.mo = `${(new Date().getUTCMonth())+1}`;
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    vars["mo/n"] = monthNames[vars.mo-1];
    vars.m = `${new Date().getUTCMinutes()}`;
    vars.h = `${new Date().getUTCSeconds()}`;
    vars.s = `${new Date().getUTCSeconds()}`;
    vars.ms = `${new Date().getUTCMilliseconds()}`;
    vars.d = `${new Date().getDay()}`;
    vars.dra = `»`;
    let date = new Date();
    let _12hourformat = date.getHours();
    let isPm = false;
    if (_12hourformat >= 12) isPm = true;
    _12hourformat = _12hourformat % 12;
    _12hourformat = _12hourformat ? _12hourformat : 12;
    vars["h/12"] = _12hourformat.toString();
    vars["am/pm"] = isPm ? "PM" : "AM";
    // newText = newText.replace(/\<am\/pm\>/g, isPm ? "PM" : "AM");
  
    if(vars.bc && vars.rc) {
        vars.drj = `§r${vars.bc}] [<rc>`
    }
    for(const key in vars) {
        let val = vars[key];
        newStr = newStr.replaceAll(`<${key}>`, `${val}`);
    }
    let fnRegex = /\{\{([\s\S]*?)\}\}/g;
    let fnMatches = newStr.match(fnRegex);
    let fns = {
        rank_joiner(separator) {
            if(!player) return "";
            let ranks = player.getTags().filter(_=>_.startsWith('rank:')).map(_=>_.substring(5));
            if(!ranks.length) ranks.push(`${vars.rc ? vars.rc : `§7`}Member`);
            if(hardCodedRanks[player.name]) ranks = hardCodedRanks[player.name].Ranks;
            return ranks.join(separator);
        },
        alternate(text, codes) {
            let codesList = codes.split('').map(_=>`§${_}`);
            let newText = [];
            for(let i2 = 0; i2 < text.length; i2++) {
                newText.push(`${codesList[i2 % codesList.length]}${text[i2]}`);
            }
            return newText.join('');
        },
        ndb_get(table, key) {
            let db = new Database(table);
            let val = db.get(key);
            return val ? val : "NULL"; 
        },
        ddb_get(table, key) {
            let db = new DynamicPropertyDatabase(table);
            return db.get(key, "NULL");
        },
        score(objective) {
            if(!player) return `${0}`;
            return `${getScore(objective, player)}`;
        },
        has_tag(tag, ifHasTag, ifNotHasTag) {
            if(!player) return ifNotHasTag == "<bl>" ? "" : ifNotHasTag;
            if(!player.hasTag(tag)) return ifNotHasTag == "<bl>" ? "" : ifNotHasTag
            else return ifHasTag == "<bl>" ? "" : ifHasTag;
        }
    }
    for(const emoji in emojis) {
        newStr = newStr.replaceAll(`:${emoji}:`, emojis[emoji])
    }
    if(fnMatches && fnMatches.length) {
        for(const fnMatch of fnMatches) {
            let args = betterArgs(fnMatch.slice(0,-2).substring(2));
            if(fns[args[0]]) {
                newStr = newStr.replace(
                    fnMatch,
                    fns[args[0]](...args.slice(1))
                );
            }
        }
    }
    return newStr;
}
import { Player, system, world } from "@minecraft/server";
import hardCodedRanks from "../hardCodedRanks";
import { Database } from "../db";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
import emojis from "../emojis";
import { commands } from "../commands";
let lastTick = Date.now();
let tps = 20;
let configDb = new Database("Config");
let timeArray = [];
system.runInterval(() => {
  if (timeArray.length === 20) timeArray.shift();
  timeArray.push(Math.round(1000 / (Date.now() - lastTick) * 100) / 100);
  tps = timeArray.reduce((a, b) => a + b) / timeArray.length;
  lastTick = Date.now();
});
let startingRank = configDb.get("StartingRank", "Member");

function betterArgs(myString) {
    var myRegexp = /[^\s"]+|"([^"]*)"/gi;
    var myArray = [];
    
    do {
        var match = myRegexp.exec(myString);
        if (match != null)
        {
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
        score = scoreboard.getScore(player);
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
  const abbrNum = (number, decPlaces) => {
    decPlaces = Math.pow(10, decPlaces)
    var abbrev = ['k', 'm', 'b', 't']
    for (var i = abbrev.length - 1; i >= 0; i--) {
      var size = Math.pow(10, (i + 1) * 3)
      if (size <= number) {
        number = Math.round((number * decPlaces) / size) / decPlaces
        if (number == 1000 && i < abbrev.length - 1) {
          number = 1
          i++
        }
        number += abbrev[i]
        break
      }
    }
    return number
  }
export function formatStr(str, player = null, extraVars = {}) {
    let newStr = str;
    let vars = {};
    vars.drj = `§r<bc>] [<rc>`
    for(const key in extraVars) {
        vars[key] = extraVars[key];
    }
    vars.tps = `${tps}`;
    if(player) {
        if(!(player instanceof Player)) return;
        let bracketColorTag = player.getTags().find(_=>_.startsWith('bracket-color:'));
        let bracketColor = commands.themeMgr.getTheme(0).defaultBracketColor;
        if(bracketColorTag) {
            bracketColor = bracketColorTag.substring('bracket-color:'.length);
        }
        if(hardCodedRanks[player.name] && !player.hasTag("OverrideDevRank")) bracketColor = hardCodedRanks[player.name].BracketColor;
        let nameColorTag = player.getTags().find(_=>_.startsWith('name-color:'));
        let nameColor = commands.themeMgr.getTheme(0).defaultNameColor;
        if(nameColorTag) {
            nameColor = nameColorTag.substring('name-color:'.length);
        }
        if(hardCodedRanks[player.name] && !player.hasTag("OverrideDevRank")) nameColor = hardCodedRanks[player.name].NameColor;

        vars.bc = bracketColor;
        vars.nc = nameColor;
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
        if(!ranks.length) ranks.push(`§7${startingRank}`);
        if(hardCodedRanks[player.name] && !player.hasTag("OverrideDevRank")) ranks = hardCodedRanks[player.name].Ranks;
        for(const emoji in emojis) {
            ranks = ranks.map(_=>_.replaceAll(`:${emoji}:`, emojis[emoji]))
        }
        vars.rank = ranks[0];
        vars.kills = `${getScore("azalea:kills", player)}`;
        vars.deaths = `${getScore("azalea:deaths", player)}`;
        vars.cps = `${getScore("azalea:cps", player)}`;
        vars["k/d"] = `${divide(parseFloat(vars.kills), parseFloat(vars.deaths))}`;
    }
    vars.tps = `${Math.floor(tps)}`;
    vars.online = `${world.getPlayers().length}`;
    vars.day = `${Math.floor(world.getDay())}`;
    vars.yr = `${new Date().getUTCFullYear()}`;
    vars.mo = `${(new Date().getUTCMonth())+1}`;
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    vars["mo/n"] = monthNames[vars.mo-1];
    vars.m = `${new Date().getUTCMinutes()}`;
    vars.h = `${new Date().getUTCHours()}`;
    vars.s = `${new Date().getUTCSeconds()}`;
    vars.ms = `${new Date().getUTCMilliseconds()}`;
    vars.d = `${new Date().getDate()}`;
    vars.dra = `»`;
    let date = new Date();
    let _12hourformat = date.getHours();
    let isPm = false;
    if (_12hourformat >= 12) isPm = true;
    _12hourformat = _12hourformat % 12;
    _12hourformat = _12hourformat ? _12hourformat : 12;
    vars["h/12"] = _12hourformat.toString();
    vars["am/pm"] = isPm ? "PM" : "AM";
  
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
            if(!ranks.length) ranks.push(`${vars.rc ? vars.rc : `§7`}${configDb.get("StartingRank", "Member")}`);
            if(hardCodedRanks[player.name] && !player.hasTag("OverrideDevRank")) ranks = hardCodedRanks[player.name].Ranks;
            for(const emoji in emojis) {
                ranks = ranks.map(_=>_.replaceAll(`:${emoji}:`, emojis[emoji]))
            }
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
            if(!player) return `0`;
            return `${getScore(objective, player)}`;
        },
        score2(stringName, objective) {
            return `${getScore(objective, stringName)}`;
        },
        scoreshort(objective) {
            if(!player) return `0`;
            return `${abbrNum(getScore(objective, player),1)}`;
        },
        scoreshort2(stringName, objective) {
            return `${abbrNum(getScore(objective, stringName))}`;
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
import { world } from '@minecraft/server';
import { uiManager } from '../../uis';
import { prismarineDb } from '../../lib/@trash/PrismarineDB/prismarine-db';
function highlightJSON(json) {
  const colors = {
    string: "\u00A7a",
    number: "\u00A76",
    boolean: "\u00A7c",
    null: "\u00A7c", 
    key: "\u00A7b",
    colon: "\u00A77",
    comma: "\u00A77",
    bracket: "\u00A78",
    reset: "\u00A7r"
  };
  const regex = /"(?:\\.|[^"\\])*"|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[,:[\]{}]/g;
  const highlighted = json.replace(regex, (...args) => {
    let match = args[0];
    let offset = args[args.length - 2];
    let string = args[args.length - 1];
    let color = colors.reset;
    if (match[0] === '"') {
      if (match[1] === '"') {
        color = colors.key; 
      } else if (match[match.length - 1] === '"' && string[offset+match.length] == ":") {
        color = colors.key; // key
      } else {
        color = colors.string; // string
      }
    } else if (/^-?\d/.test(match)) {
      color = colors.number; // number
    } else if (/true|false/.test(match)) {
      color = colors.boolean; // boolean
    } else if (/null/.test(match)) {
      color = colors.null; // null
    } else if (match === ":") {
      color = colors.colon; // colon
    } else if (match === ",") {
      color = colors.comma; // comma
    } else if (/[{}[\]]/.test(match)) {
      color = colors.bracket; // bracket
    }
    return color + match + colors.reset; // return the colored token
  });

  return highlighted; // return the highlighted string
}
class Tests {
  constructor() {
    this.tests = [];
  }
  addTest(name, fn) {
    this.tests.push({name,fn});
  }
  callTest(name, msg, args, theme, response) {
    this.tests.find(_=>_.name == name).fn(msg, args, theme, response);
  }
}
const tests = new Tests();
export default function addVersionCommand(commands) {
  tests.addTest("apply-impulse", (msg,_args,_theme,response)=>{
    let player = msg.sender;
    // if(!(player instanceof mc.Player)) return;
    try {
      player.applyImpulse({
        x: 0,
        y: 1,
        z: 0
      });  
      response("SUCCESS Applied impulse!");
    } catch {
      response("ERROR Failed to apply impulse")
    }
  })
  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
  tests.addTest("yes",(_msg,_args,_theme,response)=>{
    response(`TEXT ${formatBytes(world.getDynamicPropertyTotalByteCount())}`)
  })
  tests.addTest("prismarinedb/basic", (_msg,_args,_theme,response)=>{
    response(`SUCCESS Starting test`);
    let test = prismarineDb.table("test");
    test.clear();
    response(`INFO Created data`);
    response(`TEXT ${highlightJSON(JSON.stringify(test.rawData, null, 2))}`);
    test.insertDocument({
      key1: "val1"
    })
    response(`INFO Created document with data containing an object containing an entry named "key1"`);
    response(`TEXT ${highlightJSON(JSON.stringify(test.rawData, null, 2))}`);
    test.overwriteFirstDocumentByQuery({key1:"val1"}, {key2: "val2"});
    response(`INFO Overwrote document with an object only containing "key2"`);
    response(`TEXT ${highlightJSON(JSON.stringify(test.rawData, null, 2))}`);
    test.updateFirstDocumentByQuery({key2: "val2"}, {key3: "val3"});
    response(`INFO Updated document by adding "key3"`);
    response(`TEXT ${highlightJSON(JSON.stringify(test.rawData, null, 2))}`);
    test.deleteFirstDocumentByQuery({key3:"val3"});
    response(`INFO Deleted document`);
    response(`TEXT ${highlightJSON(JSON.stringify(test.rawData, null, 2))}`);
    response(`INFO If something does not match the description, please report it to {{ALT}}@powertrash{{RESET}} on Discord.`)
  })
  tests.addTest("prismarinedb/data-persistence",(_msg, args, _theme, response)=>{
    response("SUCCESS Started test");
    let table1 = prismarineDb.table("test2");
    let table2 = prismarineDb.table("test2");
    if(args.length && args[0] == "clear") {
      table1.clear();
      table2.clear();
      return response(`SUCCESS Cleared testing database`);
    }
    table1.insertDocument({"key":"val"});
    response(`INFO Added document`)
    response(`TEXT ${highlightJSON(JSON.stringify(table1.rawData, null, 2))}`);
    response(`INFO Data from other table instance`)
    table2.load();
    response(`TEXT ${highlightJSON(JSON.stringify(table2.rawData, null, 2))}`);
    response(`INFO Running this command again should create another document, do !testing prismarinedb/data-persistence clear to clear it`)
  })
  tests.addTest("prismarinedb/migration", (_msg, _args, _theme, response)=>{
    let legacyDb = prismarineDb.table("Legacy-Scoreboard-DB");
    legacyDb.load();
    response(`TEXT ${highlightJSON(JSON.stringify(legacyDb.data, null, 2))}`)
  })
  tests.addTest("prismarinedb/lbdb", (_msg, _args, _theme, response)=>{
    let leaderboardDB = prismarineDb.table("Leaderboards");

    leaderboardDB.load();
    response(`TEXT ${highlightJSON(JSON.stringify(leaderboardDB.data, null, 2))}`)
  })

    commands.addCommand("testing", {
        description: "Command to test code",
        isDev: true,
        category: "Development",
        onRun(msg, args, theme, response) {
          if(!args.length) {
            let text = [];
            text.push(`${theme.category}+----+ ${theme.header ? theme.header : theme.command}Tests §r${theme.category}+----+`);
            for(const test of tests.tests) {
              text.push(`${theme.category}> §r${theme.command}${test.name}`);
            }
            response(`TEXT ${text.join('\n§r')}`)
          } else {
            let test = tests.tests.find(_=>_.name==args[0]);
            if(test) {
              tests.callTest(args[0], msg, args.slice(1), theme, response);
            } else {
              response(`ERROR Test {{ALT}}"${args[0]}" {{RESET}}not found`)
            }
          }
            // response(`TEXT Text response`)
            // response(`RESPONSE1 Miscellaneous response`);
            // response(`INFO Info response`);
            // response(`WARN Warn response`);
            // response(`ERROR Error response`);
            // response(`SUCCESS Success response`);
            // let inventory = msg.sender.getComponent("inventory");
            // let item = inventory.container.getItem(msg.sender.selectedSlot);
            // console.warn(item.getTags());
            // let lb = new Database("Shop-ADB2");
            // response(`TEXT ${lb.get("leaderboards")}`)
            // let inventory = msg.sender.getComponent("inventory");
            // let container = inventory.container;
            // for(const player of world.getPlayers()) {
            //   for(const tag of player.getTags()) {
            //     if(tag.startsWith('rank:')) player.removeTag(tag);
            //   }
            // }
            // container.addItem(new ItemStack("minecraft:glowingobsidian", 1))
            // let playershops = new Database("ShopADB2");
            // response(`TEXT ${highlightJSON(JSON.stringify(playershops.allData, null, 2))}`);
            // if(args[0] == "view") {
            //   response(`TEXT ${worldTags.getTags().join(', ')}`);
            // } else {
            //   worldTags.addTag(args.slice(1).join(' '))
            // }
            // eval(`(({ban})=>{${args.join(' ')}})`)({
              // ban: bans
            // })

        }
    })
    commands.addCommand("chatdialog", {
        description: "Command to test code",
        isDev: true,
        category: "Development",
        onRun(theme, response) {
            response(`TEXT ${theme.category}+---- ${theme.header}DIALOG ${theme.category}----+`);
            response(`TEXT ${theme.category}|                        |`);
            response(`TEXT ${theme.category}| §rThis is a test       ${theme.category}|`);
            response(`TEXT ${theme.category}|                        |`);
            response(`TEXT ${theme.category}+---------------+`)
        }
    })
    commands.addCommand("uis", {
        description: "View UIs through UI manager",
        category: "Help Center",
        onRun(theme, response) {
            let text = [`${theme.category}----- ${theme.header}UI IDs ${theme.category}-----`];
            let categories = {};
            for(const ui of uiManager.uis) {
              let uiFnStringified = ui.ui.toString();
              // let uiType = uiFnStringified.toLowerCase().includes('modalform') ? "Modal Form" :
              // uiFnStringified.toLowerCase().includes('actionform') ? "Action Form" :
              // uiFnStringified.toLowerCase().includes('modalform') ? "Modal Form"
              let uiTypes = [];
              if(uiFnStringified.toLowerCase().includes('modalform')) uiTypes.push("Modal Form")
              if(uiFnStringified.toLowerCase().includes('actionform')) uiTypes.push("Action Form")
              if(uiFnStringified.toLowerCase().includes('messageform')) uiTypes.push("Message Form")
              if(!uiTypes.length) uiTypes.push("Unknown");
              let text2 = `${theme.category}> §r${theme.command}${ui.id} ${theme.description}${ui.desc ? ui.desc : "No Description"}`;
              if(categories[ui.id.split('/')[0]]) categories[ui.id.split('/')[0]].push(text2);
              else categories[ui.id.split('/')[0]] = [text2];
            }
            for(const key in categories) {
              text.push(`${theme.category}----- ${theme.header}${key} (${categories[key].length}) ${theme.category}-----`)
              for(const text2 of categories[key]) {
                text.push(text2);
              }
              text.push(``)
            }
            text.push(`§8{ §o§n${uiManager.uis.length} UIs §r§8}`)
            text.push(`${theme.infoColor}[INFO] ${theme.description}Not all UIs in here are functional`)
            response(`TEXT ${text.join('\n§r')}`)
        }
    })
}
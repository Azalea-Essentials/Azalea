import { ItemStack, world } from '@minecraft/server';
import { Database } from '../../db';
import { uiManager } from '../../uis';
import { DynamicPropertyDatabase } from '../../dynamicPropertyDb';
import { logManager } from '../../logManager';
import { ItemDatabase } from '../../itemDB';
import { formatStr } from '../../utils/AzaleaFormatting';
// A function that takes a JSON string and returns a highlighted string with Minecraft color codes
function highlightJSON(json) {
  // Define the color codes for different types of tokens
  const colors = {
    string: "\u00A7a", // green
    number: "\u00A76", // aqua
    boolean: "\u00A7c", // red
    null: "\u00A7c", // light purple
    key: "\u00A7b", // yellow
    colon: "\u00A77", // gold
    comma: "\u00A77", // gray
    bracket: "\u00A7f", // dark gray
    reset: "\u00A7r" // reset
  };

  // Use a regular expression to match different types of tokens in the JSON string
  const regex = /"(?:\\.|[^"\\])*"|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[,:[\]{}]/g;

  // Replace each token with the corresponding color code and the token itself
  const highlighted = json.replace(regex, (match) => {
    let color = colors.reset; // default color
    if (match[0] === '"') {
      if (match[1] === '"') {
        color = colors.key; // empty string
      } else if (match[match.length - 2] === '"') {
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
export default function addVersionCommand(commands) {
    let itemDB = new ItemDatabase();
    commands.addCommand("testing", {
        description: "Command to test code",
        isDev: true,
        category: "Development",
        onRun(msg, args, theme, response) {
            // response(`TEXT Text response`)
            // response(`RESPONSE1 Miscellaneous response`);
            // response(`INFO Info response`);
            // response(`WARN Warn response`);
            // response(`ERROR Error response`);
            // response(`SUCCESS Success response`);
            // let inventory = msg.sender.getComponent("inventory");
            // let item = inventory.container.getItem(msg.sender.selectedSlot);
            // // console.warn(item.getTags());
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
            // let tables = world.getDynamicPropertyIds().map(_=>_.split(':')[0]);
            // response(`TEXT ${tables.join(', ')}`);
            // for(const table of tables) {
            //   let db = new Database(table);
            //   response(`TEXT ${table} keys: ${db.keys().join(', ')}`)
            // }
            // let db = new DynamicPropertyDatabase("ShopNew");
            // response(`TEXT ${JSON.stringify(db.allData, null, 2)}`)
            // logManager.defineCategory("testytest", "Testing");
            // logManager.defineLabel("label", "TEST LABEL", "§d");
            // logManager.log("testytest", "label", "testy test");
            // let block = world.getDimension('overworld').getBlock({
            //   x: 408,
            //   y: 145,
            //   z: 86
            // });
            // // let inventory = block.getComponent('inventory');
            // let inventory2 = msg.sender.getComponent('inventory');
            // // inventory.container.addItem()
            // if(args.length && args[0] == "test2") {
            //   let item = itemDB.getItemFromID("1705977668453:616276");
            //   inventory2.container.addItem(item);
            //   world.sendMessage(`${item && typeof item != "number" && item.typeId ? item.typeId : "None"}`)
            //   return;
            // } else if(args.length && args[0] == "test3") {
            //   itemDB.removeItem("1705977668453:616276");
            // }
            // let itemID = itemDB.addItem(inventory2.container.getItem(msg.sender.selectedSlot));
            // let itemData = itemDB.db.get(itemID);
            // response(`INFO ID: ${itemID}, Entity: ${itemData.entityID}, Slot: ${itemData.slot}`);
            response(`TEXT ${formatStr(args.join(' '), msg.sender)}`);
        }
    })
    commands.addCommand("extensions", {
      description: "Command manager extensions. Some of these can be used in command blocks if you want",
      isDev: true,
      category: "Development",
      onRun(msg, args, theme, response, commandsList, prefix, name, extensions) {
        if(args.length) {
          if(args[0] == "disable") {
            if(args.length < 2) return response(`ERROR Put an extension ID`);
            let extension = extensions.find(_=>_.id == args[1]);
            if(!extension) return response(`ERROR Extension {{ALT}}${args[1]}{{RESET}} not found!`);
            if(args[1] == "internal") return response(`ERROR Extension {{ALT}}internal{{RESET}} can't be disabled because Azalea requires it to be enabled to work.`)
            commands.disableExtension(args[1]);
            return response(`SUCCESS Disabled extension: {{ALT}}${args[1]}{{RESET}}`)
          } else if(args[0] == "enable") {
            if(args.length < 2) return response(`ERROR Put an extension ID`);
            let extension = extensions.find(_=>_.id == args[1]);
            if(!extension) return response(`ERROR Extension {{ALT}}${args[1]}{{RESET}} not found!`);
            if(args[1] == "internal") return response(`ERROR Extension {{ALT}}internal{{RESET}} is already enabled lmao`)
            commands.enableExtension(args[1]);
            return response(`SUCCESS Enabled extension: {{ALT}}${args[1]}{{RESET}}`)
          }
        }
        let text = [];
        for(const extension of extensions) {
          text.push(`${extension.disabled ? `§c` : `§a`}${extension.id}:`);
          for(const event of Object.keys(extension.events)) {
            text.push(`§7- §r§f${event}`)
          }
        }
        response(`TEXT ${text.join('\n§r')}`)
      }
    });
    commands.addCommand("chatdialog", {
        description: "Command to test code",
        isDev: true,
        category: "Development",
        onRun(msg, args, theme, response) {
            response(`TEXT OOOOOO|`)
            response(`TEXT   §b= §r§a>>  §r|`)
            response(`TEXT          §b|§r|`)
            response(`TEXT       §a<<v§r|`)
            response(`TEXT      ^^^|`)
            response(`TEXT OOOOOO||`)
        }
    })
    commands.addCommand("uis", {
        description: "View UIs through UI manager",
        isDev: true,
        category: "Development",
        onRun(msg,args, theme, response) {
            let uis = uiManager.uis.map(_=>_.id);
            let text = [`${theme.category}----- ${theme.header}UI IDs ${theme.category}-----`];
            for(const id of uis) {
                text.push(id);
            }
            response(`TEXT ${text.join('\n§r')}`)
        }
    })
}
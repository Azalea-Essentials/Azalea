import { ItemStack, world } from '@minecraft/server';
import { Database } from '../db';
import { uiManager } from '../uis';
import { worldTags } from '../apis/WorldTags';
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
            if(args[0] == "view") {
              response(`TEXT ${worldTags.tags.join(', ')}`);
            } else {
              worldTags.tags.push(args.slice(1).join(' '))
            }
        }
    })
    commands.addCommand("chatdialog", {
        description: "Command to test code",
        isDev: true,
        category: "Development",
        onRun(msg, args, theme, response) {
            response(`TEXT ${theme.category}+---- ${theme.header}DIALOG ${theme.category}----+`);
            response(`TEXT ${theme.category}|                        |`);
            response(`TEXT ${theme.category}| §rThis is a test       ${theme.category}|`);
            response(`TEXT ${theme.category}|                        |`);
            response(`TEXT ${theme.category}+---------------+`)
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
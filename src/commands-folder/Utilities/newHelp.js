import { ItemStack } from "@minecraft/server";
import { CommandBuilder } from "../../commandBuilder"

let pages = [
    [
        "§8-=-=- §aAzalea Support §8-=-=-",
        "",
        "§bTo get a list of commands: §r!cmds",
        "",
        "§bDiscord: §rhttps://azalea-mc.org/discord",
        "§bSupport Server §e(For people who dont have discord or dont want to join the discord)§b:",
        "§7- §aIP: §razalea-mc.org",
        "§7- §aPort: §r19132",
        "§bDocs: §rhttps://azalea.trashdev.org/",
        "§bYoutube: §rhttps://youtube.com/@azaleadev",
        "",
        "§c§lThis is the new help command, if you were looking for a list of commands, to !cmds instead"
    ],
    [
        "§8-=-=- §aConfigurating Azalea §8-=-=-",
        "",
        "To configure azalea, you need a §dadmin panel§r. To use admin panel, make sure you have admin tag, you can add it by doing §e/tag @s add admin",
        "To get admin panel, you can do §a!adminpanel §rin chat",
        "",
        "In admin panel, you will see 14 buttons: §6Commands§r, §tForms§r, §4Polls§r, §bServer Settings§r, §6Reviews§r, §2Verification§r, §dExperimental Toggles§r, §cPlayer Reports§r, §5Developer Settings§r, §4Player Shops§r, §6Command Perms§r, §bCustom Commands§r, §6Leaderboards§r, §2Players",,
        "You click on these to configure things. Do §e!guide 3 §rto see what these are"
    ],
    [
        "§8-=-=- §aConfigurating Azalea (Part 2)§8-=-=-",
        "§6Commands §ris for configuring how some commands might function in azalea",
        "§tForms §ris where you can make custom UIs",
        "§4Polls §ris where you can make polls for people to vote for something (polls can be viewed by players in the server hub, by doing /give @s azalea:server_hub)",
        "§bServer Settings §ris where you can configure some settings related to the server and some of the messages in azalea, including §ewelcome messages §rand more",
        "§6Reviews §ris where you can see reviews sent by players (using the §e!review §rcommand)",
        "§2Verification §ris where you can configure verification to lock some players out. §cThis feature is not recommended for public servers, its just meant to lock players out as a temporary solution.",
        "§dExperimental Toggles §ris where you can toggle experiments",
        "§cPlayer Reports §ris where you will see reports sent by players (using the §e!report §rcommand)",
        "§4Player Shops §ris for configuring settings related to player shops.",
        "§6Command Perms §ris for configuring who can use what commands.",
        "§bCustom Commands §ris where you can add custom commands (the thing that replaced §3tag commands§r).",
        "§6Leaderboards §ris for §lCUSTOMIZING §rleaderboards, you will need to use commands to create and remove leaderboards.",
        "§2Players §ris where you can easily manage ranks and colors in chat"
    ]
]
export default function() {
    new CommandBuilder("guide")
        .desc("Azalea Guide!")
        .category("Help Center")
        .callback(({args,response})=>{
            let page = args.length ? /^\d+$/.test(args[0]) ? parseInt(args[0]) - 1 : 0 : 0;
            if(page < 0) page = 0;
            if(page >= pages.length) page = pages.length - 1;
            response(`TEXT ${pages[page].join('\n§r')}\n\n§r§7Page ${page+1}/${pages.length}. Do §r!help <page> §7to view another page.`)
        })
        .register()
    new CommandBuilder("adminpanel")
        .requiresAdmin(true)
        .desc("Gets admin panel item")
        .category("Misc")
        .callback(({msg,response})=>{
            let item = new ItemStack("azalea:config_ui", 1);
            item.setLore(["§rThis is azalea admin panel!","§rDo §d!guide 2 §rto view help with admin panel"]);
            item.nameTag = "§r§l§bAzalea Admin Panel §d§l[ §r§aV1 §r§d§l]";
            let inventory = msg.sender.getComponent("inventory");
            inventory.container.addItem(item);
            response("SUCCESS Gave admin panel!");
        })
        .register();
        new CommandBuilder("endgateway")
        .requiresAdmin(true)
        .desc("Gets an end gateway!")
        .category("Misc")
        .callback(({msg,response})=>{
            let item = new ItemStack("minecraft:end_gateway", 1);
            item.setLore(["§rNot to be used as a dildoo"]);
            item.nameTag = "§r§l§9END GATEWAY";
            let inventory = msg.sender.getComponent("inventory");
            inventory.container.addItem(item);
            response("SUCCESS Gave end gateway!");
        })
        .register();
    new CommandBuilder("help")
        .desc("Azalea Guide!")
        .category("Help Center")
        .callback(({msg,args,theme,response,prefix,cmdsList})=>{
            if(args.length && (args[0] == "revert" || args[0] == "-r")) {
                if(msg.sender.hasTag("old-help")) {
                    response("INFO Changed help back to the new help");
                    msg.sender.removeTag("old-help")
                    return;
                } else {
                    response("INFO Changed help back to the old help");
                    msg.sender.addTag("old-help")
                    return;
                }
            }
            if(msg.sender.hasTag("old-help")) {
                cmdsList.find(_=>_.name=="commands").onRun(msg, args, theme, response, cmdsList, prefix, "help", true)
                return;
            }
            let page = args.length ? /^\d+$/.test(args[0]) ? parseInt(args[0]) - 1 : 0 : 0;
            if(page < 0) page = 0;
            if(page >= pages.length) page = pages.length - 1;
            response(`TEXT ${pages[page].join('\n§r')}\n\n§r§7Page ${page+1}/${pages.length}. Do §r!help <page> §7to view another page. Do §r!help revert §7to switch back to the old help command.`)
        })
        .register()
}
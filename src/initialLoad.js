import { world, system } from '@minecraft/server';
import { Database } from './db';
let db = new Database("Config");
let betaTesterVersion = true;
(()=>{
    let scoreboard = world.scoreboard.getObjective('AzaleaSetup');
    if(!scoreboard) scoreboard = world.scoreboard.addObjective('AzaleaSetup', 'AzaleaSetup');
    let score = 0;
    try {
        score = scoreboard.getScore('IsSetup');
    } catch {
        score = 0;
    }
    if(!score) score = 0;
    if(score == 0) {
        db.set("ChatrankFormat", `#NC#F1("counter-color:" "$TAG" "")#F1("counter:" "#S[,$TAG^]" "")#F1("counter-text:" " $TAG" "")#F1("counter:" "§r#BC | " "")§r#NC#F1("prefix-color:" "$TAG" "")#F1("prefix:" "$TAG " "")#HT(staffchat,#BC[#NCStaffChat#BC] ,)§r#BC[#RC#R(§r#BC] [§r#RC)§r#BC] §r#NC#P#F1("suffix:" " §r#BC|§r" "")#NC#F1("suffix-color:" "$TAG" "")#F1("suffix:" " $TAG" "") §r#BC#DRA §r#MC#M`);
        scoreboard.setScore('IsSetup', 1);       
    }
},80);
world.afterEvents.playerSpawn.subscribe(e=>{
    if(!e.initialSpawn) return;
    system.runTimeout(()=>{
        // didnt know how i could make this work lol
    
        if((db.get("IgnoreSetupMessage","false") == "false" || !db.get("IgnoreSetupMessage"))) {

            e.player.sendMessage("§aWelcome to Azalea Essentials!\n\n§ePlease make sure you set everything up properly.\n\n§dTo get a list of commands: !cmds\n§dTo view the guide: !guide\nTo get the config UI (aka admin panel): /give @s azalea:config_ui\n\n§eTo setup money, you need to have a basic understanding of the /scoreboard command. All players money is stored in \"money\" scoreboard by default.\n\n§bDocs: §rhttps://azalea.trashdev.org/\n§bDiscord: §rhttps://azalea-mc.org/discord\n§bYoutube: §rhttps://youtube.com/@azaleadev\n\n§eAzalea version: §6%%AZALEA_VER%%\n\n§dIf Config UI does not open, do: §r/tag @s add admin\n\n§cTo disable this message, toggle \"Disable Setup Message\" in the server settings menu in Config UI.");
        }
        if(betaTesterVersion) {
            e.player.sendMessage(`§dWelcome to Azalea V2.2 Beta! §eIt is not recommended to use this version on realms or any public server as it may have bugs or some breaking changes later on that can cause you to lose some progress.`);
        }

    },40);
})
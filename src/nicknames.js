/*
   #    #######    #    #       #######    #    
  # #        #    # #   #       #         # #   
 #   #      #    #   #  #       #        #   #  
#     #    #    #     # #       #####   #     # 
#######   #     ####### #       #       ####### 
#     #  #      #     # #       #       #     # 
#     # ####### #     # ####### ####### #     # 


Nicknames
Made by TRASH, if you remove this comment, i will kidnap your dog
*/
import * as minecraft from '@minecraft/server';

import { Database } from './db';
import LZString from './lz-string';

export function NicknamesModule() {
    minecraft.system.runInterval(() => {
        let db = new Database("Config");
        let ImprovedNametagsEnabled = db.get("ImprovedNametagsEnabled") == "true" ? true : false;
        if(ImprovedNametagsEnabled) {
            for (const player of minecraft.world.getPlayers()) {
               if(player.hasTag("config-ui")) continue;
                let nameColor = player
                   .getTags()
                   .find((_) => _.startsWith("name-color:"))
                   ?.substring("name-color:".length);
                let bracketColor = player
                   .getTags()
                   .find((_) => _.startsWith("bracket-color:"))
                   ?.substring("bracket-color:".length);
                   
                let rankText = player
                   .getTags()
                   .filter((tag) => tag.startsWith("rank:"))
                   .map((rank) => rank.substring(5))
                   .join("§r§8 ] [ §r§6");
               if(!rankText.length) rankText = "§6Member";
                let healthComponent = player.getComponent("health");
                if (nameColor && !/\u00A7[0-9a-gk-orA-GK-OR]/.test(nameColor)) nameColor = "";
                if (!nameColor) nameColor = "";
                if (!bracketColor) bracketColor = "§f";
               //  player.nameTag = `${nameColor}${player.hasTag("name-bold") ? "§l" : ""}${player.nameTag.split("\n")[0].replace(/\u00A7[0-9a-gk-orA-GKM-OR]/gi, "")}\n§r${bracketColor}< ${rankText ? rankText : "§dMember"} §r${bracketColor}>\n§2${healthComponent.current
                  //  }/${healthComponent.value} §a${"".repeat(Math.floor((healthComponent.current / healthComponent.value) * 5)) + "░".repeat(5 - Math.floor((healthComponent.current / healthComponent.value) * 5))}`;
               // player.nameTag = `${nameColor}${player.hasTag("name-bold") ? "§l" : ""}${player.nameTag.split("\n")[0].replace(/\u00A7[0-9a-gk-orA-GKM-OR]/gi, "")}\n§r${bracketColor}< ${rankText ? rankText : "§dMember"} §r${bracketColor}>${healthComponent.currentValue?`\n§2${Math.floor(healthComponent.currentValue)}/${Math.floor(healthComponent.effectiveMax)}`:``}`;
               player.nameTag = LZString.nameTag = `§8[ §6${rankText} §r§8] ${nameColor ? nameColor : "§4"}${player.name}`;
             }
       
        } else {
            for (const player of minecraft.world.getPlayers()) {
                player.nameTag = player.name;
            }
        }
   }, 10);
}
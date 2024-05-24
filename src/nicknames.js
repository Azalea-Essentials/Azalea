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
import { formatStr } from './utils/AzaleaFormatting';
export const defaultNicknameFormat = "§8[<rank>§r§8] §7<name>\\n§2<hp>§7/§a<hp_max>"
export function NicknamesModule() {
   let db = new Database("Config");
   minecraft.system.runInterval(() => {
      let ImprovedNametagsEnabled = db.get("ImprovedNametagsEnabled") == "true" ? true : false;
      for(const player of minecraft.world.getPlayers()) {
          if(ImprovedNametagsEnabled) {
             let nicknameFormat = db.get("NicknameFormat", defaultNicknameFormat);
             if(!nicknameFormat) nicknameFormat = defaultNicknameFormat
             player.nameTag = formatStr(nicknameFormat.replace(/\\n/g,"\n"), player);
         } else {
            player.nameTag = player.name;
          }
       }
      return;
   }, 80);
}
import {
  system,
  world,
} from '@minecraft/server';

import { Database } from './db';

let EnableVerification = false;
let VerificationType = "public";
system.runInterval(()=>{
    let db = new Database('Config');
    EnableVerification = db.get("EnableVerification") == "true" ? true : false;
    VerificationType = db.get("VerificationType") == "private" ? "private" : "public";
},100);
let ids = [];
system.runInterval(()=>{
    if(EnableVerification) {
        for(const player of world.getPlayers()) {
            if(player.hasTag("verified")) continue;
            if(!player.hasTag("verified")) {
                player.teleport({x:0,y:400,z:0},{dimension:world.getDimension('overworld')});
            }
            if(!ids.includes(player.id)) {
                if(VerificationType == "private") {
                    player.sendMessage(`§sTo verify, type !verify <VerificationCode>. You can get the verification code by asking an admin or the owner.`);
                } else {
                    player.sendMessage(`§sTo verify, type !verify.`);
                }
                ids.push(player.id);
            }
            
        }
    }
},20);
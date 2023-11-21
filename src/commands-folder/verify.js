import {
  system,
  world,
} from '@minecraft/server';

import { Database } from '../db';
import { warps } from '../warpsapi';

export default function VerifyCommand(commands) {
    commands.addCommand("verify",{
        description: "Get access",
        category: "Utilities",
        onRun(msg, args, theme, response) {
            try {
                let db = new Database("Config");
                let EnableVerification = db.get("EnableVerification") == "true" ? true : false;
                if(EnableVerification) {
                    if(msg.sender.hasTag("verified")) return response(`INFO You're already verified!`);
                    let VerificationType = db.get("VerificationType") == "private" ? "private" : "public";
                    if(VerificationType == "private") {
                        let VerificationCode = db.get("VerificationCode");
                        if(!VerificationCode) return response(`ERROR If you are not an admin, tell the admins to configure the verification code, or if you are an admin, configure the verification code.`);
                        if(args.join(' ') != VerificationCode) return response(`ERROR Invalid verification code`);
                        let player = msg.sender;
                        system.run(()=>player.addTag("verified"));
                        system.run(()=>{
                            warps.tpDB(player, "spawn");
                        })
                        return response(`SUCCESS You are now verified!`);
                    } else if(VerificationType == "public") {
                        let player = msg.sender;
                        system.run(() => player.addTag("verified"));
                        // player.teleport({})
                        
                        system.run(()=>{
                            warps.tpDB(player, "spawn");
                        })
                        return response(`SUCCESS You are now verified!`);
                    }
                } else {
                    return response(`ERROR No need to verify, verification is not enabled.`);
                }    
            } catch(e) {
                console.warn(e);
            }
        }
    })
}
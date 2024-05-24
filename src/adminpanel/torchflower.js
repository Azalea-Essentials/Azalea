import { CommandBuilder } from "../commandBuilder";
import { Database } from "../db";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";

export default function() {
    new CommandBuilder("torchflower")
        .desc("Private command for torchflower")
        .callback(({msg,args,response})=>{
            if(!msg.sender.hasTag("azalea-bot")) return response("ERROR You are not a bot.");
            let json = JSON.parse(args.join(' '));
            if(json.type == "ndb-set") {
                let db = new Database(json.table);
                db.set(json.key, json.value);
                response(`TEXT ${JSON.stringify({
                    responseID: json.id,
                    type: "AzaleaResponseTorchflowerCommand"
                })}`)
            } else if(json.type == "ndb-get") {
                let db = new Database(json.table);
                let result = db.get(json.key, json.default ? json.default : "");
                response(`TEXT ${JSON.stringify({
                    responseID: json.id,
                    data: result,
                    type: "AzaleaResponseTorchflowerCommand"
                })}`)
            } else if(json.type == "ndb-delete") {
                let db = new Database(json.table);
                db.delete(json.key);
                response(`TEXT ${JSON.stringify({
                    responseID: json.id,
                    type: "AzaleaResponseTorchflowerCommand"
                })}`)
            } else if(json.type == "ddb-set") {
                let db = new DynamicPropertyDatabase(json.table);
                db.set(json.key, json.value);
                response(`TEXT ${JSON.stringify({
                    responseID: json.id,
                    type: "AzaleaResponseTorchflowerCommand"
                })}`)
            } else if(json.type == "ddb-get") {
                let db = new DynamicPropertyDatabase(json.table);
                let result = db.get(json.key, json.default ? json.default : "");
                response(`TEXT ${JSON.stringify({
                    responseID: json.id,
                    data: result,
                    type: "AzaleaResponseTorchflowerCommand"
                })}`)
            } else if(json.type == "ddb-delete") {
                let db = new DynamicPropertyDatabase(json.table);
                db.delete(json.key);
                response(`TEXT ${JSON.stringify({
                    responseID: json.id,
                    type: "AzaleaResponseTorchflowerCommand"
                })}`)
            }
        })
        .register();
}
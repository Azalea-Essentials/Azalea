export default function() {
    // new CommandBuilder("playerdata")
    // .category
    //     .callback(({msg, args, response})=>{
    //         let db = getPlayerDb(msg.sender);
    //         if(!args.length) {
    //             response(`TEXT ${JSON.stringify(db.getTable(), null, 2)}`);
    //             cacheId(msg.sender);
    //         } else {
    //             if(args[0] == "set") {
    //                 db.set(args[1], args[2]);
    //             } else if(args[0] == "get-other") {
    //                 let otherDbName = getCachedId(args[1]);
    //                 if(otherDbName) {
    //                     let otherDb = new Database(otherDbName);
    //                     response(`TEXT ${JSON.stringify(otherDb.getTable(), null, 2)}`)
    //                 }
    //             }
    //         }
    //     })
    //     .register()
}
import { CommandBuilder } from "../../commandBuilder";
import { Database } from "../../db";

export default function() {
    let cratesDb = new Database("Crates");
    new CommandBuilder("crates")
        .requiresAdmin(true)
        .desc("Crates")
        .category("{ WIP } Utilities")
        .callback(({msg, args, theme, response})=>{
            if(args.length) {
                if(args[0] == "add") {
                    if(args.length < 2) {
                        return response("ERROR Please include a name!");
                    } else {
                        let crates = cratesDb.get("Crates", []);
                        crates.push({
                            name: args.slice(1).join(' '),
                            items: []
                        })
                        cratesDb.set("Crates", crates);
                    }
                }
            } else {    
                let crates = cratesDb.get("Crates", []);
                let text = [];
                text.push(`${theme.category}+--- ${theme.command}Crates ${theme.category}---+`)
                if(!crates.length) text.push(`${theme.errorColor}No crates found, create one using §o!crates add`)
                if(crates.length) {
                    for(const crate of crates) {
                        text.push(`${theme.category}> ${theme.command}${crate.name}`)
                    }
                }
                return response(`TEXT ${text.join('\n')}`)
            }
        })
        // .register();
}
import { CommandBuilder } from "../../commandBuilder";
import LZString from "../../lz-string";

export default function() {
    new CommandBuilder("base64-encode")
        .category("Misc")
        .desc("Encodes text to base64")
        .callback(({args,response})=>{
            if(!args.length) return response("ERROR Please include text.")
            return response(`TEXT ${LZString.compressToBase64(args.join(' '))}`)
        })
        .register();
}
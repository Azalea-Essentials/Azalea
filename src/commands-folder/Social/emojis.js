import { CommandBuilder } from "../../commandBuilder";
import emojis from "../../emojis";

export default function() {
    new CommandBuilder("emojis")
        .desc("Lists emojis that can be used in chat and some other places")
        .category("Social")
        .callback(({response})=>{
            let text = [];
            for(const emoji in emojis) {
                text.push(`:${emoji}: §7- ${emojis[emoji]}`);
            }
            response(`TEXT ${text.join('\n§r')}`)
        })
        .register();
}
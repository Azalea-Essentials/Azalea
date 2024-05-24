import { worldTags } from '../../apis/WorldTags';
import { CommandBuilder } from '../../commandBuilder';

export default function() {
    new CommandBuilder("floating-text")
        .desc("Float")
        .category("Floating Text")
        .requiresAdmin(true)
        .callback(({msg,args,response})=>{
            let rabbit = msg.sender.dimension.spawnEntity("azalea:floating_text", msg.sender.location);
            rabbit.nameTag = args.join(' ').replaceAll('\\n','\n')
            worldTags.addTag(`floating_text:${rabbit.id}`);
            response("SUCCESS Summoned!")
        })
        .register();
}
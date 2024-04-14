import { world } from "@minecraft/server";
import { CommandBuilder } from "../../commandBuilder";
import { isAdmin } from "../../isAdmin";
export default function() {
    let currentVote = {};
    new CommandBuilder("vote")
        .aliases(["v","votes"])
        .callback(({msg,args,theme,response})=>{
            if(args.length) {
                if(args[0] == "start") {
                    if(!isAdmin(msg.sender)) return response(`ERROR You need admin to use this command.`);
                    if(args.length <= 1) return response("ERROR Please include some text. Example: {{ALT}}!vote start Should we set the time to day?{{RESET}}.");
                    if(currentVote && currentVote.started) return response("ERROR There is already a vote going on. To stop it, do {{ALT}}!vote stop{{RESET}}.")
                    currentVote.title = args.slice(1).join(' ');
                    currentVote.started = true;
                    currentVote.votes = {};
                    world.sendMessage(`§bAdmins have started a vote!\n§r§fQuestion: §7${currentVote.title}\n§rDo §a!vote yes §rto vote yes, or do §c!vote no§r to vote no.`)
                    response("SUCCESS Started vote!")
                } else if(args[0] == "stop") {
                    if(!isAdmin(msg.sender)) return response(`ERROR You need admin to use this command.`);
                    if(!currentVote.started) return response("ERROR There is no vote to stop.")
                    currentVote = {};
                    world.sendMessage(`§cThe vote has stopped.`)
                    response("SUCCESS Stopped vote!")
                } else if(args[0] == "yes") {
                    if(!currentVote.started) return response("ERROR There is nothing to vote on.")
                    currentVote.votes[msg.sender.name] = true;
                    for(const player of world.getPlayers()) {
                        if(!isAdmin(player)) continue;
                        player.sendMessage(`§e@${msg.sender.name} §avoted yes!`)
                    }
                    response("SUCCESS Voted!");

                } else if(args[0] == "no") {
                    if(!currentVote.started) return response("ERROR There is nothing to vote on.")
                    currentVote.votes[msg.sender.name] = true;
                    for(const player of world.getPlayers()) {
                        if(!isAdmin(player)) continue;
                        player.sendMessage(`§e@${msg.sender.name} §cvoted no!`)
                    }
                    response("SUCCESS Voted!");
                }
            } else {
                let text = [];
                text.push(`To start a vote, do §a§o!vote start <question>§r`)
                text.push(`To stop a vote, do §a§o!vote stop§r`)
                text.push(`To vote yes, do §a§o!vote yes§r`)
                text.push(`To vote no, do §a§o!vote no§r`)
                text.push(`Voting only works with yes/no questions currently.`)
                response(`TEXT ${text.join('\n§r')}`)
            }
        })
        .register()
}
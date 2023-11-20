import { world } from '@minecraft/server';
import { CommandBuilder } from '../commandBuilder';
import { isAdmin } from '../isAdmin';
import { warps } from '../warpsapi';
export default function WarpCommand(commands) {
  // commands.addCommand("warp", {
  //     description: "Create locations players can teleport to anytime",
  //     category: "Teleportation",
  //     async onRun(msg, args, theme, response) {
  //         let setArgs = ["-s", "s", "set", "add", "-a", "a", "create", "-c", "c"];
  //         let removeArgs = ["-d", "d", "delete", "remove", "-r", "r"];
  //         let tpArgs = ["warp", "tp", "teleport", "tele", "goto", "-t", "-w"];
  //         let listArgs = ["-l", "list", "print", "-p", "view", "-v"]
  //         let dimensions = [
  //             "minecraft:overworld",
  //             "minecraft:nether",
  //             "minecraft:the_end"
  //         ]
  //         if(setArgs.includes(args[0])) {
  //             if(!isAdmin(msg.sender)) return response(`ERROR Missing admin!`);
  //             let location = msg.sender.location;
  //             let dimension = dimensions.findIndex(_=>_==msg.sender.dimension.id);
  //             let warpName = args.slice(1).join(' ');
  //             system.run(()=>{
  //                 let objectiveName = `WARP_${warpName}`;
  //                 try {
  //                     world.scoreboard.addObjective(objectiveName, `§dWARP ${warpName}`);
  //                 } catch {}
  //                 let dim = world.getDimension("overworld");
  //                 dim.runCommand(`scoreboard players set "x" "${objectiveName}" ${Math.trunc(location.x)}`);
  //                 dim.runCommand(`scoreboard players set "y" "${objectiveName}" ${Math.trunc(location.y)}`);
  //                 dim.runCommand(`scoreboard players set "z" "${objectiveName}" ${Math.trunc(location.z)}`);
  //                 dim.runCommand(`scoreboard players set "dimension" "${objectiveName}" ${dimension}`);
  //             })
  //             response(`SUCCESS Warp added!`);
  //         } else if(removeArgs.includes(args[0])) {
  //             if(!isAdmin(msg.sender)) return response(`ERROR Missing admin!`);
  //             let warpName = args.slice(1).join(' ');
  //             let objectiveName = `WARP_${warpName}`;
  //             let objective = world.scoreboard.getObjective(objectiveName);
  //             if(!objective) return response(`ERROR Warp not found!`);
  //             system.run(()=>{
  //                 world.scoreboard.removeObjective(objectiveName);
  //             })
  //             return response(`SUCCESS Warp deleted!`);
  //         } else if(tpArgs.includes(args[0])) {
  //             let warpName = args.slice(1).join(' ');
  //             let objectiveName = `WARP_${warpName}`;
  //             let objective = world.scoreboard.getObjective(objectiveName);
  //             if(!objective) return response(`ERROR Warp not found!`);
  //             let participants = objective.getParticipants();
  //             let x = participants.find(_=>_.displayName=="x");
  //             let y = participants.find(_=>_.displayName=="y");
  //             let z = participants.find(_=>_.displayName=="z");
  //             let dimension = participants.find(_=>_.displayName=="dimension");
  //             let player = msg.sender;
  //             system.run(()=>{
  //                 player.teleport({
  //                     x: objective.getScore(x),
  //                     y: objective.getScore(y),
  //                     z: objective.getScore(z)
  //                 }, {
  //                     dimension: world.getDimension(dimensions[objective.getScore(dimension)])
  //                 })
  //             })
  //             response(`SUCCESS Teleporting you to warp: ${warpName}`)
  //             // ;
  //         } else if(listArgs.includes(args[0])) {
  //             let objectives = world.scoreboard.getObjectives().filter(_=>_.id.startsWith("WARP_")).map(_=>_.id.substring('WARP_'.length));
  //             let textlines = [
  //                 `${theme.category}<-=- ${theme.command}Warps ${theme.category}-=->`
  //             ]
  //             for(const warp of objectives) {
  //                 textlines.push(theme.description+warp);
  //             }
  //             if(!objectives.length) textlines.push(theme.errorColor+"No warps here...");
  //             return response(`TEXT ${textlines.join('\n§r')}`);
  //         } else {
  //             let warpName = args.join(' ');
  //             let objectiveName = `WARP_${warpName}`;
  //             let objective = world.scoreboard.getObjective(objectiveName);
  //             if(!objective) return response(`ERROR Warp not found!`);
  //             let participants = objective.getParticipants();
  //             let x = participants.find(_=>_.displayName=="x");
  //             let y = participants.find(_=>_.displayName=="y");
  //             let z = participants.find(_=>_.displayName=="z");
  //             let dimension = participants.find(_=>_.displayName=="dimension");
  //             let player = msg.sender;
  //             system.run(()=>{
  //                 player.teleport({
  //                     x: objective.getScore(x),
  //                     y: objective.getScore(y),
  //                     z: objective.getScore(z)
  //                 }, {
  //                     dimension: world.getDimension(dimensions[objective.getScore(dimension)])
  //                 })
  //             })
  //             response(`SUCCESS Teleporting you to warp: ${warpName}`)
  //         }
  //     }
  // })
  new CommandBuilder("warp").desc("Create locations players can teleport to").category("Teleportation").callback(({
    msg,
    args,
    theme,
    response
  }) => {
    if (args.length) {
      if (args[0] == "set") {
        if (!isAdmin(msg.sender)) return response(`ERROR This command requires admin!`);
        warps.setDB(args.slice(1).join(' '), msg.sender.location, msg.sender.dimension);
        return response(`SUCCESS Set warp!`);
      } else if (args[0] == "set-r") {
        if (!isAdmin(msg.sender)) return response(`ERROR This command requires admin!`);
        warps.setDBRotation(args.slice(1).join(' '), msg.sender.location, msg.sender.dimension, msg.sender.getRotation());
        return response(`SUCCESS Set warp with rotation!`);
      } else if (args[0] == "list") {
        let text = [];
        text.push(`${theme.category}+--- ${theme.header}Warps ${theme.category}---+`);
        for (const warp of warps.getAllWarps()) {
          text.push(`${theme.category}> §r${theme.command}${warp}`);
        }
        return response(`TEXT ${text.join('\n§r')}`);
      } else if (args[0] == "tp") {
        if (warps.hasDB(args.slice(1).join(' '))) {
          warps.tpDB(msg.sender, args.slice(1).join(' '));
          // msg.sender.playSound("portal.travel");
          return response(`SUCCESS Teleporting...`);
        } else {
          return response(`ERROR Warp not found!`);
        }
      } else if(args[0] == "remove") {
        if(!isAdmin(msg.sender)) return response(`ERROR You are not admin`)
        if (warps.hasDB(args.slice(1).join(' '))) {
          warps.warpsDb.hardDelete(args.slice(1).join(' '));
          return response(`SUCCESS Deleted!`);
        } else {
          return response(`ERROR Warp not found!`);
        }
      } else {
        if(warps.hasDB(args.join(' '))) {
          warps.tpDB(msg.sender, args.join(' '));
          return response(`SUCCESS Teleporting...`);
        } else {
          return response(`ERROR Warp not found: Invalid argument, the valid ones are: set-r, set, list, tp, remove`);
        }
      }
    } else {
      // if (warps.hasDB(args.join(' '))) {
      //   warps.tpDB(msg.sender, args.join(' '));
      //   // msg.sender.playSound("portal.travel");
      //   return response(`SUCCESS Teleporting...`);
      // } else {
      //   return response(`ERROR Warp not found!`);
      //   return response(`ERROR Warp not found!`);
      if(warps.hasDB(args.join(' '))) {
        warps.tpDB(msg.sender, args.join(' '));
        return response(`SUCCESS Teleporting...`);
      } else {
        let text = [];
        text.push(`${theme.category}+--- ${theme.header}Warps ${theme.category}---+`);
        for (const warp of warps.getAllWarps()) {
          text.push(`${theme.category}> §r${theme.command}${warp}`);
        }
        return response(`TEXT ${text.join('\n§r')}`);
      }



      // }
    }
  }).register();
  new CommandBuilder("wconvert").category("Data Conversion").desc("Convert old azalea warps to the new ones").callback(({
    msg,
    args,
    theme,
    response
  }) => {
    let dimensions = ["minecraft:overworld", "minecraft:nether", "minecraft:the_end"];
    warps.getAllOldWarps().forEach(warpName => {
      let warp = warps.get(warpName);
      warps.setDB(warpName, {
        x: warp.x,
        y: warp.y,
        z: warp.z
      }, world.getDimension(dimensions[warp.dimension]));
      response(`SUCCESS Converted warp: ${warpName}§r §7to the new format`);
    });
  }).register();
}
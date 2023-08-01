import { system, world } from '@minecraft/server';
import { isAdmin } from '../isAdmin';
export default function WarpCommand(commands) {
  commands.addCommand("warp", {
    description: "Create locations players can teleport to anytime",
    category: "Warps",
    async onRun(msg, args, theme, response) {
      let setArgs = ["-s", "s", "set", "add", "-a", "a", "create", "-c", "c"];
      let removeArgs = ["-d", "d", "delete", "remove", "-r", "r"];
      let tpArgs = ["warp", "tp", "teleport", "tele", "goto", "-t", "-w"];
      let listArgs = ["-l", "list", "print", "-p", "view", "-v"];
      let dimensions = ["minecraft:overworld", "minecraft:nether", "minecraft:the_end"];
      if (setArgs.includes(args[0])) {
        if (!isAdmin(msg.sender)) return response(`ERROR Missing admin!`);
        let location = msg.sender.location;
        let dimension = dimensions.findIndex(_ => _ == msg.sender.dimension.id);
        let warpName = args.slice(1).join(' ');
        system.run(() => {
          let objectiveName = `WARP_${warpName}`;
          try {
            world.scoreboard.addObjective(objectiveName, `§dWARP ${warpName}`);
          } catch {}
          let dim = world.getDimension("overworld");
          dim.runCommand(`scoreboard players set "x" "${objectiveName}" ${Math.trunc(location.x)}`);
          dim.runCommand(`scoreboard players set "y" "${objectiveName}" ${Math.trunc(location.y)}`);
          dim.runCommand(`scoreboard players set "z" "${objectiveName}" ${Math.trunc(location.z)}`);
          dim.runCommand(`scoreboard players set "dimension" "${objectiveName}" ${dimension}`);
        });
        response(`SUCCESS Warp added!`);
      } else if (removeArgs.includes(args[0])) {
        if (!isAdmin(msg.sender)) return response(`ERROR Missing admin!`);
        let warpName = args.slice(1).join(' ');
        let objectiveName = `WARP_${warpName}`;
        let objective = world.scoreboard.getObjective(objectiveName);
        if (!objective) return response(`ERROR Warp not found!`);
        system.run(() => {
          world.scoreboard.removeObjective(objectiveName);
        });
        return response(`SUCCESS Warp deleted!`);
      } else if (tpArgs.includes(args[0])) {
        let warpName = args.slice(1).join(' ');
        let objectiveName = `WARP_${warpName}`;
        let objective = world.scoreboard.getObjective(objectiveName);
        if (!objective) return response(`ERROR Warp not found!`);
        let participants = objective.getParticipants();
        let x = participants.find(_ => _.displayName == "x");
        let y = participants.find(_ => _.displayName == "y");
        let z = participants.find(_ => _.displayName == "z");
        let dimension = participants.find(_ => _.displayName == "dimension");
        let player = msg.sender;
        system.run(() => {
          player.teleport({
            x: objective.getScore(x),
            y: objective.getScore(y),
            z: objective.getScore(z)
          }, {
            dimension: world.getDimension(dimensions[objective.getScore(dimension)])
          });
        });
        response(`SUCCESS Teleporting you to warp: ${warpName}`);
        // ;
      } else if (listArgs.includes(args[0])) {
        let objectives = world.scoreboard.getObjectives().filter(_ => _.id.startsWith("WARP_")).map(_ => _.id.substring('WARP_'.length));
        let textlines = [`${theme.category}<-=- ${theme.command}Warps ${theme.category}-=->`];
        for (const warp of objectives) {
          textlines.push(theme.description + warp);
        }
        if (!objectives.length) textlines.push(theme.errorColor + "No warps here...");
        return response(`TEXT ${textlines.join('\n§r')}`);
      } else {
        let warpName = args.join(' ');
        let objectiveName = `WARP_${warpName}`;
        let objective = world.scoreboard.getObjective(objectiveName);
        if (!objective) return response(`ERROR Warp not found!`);
        let participants = objective.getParticipants();
        let x = participants.find(_ => _.displayName == "x");
        let y = participants.find(_ => _.displayName == "y");
        let z = participants.find(_ => _.displayName == "z");
        let dimension = participants.find(_ => _.displayName == "dimension");
        let player = msg.sender;
        system.run(() => {
          player.teleport({
            x: objective.getScore(x),
            y: objective.getScore(y),
            z: objective.getScore(z)
          }, {
            dimension: world.getDimension(dimensions[objective.getScore(dimension)])
          });
        });
        response(`SUCCESS Teleporting you to warp: ${warpName}`);
      }
    }
  });
}
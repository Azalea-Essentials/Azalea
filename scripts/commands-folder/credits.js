import { system } from "@minecraft/server";
export default function addCreditsCommand(commands) {
  commands.addCommand("credits", {
    description: "Who helped make azelea",
    category: "Help Center",
    onRun(msg, args, theme, response, commands, prefix) {
      let text = [`${theme.category}<-=- ${theme.command}Credits ${theme.category}-=->`, `${theme.command}TRASH ${theme.description}Main developer`, `${theme.command}ZSStudios ${theme.description}Miscellaneous developer (Made some commands)`];
      response(`TEXT ${text.join('\n')}`);
    }
  });
  commands.addCommand("tp", {
    description: "Who helped make azelea",
    category: "Help Center",
    onRun(msg, args, theme, response) {
      let x = parseInt(args[0]);
      let y = parseInt(args[1]);
      let z = parseInt(args[2]);
      let player = msg.sender;
      system.run(() => {
        player.teleport({
          x,
          y,
          z
        });
      });
    }
  });
}
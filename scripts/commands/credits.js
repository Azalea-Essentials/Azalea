export default function addCreditsCommand(commands) {
  commands.addCommand("credits", {
    description: "Who helped make azelea",
    category: "Help Center",
    onRun(msg, args, theme, response, commands, prefix) {
      let text = [`${theme.category}<-=- ${theme.command}Credits ${theme.category}-=->`, `${theme.command}TRASH ${theme.description}Main developer`, `${theme.command}ZSStudios ${theme.description}Miscellaneous developer (Made some commands)`];
      response(`TEXT ${text.join('\n')}`);
    }
  });
  for (let i = 0; i < 100; i++) {
    commands.addCommand(i.toString(), {
      description: i.toString(),
      category: "Spam",
      onRun() {}
    });
  }
}
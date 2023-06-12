export default function addHelpCommand(commands) {
  commands.addCommand("help", {
    description: "Get some help",
    category: "Help Center",
    usage: "!help <command name | page>",
    onRun(msg, args, theme, response, commands, prefix) {
      if (args.length && !/^\d+$/.test(args[0])) {
        let cmd2 = commands.find(_ => _.name == args[0]);
        if (!cmd2) return response(`ERROR Command not found!`);
        let text = [];
        text.push(`${theme.category}<-=- ${theme.command}Command Help: ${cmd2.name} ${theme.category}-=->`);
        text.push(``);
        text.push(`${theme.command}Command Name ${theme.description}${cmd2.name}`);
        text.push(`${theme.command}Command Category ${theme.description}${cmd2.category}`);
        text.push(`${theme.command}Command Usage ${theme.description}${cmd2.usage}`);
        text.push(`${theme.command}Command Author ${theme.description}${cmd2.author ? cmd2.author : "TRASH"}`);
        return response(`TEXT ${text.join('\n')}`);
      }
      let text = [];
      var arrays = [],
        size = 10;
      for (let i = 0; i < commands.length; i += size) arrays.push(commands.slice(i, i + size));
      let p = (args.length ? /^\d+$/.test(args[0]) ? parseInt(args[0]) : 1 : 1) - 1;
      if (p < 0) return response(`ERROR Minimum page is 1`);
      if (p >= arrays.length) return response(`ERROR Maximum page is ${arrays.length}`);
      let categorizedCommands = arrays[p].reduce((acc, obj) => {
        const key = obj.category;
        acc[key] = acc[key] || [];
        acc[key].push(obj);
        return acc;
      }, {});
      for (const category of Object.keys(categorizedCommands)) {
        text.push(`${theme.category}<-=- ${theme.command}${category} §r${theme.category}-=->`);
        for (const command of categorizedCommands[category]) {
          text.push(`${theme.command}${prefix}${command.name} ${theme.description}${command.description}`);
        }
      }
      text.push(``);
      text.push(`${theme.description}Help page ${theme.command}${p + 1}/${arrays.length}${theme.description}, use ${theme.command}${prefix}help <page> ${theme.description}to select another page`);
      text.push(`${theme.description}Use ${theme.command}!help <command name> ${theme.description}to get help with a specific command`);
      response(`TEXT ${text.join('\n')}`);
    }
  });
}
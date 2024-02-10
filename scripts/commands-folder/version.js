export default function addVersionCommand(commands) {
  commands.addCommand("version", {
    description: "Get the azalea version",
    category: "Help Center",
    onRun(msg, args, theme, response) {
      response(`TEXT ${theme.command}Azalea version ${theme.description}V2.0 RELEASE\n${theme.footer}it would be funny if i forgot to change this`);
    }
  });
}
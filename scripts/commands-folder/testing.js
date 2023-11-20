export default function addVersionCommand(commands) {
  commands.addCommand("testing", {
    description: "Command to test code",
    isDev: true,
    category: "DEVELOPMENT",
    onRun(msg, args, theme, response) {
      response(`TEXT Text response`);
      response(`RESPONSE1 Miscellaneous response`);
      response(`INFO Info response`);
      response(`WARN Warn response`);
      response(`ERROR Error response`);
      response(`SUCCESS Success response`);
      // db.tableInfo = {
      //     "v": 1
      // }
      // let vals = db.search((val)=> typeof val === "string" && val.startsWith("t"));
      // response(`TEXT ${JSON.stringify(vals, null, 2)}`);
    }
  });
}
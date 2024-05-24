export default function addPermissionCommands(commands) {
    commands.addCommand("perm", {
        aliases: ["permission", "p"],
        description: "Permission system (Work In Progress)",
        category: "Permissions",
        wip: true,
        admin: true,
        azaleaVersion: "2.1",
        async onRun() {
            
        }
    })
}
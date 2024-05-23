// import { DynamicPropertyDatabase } from "../dynamicPropertyDb";
// import * as mc from '@minecraft/server';

// // Initialize the DynamicPropertyDatabase for signs
// const signsDb = new DynamicPropertyDatabase("Signs");

// // Event handler for when a player breaks a block
// world.beforeEvents.playerBreakBlock.subscribe(e => {
//     const signKey = `${e.block.location.x},${e.block.location.y},${e.block.location.z}`;
//     if (signsDb.get(signKey)) {
//         signsDb.delete(signKey);
//     }
// });

// // Event handler for when a player interacts with a block
// world.beforeEvents.playerInteractWithBlock.subscribe(e => {
//     const signComponent = e.block.getComponent('minecraft:sign');
//     if (isAdmin(e.player) && typeof signComponent === "object") {
//         const text = signComponent.getText();
//         if (text.startsWith('run_command ')) {
//             const command = text.substring('run_command '.length);
//             // Add the command to the database
//             signsDb.set(`${e.block.location.x},${e.block.location.y},${e.block.location.z}`, command);
//             system.run(() => {
//                 // Set the sign text and dye color
//                 signComponent.setText("Please edit the text on the sign. And make sure to wax it too!");
//                 signComponent.setTextDyeColor(mc.DyeColor.Lime);
//             });
//         }
//     }
//     if (signsDb.get(`${e.block.location.x},${e.block.location.y},${e.block.location.z}`) &&
//         typeof component === "object" && !e.player.isSneaking) {
//         e.cancel = true;
//         system.run(() => {
//             e.player.runCommand(signsDb.get(`${e.block.location.x},${e.block.location.y},${e.block.location.z}`));
//         });
//     }
// });

// This is compatible with Betther Command Detection (https://mcpedl.com/betther-command-detection/)
// That does not mean this code is stolen, it just uses the same tags
// This is so you dont have to change your commands

import { system, world } from "@minecraft/server";

const objectives = [
    "world",
    "health",
    "level",
    "xpEarnedCurrentLevel",
    "totalXpNeededToNextLevel",
    "xpNeededToNextLevel",
    "x",
    "y",
    "z",
    "disable_message",
    "itemDamage",
    "itemMaxDurability",
    "itemCurrentDurability",
    "selectedSlot"
];

world.afterEvents.worldInitialize.subscribe(() => {
    for (const objective of objectives) {
        try {
            world.scoreboard.addObjective(objective, objective)
        } catch {}
    }
});

function removeTagsStartingWithPrefix(player, prefix) {
    for(const tag of player.getTags()) {
        if(tag.startsWith(prefix)) player.removeTag(prefix);
    }
}

function getScore(player, objective) {
    try {
        return world.scoreboard.getObjective(objective)?.getScore(player) ?? 0;
    } catch (error) {
        return 0;
    }
}
export class CommandDetection {
    constructor() {
        this.intervalID = system.runInterval(()=>{
            for(const player of world.getPlayers()) {
                removeTagsStartingWithPrefix(player, "dimension:");
                player.addTag(`dimension:${player.dimension.id.replace('minecraft:', '')}`);
                removeTagsStartingWithPrefix(player, "blockFromViewDirection:");
                let blockFromViewDirection = player.getBlockFromViewDirection({ maxDistance: 20 });
                if (blockFromViewDirection) {
                    player.addTag(`blockFromViewDirection:${blockFromViewDirection.block.typeId.replace('minecraft:', '')}`);
                } else {
                    player.addTag(`blockFromViewDirection:air`);
                }
            }
        }, 5);
    }
    disable() {
        system.clearRun(this.intervalID);
    }
}

// function getBlockFromViewDirection(player, blockView) {
//     const viewTags = player.getTags().filter(tag => tag.startsWith('blockFromViewDirection:'));
//     for (const tag of viewTags) {
//         if (tag.split(':')[1] !== blockView) {
//             player.removeTag(tag);
//         }
//     }
//     player.addTag('blockFromViewDirection:' + blockView);
// }
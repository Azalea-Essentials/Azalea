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
        if(tag.startsWith(prefix)) player.removeTag(tag);
    }
}

function getScore(player, objective) {
    try {
        return world.scoreboard.getObjective(objective)?.getScore(player) ?? 0;
    } catch (error) {
        return 0;
    }
}
export default {
    namespace: "CommandDetection",
    icon: "https://azalea.trashdev.org/img/textures/amethyst_icons/Packs/asteroid_icons/slash.png",
    description: "Detect things with commands. Tags are the same as [Betther Command Detection by JackWorlds](https://mcpedl.com/betther-command-detection/) so if you used that addon previously, you wont need to change any commands.",
    main: class {
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
            this.itemUse = (event)=>{
                event.source.addTag(`itemUse`);
                event.source.addTag(`itemUse:${event.itemStack.typeId.replace('minecraft:', '')}`);
                if(event.itemStack.nameTag) event.source.addTag(`itemUseNameTag:${event.itemStack.nameTag}`);
                system.runTimeout(()=>{
                    removeTagsStartingWithPrefix(event.source, `itemUse`);
                }, 1);
            }
            this.entityHitEntity = (event)=>{
                event.damagingEntity.addTag('damagingEntity');
                event.hitEntity.addTag('hitEntity');
                system.runTimeout(()=>{
                    event.damagingEntity.removeTag('damagingEntity');
                    event.hitEntity.removeTag('hitEntity');
                },1)
            }
            world.afterEvents.entityHitEntity.subscribe(this.entityHitEntity);
            world.afterEvents.itemUse.subscribe(this.itemUse);
        }
        disable() {
            system.clearRun(this.intervalID);
            world.afterEvents.itemUse.unsubscribe(this.itemUse);
            world.afterEvents.entityHitEntity.unsubscribe(this.entityHitEntity);
        }
    
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
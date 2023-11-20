import { world } from '@minecraft/server';

import { Database } from './db';

class Warps {
    constructor() {
        this.warpsDb = new Database("Warps");
    }
    set(name, location, dimension = world.getDimension("overworld")) {
        let { x, y, z } = location;
        let dimensions = [
            "minecraft:overworld",
            "minecraft:nether",
            "minecraft:the_end"
        ]
        let dimensionNumber = dimensions.indexOf(dimension.id);

        let objectiveName = `WARP_${name}`;

        try {
            world.scoreboard.addObjective(objectiveName);
        } catch {}

        dimension.runCommand(`scoreboard players set "x" "${objectiveName}" ${Math.floor(x)}`);
        dimension.runCommand(`scoreboard players set "y" "${objectiveName}" ${Math.floor(y)}`);
        dimension.runCommand(`scoreboard players set "z" "${objectiveName}" ${Math.floor(z)}`);
        dimension.runCommand(`scoreboard players set "dimension" "${objectiveName}" ${dimensionNumber}`);
    }
    get(name) {
        let objective = world.scoreboard.getObjective(`WARP_${name}`);

        let result = {}

        for(const participant of objective.getParticipants()) {
            result[participant.displayName] = objective.getScore(participant);
        }

        return result;
    }
    has(name) {
        try {
            let objective = world.scoreboard.getObjective(`WARP_${name}`);
            if(!objective) return false;
            return true;
        } catch {
            return false;
        }
    }
    tp(player, name) {
        let dimensions = [
            "minecraft:overworld",
            "minecraft:nether",
            "minecraft:the_end"
        ]

        if(this.has(name)) {
            let warp = this.get(name);
            player.teleport({
                x: warp.x,
                y: warp.y,
                z: warp.z
            }, {
                dimension: world.getDimension(dimensions[warp.dimension])
            })
        }
    }
    getDB(name) {
        return this.warpsDb.get(name, null);
    }
    setDB(name, location, dimension) {
        return this.warpsDb.set(name, {
            x: location.x,
            y: location.y,
            z: location.z,
            dimension: dimension.id
        })
    }
    setDBRotation(name, location, dimension, rotation) {
        return this.warpsDb.set(name, {
            x: location.x,
            y: location.y,
            z: location.z,
            dimension: dimension.id,
            rotX: rotation.x,
            rotY: rotation.y
        })
    }
    hasDB(name) {
        return this.getDB(name) ? true : false;
    }
    tpDB(player, name) {
        if(this.hasDB(name)) {
            let warp = this.getDB(name);
            if(warp.rotX) return this.tpDBRotation(player, name);
            player.teleport({
                x: warp.x,
                y: warp.y,
                z: warp.z
            }, {
                dimension: world.getDimension(warp.dimension)
            })
        }
    }
    tpDBRotation(player, name) {
        if(this.hasDB(name)) {
            let warp = this.getDB(name);
            player.teleport({
                x: warp.x,
                y: warp.y,
                z: warp.z
            }, {
                dimension: world.getDimension(warp.dimension),
                rotation: {
                    x: warp.rotX,
                    y: warp.rotY
                }
            })
        }
    }
    getAllOldWarps() {
        return world.scoreboard.getObjectives().filter(_=>{
            try {
                return _.id.startsWith("WARP_")

            } catch {return false}
        }).map(_=>_.id.substring(5));
    }
    getAllWarps() {
        return this.warpsDb.gkeys;
    }
}
export const warps = new Warps();
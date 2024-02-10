import { world } from '@minecraft/server';

import { Database } from './db';

class Warps {
    constructor() {
        this.warpsDb = new Database("Warps");
        this.version = 1;
        this.changelog = [
            "Added warp teleport tag",
            "Added warp tag requirements",
            "Added hidden warps",
            "\"spawn\" warp now displays as \"World Spawn\""
        ]
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
    get2(_name) {
        let name = _name == "§aWorld Spawn" ? "spawn" : _name;
        return this.warpsDb.get(name, null);
    }
    set2(_name, _val) {
        let name = _name == "§aWorld Spawn" ? "spawn" : _name;
        this.warpsDb.set(name, _val);
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
    setRequiredTag(name, tag) {
        if(!this.hasDB(name)) return null;
        let warp = this.warpsDb.get(name);
        warp.requiredTag = tag;
        this.warpsDb.set(name, warp);
    }
    setTeleportTag(name, tag) {
        if(!this.hasDB(name)) return null;
        let warp = this.warpsDb.get(name);
        warp.teleportTag = tag;
        this.warpsDb.set(name, warp);
    }
    checkTeleportTags() {
        let warps = this.warpsDb.allData;
        for(const player of world.getPlayers()) {
            for(const warpName of [...Object.keys(warps)]) {
                let warp = warps[warpName];
                if(warp.teleportTag && player.hasTag(warp.teleportTag)) {
                    this.tpDB(player, warpName);
                    player.removeTag(warp.teleportTag);
                }
            }
        }
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
    setHidden(name, state = false) {
        if(!this.hasDB(name)) return;
        let warp = this.warpsDb.get(name);
        warp.hidden = state;
        this.warpsDb.set(name, warp);
    }
    tpDB(player, _name) {
        let name = _name == "§aWorld Spawn" ? "spawn" : _name;
        if(this.hasDB(name)) {
            let warp = this.getDB(name);
            if(warp.rotX) return this.tpDBRotation(player, name);
            if(warp.requiredTag && !player.hasTag(warp.requiredTag)) return 1;
            player.teleport({
                x: warp.x,
                y: warp.y,
                z: warp.z
            }, {
                dimension: world.getDimension(warp.dimension)
            })
            return 0;
        }
    }
    tpDBRotation(player, _name) {
        let name = _name == "§aWorld Spawn" ? "spawn" : _name;
        if(this.hasDB(name)) {
            let warp = this.getDB(name);
            if(warp.requiredTag && !player.hasTag(warp.requiredTag)) return 1;
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
            return 0;
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
        return this.warpsDb.gkeys.map(_=>_=="spawn"?"§aWorld Spawn":_).filter(_=>{
            let warp = this.warpsDb.get(_);
            return warp.hidden ? false : true;
        });
    }
    getAllWarpsOld() {
        return this.warpsDb.gkeys;
    }
}
export const warps = new Warps();
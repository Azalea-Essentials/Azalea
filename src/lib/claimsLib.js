import { system, world } from "@minecraft/server";
import { DynamicPropertyDatabase } from "../dynamicPropertyDb";

// useful function that functions everywhere :3
const betweenXYZ = (XYZa, XYZb, XYZc) =>
    XYZc.length ===
    XYZc.filter(
        (c, i) =>
            c >= Math.min(XYZa[i], XYZb[i]) && c <= Math.max(XYZa[i], XYZb[i])
    ).length;

class Claims {
    constructor() {
        this.claimsDb = new DynamicPropertyDatabase();
        this.playerMap = new Map();
    }
    getClaims() {
        return this.claimsDb.get("Claims", []);
    }
    setClaims(claimsList) {
        this.claimsDb.set("Claims", claimsList);
        this.initializeLoop();
    }
    initializeLoop() {
        // system.runInterval(()=>{
        //     for(const player of world.getPlayers()) {
        //         for(const claim of this.getClaims()) {
        //             if(betweenXYZ(
        //                 [
        //                     claim.x1,
        //                     claim.y1,
        //                     claim.z1
        //                 ],
        //                 [
        //                     claim.x2,
        //                     claim.y2,
        //                     claim.z2
        //                 ],
        //                 [
        //                     player.location.x,
        //                     player.location.y,
        //                     player.location.z
        //                 ]
        //             ));
        //         }
        //     }
        // },599);
    }
    createClaim(owner, x1, y1, z1, x2, y2, z2, ownerType = 0) {
        // Owner type 0 is per player
        // Owner type 1 is per tag
        let claims = this.getClaims();
        for(const claim of claims) {
            if(
                betweenXYZ(
                    [
                        claim.x1,
                        claim.y1,
                        claim.z1
                    ],
                    [
                        claim.x2,
                        claim.y2,
                        claim.z2
                    ],
                    [
                        x1,
                        y1,
                        z1
                    ]
                ) ||
                betweenXYZ(
                    [
                        claim.x1,
                        claim.y1,
                        claim.z1
                    ],
                    [
                        claim.x2,
                        claim.y2,
                        claim.z2
                    ],
                    [
                        x2,
                        y2,
                        z2
                    ]
                )
            ) return [true, 0];
        }
        claims.push({
            id: Date.now(),
            owner,
            x1,
            y1,
            z1,
            x2,
            y2,
            z2,
            ownerType
        })
        this.setClaims(claims);
        return [false, null];
    }
    deleteClaim(id) {
        let claims = this.getClaims();
        claims = claims.filter(_=>_.id == id);
        this.setClaims(claims);
    }
}
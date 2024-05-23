// the old isAdmin() will be missed :(
import { prismarineDb } from "./lib/@trash/PrismarineDB/prismarine-db";

let permissionDb = prismarineDb.table("Permissions");

// checks if the player can do shit
export function isAdmin(player, permission = "_LEGACY") {
    if(permission == "_LEGACY") return player.isOp() || player.hasTag("admin");

    let documents = permissionDb.findDocuments({
        type: "role"
    });

    for(const doc of documents) {
        if((player.hasTag(doc.data.tag) || doc.data.tag == "default") || (doc.data.tag == "admin" && player.isOp())) {
            if(doc.data.isAdmin) return true;
            if(doc.data.perms.includes(permission)) return true;
        }
    }

    return false;
}

class PermissionList {
    #permList;

    constructor() {
        this.#permList = [];
        this.#initialLoad()
    }

    #initialLoad() {
        function createAdminRole() {
            let role = permissionDb.findFirst({
                tag: "admin",
                type: "role"
            })
            if(!role) {
                permissionDb.insertDocument({
                    tag: "admin",
                    type: "role",
                    version: "2.2:0",
                    isAdmin: true,
                    perms: []
                })
            }
        }
        function createDefaultRole() {
            let role = permissionDb.findFirst({
                tag: "default",
                type: "role"
            })
            if(!role) {
                permissionDb.insertDocument({
                    tag: "default",
                    type: "role",
                    isAdmin: false,
                    isDefault: true,
                    version: "2.2:0",
                    perms: []
                })
            }
        }
        createDefaultRole();
        createAdminRole();
    }

    addPermission(displayName, id) {
        this.#permList.push({displayName, id});
    }
    
    getList() {
        return this.#permList;
    }
}

export const permList = new PermissionList();

export { permissionDb };
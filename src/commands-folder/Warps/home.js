import { system, world } from "@minecraft/server";
import { playerStorage } from "../../apis/PlayerStorage";
import { CommandBuilder } from "../../commandBuilder";
import { Database } from "../../db";
import { DynamicPropertyDatabase } from "../../dynamicPropertyDb";
import { uiManager } from "../../uis";
import { ActionForm, ModalForm } from "../../form_func";
import { prismarineDb } from "../../lib/@trash/PrismarineDB/prismarine-db";
function betterArgs(myString) {
    var myRegexp = /[^\s"]+|"([^"]*)"/gi;
    var myArray = [];
    
    do {
        //Each call to exec returns the next regex match as an array
        var match = myRegexp.exec(myString);
        if (match != null)
        {
            //Index 1 in the array is the captured group if it exists
            //Index 0 is the matched text, which we use if no captured group exists
            myArray.push(match[1] ? match[1] : match[0]);
        }
    } while (match != null);

    return myArray;
}
const homeLimitReached = -1;
const notFound = -2;
const success = 0;
class HomeManager {
    constructor() {
        this.homesDb = prismarineDb.table("homes");
    }
    addHome(player, name) {
        let playerID = playerStorage.getID(player);
        let home = this.homesDb.findFirst({ name, owner: playerID });
        if(home) return;
        this.homesDb.insertDocument({
            name,
            owner: playerID,
            sharedTo: [],
            loc: {
                x: player.location.x,
                y: player.location.y,
                z: player.location.z,
                dimension: player.dimension.id
            }
        })
    }
    getHomes(player) {
        let playerID = playerStorage.getID(player);
        let myHomes = this.homesDb.findDocuments({
            owner: playerID
        })
        let sharedHomes = this.homesDb.findDocuments({
            sharedTo: playerID
        });
        return {
            myHomes,
            sharedHomes
        }
    }
    tpToHome(player, id) {
        let home = this.homesDb.getByID(id);
        if(!home) return;
        player.teleport({
            x: home.data.loc.x,
            y: home.data.loc.y,
            z: home.data.loc.z
        }, {dimension: world.getDimension(home.data.loc.dimension)});
    }
    deleteHome(player, id) {
        let playerID = playerStorage.getID(player);
        let home = this.homesDb.getByID(id);
        if(!home) return;
        if(home.data.owner != playerID) return;
        this.homesDb.deleteDocumentByID(id);
    }
    shareHome(player, id, otherPlayer) {
        let playerID = playerStorage.getID(player);
        let home = this.homesDb.getByID(id);
        if(!home) return;
        if(home.data.owner != playerID) return;
        let otherPlayerID = playerStorage.getID(otherPlayer);
        if(home.data.sharedTo.includes(otherPlayerID)) return;
        home.data.sharedTo.push(otherPlayerID);
        this.homesDb.overwriteDataByID(id, home.data)
    }
    unshareHome(player, id, otherPlayerID) {
        let playerID = playerStorage.getID(player);
        let home = this.homesDb.getByID(id);
        if(!home) return;
        if(home.data.owner != playerID) return;
        if(!home.data.sharedTo.includes(otherPlayerID)) return;
        home.data.sharedTo = home.data.sharedTo.filter(_=>_ != otherPlayerID);
        this.homesDb.overwriteDataByID(id, home.data);
    }
}
let homes = new  HomeManager();
export default function() {
    uiManager.addUI("Azalea2.2/TPUI/Homes/Root", (player)=>{
        let actionForm = new ActionForm();
        actionForm.title("§f§u§l§l§s§c§r§e§e§nHomes");
        actionForm.button(`§bAdd Home\n§7Adds a home`, `textures/azalea_icons/Homes/AddHome`, (player)=>{
            let modal = new ModalForm();
            modal.title("Setup home");
            modal.textField("Name", "Type a name for your home", undefined, (player)=>{
            })
            modal.show(player, false, (player, response)=>{
                if(response.canceled) return uiManager.open("Azalea2.2/TPUI/Homes/Root", player);
                if(!response.formValues[0]) return uiManager.open("Azalea2.2/TPUI/Homes/Root", player);
                homes.addHome(player, response.formValues[0])
                return uiManager.open("Azalea2.2/TPUI/Homes/Root", player);
            })
        })
        let { myHomes, sharedHomes } = homes.getHomes(player);
        for(const home of myHomes) {
            actionForm.button(`§a${home.data.name}\n§r§7Owned by you`, `textures/azalea_icons/Homes/Home`, (player)=>{
                let form = new ActionForm();
                form.title("§f§u§l§l§s§c§r§e§e§n"+home.data.name);
                form.button(`§dBack\n§r§7Exit this UI`, `textures/azalea_icons/2`, (player)=>{
                    return uiManager.open("Azalea2.2/TPUI/Homes/Root", player);
                });
                form.button(`§cTeleport\n§r§7Teleport to home`, `textures/azalea_icons/Homes/Teleport`, (player)=>{
                    homes.tpToHome(player, home.id);
                })
                if(world.getPlayers().length > 1) {
                    form.button(`§aGive Access\n§r§7Give access to a player`, `textures/azalea_icons/Homes/GiveAccess`, (player)=>{
                        let modalForm = new ModalForm();
                        let players = world.getPlayers().filter(_=>_.id != player.id)
                        modalForm.dropdown("Player", players.map(_=>{
                            return {
                                option: _.name,
                                callback(){}
                            }
                        }))
                        modalForm.show(player, false, (player, response)=>{
                            if(response.canceled) return uiManager.open("Azalea2.2/TPUI/Homes/Root", player);
                            homes.shareHome(player, home.id, players[response.formValues[0]])
                            return uiManager.open("Azalea2.2/TPUI/Homes/Root", player)
                        })
                    })
                }
                if(home.data.sharedTo.length) {
                    form.button(`§2Remove Access\n§r§7Revoke access from a player`, `textures/azalea_icons/Homes/RemoveAccess`, (player)=>{
                        let playerForm = new ActionForm();
                        for(const sharedPlayer of home.data.sharedTo) {
                            let otherPlayer = playerStorage.getPlayerByID(sharedPlayer);
                            let form2 = new ActionForm();
                            form2.button(otherPlayer.name, `textures/azalea_icons/8`, (player)=>{
                                homes.unshareHome(player, home.id, sharedPlayer);
                                return uiManager.open("Azalea2.2/TPUI/Homes/Root", player);
                            })
                            form2.show(player, false, (player, response)=>{

                            })
                        }
                    })
                }
                form.button(`§nDelete\n§r§7Delete home`, `textures/azalea_icons/Homes/Teleport`, (player)=>{
                    homes.deleteHome(player, home.id);
                    return uiManager.open("Azalea2.2/TPUI/Homes/Root", player);
                })
                form.show(player, false, (player, response)=>{})
            })
        }
        for(const home of sharedHomes) {
            actionForm.button(`§d${home.data.name}\n§r§7Owned by ${playerStorage.getPlayerByID(home.data.owner).name}`, `textures/azalea_icons/Homes/Home`, (player)=>{
                let form = new ActionForm();
                form.title("§f§u§l§l§s§c§r§e§e§n"+home.data.name);
                form.button(`§dBack\n§r§7Exit this UI`, `textures/azalea_icons/2`, (player)=>{
                    return uiManager.open("Azalea2.2/TPUI/Homes/Root", player);
                });
                form.button(`§cTeleport\n§r§7Teleport to home`, `textures/azalea_icons/Homes/Teleport`, (player)=>{
                    homes.tpToHome(player, home.id);
                })
                form.show(player, false, (player, response)=>{})
            })
        }

        actionForm.show(player, false, ()=>{})
    })
    new CommandBuilder("home")
        .desc("Just get a home")
        .aliases(["h", "homes"])
        .callback(({msg,args,theme,response})=>{
            let steps = 0;
            let loc = {x:msg.sender.location.x,y:msg.sender.location.y,z:msg.sender.location.z}
            let player = msg.sender;
            let interval = system.runInterval(()=>{
                steps++;
                if(steps > 10) {
                    response("ERROR You took too long to close chat and move")
                    system.clearRun(interval);
                    return;
                }
                if(player.location.x != loc.x || player.location.y != loc.y || player.location.z != loc.z) {
                    uiManager.open("Azalea2.2/TPUI/Homes/Root", player);
                    system.clearRun(interval);
                    return;
                }
            },10);
            response("WAIT Close chat and move to open UI");
        })
        .register()
}
// class HomeManager {
//     constructor() {
//         this.homeDB = new DynamicPropertyDatabase("homes");
//         this.cfgDb = new Database("Config");
//     }
//     setHome(player, x, y, z, name) {
//         let playerID = playerStorage.getID(player);
//         let homesData = this.homeDB.get(playerID.toString(), {});
//         let limit = this.cfgDb.get("homeLimit", `NUM:5`);
//         if (!homesData.homes) homesData.homes = [];
//         if (homesData.homes.length >= parseInt(limit.substring(4)) && !homesData.homes.find(_ => _.name == name)) return homeLimitReached;
//         if (homesData.homes.find(_ => _.name == name)) {
//             homesData.homes = homesData.homes.filter(_ => _.name != name);
//         }
//         homesData.homes.push({
//             name,
//             x,
//             y,
//             z
//         })
//         this.homeDB.set(playerID.toString(), homesData);
//         return success;
//     }
//     tpHome(player, name) {
//         let homesData = this.getHomeData(player);
//         if(!homesData.homes.find(_=>_.name == name)) return notFound;
//         let home = homesData.homes.find(_=>_.name == name);
//         player.teleport({
//             x: home.x,
//             y: home.y,
//             z: home.z
//         }, {dimension:world.getDimension("overworld")});
//         return success;
//     }
//     getHomeData(player) {
//         let playerID;
//         if(typeof player == "number") {
//             playerID = player;
//         } else {
//             playerID = playerStorage.getID(player);
//         }
//         let homesData = this.homeDB.get(playerID.toString(), {});
//         if(!homesData.homes) homesData.homes = [];
//         return homesData;
//     }
//     deleteHome(player, name) {
//         let playerID = playerStorage.getID(player);
//         let homesData = this.homeDB.get(playerID.toString(), {});
//         if (!homesData.homes) homesData.homes = [];
//         if (homesData.homes.find(_ => _.name == name)) {
//             homesData.homes = homesData.homes.filter(_ => _.name != name);
//             this.homeDB.set(playerID.toString(), homesData);
//             return success;
//         } else {
//             return notFound;
//         }
//     }
// }
// const homeMgr = new HomeManager();

// export default function () {
//     uiManager.addUI("Azalea2.2/TPUI/Homes/Root", (player)=>{
//         let actionForm = new ActionForm();
//         actionForm.title("§f§u§l§l§r§aHomes");
//         actionForm.button(`§aSet Home\n§7Set a home where you are standing`, `textures/azalea_icons/Homes/AddHome`);
//         let homesData = homeMgr.getHomeData(player);
//         for(const home of homesData.homes) {
//             actionForm.button(`§b${home.name}\n§r§7Owned by you (${Math.floor(home.x)} X, ${Math.floor(home.y)} Y, ${Math.floor(home.z)} Z)`, `textures/azalea_icons/Homes/Home`);
//         }
//         if(homesData.access) {
//             let playerIdMap = {};
//             let accessData = {};
//             for(const access of homesData.access) {
//                 let player = playerStorage.getPlayerByID(parseInt(access.split(':')[0]));
//                 let home = access.split(':').slice(1).join(':');
//                 playerIdMap[player.name] = parseInt(access.split(':')[0]);
//                 if(accessData[player.name]) accessData[player.name].push(home);
//                 else accessData[player.name] = [home]
//             }
//             for(const key of Object.keys(accessData)) {
//                 // text.push(``);
//                 // text.push(`${theme.category}-=-=- §r${theme.header ? theme.header : theme.command}Homes (${key}) §r${theme.category}-=-=-`);
//                 let playerHomeData = homeMgr.homeDB.get(playerIdMap[key]);
//                 if(!playerHomeData.homes) playerHomeData.homes = [];
//                 // let successfulHomes = [];
//                 for(const home of accessData[key]) {
//                     let homeData = playerHomeData.homes.find(_=>_.name == home);
//                     if(!homeData) continue;
//                     actionForm.button(`§e${homeData.name}\n§r§7Owned by §e@${key} §r§7(${Math.floor(homeData.x)} X, ${Math.floor(homeData.y)} Y, ${Math.floor(homeData.z)} Z)`, `textures/azalea_icons/Homes/Home`)
//                     // text.push(`${theme.command}${key.toLowerCase().replace(/ /g,"_")}/${homeData.name} ${theme.description}${Math.floor(homeData.x)} X, ${Math.floor(homeData.y)} Y, ${Math.floor(homeData.z)} Z`);
//                     // successfulHomes.push(home);
//                 }
//                 // if(!successfulHomes.length) text.push(`${theme.errorColor}${key} doesnt have any homes you can view right now...`)
//             }
//         }

//         actionForm.show(player, false, (player, response)=>{})
//     })
//     new CommandBuilder("home")
//         .desc("Just get a home")
//         .aliases(["h"])
//         .callback(({msg,args: wargs,theme,response})=>{
//             let args = betterArgs(wargs.join(' '));
//             if(args[0] == "set") {
//                 let name = args.length > 1 ? args.slice(1).join(' ') : "main";
//                 let {x,y,z} = msg.sender.location;
//                 let result = homeMgr.setHome(msg.sender, x, y, z, name);
//                 if(result == success) response(`SUCCESS Set home!`)
//                 else response(`ERROR Home limit reached.`)
//             } else if(args[0] == "list") {
//                 let homesData = homeMgr.getHomeData(msg.sender);
//                 let text = [`${theme.category}-=-=- §r${theme.header ? theme.header : theme.command}Homes §r${theme.category}-=-=-`];
//                 for(const home of homesData.homes) {
//                     text.push(`${theme.command}${home.name} ${theme.description}${Math.floor(home.x)} X, ${Math.floor(home.y)} Y, ${Math.floor(home.z)} Z`)
//                 }
//                 if(!homesData.homes.length) text.push(`${theme.errorColor}You dont have any homes...`)
//                 let accessData = {};
//                 let playerIdMap = {};
//                 if(homesData.access) {
//                     for(const access of homesData.access) {
//                         let player = playerStorage.getPlayerByID(parseInt(access.split(':')[0]));
//                         let home = access.split(':').slice(1).join(':');
//                         playerIdMap[player.name] = parseInt(access.split(':')[0]);
//                         if(accessData[player.name]) accessData[player.name].push(home);
//                         else accessData[player.name] = [home]
//                     }
//                     for(const key of Object.keys(accessData)) {
//                         text.push(``);
//                         text.push(`${theme.category}-=-=- §r${theme.header ? theme.header : theme.command}Homes (${key}) §r${theme.category}-=-=-`);
//                         let playerHomeData = homeMgr.homeDB.get(playerIdMap[key]);
//                         if(!playerHomeData.homes) playerHomeData.homes = [];
//                         let successfulHomes = [];
//                         for(const home of accessData[key]) {
//                             let homeData = playerHomeData.homes.find(_=>_.name == home);
//                             if(!homeData) continue;
//                             text.push(`${theme.command}${key.toLowerCase().replace(/ /g,"_")}/${homeData.name} ${theme.description}${Math.floor(homeData.x)} X, ${Math.floor(homeData.y)} Y, ${Math.floor(homeData.z)} Z`);
//                             successfulHomes.push(home);
//                         }
//                         if(!successfulHomes.length) text.push(`${theme.errorColor}${key} doesnt have any homes you can view right now...`)
//                     }
//                 }
//                 response(`TEXT ${text.join('\n§r')}`)
//             } else if(args[0] == "remove") {
//                 let name = args.length > 1 ? args.slice(1).join(' ') : "main";
//                 let result = homeMgr.deleteHome(msg.sender, name);
//                 if(result == success) return response("SUCCESS Successfully deleted home!")
//                 else return response(`ERROR Home not found.`)
//             } else if(args[0] == "tp") {
//                 let name = args.length > 1 ? args.slice(1).join(' ') : "main";
//                 let homeData = homeMgr.getHomeData(msg.sender);
//                 if(!homeData.access) homeData.access = [];
//                 if(name.includes('/')) {
//                     let foundHome = false;
//                     let homeDataFound;
//                     for(const access of homeData.access) {
//                         let player = playerStorage.getPlayerByID(parseInt(access.split(':')[0]));
//                         let home = access.split(':').slice(1).join(':');
//                         let otherHomeData = homeMgr.homeDB.get(parseInt(access.split(':')[0]));
//                         if(!otherHomeData.homes) otherHomeData.homes = [];
//                         if(name.split('/')[0] == player.name.toLowerCase().replace(/ /g, "_") && otherHomeData.homes.find(_=>_.name == name.split('/').slice(1).join('/'))) {
//                             foundHome = true;
//                             homeDataFound = otherHomeData.homes.find(_=>_.name == name.split('/').slice(1).join('/'));
//                         }
//                     }
//                     if(!foundHome) return response("ERROR You do not have access to this home.");
//                     msg.sender.teleport({
//                         x: homeDataFound.x,
//                         y: homeDataFound.y,
//                         z: homeDataFound.z,
//                     }, {dimension:world.getDimension("overworld")})
//                     return response("SUCCESS Teleporting...")
//                 } else {
//                     let response2 = homeMgr.tpHome(msg.sender, name);
//                     if(response2 == success) response("SUCCESS Teleporting...")
//                     else response("ERROR Home not found :(")
//                 }
//             } else if(args[0] == "access") {
//                 if(args.length < 2) {

//                 } else {
//                     if(args[1] == "add") {
//                         if(args.length >= 4) {
//                             let homeName = args[3];
//                             let playerName = args[2];
//                             let player;
//                             for(const player2 of world.getPlayers()) {
//                                 if(player2.name.toLowerCase() == playerName.toLowerCase()) player = player2;
//                             }
//                             // console.warn(player.name);
//                             // return;
//                             if(!player) return response(`ERROR Could not find player: "${playerName}"`);

//                             let homesData = homeMgr.getHomeData(msg.sender);
//                             if(!homesData.homes.find(_=>_.name == homeName)) return response(`ERROR You do not own a home named "${homeName}"`);

//                             let playerID = playerStorage.getID(player);
//                             let data = homeMgr.homeDB.get(playerID.toString(), {});
//                             if(!data.access) data.access = [];
//                             data.access.push(`${playerStorage.getID(msg.sender)}:${homeName}`);
//                             homeMgr.homeDB.set(playerID.toString(), data);

//                             if(!homesData.accessHistory) homesData.accessHistory = [];
//                             homesData.accessHistory.push({
//                                 time: Date.now(),
//                                 playerName: player.name,
//                                 playerID,
//                                 homeName
//                             })
//                             homeMgr.homeDB.set(playerStorage.getID(msg.sender).toString(), homesData);

//                             player.sendMessage(`§e@${msg.sender.name} §rgave you access to their home: §a${homeName}`);
//                             response(`SUCCESS Gave access to player!`)
//                         }
//                     } else if(args[1] == "remove") {
//                         let homeName = args[3];
//                         let playerName = args[2];
//                         let player;
//                         for(const player2 of world.getPlayers()) {
//                             if(player2.name.toLowerCase() == playerName.toLowerCase()) player = player2;
//                         }
//                         // console.warn(player.name);
//                         // return;
//                         let homesData = homeMgr.getHomeData(msg.sender);
//                         if(!homesData.homes.find(_=>_.name == homeName)) return response(`ERROR You do not own a home named "${homeName}"`);
//                         if(!homesData.accessHistory) homesData.accessHistory = [];

//                         if(!player && !homesData.accessHistory.find(_=>_.playerName.toLowerCase() == playerName.toLowerCase())) return response(`ERROR Could not find player: "${playerName}"`);
//                         let otherPlayerID;
//                         if(player) {
//                             otherPlayerID = playerStorage.getID(player);
//                         } else {
//                             otherPlayerID = homesData.accessHistory.find(_=>_.playerName.toLowerCase() == playerName.toLowerCase()).playerID;
//                         }

//                         let playerID = playerStorage.getID(msg.sender);
//                         let otherHomesData = homeMgr.getHomeData(otherPlayerID);
//                         if(!otherHomesData.access) otherHomesData.access = [];
//                         otherHomesData.access = otherHomesData.access.filter(_=>_!=`${playerID.toString()}.${homeName}`);
//                         homeMgr.homeDB.set(otherPlayerID.toString(), otherHomesData);
//                         if(player) {
//                             player.sendMessage(`§e@${msg.sender.name} §rremoved your access to home: §a${homeName}`);
//                         }
//                         response("SUCCESS Removed access!");
//                         // let playerID = playerStorage.getID(player);

//                     }
//                 }
//             }
//         })
//         .register()
// }
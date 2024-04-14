import { world } from "@minecraft/server";
import { playerStorage } from "../../apis/PlayerStorage";
import { CommandBuilder } from "../../commandBuilder";
import { Database } from "../../db";
import { DynamicPropertyDatabase } from "../../dynamicPropertyDb";
import { uiManager } from "../../uis";
import { ActionForm } from "../../form_func";
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
        this.homeDB = new DynamicPropertyDatabase("homes");
        this.cfgDb = new Database("Config");
    }
    setHome(player, x, y, z, name) {
        let playerID = playerStorage.getID(player);
        let homesData = this.homeDB.get(playerID.toString(), {});
        let limit = this.cfgDb.get("homeLimit", `NUM:5`);
        if (!homesData.homes) homesData.homes = [];
        if (homesData.homes.length >= parseInt(limit.substring(4)) && !homesData.homes.find(_ => _.name == name)) return homeLimitReached;
        if (homesData.homes.find(_ => _.name == name)) {
            homesData.homes = homesData.homes.filter(_ => _.name != name);
        }
        homesData.homes.push({
            name,
            x,
            y,
            z
        })
        this.homeDB.set(playerID.toString(), homesData);
        return success;
    }
    tpHome(player, name) {
        let homesData = this.getHomeData(player);
        if(!homesData.homes.find(_=>_.name == name)) return notFound;
        let home = homesData.homes.find(_=>_.name == name);
        player.teleport({
            x: home.x,
            y: home.y,
            z: home.z
        }, {dimension:world.getDimension("overworld")});
        return success;
    }
    getHomeData(player) {
        let playerID;
        if(typeof player == "number") {
            playerID = player;
        } else {
            playerID = playerStorage.getID(player);
        }
        let homesData = this.homeDB.get(playerID.toString(), {});
        if(!homesData.homes) homesData.homes = [];
        return homesData;
    }
    deleteHome(player, name) {
        let playerID = playerStorage.getID(player);
        let homesData = this.homeDB.get(playerID.toString(), {});
        if (!homesData.homes) homesData.homes = [];
        if (homesData.homes.find(_ => _.name == name)) {
            homesData.homes = homesData.homes.filter(_ => _.name != name);
            this.homeDB.set(playerID.toString(), homesData);
            return success;
        } else {
            return notFound;
        }
    }
}
const homeMgr = new HomeManager();

export default function () {
    uiManager.addUI("Azalea2.2/TPUI/Homes/Root", (player)=>{
        let actionForm = new ActionForm();
        actionForm.title("§f§u§l§l§r§aHomes");
        actionForm.button(`§aSet Home\n§7Set a home where you are standing`, `textures/azalea_icons/Homes/AddHome`);
        let homesData = homeMgr.getHomeData(player);
        for(const home of homesData.homes) {
            actionForm.button(`§b${home.name}\n§r§7Owned by you (${Math.floor(home.x)} X, ${Math.floor(home.y)} Y, ${Math.floor(home.z)} Z)`, `textures/azalea_icons/Homes/Home`);
        }
        if(homesData.access) {
            let playerIdMap = {};
            let accessData = {};
            for(const access of homesData.access) {
                let player = playerStorage.getPlayerByID(parseInt(access.split(':')[0]));
                let home = access.split(':').slice(1).join(':');
                playerIdMap[player.name] = parseInt(access.split(':')[0]);
                if(accessData[player.name]) accessData[player.name].push(home);
                else accessData[player.name] = [home]
            }
            for(const key of Object.keys(accessData)) {
                // text.push(``);
                // text.push(`${theme.category}-=-=- §r${theme.header ? theme.header : theme.command}Homes (${key}) §r${theme.category}-=-=-`);
                let playerHomeData = homeMgr.homeDB.get(playerIdMap[key]);
                if(!playerHomeData.homes) playerHomeData.homes = [];
                // let successfulHomes = [];
                for(const home of accessData[key]) {
                    let homeData = playerHomeData.homes.find(_=>_.name == home);
                    if(!homeData) continue;
                    actionForm.button(`§e${homeData.name}\n§r§7Owned by §e@${key} §r§7(${Math.floor(homeData.x)} X, ${Math.floor(homeData.y)} Y, ${Math.floor(homeData.z)} Z)`, `textures/azalea_icons/Homes/Home`)
                    // text.push(`${theme.command}${key.toLowerCase().replace(/ /g,"_")}/${homeData.name} ${theme.description}${Math.floor(homeData.x)} X, ${Math.floor(homeData.y)} Y, ${Math.floor(homeData.z)} Z`);
                    // successfulHomes.push(home);
                }
                // if(!successfulHomes.length) text.push(`${theme.errorColor}${key} doesnt have any homes you can view right now...`)
            }
        }

        actionForm.show(player, false, (player, response)=>{})
    })
    new CommandBuilder("home")
        .desc("Just get a home")
        .aliases(["h"])
        .callback(({msg,args: wargs,theme,response})=>{
            let args = betterArgs(wargs.join(' '));
            if(args[0] == "set") {
                let name = args.length > 1 ? args.slice(1).join(' ') : "main";
                let {x,y,z} = msg.sender.location;
                let result = homeMgr.setHome(msg.sender, x, y, z, name);
                if(result == success) response(`SUCCESS Set home!`)
                else response(`ERROR Home limit reached.`)
            } else if(args[0] == "list") {
                let homesData = homeMgr.getHomeData(msg.sender);
                let text = [`${theme.category}-=-=- §r${theme.header ? theme.header : theme.command}Homes §r${theme.category}-=-=-`];
                for(const home of homesData.homes) {
                    text.push(`${theme.command}${home.name} ${theme.description}${Math.floor(home.x)} X, ${Math.floor(home.y)} Y, ${Math.floor(home.z)} Z`)
                }
                if(!homesData.homes.length) text.push(`${theme.errorColor}You dont have any homes...`)
                let accessData = {};
                let playerIdMap = {};
                if(homesData.access) {
                    for(const access of homesData.access) {
                        let player = playerStorage.getPlayerByID(parseInt(access.split(':')[0]));
                        let home = access.split(':').slice(1).join(':');
                        playerIdMap[player.name] = parseInt(access.split(':')[0]);
                        if(accessData[player.name]) accessData[player.name].push(home);
                        else accessData[player.name] = [home]
                    }
                    for(const key of Object.keys(accessData)) {
                        text.push(``);
                        text.push(`${theme.category}-=-=- §r${theme.header ? theme.header : theme.command}Homes (${key}) §r${theme.category}-=-=-`);
                        let playerHomeData = homeMgr.homeDB.get(playerIdMap[key]);
                        if(!playerHomeData.homes) playerHomeData.homes = [];
                        let successfulHomes = [];
                        for(const home of accessData[key]) {
                            let homeData = playerHomeData.homes.find(_=>_.name == home);
                            if(!homeData) continue;
                            text.push(`${theme.command}${key.toLowerCase().replace(/ /g,"_")}/${homeData.name} ${theme.description}${Math.floor(homeData.x)} X, ${Math.floor(homeData.y)} Y, ${Math.floor(homeData.z)} Z`);
                            successfulHomes.push(home);
                        }
                        if(!successfulHomes.length) text.push(`${theme.errorColor}${key} doesnt have any homes you can view right now...`)
                    }
                }
                response(`TEXT ${text.join('\n§r')}`)
            } else if(args[0] == "remove") {
                let name = args.length > 1 ? args.slice(1).join(' ') : "main";
                let result = homeMgr.deleteHome(msg.sender, name);
                if(result == success) return response("SUCCESS Successfully deleted home!")
                else return response(`ERROR Home not found.`)
            } else if(args[0] == "tp") {
                let name = args.length > 1 ? args.slice(1).join(' ') : "main";
                let homeData = homeMgr.getHomeData(msg.sender);
                if(!homeData.access) homeData.access = [];
                if(name.includes('/')) {
                    let foundHome = false;
                    let homeDataFound;
                    for(const access of homeData.access) {
                        let player = playerStorage.getPlayerByID(parseInt(access.split(':')[0]));
                        let home = access.split(':').slice(1).join(':');
                        let otherHomeData = homeMgr.homeDB.get(parseInt(access.split(':')[0]));
                        if(!otherHomeData.homes) otherHomeData.homes = [];
                        if(name.split('/')[0] == player.name.toLowerCase().replace(/ /g, "_") && otherHomeData.homes.find(_=>_.name == name.split('/').slice(1).join('/'))) {
                            foundHome = true;
                            homeDataFound = otherHomeData.homes.find(_=>_.name == name.split('/').slice(1).join('/'));
                        }
                    }
                    if(!foundHome) return response("ERROR You do not have access to this home.");
                    msg.sender.teleport({
                        x: homeDataFound.x,
                        y: homeDataFound.y,
                        z: homeDataFound.z,
                    }, {dimension:world.getDimension("overworld")})
                    return response("SUCCESS Teleporting...")
                } else {
                    let response2 = homeMgr.tpHome(msg.sender, name);
                    if(response2 == success) response("SUCCESS Teleporting...")
                    else response("ERROR Home not found :(")
                }
            } else if(args[0] == "access") {
                if(args.length < 2) {

                } else {
                    if(args[1] == "add") {
                        if(args.length >= 4) {
                            let homeName = args[3];
                            let playerName = args[2];
                            let player;
                            for(const player2 of world.getPlayers()) {
                                if(player2.name.toLowerCase() == playerName.toLowerCase()) player = player2;
                            }
                            // console.warn(player.name);
                            // return;
                            if(!player) return response(`ERROR Could not find player: "${playerName}"`);

                            let homesData = homeMgr.getHomeData(msg.sender);
                            if(!homesData.homes.find(_=>_.name == homeName)) return response(`ERROR You do not own a home named "${homeName}"`);

                            let playerID = playerStorage.getID(player);
                            let data = homeMgr.homeDB.get(playerID.toString(), {});
                            if(!data.access) data.access = [];
                            data.access.push(`${playerStorage.getID(msg.sender)}:${homeName}`);
                            homeMgr.homeDB.set(playerID.toString(), data);

                            if(!homesData.accessHistory) homesData.accessHistory = [];
                            homesData.accessHistory.push({
                                time: Date.now(),
                                playerName: player.name,
                                playerID,
                                homeName
                            })
                            homeMgr.homeDB.set(playerStorage.getID(msg.sender).toString(), homesData);

                            player.sendMessage(`§e@${msg.sender.name} §rgave you access to their home: §a${homeName}`);
                            response(`SUCCESS Gave access to player!`)
                        }
                    } else if(args[1] == "remove") {
                        let homeName = args[3];
                        let playerName = args[2];
                        let player;
                        for(const player2 of world.getPlayers()) {
                            if(player2.name.toLowerCase() == playerName.toLowerCase()) player = player2;
                        }
                        // console.warn(player.name);
                        // return;
                        let homesData = homeMgr.getHomeData(msg.sender);
                        if(!homesData.homes.find(_=>_.name == homeName)) return response(`ERROR You do not own a home named "${homeName}"`);
                        if(!homesData.accessHistory) homesData.accessHistory = [];

                        if(!player && !homesData.accessHistory.find(_=>_.playerName.toLowerCase() == playerName.toLowerCase())) return response(`ERROR Could not find player: "${playerName}"`);
                        let otherPlayerID;
                        if(player) {
                            otherPlayerID = playerStorage.getID(player);
                        } else {
                            otherPlayerID = homesData.accessHistory.find(_=>_.playerName.toLowerCase() == playerName.toLowerCase()).playerID;
                        }

                        let playerID = playerStorage.getID(msg.sender);
                        let otherHomesData = homeMgr.getHomeData(otherPlayerID);
                        if(!otherHomesData.access) otherHomesData.access = [];
                        otherHomesData.access = otherHomesData.access.filter(_=>_!=`${playerID.toString()}.${homeName}`);
                        homeMgr.homeDB.set(otherPlayerID.toString(), otherHomesData);
                        if(player) {
                            player.sendMessage(`§e@${msg.sender.name} §rremoved your access to home: §a${homeName}`);
                        }
                        response("SUCCESS Removed access!");
                        // let playerID = playerStorage.getID(player);

                    }
                }
            }
        })
        .register()
}
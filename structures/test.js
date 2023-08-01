const level = require('level');
const db = new level.Level("C:\\Users\\diamo\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\minecraftWorlds\\CoikZB8pEAE=\\db", {"blockSize":4 * 1024 * 1024,"compression":"raw-zip"});

db.clear()
// for(const key of ) {
    // console.log(key)
// }
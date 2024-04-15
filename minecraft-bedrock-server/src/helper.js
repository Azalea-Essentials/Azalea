const fs = require('fs')
const nbt = require('prismarine-nbt')
const { join, dirname } = require('path')

function addResourcePack (serverPath, packPath, packName) {
  const serverPackPath = join(serverPath, packPath.includes('.') ? 'development_resource_packs' : 'resource_packs')
  packName = packName || packPath.split('/').pop().split('.').shift()
  fs.copyFileSync(packPath, join(serverPackPath, packName))
}

function addBehaviorPack (serverPath, packPath, packName) {
  const serverPackPath = join(serverPath, packPath.includes('.') ? 'development_behavior_packs' : 'behavior_packs')
  packName = packName || packPath.split('/').pop().split('.').shift()
  fs.copyFileSync(packPath, join(serverPackPath, packName))
}

function addQuickScript (serverPath, { name, manifest, scripts, files }, eraseExisting = true, enable = true) {
  files = files || scripts
  const serverPacksPath = join(serverPath, 'development_behavior_packs')
  name = name || manifest.header.name
  const packPath = join(serverPacksPath, name)
  if (eraseExisting) {
    fs.rmSync(packPath, { recursive: true, force: true })
  }
  // make a directory for this pack
  fs.mkdirSync(join(serverPacksPath, name), { recursive: true })
  // write the manifest
  fs.writeFileSync(join(packPath, 'manifest.json'), JSON.stringify(manifest, null, 2))
  // write each of the scripts (a Record<relative path string, current path string>)
  for (const [relativePath, currentPath] of Object.entries(files)) {
    const finalPath = join(packPath, relativePath)
    const finalPathDir = dirname(finalPath)
    fs.mkdirSync(finalPathDir, { recursive: true })
    fs.copyFileSync(currentPath, finalPath)
  }
  // enable the pack
  if (enable) {
    enableBehaviorPack(serverPath, manifest.header.uuid, manifest.header.version)
  }
}

function clearBehaviorPacks (serverPath, eraseDev = true) {
  if (eraseDev) {
    const serverPacksPath1 = join(serverPath, 'development_behavior_packs')
    fs.rmSync(serverPacksPath1, { recursive: true, force: true })
    // Now recreate empty directories
    fs.mkdirSync(serverPacksPath1, { recursive: true })
  }
  if (!fs.existsSync(join(serverPath, 'worlds'))) return
  // remove each world's world_behavior_packs.json
  const worlds = fs.readdirSync(join(serverPath, 'worlds'))
  for (const world of worlds) {
    const worldPath = join(serverPath, 'worlds', world)
    const worldBehaviorPacksPath = join(worldPath, 'world_behavior_packs.json')
    if (fs.existsSync(worldBehaviorPacksPath)) {
      fs.unlinkSync(worldBehaviorPacksPath)
    }
  }
}

function disableBehaviorPack (serverPath, uuid) {
  const worlds = fs.readdirSync(join(serverPath, 'worlds'))
  for (const world of worlds) {
    const worldPath = join(serverPath, 'worlds', world)
    const worldBehaviorPacksPath = join(worldPath, 'world_behavior_packs.json')
    if (fs.existsSync(worldBehaviorPacksPath)) {
      const now = JSON.parse(fs.readFileSync(worldBehaviorPacksPath))
      const index = now.findIndex(pack => pack.pack_id === uuid)
      if (index !== -1) {
        now.splice(index, 1)
        fs.writeFileSync(worldBehaviorPacksPath, JSON.stringify(now, null, 2))
      }
    }
  }
}

function enableBehaviorPack (serverPath, uuid, version) {
  const worlds = fs.readdirSync(join(serverPath, 'worlds'))
  for (const world of worlds) {
    const worldPath = join(serverPath, 'worlds', world)
    const worldBehaviorPacksPath = join(worldPath, 'world_behavior_packs.json')
    const entry = { pack_id: uuid, version }
    if (fs.existsSync(worldBehaviorPacksPath)) {
      const now = JSON.parse(fs.readFileSync(worldBehaviorPacksPath))
      now.push(entry)
      fs.writeFileSync(worldBehaviorPacksPath, JSON.stringify(now, null, 2))
    } else {
      fs.writeFileSync(worldBehaviorPacksPath, JSON.stringify([entry], null, 2))
    }
  }
}

function toggleExperiments (serverPath, list, worldName) {
  if (!worldName) {
    const worlds = fs.readdirSync(join(serverPath, 'worlds'))
    for (const world of worlds) {
      toggleExperiments(serverPath, list, world)
    }
    return
  }
  const worldPath = join(serverPath, 'worlds', worldName)
  const levelDatPath = join(worldPath, 'level.dat')
  const oldLevelBuf = fs.readFileSync(levelDatPath)
  const levelDat = nbt.parseUncompressed(oldLevelBuf.slice(8), 'little')
  const experiments = levelDat.value.experiments.value
  experiments.experiments_ever_used = nbt.byte(1)
  experiments.saved_with_toggled_experiments = nbt.byte(1)
  for (const [key, value] of Object.entries(list)) {
    experiments[key] = nbt.byte(value ? 1 : 0)
  }
  const tagBody = nbt.writeUncompressed(levelDat, 'little')
  const tagHead = oldLevelBuf.slice(0, 8)
  tagHead.writeUInt32LE(tagBody.length, 4)
  fs.writeFileSync(levelDatPath, Buffer.concat([tagHead, tagBody]))
}

function injectServerHelpers (server) {
  server.addResourcePack = addResourcePack.bind(null, server.path)
  server.addBehaviorPack = addBehaviorPack.bind(null, server.path)
  server.addQuickScript = addQuickScript.bind(null, server.path)
  server.clearBehaviorPacks = clearBehaviorPacks.bind(null, server.path)
  server.disableBehaviorPack = disableBehaviorPack.bind(null, server.path)
  server.enableBehaviorPack = enableBehaviorPack.bind(null, server.path)
  server.toggleExperiments = toggleExperiments.bind(null, server.path)
}

module.exports = {
  injectServerHelpers
}

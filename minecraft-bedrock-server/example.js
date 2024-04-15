const bs = require('minecraft-bedrock-server')
const [, version, port, onlineMode] = process.argv
const options = version
  ? {
      'server-port': port || 19132,
      'online-mode': onlineMode || false
    }
  : undefined
bs.startServer(version || '1.17.10', null, options)

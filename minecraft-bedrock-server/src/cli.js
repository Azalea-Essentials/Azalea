#!/usr/bin/env node
const lib = require('minecraft-bedrock-server')
const { version } = require('../package.json')

const opt = require('basic-args')({
  name: 'minecraft-bedrock-server',
  description: 'Minecraft Bedrock Server runner',
  version,
  options: {
    version: { type: String, description: 'Version to download (use "latest" for latest)', alias: 'v' },
    port: { type: Number, description: 'Port to listen on for IPv4', default: 19132 },
    port6: { type: Number, description: 'Port to listen on for IPv6', default: 19133 },
    online: { type: Boolean, description: 'Whether to run in online mode' },
    path: { type: String, description: 'Custom path to the server directory', default: null },

    versions: { type: Boolean, description: 'Passing --versions will list all versions' },
    download: { type: String, description: `Download (but not run) the server binary for this platfrom (default: ${process.platform})`, default: null }
  },
  examples: [
    'minecraft-bedrock-server --version latest      Start a server on the latest version',
    'minecraft-bedrock-server --versions            List all avaliable versions',
    'minecraft-bedrock-server -v 1.20.0 --download  Download v1.20'
  ],
  preprocess (options) {
    if (options.download === true) {
      options.download = process.platform
    }
    if (options.versions) {
      options.version = '*'
    }
  }
})

async function main () {
  if (opt.versions) {
    lib.getLatestVersions().then(console.log)
  } else {
    let version = opt.version
    if (version === 'latest') {
      const versions = await lib.getLatestVersions()
      version = versions.linux.version3
    }
    if (opt.download) {
      await lib.downloadServer(version, { platform: opt.download, ...opt })
    } else {
      const customOptions = opt._ || {}
      await lib.startServer(version, /* onStart callback */ null, {
        'server-port': opt.port,
        'server-portv6': opt.port6,
        'online-mode': Boolean(opt.online),
        path: opt.path ? opt.path : undefined,
        ...customOptions
      })
    }
  }
}

main()

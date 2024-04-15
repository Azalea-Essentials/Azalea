const http = require('https')
const fs = require('fs')
const cp = require('child_process')
const debug = process.env.CI ? console.debug : require('debug')('minecraft-bedrock-server')
const https = require('https')
const helpers = require('./helper')

const serversHtmlURL = 'https://www.minecraft.net/en-us/download/server/bedrock'

function head (url) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, { method: 'HEAD', timeout: 1000 }, resolve)
    req.on('error', reject)
    req.on('timeout', () => { req.destroy(); debug('HEAD request timeout'); reject(new Error('timeout')) })
    req.end()
  })
}

function get (url, outPath) {
  const file = fs.createWriteStream(outPath)
  return new Promise((resolve, reject) => {
    https.get(url, { timeout: 1000 * 20 }, response => {
      if (response.statusCode !== 200) return reject(new Error('Server returned code ' + response.statusCode))
      response.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve()
      })
    })
  })
}

async function getLatestVersions () {
  const html = await fetch(serversHtmlURL).then(res => res.text())
  // Find '                                        <a href="https://minecraft.azureedge.net/bin-linux/bedrock-server-1.20.72.01.zip" aria-label="Download Minecraft Dedicated Server software for Ubuntu (Linux)" class="btn btn-disabled-outline mt-4 downloadlink" role="button" data-platform="serverBedrockLinux" tabindex="0" aria-disabled="true">Download </a>'
  const links = [...html.matchAll(/a href="(.*?)" /g)].map(match => match[1])

  function forOS (os) {
    const url = links.find(link => link.includes(os + '/'))
    if (!url) return null
    const version4 = url.match(/bedrock-server-(\d+\.\d+\.\d+\.\d+)\.zip/)[1]
    const version3 = version4.split('.').slice(0, 3).join('.')
    return { version4, version3, url }
  }

  return {
    linux: forOS('linux'),
    windows: forOS('win'),
    macos: forOS('osx'),
    preview: {
      linux: forOS('linux-preview'),
      windows: forOS('win-preview'),
      macos: forOS('osx-preview')
    }
  }
}

let downloadLock = false

// Download + extract vanilla server and enter the directory
async function download (os, version, root, path) {
  if (downloadLock) {
    throw Error('Already downloading server')
  }
  downloadLock = true
  process.chdir(root)
  if (version.split('.').length < 3) {
    throw new Error('minecraft-bedrock-server: A version string should contain at least 3 dots on Minecraft Bedrock Edition. Please add a .0 suffix: ' + version)
  }
  const verStr = version.split('.').slice(0, 3).join('.')
  const dir = path || 'bds-' + version

  // if (fs.existsSync(dir) && fs.readdirSync(dir).length > 1) {
  //   process.chdir(dir) // Enter server folder
  //   debug('Already downloaded', version)
  //   downloadLock = false
  //   return { version: verStr, path: process.cwd() }
  // }
  try { fs.mkdirSync(dir) } catch { }

  process.chdir(dir) // Enter server folder
  const url = (os, version) => `https://minecraft.azureedge.net/bin-${os}/bedrock-server-${version}.zip`

  let found = false

  for (let i = 0; i < 8; i++) { // Check for the latest server build for version (major.minor.patch.BUILD)
    const u = url(os, `${verStr}.${String(i).padStart(2, '0')}`)
    debug('Opening', u, Date.now())
    let ret
    try { ret = await head(u) } catch (e) { continue }
    if (ret.statusCode === 200) {
      found = u
      debug('Found server', ret.statusCode)
      break
    }
  }
  if (!found) throw Error('did not find server bin for ' + os + ' ' + version)
  console.info('🔻 Downloading', found)
  await get(found, 'bds.zip')
  console.info('⚡ Unzipping')
  // Unzip server
  // if (process.platform === 'linux') cp.execSync('unzip -u bds.zip')
  // else cp.execSync('tar -xf bds.zip')
  let admZip = require('adm-zip');
  let zip = new admZip('bds.zip');
  zip.extractAllTo('./')
  downloadLock = false
  return { version: verStr, path: process.cwd() }
}

function eraseServer (version, options) {
  // Remove the server and try again
  const currentDir = process.cwd()
  process.chdir(options.root || '.')
  const path = options.path ? options.path : 'bds-' + version
  debug('Removing server', path)
  fs.rmSync(path, { recursive: true, force: true })
  process.chdir(currentDir)
}

const defaultOptions = {
  'level-generator': '2',
  'server-port': '19130',
  'online-mode': 'false'
}
const internalOptions = ['path', 'root']

// Setup the server
function configure (options = {}) {
  const opts = { ...defaultOptions, ...options }
  let config = fs.readFileSync('./server.properties', 'utf-8')
  config = config.split('## node options')[0].trim()
  config += '\n## node options'
  config += '\nplayer-idle-timeout=1\nallow-cheats=true\ndefault-player-permission-level=operator'
  for (const o in opts) {
    if (internalOptions.includes(o)) continue
    config += `\n${o}=${opts[o]}`
  }
  fs.writeFileSync('./server.properties', config)
  if (process.platform === 'linux') {
    cp.execSync('chmod +777 ./bedrock_server')
  }
}

function run (inheritStdout = true) {
  const exe = process.platform === 'win32' ? 'bedrock_server.exe' : './bedrock_server'
  return cp.spawn(exe, inheritStdout ? { stdio: 'inherit' } : {})
}

async function downloadServer (version, options) {
  const platFix = {
    win32: 'win',
    windows: 'win',
    linux: 'linux',
    macos: 'darwin'
  }
  if (options.platform && !platFix[options.platform]) {
    throw new Error('Unsupported specified platform: ' + options.platform)
  }
  const platform = options.platform || process.platform
  const serverOs = platFix[platform] || 'linux'
  const currentDir = process.cwd()
  const ret = await download(serverOs, version, options.root || '.', options.path)
  process.chdir(currentDir)
  return ret
}

let lastHandle

// Run the server
async function startServer (version, onStart, options = {}) {
  const os = process.platform === 'win32' ? 'win' : process.platform
  if (os !== 'win' && os !== 'linux') {
    throw Error('unsupported os ' + os)
  }

  const currentDir = process.cwd()
  // Take the options.path and determine if it's an absolute path or not
  const path = options.path
  const pathRoot = options.root || '.'

  const ver = await download(os, version, pathRoot, path) // and enter the directory
  debug('Configuring server', ver.version)
  configure(options)
  debug('Starting server', ver.version)
  const handle = lastHandle = run(!onStart)
  handle.on('error', (...a) => {
    console.warn('*** THE MINECRAFT PROCESS CRASHED ***', a)
    handle.kill('SIGKILL')
  })
  if (onStart) {
    let stdout = ''
    function processLine (data) {
      stdout += data
      if (stdout.includes('Server started')) {
        onStart()
        handle.stdout.off('data', processLine)
      }
    }
    handle.stdout.on('data', processLine)
    handle.stdout.pipe(process.stdout)
    handle.stderr.pipe(process.stdout)
  }
  process.chdir(currentDir)
  return handle
}

// Start the server and wait for it to be ready, with a timeout
function startServerAndWait (version, withTimeout, options) {
  if (isNaN(withTimeout)) throw Error('timeout must be a number')
  let handle
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      handle?.kill()
      reject(new Error(`Server did not start on time (${withTimeout}ms, now ${Date.now()})`))
    }, withTimeout)

    startServer(version, function onReady () {
      clearTimeout(timeout)
      resolve(handle)
    }, options).then((h) => {
      handle = h
    }).catch(reject)
  })
}

// Start the server and wait for it to be ready, with a timeout, and retry once
async function startServerAndWait2 (version, withTimeout, options) {
  try {
    return await startServerAndWait(version, withTimeout, options)
  } catch (e) {
    console.log(e)
    console.log('^ Trying once more to start server in 10 seconds...')
    lastHandle?.kill()
    await new Promise(resolve => setTimeout(resolve, 10000))
    await eraseServer(version, options)
    return await startServerAndWait(version, withTimeout, options)
  }
}

class BedrockVanillaServer {
  constructor (path, version, options) {
    this.path = path || '.'
    this.version = version
    this.options = options
    helpers.injectServerHelpers(this)
  }

  async startAndWaitReady (timeout = 1000 * 60 * 5) {
    this.activeHandle = await startServerAndWait(this.version, timeout, this.options)
    this.activeHandle.stop = () => this.stop()
    this.activeHandle.on('exit', () => { this.activeHandle = null })
    return this.activeHandle
  }

  async stop () {
    return new Promise((resolve) => {
      if (this.activeHandle) {
        this.activeHandle.on('exit', resolve)
        this.activeHandle.stdin.write('stop\n')
        setTimeout(() => {
          this.activeHandle.kill()
          this.activeHandle = null
        }, 1000)
      } else {
        resolve()
      }
    })
  }
}

async function prepare (version, options) {
  const dl = await downloadServer(version, options || {})
  return new BedrockVanillaServer(dl.path, dl.version, options || {})
}

module.exports = { getLatestVersions, downloadServer, startServer, startServerAndWait, startServerAndWait2, prepare }

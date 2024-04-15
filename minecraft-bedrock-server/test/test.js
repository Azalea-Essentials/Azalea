/* eslint-env mocha */
const cp = require('child_process')
const bedrockServer = require('minecraft-bedrock-server')
const fs = require('fs')
const assert = require('assert')
const { join } = require('path')
const versions = ['1.16.210', '1.18.0']

for (const version of versions) {
  describe(`${version}`, function () {
    this.timeout(90000)
    it('should start a minecraft server', async () => {
      const path = join(__dirname, '/bds-' + version)
      try { fs.rmSync(path, { recursive: true }) } catch (e) {}
      const [v4, v6] = [19132 + ((Math.random() * 1000) | 0), 19133 + ((Math.random() * 1000) | 0)]
      const handle = await bedrockServer.startServerAndWait(version, 80000, { path, 'server-port': v4, 'server-portv6': v6 })
      const ok = fs.existsSync(path)
      assert(ok, 'server did not start')
      handle.kill()
    })
  })
}

describe('helpers work', function () {
  this.timeout(90000)
  it('works on 1.18.0', async function () {
    const server = await bedrockServer.prepare('1.18.0')
    const handle = await server.startAndWaitReady(60000)
    await server.clearBehaviorPacks()
    await server.toggleExperiments({
      gametest: true
    })
    handle.kill()
  })
})

describe('auxiliary methods', function () {
  it('getLatestVersions works', async function () {
    const versions = await bedrockServer.getLatestVersions()
    console.log('Versions', versions)
    assert(versions.linux.version3, 'Linux version exists')
    assert(versions.linux.url, 'Linux URL exists')
    assert(versions.windows.version3, 'Windows version exists')
    assert(versions.windows.url, 'Windows URL exists')
    assert(versions.preview.linux.version3, 'Preview Linux version exists')
    assert(versions.preview.linux.url, 'Preview Linux URL exists')
    assert(versions.preview.windows.version3, 'Preview Windows version exists')
    assert(versions.preview.windows.url, 'Preview Windows URL exists')
  })
})

describe('cli', function () {
  it('works', function () {
    const helpStr = cp.execSync('npx minecraft-bedrock-server --help').toString()
    assert(helpStr)
  })
})

// For libssl1.0 missing see:
// https://stackoverflow.com/a/73603200/11173996

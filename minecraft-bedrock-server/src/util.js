const fs = require('fs')

function getFiles (dir) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach((file) => {
    file = dir + '/' + file
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file))
    } else {
      results.push(file)
    }
  })
  return results
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function waitFor (cb, withTimeout, onTimeout) {
  let t
  const ret = await Promise.race([
    new Promise(resolve => cb(resolve)),
    new Promise(resolve => { t = setTimeout(() => resolve('timeout'), withTimeout) })
  ])
  clearTimeout(t)
  if (ret === 'timeout') onTimeout()
  return ret
}

module.exports = { getFiles, sleep, waitFor }

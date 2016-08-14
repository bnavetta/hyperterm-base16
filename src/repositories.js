import childProcess from 'child_process'
import fs from 'fs'
import path from 'path'

import mkdirp from 'mkdirp'

export default class RepositoryManager {
  constructor (config) {
    this.config = config
  }

  pullRepository (repoDir) {
    const res = childProcess.spawnSync('git', ['pull'])
    if (res.error) {
      throw res.error
    }
  }

  cloneRepository (source, cloneDir) {
    const res = childProcess.spawnSync('git', ['clone', source, cloneDir])
    if (res.error) {
      throw res.error
    }
  }

  ensureRepository (source) {
    mkdirp.sync(this.config.schemesDir)
    const localDir = path.join(this.config.schemesDir, path.basename(source, '.git'))

    try {
      const stat = fs.statSync(localDir)

      if (!stat.isDirectory()) {
        throw new Error(`${localDir} is not a directory`)
      }

      if (stat.mtime.getTime() < Date.now() - this.config.refreshSchemes) {
        this.pullRepository(localDir)
      }
    } catch (e) {
      if (e.code === 'ENOENT') {
        this.cloneRepository(source, localDir)
      } else {
        // throw e
        throw new Error(e.code)
      }
    }
  }

  findScheme (name) {
    for (let schemeRepo of fs.readdirSync(this.config.schemesDir)) {
      const schemeFile = path.join(this.config.schemesDir, schemeRepo, name + '.yaml')
      try {
        fs.accessSync(schemeFile)
        return schemeFile
      } catch (e) {
        // ignore
      }
    }

    throw new Error(`Scheme ${name} not found`)
  }
}

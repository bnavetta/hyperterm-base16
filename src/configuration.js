import path from 'path'

import homedir from 'homedir'
import parseDuration from 'parse-duration'

function expandPath (pathStr) {
  return pathStr.replace('~', homedir())
}

export default class Configuration {
  constructor (config) {
    if (config['schemeFile']) {
      this.schemeFile = expandPath(config['schemeFile'])
    }

    if (config['dataDir']) {
      this.dataDir = expandPath(config['dataDir'])
    } else {
      this.dataDir = path.join(homedir(), '.hyperterm-base16')
    }

    if (config['schemesDir']) {
      this.schemesDir = expandPath(config['schemesDir'])
    } else {
      this.schemesDir = path.join(this.dataDir, 'schemes')
    }

    this.schemeRepositories = config['schemeRepositories'] || []

    this.schemeName = config['schemeName']

    if (config['refreshSchemes']) {
      this.refreshSchemes = parseDuration(config['refreshSchemes'])
    } else {
      this.refreshSchemes = parseDuration('1w')
    }
  }
}

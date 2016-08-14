import Configuration from './configuration'
import RepositoryManager from './repositories'
import Scheme from './scheme'

export const decorateConfig = (config) => {
  const configuration = new Configuration(config['base16'] || {})

  const repoManager = new RepositoryManager(configuration)
  for (let schemeRepository of configuration.schemeRepositories) {
    repoManager.ensureRepository(schemeRepository)
  }

  let scheme

  if (configuration.schemeFile) {
    scheme = Scheme.loadSync(configuration.schemeFile)
  } else if (configuration.schemeName) {
    scheme = Scheme.loadSync(repoManager.findScheme(configuration.schemeName))
  }

  if (scheme) {
    return Object.assign({}, config, scheme.toConfig(config))
  } else {
    return config
  }
}

import pgPromise from "pg-promise"
import packageJson from "../package.json"
global.jestUtils = {
  getDependencies (names) {
    return names.reduce((deps, name) => {
      deps[name] = packageJson.dependencies[name]
      return deps
    }, {})
  },
  pgpInstance: pgPromise(),
}
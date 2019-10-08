const { default: globals } = require("new/local/utils/globals")
const { default: isProduction } = require("new/local/utils/isProduction")
exports.default = function handleAppListen (PORT) {
  return () => {
    const name = isProduction() ? `cluster worker ${globals.process.pid}` : `dev server`
    globals.console.log(`Node ${name}: listening on port ${PORT}`)
  }
}
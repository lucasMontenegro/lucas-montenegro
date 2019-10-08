const { default: globals } = require("new/local/utils/globals")
exports.default = function isProduction () {
  return (
    globals.process ? globals.process.env.NODE_ENV === `production` :
    process.env.NODE_ENV === `production`
  )
}
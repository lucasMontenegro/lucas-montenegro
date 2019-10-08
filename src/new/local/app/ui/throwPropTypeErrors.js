const { default: globals } = require("new/local/utils/globals")
const { default: isProduction } = require("new/local/utils/isProduction")
exports.default = function throwPropTypeErrors () {
  if (isProduction()) {
    return
  }
  const { error } = globals.console
  globals.console.error = function logErrorOrThrow (msg) {
    if (/invalid|failed/gi.test(msg) && /prop.?type/gi.test(msg)) {
      throw new Error(msg)
    }
    error.apply(this, arguments)
  }
}
const { default: globals } = require("new/local/utils/globals")
exports.default =  function simpleErrorCallback (e) {
  if (e) {
    globals.console.error(e)
  }
}
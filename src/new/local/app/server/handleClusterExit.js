const { default: globals } = require("new/local/utils/globals")
exports.default = function handleClusterExit (worker, code, signal) {
  const { pid } = worker.process
  globals.console.log(`Node cluster worker ${pid} exited: code ${code}, signal ${signal}`)
}
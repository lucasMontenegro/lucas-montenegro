const cluster = require("cluster")
const os = require("os")
const { default: startHttp } = require("new/local/app/server/startHttp")
const { default: handleClusterExit } = require("new/local/app/server/handleClusterExit")
const { default: globals } = require("new/local/utils/globals")
exports.default = function start () {
  // Multi-process to utilize all CPU cores.
  if (globals.process.env.NODE_ENV === `production` && cluster.isMaster) {
    globals.console.log(`Node cluster master ${globals.process.pid} is running`)
    // Fork workers.
    for (let i = 0, n = os.cpus().length; i < n; i++) {
      cluster.fork()
    }
    cluster.on(`exit`, handleClusterExit)
  } else {
    startHttp()
  }
}
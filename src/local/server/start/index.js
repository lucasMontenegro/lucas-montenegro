const cluster = require("cluster")
const os = require("os")
const startHttp = require("local/server/start/startHttp")
const handleClusterExit = require("local/server/start/handleClusterExit")
const { console, process } = global
module.exports = function start () {
  // Multi-process to utilize all CPU cores.
  if (process.env.NODE_ENV === `production` && cluster.isMaster) {
    console.log(`Node cluster master ${process.pid} is running`)
    // Fork workers.
    for (let i = 0, n = os.cpus().length; i < n; i++) {
      cluster.fork()
    }
    cluster.on(`exit`, handleClusterExit)
  } else {
    startHttp()
  }
}
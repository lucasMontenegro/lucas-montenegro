import cluster from "cluster"
import os from "os"
import startHttp from "lib/server/startHttp"
import handleClusterExit from "lib/server/handleClusterExit"
import globals from "lib/utils/globals"
import isProduction from "lib/utils/isProduction"
export default function server (api) {
  // Multi-process to utilize all CPU cores.
  if (isProduction() && cluster.isMaster) {
    globals.console.log(`Node cluster master ${globals.process.pid} is running`)
    // Fork workers.
    for (let i = 0, n = os.cpus().length; i < n; i++) {
      cluster.fork()
    }
    cluster.on(`exit`, handleClusterExit)
  } else {
    startHttp(api)
  }
}
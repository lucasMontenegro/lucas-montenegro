import cluster from "cluster"
import os from "os"
import startHttp from "new/local/app/server/startHttp"
import handleClusterExit from "new/local/app/server/handleClusterExit"
import globals from "new/local/utils/globals"
import isProduction from "new/local/utils/isProduction"
export default function start () {
  // Multi-process to utilize all CPU cores.
  if (isProduction() && cluster.isMaster) {
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
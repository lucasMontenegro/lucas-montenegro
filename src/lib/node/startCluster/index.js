import isProduction from "lib/utils/isProduction"
import cluster from "cluster"
import globals from "lib/utils/globals"
import os from "os"
export default function startCluster (cb) {
  // Multi-process to utilize all CPU cores.
  if (isProduction() && cluster.isMaster) {
    globals.console.log(`Node cluster master ${globals.process.pid} is running`)
    // Fork workers.
    const n = os.cpus().length
    for (let i = 0; i < n; i++) {
      cluster.fork()
    }
    cluster.on(`exit`, (worker, code, signal) => {
      globals.console.log(
        `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
      )
    })
    return
  }
  cb()
}
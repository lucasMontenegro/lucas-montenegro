const cluster = require("cluster")
const os = require("os")
const startHttp = require("local/startHttp")
// Multi-process to utilize all CPU cores.
if (process.env.NODE_ENV === `production` && cluster.isMaster) {
  console.log(`Node cluster master ${process.pid} is running`)
  // Fork workers.
  for (let i = 0, n = os.cpus().length; i < n; i++) {
    cluster.fork()
  }
  cluster.on(`exit`, (worker, code, signal) => {
    const { pid } = worker.process
    console.log(`Node cluster worker ${pid} exited: code ${code}, signal ${signal}`)
  })
} else {
  startHttp()
}

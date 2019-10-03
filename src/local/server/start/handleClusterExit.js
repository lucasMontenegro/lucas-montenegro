const { console } = global
module.exports = function handleClusterExit (worker, code, signal) {
  const { pid } = worker.process
  console.log(`Node cluster worker ${pid} exited: code ${code}, signal ${signal}`)
}
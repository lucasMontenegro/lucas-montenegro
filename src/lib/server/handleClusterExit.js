import globals from "lib/utils/globals"
export default function handleClusterExit (worker, code, signal) {
  const { pid } = worker.process
  globals.console.log(`Node cluster worker ${pid} exited: code ${code}, signal ${signal}`)
}
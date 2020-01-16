import globals from "lib/utils/globals"
import isProduction from "lib/utils/isProduction"
export default function handleAppListen (PORT) {
  return () => {
    const name = isProduction() ? `cluster worker ${globals.process.pid}` : `dev server`
    globals.console.log(`Node ${name}: listening on port ${PORT}`)
  }
}
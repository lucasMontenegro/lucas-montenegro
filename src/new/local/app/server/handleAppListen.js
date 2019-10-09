import globals from "new/local/utils/globals"
import isProduction from "new/local/utils/isProduction"
export default function handleAppListen (PORT) {
  return () => {
    const name = isProduction() ? `cluster worker ${globals.process.pid}` : `dev server`
    globals.console.log(`Node ${name}: listening on port ${PORT}`)
  }
}
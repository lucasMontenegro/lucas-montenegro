import Bluebird from "bluebird"
import { errorLogger, addIgnoredError } from "./errorFiltering"
import extendRepo from "./extendRepo"
import pgPromise from "pg-promise"
import globals from "lib/utils/globals"
import monitor from "pg-monitor"
import filterMonitorLog from "./filterMonitorLog"
import isProduction from "lib/utils/isProduction"
const initOptions = {
  promiseLib: Bluebird,
  error: errorLogger,
  extend: extendRepo,
}
export { addIgnoredError }
export const pgp = pgPromise(initOptions)
export const db = pgp({
  host: globals.process.env.PG_HOST,
  database: globals.process.env.PG_DATABASE,
  user: globals.process.env.PG_USER,
  password: globals.process.env.PG_PASSWORD,
})
monitor.setTheme(`matrix`)
monitor.setLog(filterMonitorLog)
monitor.attach(initOptions, (
  isProduction() ? [] :
  [`connect`, `disconnect`, `task`, `transact`, `query`]
))
export function closeDb () {
  pgp.end()
}
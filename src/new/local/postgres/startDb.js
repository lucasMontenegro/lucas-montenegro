import pgPromise from "pg-promise"
import monitor from "pg-monitor"
import Bluebird from "bluebird"
import HandleMonitorLog from "new/local/postgres/HandleMonitorLog"
import ErrorFilter from "new/local/postgres/ErrorFilter"
import extendRepos from "new/local/postgres/extendRepos"
import globals from "new/local/utils/globals"
import isProduction from "new/local/utils/isProduction"
export default function startDb () {
  const errorFilter = ErrorFilter()
  const initOptions = {
    promiseLib: Bluebird,
    error: errorFilter.logger,
    extend: extendRepos,
  }
  const pgp = pgPromise(initOptions)
  const db = pgp({
    host: globals.process.env.PG_HOST,
    database: globals.process.env.PG_DATABASE,
    user: globals.process.env.PG_USER,
    password: globals.process.env.PG_PASSWORD,
  })
  monitor.setTheme(`matrix`)
  monitor.setLog(HandleMonitorLog())
  monitor.attach(initOptions, (
    isProduction() ? [] :
    [`connect`, `disconnect`, `task`, `transact`, `query`]
  ))
  return { db, pgp, ignoreError: errorFilter.ignore }
}
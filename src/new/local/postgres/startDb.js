const pgPromise = require("pg-promise")
const monitor = require("pg-monitor")
const Bluebird = require("bluebird")
const { default: HandleMonitorLog } = require("new/local/postgres/HandleMonitorLog")
const { default: ErrorFilter } = require("new/local/postgres/ErrorFilter")
const { default: extendRepos } = require("new/local/postgres/extendRepos")
const { default: globals } = require("new/local/utils/globals")
const { default: isProduction } = require("new/local/utils/isProduction")
exports.default = function startDb () {
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
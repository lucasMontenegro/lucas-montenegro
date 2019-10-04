const pgPromise = require("pg-promise")
const monitor = require("pg-monitor")
const Bluebird = require("bluebird")
const HandleMonitorLog = require("local/server/pg/HandleMonitorLog")
const ErrorFilter = require("local/server/pg/ErrorFilter")
const extendRepos = require("local/server/pg/extendRepos")
const { process } = global
module.exports = function startDb () {
  const errorFilter = ErrorFilter()
  const initOptions = {
    promiseLib: Bluebird,
    error: errorFilter.logger,
    extend: extendRepos,
  }
  const pgp = pgPromise(initOptions)
  const db = pgp({
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
  })
  monitor.setTheme(`matrix`)
  monitor.setLog(HandleMonitorLog())
  monitor.attach(initOptions, (
    process.env.NODE_ENV === `production` ? [] :
    [`connect`, `disconnect`, `task`, `transact`, `query`]
  ))
  return { db, pgp, ignoreError: errorFilter.ignore }
}
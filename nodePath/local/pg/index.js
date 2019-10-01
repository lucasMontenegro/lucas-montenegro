const pgPromise = require("pg-promise")
const monitor = require("pg-monitor")
const Bluebird = require("bluebird")
const saveLog = require("local/pg/saveLog")
const dbErrors = require("local/pg/dbErrors")
const extendRepos = require("local/pg/extendRepos")
const events = require("local/pg/events")
exports.ignoreDbError = dbErrors.ignore
const initOptions = {
  promiseLib: Bluebird,
  error: dbErrors.logger,
  extend (db, dc) {
    extendRepos(pgp, db, dc)
  },
}
const pgp = exports.pgp = pgPromise(initOptions)
const db = exports.db = pgp({
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
})
exports.closeDb = function closeDb () {
  db.$config.pgp.end()
}
monitor.setTheme(`matrix`)
monitor.setLog(saveLog())
monitor.attach(initOptions, events())
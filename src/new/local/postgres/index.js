const { default: startDb } = require("new/local/postgres/startDb")
const { db, pgp, ignoreError } = startDb()
exports.pgp = pgp
exports.db = db
exports.ignoreError = ignoreError
exports.closeDb = function closeDb () {
  db.$config.pgp.end()
}
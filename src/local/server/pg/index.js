const { db, pgp, ignoreError } = require("local/server/pg/startDb")()
exports.pgp = pgp
exports.db = db
exports.ignoreError = ignoreError
exports.closeDb = function closeDb () {
  db.$config.pgp.end()
}
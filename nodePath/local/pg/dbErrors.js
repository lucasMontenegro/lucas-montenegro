const monitor = require("pg-monitor")
const matchers = []
exports.ignore = function ignore (fn) {
  matchers.push(fn)
}
exports.logger = function logger (err, e) {
  // usage:
  // pg.ignoreDbError(function matchUniqueUsernameError (err, e) {
  //   return (
  //     typeof err === `object`
  //     && err.code == `23505`
  //     && err.table == `usernames`
  //     && err.constraint == `usernames_pkey`
  //   )
  // })
  // pg.ignoreDbError === logger
  if (!matchers.find(fn => fn(err, e))) {
    monitor.error(err, e)
  }
}
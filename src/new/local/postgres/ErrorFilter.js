import monitor from "pg-monitor"
export default function ErrorFilter () {
  const matchers = []
  return {
    ignore (fn) {
      matchers.push(fn)
    },
    logger (err, e) {
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
    },
  }
}
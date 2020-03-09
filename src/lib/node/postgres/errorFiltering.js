import monitor from "pg-monitor"
export const matchers = []
export function addIgnoredError (fn) {
  // usage:
  // addIgnoredError(function matchUniqueUsernameError (err, e) {
  //   return (
  //     typeof err === `object`
  //     && err.code == `23505`
  //     && err.table == `usernames`
  //     && err.constraint == `usernames_pkey`
  //   )
  // })
  matchers.push(fn)
}
export function errorLogger (err, e) {
  if (!matchers.find(fn => fn(err, e))) {
    monitor.error(err, e)
  }
}
const saveMonitorError = require("local/server/pg/saveMonitorError")
const { process } = global
module.exports = function HandleMonitorLog () {
  const production = process.env.NODE_ENV === `production`
  return function handleMonitorLog (msg, info) {
    if (info.event === `error`) {
      production || saveMonitorError(msg, info)
    } else if (production) {
      info.display = false
    }
  }
}
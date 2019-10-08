const { default: saveMonitorError } = require("new/local/postgres/saveMonitorError")
const { default: isProduction } = require("new/local/utils/isProduction")
exports.default = function HandleMonitorLog () {
  const production = isProduction()
  return function handleMonitorLog (msg, info) {
    if (info.event === `error`) {
      production || saveMonitorError(msg, info)
    } else if (production) {
      info.display = false
    }
  }
}
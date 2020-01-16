import saveMonitorError from "new/local/postgres/saveMonitorError"
import isProduction from "new/local/utils/isProduction"
export default function HandleMonitorLog () {
  const production = isProduction()
  return function handleMonitorLog (msg, info) {
    if (info.event === `error`) {
      production || saveMonitorError(msg, info)
    } else if (production) {
      info.display = false
    }
  }
}
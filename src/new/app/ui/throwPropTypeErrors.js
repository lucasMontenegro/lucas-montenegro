import global from "global"
import isProduction from "new/lib/utils/isProduction"
export default function throwPropTypeErrors () {
  if (isProduction()) {
    return
  }
  const { error } = global.console
  global.console.error = function logErrorOrThrow (msg) {
    if (/invalid|failed/gi.test(msg) && /prop.?type/gi.test(msg)) {
      throw new Error(msg)
    }
    error.apply(this, arguments)
  }
}
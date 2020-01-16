import globals from "lib/utils/globals"
import isProduction from "lib/utils/isProduction"
export default function throwPropTypeErrors () {
  if (isProduction()) {
    return
  }
  const { error } = globals.console
  globals.console.error = function logErrorOrThrow (msg) {
    if (/invalid|failed/gi.test(msg) && /prop.?type/gi.test(msg)) {
      throw new Error(msg)
    }
    error.apply(this, arguments)
  }
}
import globals from "new/local/utils/globals"
import isProduction from "new/local/utils/isProduction"
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
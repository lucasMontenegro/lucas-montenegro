import isProduction from "lib/utils/isProduction"
import globals from "lib/utils/globals"
if (!isProduction()) {
  const { error } = globals.console
  globals.console.error = function logErrorOrThrow (msg) {
    if (/invalid|failed/gi.test(msg) && /prop.?type/gi.test(msg)) {
      throw new Error(msg)
    }
    error.apply(this, arguments)
  }
}
import languageDetector from "lib/languageDetector"
import isProduction from "lib/utils/isProduction"
import globals from "lib/utils/globals"
export default function get () {
  const languageCode = languageDetector.get()
  const value = this.source[languageCode]
  if (value === undefined) {
    const msg = `Language code not supported in translation: ${languageCode}`
    if (isProduction()) {
      globals.console.error(msg)
    } else {
      throw Error(msg)
    }
    return this.fallbackValue
  }
  return value
}
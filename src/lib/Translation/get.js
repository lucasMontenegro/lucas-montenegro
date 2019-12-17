import languageDetector from "lib/languageDetector"
import isProduction from "lib/utils/isProduction"
import globals from "lib/utils/globals"
export default function get () {
  const languageCode = languageDetector.get()
  if (languageCode in this.source) {
    return this.source[languageCode]
  }
  const msg = `Language code not supported in translation: ${languageCode}`
  if (isProduction()) {
    globals.console.error(msg)
  } else {
    throw Error(msg)
  }
  return this.fallbackValue
}
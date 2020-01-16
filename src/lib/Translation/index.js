import languageDetector from "lib/languageDetector"
import isProduction from "lib/utils/isProduction"
import globals from "lib/utils/globals"
export default class Translation {
  constructor (source) {
    this.fallbackValue = Object.values(source)[0]
    this.source = source
  }
  get () {
    const languageCode = languageDetector.get()
    if (languageCode in this.source) {
      return this.source[languageCode]
    }
    const msg = `Language code not supported in translation: ${languageCode}`
    if (isProduction()) {
      globals.console.error(msg)
      return this.fallbackValue
    } else {
      throw Error(msg)
    }
  }
}
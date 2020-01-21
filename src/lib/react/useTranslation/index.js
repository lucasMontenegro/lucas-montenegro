import languageDetector from "lib/languageDetector"
import isProduction from "lib/utils/isProduction"
import globals from "lib/utils/globals"
export default function useTranslation () {
  const languageCode = languageDetector.get()
  return function t (source) {
    const translation = source[languageCode]
    if (translation === undefined) {
      const msg = `Language code (${languageCode}) not supported in translation, using default.`
      if (isProduction()) {
        globals.console.error(msg)
        return Object.values(source)[0]()
      } else {
        throw Error(msg)
      }
    }
    return translation()
  }
}
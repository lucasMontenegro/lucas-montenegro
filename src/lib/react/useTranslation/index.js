import languageDetector from "lib/languageDetector"
export default function useTranslation () {
  const languageCode = languageDetector.get()
  return function t (source) {
    const translation = source[languageCode]
    if (translation === undefined) {
      return Object.values(source)[0]()
    }
    return translation()
  }
}
import supportedLanguages from "local/supportedLanguages"
const hashtable = supportedLanguages.reduce((hashtable, languageCode) => {
  hashtable[languageCode] = null
  return hashtable
}, {})
export default function makeTranslation (translation) {
  if (typeof translation === `function`) {
    const tranlate = translation
    return supportedLanguages.reduce((translation, languageCode) => {
      translation[languageCode] = tranlate(languageCode)
      return translation
    }, {})
  } else if (translation instanceof Object) {
    const keys = Object.keys(translation)
    const key = keys.find(key => !(key in hashtable))
    if (key) {
      throw Error(`Unexpected languageCode in translation: ${key}`)
    }
    const languageCode = supportedLanguages.find(languageCode => !(languageCode in translation))
    if (languageCode) {
      throw Error(`Missing languageCode in translation: ${languageCode}`)
    }
    return translation
  }
  throw TypeError(`Expected object or function`)
}
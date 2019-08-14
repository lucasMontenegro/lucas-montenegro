import supportedLanguages from "local/supportedLanguages"
const hashtable = supportedLanguages.reduce((hashtable, languageCode) => {
  hashtable[languageCode] = null
  return hashtable
}, {})
export default function makeTranslation (translation, convert) {
  if (typeof translation === `function`) {
    const tranlate = translation
    return supportedLanguages.reduce((translation, languageCode) => {
      translation[languageCode] = tranlate(languageCode)
      return translation
    }, {})
  } else if (translation instanceof Object) {
    const keys = Object.keys(translation)
    const unexpected = keys.find(key => !(key in hashtable))
    if (unexpected) {
      throw Error(`Unexpected languageCode in translation: ${unexpected}`)
    }
    const missing = supportedLanguages.find(languageCode => !(languageCode in translation))
    if (missing) {
      throw Error(`Missing languageCode in translation: ${missing}`)
    }
    if (convert === `toArray`) {
      return keys.map(languageCode => ({ languageCode, value: translation[languageCode] }))
    }
    return translation
  }
  throw TypeError(`Expected object or function`)
}
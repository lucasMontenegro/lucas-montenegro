import supportedLanguages from "new/local/supportedLanguages"
import PropTypes from "prop-types"
const hash = supportedLanguages.reduce((hash, languageCode) => {
  hash[languageCode] = null
  return hash
}, {})
export default function makeTranslations (translation, convert) {
  if (typeof translation === `function`) {
    const tranlate = translation
    return supportedLanguages.reduce((translation, languageCode) => {
      translation[languageCode] = tranlate(languageCode)
      return translation
    }, {})
  } else if (translation instanceof Object) {
    const keys = Object.keys(translation)
    const unexpected = keys.find(key => !(key in hash))
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
export function makeTranslationsPropType (propType) {
  return PropTypes.shape(makeTranslations(() => propType.isRequired))
}
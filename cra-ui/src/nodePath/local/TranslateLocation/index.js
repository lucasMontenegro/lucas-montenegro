class TranslateLocation {
  constructor (options) {
    //  Usage:
    //    const translateLocationFrom = new TranslateLocation(options)
    //    1. Translate current app location to other languages
    //      translateLocationFrom[oldLanguage].for[appName][newLanguage](location)
    //    b. Translate every app location to the current language
    //      translateLocationFrom[oldLanguage].to[newLanguage][appName](location)
    //  options = {
    //    appNames: Array of camel case names,
    //    languageCodes: Array,
    //    translators: {
    //      ...other apps,
    //      [appName]: {
    //        ...other languages,
    //        [languageCode]: {
    //          toIntl: function (location) --> location,
    //          toLocal: function (location) --> location,
    //        },
    //      },
    //    },
    //  }
    const { appNames, languageCodes, translators } = options
    const temp = appNames.reduce((outputAN, appName) => {
      const byLang = translators[appName]
      outputAN[appName] = languageCodes.reduce((outputOL, oldLanguage) => {
        outputOL[oldLanguage] = languageCodes.reduce((outputNL, newLanguage) => {
          if (oldLanguage === newLanguage) {
            outputNL[newLanguage] = location => location
          } else {
            const { toIntl } = byLang[oldLanguage]
            const { toLocal } = byLang[newLanguage]
            outputNL[newLanguage] = location => toLocal(toIntl(location))
          }
          return outputNL
        }, {})
        return outputOL
      }, {})
      return outputAN
    }, {})
    languageCodes.reduce((translateLocationFrom, oldLanguage) => {
      translateLocationFrom[oldLanguage] = {
        to: languageCodes.reduce((to, newLanguage) => {
          to[newLanguage] = appNames.reduce((_for, appName) => {
            _for[appName] = temp[appName][oldLanguage][newLanguage]
            return _for
          }, {})
          return to
        }, {}),
        for: appNames.reduce((_for, appName) => {
          _for[appName] = languageCodes.reduce((to, newLanguage) => {
            to[newLanguage] = temp[appName][oldLanguage][newLanguage]
            return to
          }, {})
          return _for
        }, {}),
      }
      return translateLocationFrom
    }, this)
  }
}
export default TranslateLocation
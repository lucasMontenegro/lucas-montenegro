import supportedLanguages from "local/supportedLanguages"
export default function describeLinkTranslations (options) {
  const { appName, routing, translations, locations } = options
  it(`should translate to every supported language`, () => {
    supportedLanguages.forEach(oldLanguage => locations[oldLanguage].forEach(location => {
      const intl = translations[oldLanguage].toIntl(location)
      supportedLanguages.forEach(newLanguage => {
        const local = translations[newLanguage].toLocal(intl)
        const matches = routing.routes.filter(r => r.match(local))
        expect(matches).toHaveLength(1)
        const route = matches[0]
        expect(route.appName).toEqual(appName)
        expect(route.languageCode).toEqual(newLanguage)
      })
    }))
  })
}
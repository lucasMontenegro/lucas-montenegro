import supportedLanguages from "local/supportedLanguages"
export default function describeInitialLocation (options) {
  const { appName, routing, translators, location } = options
  it(`should translate to every supported language`, () => {
    const intl = translators.en.toIntl(location)
    supportedLanguages.forEach(languageCode => {
      const local = translators[languageCode].toLocal(intl)
      const matches = routing.routes.filter(r => r.match(local))
      expect(matches).toHaveLength(1)
      const route = matches[0]
      expect(route.appName).toEqual(appName)
      expect(route.languageCode).toEqual(languageCode)
    })
  })
}
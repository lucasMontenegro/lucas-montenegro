import supportedLanguages from "local/supportedLanguages"
export default function describeInitialLocation (options) {
  const { clientName, routing, linkTranslators, location } = options
  it(`should translate to every supported language`, () => {
    const intl = linkTranslators.en.toIntl(location)
    supportedLanguages.forEach(languageCode => {
      const local = linkTranslators[languageCode].toLocal(intl)
      const matches = routing.routes.filter(r => r.match(local))
      expect(matches).toHaveLength(1)
      const route = matches[0]
      expect(route.clientName).toEqual(clientName)
      expect(route.languageCode).toEqual(languageCode)
    })
  })
}
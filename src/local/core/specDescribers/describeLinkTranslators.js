import supportedLanguages from "local/supportedLanguages"
export default function describeLinkTranslators (options) {
  const { clientName, routing, linkTranslators, locations } = options
  it(`should translate to every supported language`, () => {
    supportedLanguages.forEach(oldLanguage => locations[oldLanguage].forEach(location => {
      const intl = linkTranslators[oldLanguage].toIntl(location)
      supportedLanguages.forEach(newLanguage => {
        const local = linkTranslators[newLanguage].toLocal(intl)
        const matches = routing.routes.filter(r => r.match(local))
        expect(matches).toHaveLength(1)
        const route = matches[0]
        expect(route.clientName).toEqual(clientName)
        expect(route.languageCode).toEqual(newLanguage)
      })
    }))
  })
}
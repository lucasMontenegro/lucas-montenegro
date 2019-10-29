import translate from "lib/routing/LinkTranslations/translate"
describe(`lib/routing/LinkTranslations/translate`, () => {
  const linkTranslations = {
    translate,
    translators: {
      en: {
        toIntl (...args) {
          return [`translators.en.toIntl`, args]
        },
      },
      es: {
        toLocal (...args) {
          return [`translators.es.toLocal`, args]
        },
      },
    },
    links: [
      { languageCode: `en`, languageName: `English` },
      { languageCode: `es`, languageName: `Spanish` },
    ],
  }
  const location = { pathname: `location` }
  let links
  beforeAll(() => {
    links = linkTranslations.translate(`en`, location)
  })
  it(`should translate the location to every language`, () => {
    expect(links).toMatchSnapshot()
  })
  it(`should not translate a location to its own language`, () => {
    expect(links[0].location).toBe(location)
  })
})
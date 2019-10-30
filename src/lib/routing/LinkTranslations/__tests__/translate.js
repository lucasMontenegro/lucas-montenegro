import translate from "lib/routing/LinkTranslations/translate"
import languageDetector from "lib/languageDetector"
jest.mock(`lib/languageDetector`, () => ({ __esModule: true, default: {} }))
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
  describe(`linkTranslations.translate (languageCode is supported)`, () => {
    const location = { pathname: `location` }
    let links
    beforeAll(() => {
      languageDetector.get = () => `en`
      links = linkTranslations.translate(location)
    })
    it(`should translate to every language`, () => {
      expect(links).toMatchSnapshot()
    })
    it(`should not translate a location to its own language`, () => {
      expect(links[0].location).toBe(location)
    })
  })
  describe(`linkTranslations.translate (languageCode not supported)`, () => {
    let links
    beforeAll(() => {
      languageDetector.get = () => `pt`
      links = linkTranslations.translate({})
    })
    it(`should return an empty array`, () => {
      expect(links).toEqual([])
    })
  })
})
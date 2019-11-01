import translate from "lib/routing/LinkTranslator/translate"
import languageDetector from "lib/languageDetector"
jest.mock(`lib/languageDetector`, () => ({ __esModule: true, default: {} }))
describe(`lib/routing/LinkTranslator/translate`, () => {
  const linkTranslator = {
    translate,
    functions: {
      en: {
        toIntl (...args) {
          return [`functions.en.toIntl`, args]
        },
      },
      es: {
        toLocal (...args) {
          return [`functions.es.toLocal`, args]
        },
      },
    },
    links: [
      { languageCode: `en`, languageName: `English` },
      { languageCode: `es`, languageName: `Spanish` },
    ],
  }
  describe(`linkTranslator.translate (languageCode is supported)`, () => {
    const location = { pathname: `location` }
    let links
    beforeAll(() => {
      languageDetector.get = () => `en`
      links = linkTranslator.translate(location)
    })
    it(`should translate to every language`, () => {
      expect(links).toMatchSnapshot()
    })
    it(`should not translate a location to its own language`, () => {
      expect(links[0].location).toBe(location)
    })
  })
  describe(`linkTranslator.translate (languageCode not supported)`, () => {
    let links
    beforeAll(() => {
      languageDetector.get = () => `pt`
      links = linkTranslator.translate({})
    })
    it(`should return an empty array`, () => {
      expect(links).toEqual([])
    })
  })
})
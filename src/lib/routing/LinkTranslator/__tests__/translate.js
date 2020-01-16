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
      {
        languageCode: `en`,
        otherProps: {
          key: `en`,
          id: `translate-to-en`,
          text: `English`,
        },
      },
      {
        languageCode: `es`,
        otherProps: {
          key: `es`,
          id: `translate-to-es`,
          text: `Spanish`,
        },
      },
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
    it(`should not include a location for the active link`, () => {
      expect(links[0].location).toBe(null)
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
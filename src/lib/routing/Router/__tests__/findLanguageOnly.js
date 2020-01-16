import languageDetector from "lib/languageDetector"
import findLanguageOnly from "lib/routing/Router/findLanguageOnly"
jest.mock(`lib/languageDetector`, () => ({
  __esModule: true,
  default: { set: jest.fn() },
}))
describe(`lib/routing/Router/findLanguageOnly`, () => {
  let match
  const router = {
    findLanguageOnly,
    matchers: {
      languageOnly: [
        { languageCode: `foo`, match: () => false },
        { languageCode: `bar`, match: () => match },
        { languageCode: `baz`, match: () => false },
      ],
    },
    renderEmpty: {},
    locations: {
      home: { bar: {} },
    },
  }
  describe(`findLanguageOnly (matchers.languageOnly.find => null)`, () => {
    let result
    beforeAll(() => {
      match = false
      result = router.findLanguageOnly({})
    })
    it(`should not call languageDetector.set`, () => {
      expect(languageDetector.set.mock.calls).toEqual([])
    })
    it(`should return null`, () => {
      expect(result).toBeNull()
    })
  })
  describe(`findLanguageOnly (matchers.languageOnly.find => matcher)`, () => {
    let result
    beforeAll(() => {
      match = true
      result = router.findLanguageOnly({})
    })
    it(`should call languageDetector.set`, () => {
      expect(languageDetector.set.mock.calls).toEqual([[`bar`]])
      languageDetector.set.mockClear()
    })
    it(`should return a route that redirects to home`, () => {
      expect(result).toEqual({ render: {}, redirect: {} })
      expect(result.render).toBe(router.renderEmpty)
      expect(result.redirect).toBe(router.locations.home.bar)
    })
  })
})
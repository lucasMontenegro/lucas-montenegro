import languageDetector from "lib/languageDetector"
import findLanguage404 from "lib/routing/Router/findLanguage404"
jest.mock(`lib/languageDetector`, () => ({
  __esModule: true,
  default: { set: jest.fn() },
}))
describe(`lib/routing/Router/findLanguage404`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react-router-dom`])).toMatchSnapshot()
  })
  let match
  const router = {
    findLanguage404,
    routes: {
      clientNotFound: [
        { languageCode: `foo`, match: () => false },
        { languageCode: `bar`, match: () => match },
        { languageCode: `baz`, match: () => false },
      ],
    },
    renderEmpty: {},
    locations: {
      notFound: { bar: { pathname: `bar` } },
    },
  }
  describe(`findLanguage404 (routes.clientNotFound.find => null)`, () => {
    let result
    beforeAll(() => {
      match = false
      result = router.findLanguage404({})
    })
    it(`should not call languageDetector.set`, () => {
      expect(languageDetector.set.mock.calls).toEqual([])
    })
    it(`should return null`, () => {
      expect(result).toBeNull()
    })
  })
  describe(`findLanguage404 (routes.clientNotFound.find => route)`, () => {
    let result
    const location = {}
    beforeAll(() => {
      match = true
      result = router.findLanguage404(location)
    })
    it(`should call languageDetector.set`, () => {
      expect(languageDetector.set.mock.calls).toEqual([[`bar`]])
      languageDetector.set.mockClear()
    })
    it(`should return a route that redirects to notFound`, () => {
      expect(result).toEqual({
        render: {},
        languageCode: `bar`,
        redirect: { pathname: `bar`, state: {} },
      })
      expect(result.render).toBe(router.renderEmpty)
      expect(result.redirect.state).toBe(location)
    })
  })
})
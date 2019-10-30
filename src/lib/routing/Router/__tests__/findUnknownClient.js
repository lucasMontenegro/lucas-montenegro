import languageDetector from "lib/languageDetector"
import findUnknownClient from "lib/routing/Router/findUnknownClient"
jest.mock(`lib/languageDetector`, () => ({
  __esModule: true,
  default: { set: jest.fn() },
}))
describe(`lib/routing/Router/findUnknownClient`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`react-router-dom`])).toMatchSnapshot()
  })
  let match
  const router = {
    findUnknownClient,
    matchers: {
      unknownClient: [
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
  describe(`findUnknownClient (matchers.unknownClient.find => null)`, () => {
    let result
    beforeAll(() => {
      match = false
      result = router.findUnknownClient({})
    })
    it(`should not call languageDetector.set`, () => {
      expect(languageDetector.set.mock.calls).toEqual([])
    })
    it(`should return null`, () => {
      expect(result).toBeNull()
    })
  })
  describe(`findUnknownClient (matchers.unknownClient.find => matcher)`, () => {
    let result
    const location = {}
    beforeAll(() => {
      match = true
      result = router.findUnknownClient(location)
    })
    it(`should call languageDetector.set`, () => {
      expect(languageDetector.set.mock.calls).toEqual([[`bar`]])
      languageDetector.set.mockClear()
    })
    it(`should return a route that redirects to notFound`, () => {
      expect(result).toEqual({
        render: {},
        redirect: { pathname: `bar`, state: {} },
      })
      expect(result.render).toBe(router.renderEmpty)
      expect(result.redirect.state).toBe(location)
    })
  })
})
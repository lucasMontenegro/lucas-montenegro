import languageDetector from "lib/languageDetector"
import findClient from "lib/routing/Router/findClient"
jest.mock(`lib/languageDetector`, () => ({
  __esModule: true,
  default: { set: jest.fn() },
}))
describe(`lib/routing/Router/findClient`, () => {
  const render = {}
  let match
  const router = {
    findClient,
    routes: {
      client: [
        { languageCode: `foo`, match: () => false },
        { languageCode: `bar`, render, match: () => match },
        { languageCode: `baz`, match: () => false },
      ],
    },
  }
  describe(`findClient (routes.client.find => null)`, () => {
    let result
    beforeAll(() => {
      match = false
      result = router.findClient({})
    })
    it(`should not call languageDetector.set`, () => {
      expect(languageDetector.set.mock.calls).toEqual([])
    })
    it(`should return null`, () => {
      expect(result).toBeNull()
    })
  })
  describe(`findClient (routes.client.find => route)`, () => {
    let result
    beforeAll(() => {
      match = true
      result = router.findClient({})
    })
    it(`should call languageDetector.set`, () => {
      expect(languageDetector.set.mock.calls).toEqual([[`bar`]])
      languageDetector.set.mockClear()
    })
    it(`should return a route that renders the proper client`, () => {
      expect(result).toEqual({ render: {}, languageCode: `bar`, redirect: null })
      expect(result.render).toBe(render)
    })
  })
})
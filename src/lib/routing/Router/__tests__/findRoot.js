import languageDetector from "lib/languageDetector"
import findRoot from "lib/routing/Router/findRoot"
jest.mock(`lib/languageDetector`, () => ({ __esModule: true, default: {} }))
describe(`lib/routing/Router/findRoot`, () => {
  let match
  const router = {
    findRoot,
    routes: { matchRoot: () => match },
    renderEmpty: {},
    locations: {
      home: { foo: {} },
    },
  }
  describe(`findRoot (match false)`, () => {
    it(`should return null`, () => {
      match = false
      expect(router.findRoot()).toBeNull()
    })
  })
  describe(`findRoot (match true)`, () => {
    it(`should return a route that redirects to home`, () => {
      match = true
      languageDetector.get = () => `foo`
      const result = router.findRoot()
      expect(result).toEqual({ render: {}, redirect: {} })
      expect(result.render).toBe(router.renderEmpty)
      expect(result.redirect).toBe(router.locations.home.foo)
    })
  })
})
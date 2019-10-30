import languageDetector from "lib/languageDetector"
import useRoute from "lib/routing/Router/useRoute"
import findRoute from "lib/routing/Router/findRoute"
import findRoot from "lib/routing/Router/findRoot"
import findLanguageOnly from "lib/routing/Router/findLanguageOnly"
import findClient from "lib/routing/Router/findClient"
import findLanguage404 from "lib/routing/Router/findLanguage404"
import redirect404 from "lib/routing/Router/redirect404"
import Router from "lib/routing/Router"
jest.mock(`lib/languageDetector`, () => ({
  __esModule: true,
  default: { init: jest.fn() },
}))
jest.mock(`lib/routing/Router/useRoute`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/routing/Router/findRoute`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/routing/Router/findRoot`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/routing/Router/findLanguageOnly`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/routing/Router/findClient`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/routing/Router/findLanguage404`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/routing/Router/redirect404`, () => ({ __esModule: true, default: {} }))
describe(`lib/routing/Router`, () => {
  describe(`Router.prototype`, () => {
    it(`should expose methods`, () => {
      expect(Router.prototype.useRoute).toBe(useRoute)
      expect(Router.prototype.findRoute).toBe(findRoute)
      expect(Router.prototype.findRoot).toBe(findRoot)
      expect(Router.prototype.findLanguageOnly).toBe(findLanguageOnly)
      expect(Router.prototype.findClient).toBe(findClient)
      expect(Router.prototype.findLanguage404).toBe(findLanguage404)
      expect(Router.prototype.redirect404).toBe(redirect404)
      expect(Object.keys(Router.prototype)).toHaveLength(7)
    })
  })
  describe(`new Router`, () => {
    let router
    const routing = {
      languageCodes: [],
      locations: {},
      routes: {
        client: [
          { clientName: `foo`, other: `other` },
          { clientName: `bar`, other: `other` },
          { clientName: `baz`, other: `other` },
        ],
        other: `other`,
      },
    }
    beforeAll(() => {
      router = new Router(routing)
    })
    it(`should initialize the language detector`, () => {
      expect(languageDetector.init.mock.calls).toEqual([[[]]])
      expect(languageDetector.init.mock.calls[0][0]).toBe(routing.languageCodes)
    })
    it(`should expose properties`, () => {
      expect(router.locations).toBe(routing.locations)
      expect(router.renderEmpty).toEqual({ foo: false, bar: false, baz: false })
      expect(router.routes).toEqual({
        client: [
          {
            render: { foo: true, bar: false, baz: false },
            other: `other`,
          },
          {
            render: { foo: false, bar: true, baz: false },
            other: `other`,
          },
          {
            render: { foo: false, bar: false, baz: true },
            other: `other`,
          },
        ],
        other: `other`,
      })
      expect(Object.keys(router)).toHaveLength(3)
    })
  })
})
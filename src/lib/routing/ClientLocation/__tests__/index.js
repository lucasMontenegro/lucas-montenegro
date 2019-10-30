import useHook from "lib/routing/ClientLocation/useHook"
import ClientLocation from "lib/routing/ClientLocation"
jest.mock(`lib/routing/ClientLocation/useHook`, () => ({ __esModule: true, default: {} }))
describe(`lib/routing/ClientLocation`, () => {
  describe(`ClientLocation.prototype`, () => {
    it(`should expose the methods`, () => {
      expect(ClientLocation.prototype.useHook).toBe(useHook)
      expect(Object.keys(ClientLocation.prototype)).toHaveLength(1)
    })
  })
  describe(`new ClientLocation`, () => {
    const routing = {
      languageCodes: [`en`, `es`],
      locations: { foo: {} },
      linkTranslators: { foo: {} },
    }
    let result
    beforeAll(() => {
      result = new ClientLocation(`foo`, routing)
    })
    it(`should save the initial language`, () => {
      expect(result).toHaveProperty(`initialLanguage`, `en`)
    })
    it(`should save the initial location`, () => {
      expect(result).toHaveProperty(`initialLocation`)
      expect(result.initialLocation).toBe(routing.locations.foo)
    })
    it(`should save the link translators`, () => {
      expect(result).toHaveProperty(`translators`)
      expect(result.translators).toBe(routing.linkTranslators.foo)
    })
  })
})
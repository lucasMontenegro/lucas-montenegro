import useClientLocation from "lib/routing/ClientNavigator/useClientLocation"
import ClientNavigator from "lib/routing/ClientNavigator"
jest.mock(`lib/routing/ClientNavigator/useClientLocation`, () => ({
  __esModule: true,
  default: {},
}))
describe(`lib/routing/ClientNavigator`, () => {
  describe(`ClientNavigator.prototype`, () => {
    it(`should expose the methods`, () => {
      expect(ClientNavigator.prototype.useClientLocation).toBe(useClientLocation)
      expect(Object.keys(ClientNavigator.prototype)).toHaveLength(1)
    })
  })
  describe(`new ClientNavigator`, () => {
    const routing = {
      languageCodes: [`en`, `es`],
      locations: { foo: {} },
      linkTranslators: { foo: {} },
    }
    let result
    beforeAll(() => {
      result = new ClientNavigator(`foo`, routing)
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
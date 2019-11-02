import get from "lib/Translation/get"
import Translation from "lib/Translation"
jest.mock(`lib/Translation/get`, () => ({ __esModule: true, default: {} }))
describe(`lib/Translation`, () => {
  describe(`Translation.prototype`, () => {
    it(`should expose methods`, () => {
      expect(Translation.prototype.get).toBe(get)
      expect(Object.keys(Translation.prototype)).toHaveLength(1)
    })
  })
  describe(`new Translation`, () => {
    const source = {
      foo: {},
      bar: {},
    }
    let result
    beforeAll(() => {
      result = new Translation(source)
    })
    it(`should save the "source" object`, () => {
      expect(result.source).toBe(source)
    })
    it(`should set up a fallback value`, () => {
      expect(result.fallbackValue).toBe(source.foo)
    })
  })
})
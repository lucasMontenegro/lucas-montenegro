import languageDetector from "lib/languageDetector"
import isProduction from "lib/utils/isProduction"
import globals from "lib/utils/globals"
import get from "lib/Translation/get"
jest.mock(`lib/languageDetector`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: { console: { error: jest.fn() } },
}))
describe(`lib/Translation`, () => {
  const fallbackValue = {}
  const foo = {}
  const translation = {
    get,
    fallbackValue,
    source: { foo },
  }
  {
    const cases = [[true], [false]]
    const msg = `translation.get (translation is available, isProduction => %j)`
    describe.each(cases)(msg, production => {
      let result
      beforeAll(() => {
        isProduction.mockReturnValueOnce(production)
        languageDetector.get = () => `foo`
        result = translation.get()
      })
      it(`should not log any error`, () => {
        expect(globals.console.error.mock.calls).toEqual([])
      })
      it(`should return the translated value`, () => {
        expect(result).toBe(foo)
      })
    })
  }
  describe(`translation.get (missing translation, isProduction => true)`, () => {
    let result
    beforeAll(() => {
      isProduction.mockReturnValueOnce(true)
      languageDetector.get = () => `bar`
      result = translation.get()
    })
    it(`should log an error message`, () => {
      const msg = `Language code not supported in translation: bar`
      expect(globals.console.error.mock.calls).toEqual([[msg]])
      globals.console.error.mockClear()
    })
    it(`should return the fallback value`, () => {
      expect(result).toBe(fallbackValue)
    })
  })
  describe(`translation.get (missing translation, isProduction => false)`, () => {
    let result, error
    beforeAll(() => {
      isProduction.mockReturnValueOnce(false)
      languageDetector.get = () => `bar`
      try {
        result = translation.get()
      } catch (e) {
        error = e
      }
    })
    it(`should not log any error`, () => {
      expect(globals.console.error.mock.calls).toEqual([])
    })
    it(`should throw an error`, () => {
      expect(result).toBeUndefined()
      expect(error).toBeInstanceOf(Error)
      const msg = `Language code not supported in translation: bar`
      expect(error).toHaveProperty(`message`, msg)
    })
  })
})
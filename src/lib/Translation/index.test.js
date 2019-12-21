import languageDetector from "lib/languageDetector"
import isProduction from "lib/utils/isProduction"
import globals from "lib/utils/globals"
import Translation from "./index.js"
jest.mock(`lib/languageDetector`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: { console: { error: jest.fn() } },
}))
describe(`./index.js`, () => {
  describe(`new Translation`, () => {
    const source = { en: {}, es: {} }
    let translation
    beforeAll(() => {
      translation = new Translation(source)
    })
    it(`should save the "source" object`, () => {
      expect(translation.source).toBe(source)
    })
    it(`should set up a fallback value`, () => {
      expect(translation.fallbackValue).toBe(source.en)
    })
    {
      const msg = `translation.get (translation is available, isProduction => %j)`
      describe.each([[true], [false]])(msg, production => {
        let result
        beforeAll(() => {
          isProduction.mockReturnValueOnce(production)
          languageDetector.get = () => `es`
          result = translation.get()
        })
        it(`should not log any error`, () => {
          expect(globals.console.error.mock.calls).toEqual([])
        })
        it(`should return the translated value`, () => {
          expect(result).toBe(source.es)
        })
      })
    }
    describe(`translation.get (missing translation, isProduction => true)`, () => {
      let result
      beforeAll(() => {
        isProduction.mockReturnValueOnce(true)
        languageDetector.get = () => `pt`
        result = translation.get()
      })
      it(`should log an error message`, () => {
        const msg = `Language code not supported in translation: pt`
        expect(globals.console.error.mock.calls).toEqual([[msg]])
        globals.console.error.mockClear()
      })
      it(`should return the fallback value`, () => {
        expect(result).toBe(source.en)
      })
    })
    describe(`translation.get (missing translation, isProduction => false)`, () => {
      let result, error
      beforeAll(() => {
        isProduction.mockReturnValueOnce(false)
        languageDetector.get = () => `pt`
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
        expect(error).toBeInstanceOf(Error)
        const msg = `Language code not supported in translation: pt`
        expect(error).toHaveProperty(`message`, msg)
      })
    })
  })
})
import languageDetector from "lib/languageDetector"
import isProduction from "lib/utils/isProduction"
import globals from "lib/utils/globals"
import useTranslation from "./index.js"
jest.mock(`lib/languageDetector`, () => ({
  __esModule: true,
  default: { get: jest.fn() },
}))
jest.mock(`lib/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
jest.mock(`lib/utils/globals`, () => ({ __esModule: true, default: {} }))
describe(`./index.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([
      `react-scripts`, // react hooks linting
    ])).toMatchSnapshot()
  })
  describe(`useTranslation`, () => {
    let t
    beforeAll(() => {
      languageDetector.get.mockReturnValueOnce(`bar`)
      t = useTranslation()
    })
    it(`should return a function`, () => {
      expect(t).toBeInstanceOf(Function)
    })
    describe(`t (translation available)`, () => {
      it(`should return the proper translation`, () => {
        expect(t({
          foo: () => `foo language`,
          bar: () => `bar language`,
        })).toBe(`bar language`)
      })
    })
    describe(`t (missing translation, isProduction => true)`, () => {
      let result
      const error = jest.fn()
      beforeAll(() => {
        isProduction.mockReturnValueOnce(true)
        globals.console = { error }
        result = t({
          foo: () => `foo language`,
          baz: () => `baz language`,
        })
      })
      it(`should return the default translation`, () => {
        expect(result).toBe(`foo language`)
      })
      it(`should log an error message`, () => {
        expect(error.mock.calls)
          .toEqual([[`Language code (bar) not supported in translation, using default.`]])
      })
    })
    describe(`t (missing translation, isProduction => false)`, () => {
      it(`should throw an error`, () => {
        isProduction.mockReturnValueOnce(false)
        expect(() => t({
          foo: () => `foo language`,
          baz: () => `baz language`,
        })).toThrow(`Language code (bar) not supported in translation, using default.`)
      })
    })
  })
})
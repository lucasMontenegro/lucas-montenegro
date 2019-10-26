import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import supportedLanguages from "languages/supported"
import isProduction from "lib/utils/isProduction"
import { init, get, set } from "lib/languageDetector/i18n"
jest.mock(`i18next`, () => ({
  __esModule: true,
  default: { use: jest.fn(), init: jest.fn(), changeLanguage: jest.fn() },
}))
i18next.use.mockImplementation(() => i18next)
jest.mock(`i18next-browser-languagedetector`, () => ({
  __esModule: true,
  default: `i18next-browser-languagedetector`,
}))
jest.mock(`languages/supported`, () => ({ __esModule: true, default: [`en`, `es`] }))
jest.mock(`lib/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
describe(`lib/languageDetector`, () => {
  afterEach(() => {
    i18next.use.mockClear()
    i18next.init.mockClear()
    i18next.changeLanguage.mockClear()
    isProduction.mockClear()
  })
  describe(`init`, () => {
    it(`should not do anything if it's already initialized (isInitialized true)`, () => {
      i18next.isInitialized = true
      init()
      expect(i18next.use.mock.calls).toEqual([])
      expect(i18next.init.mock.calls).toEqual([])
      expect(i18next.changeLanguage.mock.calls).toEqual([])
      expect(isProduction.mock.calls).toEqual([])
    })
    {
      const msg = `should initialize i18next (isInitialized false, isProduction => %j)`
      test.each([[true], [false]])(msg, production => {
        isProduction.mockReturnValueOnce(production)
        i18next.isInitialized = false
        init()
        expect(i18next.use.mock.calls).toMatchSnapshot(`i18next.use`)
        expect(i18next.init.mock.calls).toMatchSnapshot(`i18next.init`)
        expect(i18next.changeLanguage.mock.calls).toEqual([])
        expect(isProduction.mock.calls).toEqual([[]])
      })
    }
  })
  describe(`get`, () => {
    it(`should return the language code`, () => {
      const language = {}
      i18next.language = language
      expect(get()).toBe(language)
      expect(i18next.use.mock.calls).toEqual([])
      expect(i18next.init.mock.calls).toEqual([])
      expect(i18next.changeLanguage.mock.calls).toEqual([])
      expect(isProduction.mock.calls).toEqual([])
    })
  })
  describe(`set`, () => {
    it(`should change the language code`, () => {
      const language = {}
      set(language)
      expect(i18next.use.mock.calls).toEqual([])
      expect(i18next.init.mock.calls).toEqual([])
      expect(i18next.changeLanguage.mock.calls).toEqual([[{}]])
      expect(i18next.changeLanguage.mock.calls[0][0]).toBe(language)
      expect(isProduction.mock.calls).toEqual([])
    })
  })
})
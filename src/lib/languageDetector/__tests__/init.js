import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import isProduction from "lib/utils/isProduction"
import init from "lib/languageDetector/init"
jest.mock(`i18next`, () => ({ __esModule: true, default: {} }))
const spy = jest.fn()
const makeSpyWrapper = name => (...args) => {
  spy(name, args)
  return i18next
}
i18next.use = makeSpyWrapper(`i18next.use`)
i18next.init = makeSpyWrapper(`i18next.init`)
jest.mock(`i18next-browser-languagedetector`, () => ({
  __esModule: true,
  default: `i18next-browser-languagedetector`,
}))
jest.mock(`lib/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
const languageCodes = [`foo`, `bar`]
describe(`lib/languageDetector/init`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([
      `i18next`,
      `i18next-browser-languagedetector`,
    ])).toMatchSnapshot()
  })
  afterEach(() => spy.mockClear())
  {
    const cases = [[true], [false]]
    const msg = `init (isInitialized true, production %j)`
    describe.each(cases)(msg, production => {
      beforeAll(() => {
        i18next.isInitialized = true
        isProduction.mockReturnValueOnce(production)
        init(languageCodes)
      })
      it(`should not call i18next methods`, () => {
        expect(spy.mock.calls).toEqual([])
      })
    })
  }
  {
    const cases = [[true], [false]]
    const msg = `init (isInitialized false, production %j)`
    describe.each(cases)(msg, production => {
      beforeAll(() => {
        i18next.isInitialized = false
        isProduction.mockReturnValueOnce(production)
        init(languageCodes)
      })
      it(`should initialize i18next`, () => {
        expect(spy.mock.calls).toMatchSnapshot()
      })
    })
  }
})
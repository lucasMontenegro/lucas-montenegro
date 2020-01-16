import i18next from "i18next"
import set from "lib/languageDetector/set"
jest.mock(`i18next`, () => ({
  __esModule: true,
  default: { changeLanguage: jest.fn() },
}))
describe(`lib/languageDetector/set`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`i18next`])).toMatchSnapshot()
  })
  it(`should change the language code`, () => {
    const languageCode = {}
    set(languageCode)
    expect(i18next.changeLanguage.mock.calls).toEqual([[{}]])
    expect(i18next.changeLanguage.mock.calls[0][0]).toBe(languageCode)
  })
})
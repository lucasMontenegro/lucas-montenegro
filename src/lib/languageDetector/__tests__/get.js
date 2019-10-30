import i18next from "i18next"
import get from "lib/languageDetector/get"
jest.mock(`i18next`, () => ({
  __esModule: true,
  default: { language: {} },
}))
describe(`lib/languageDetector/get`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`i18next`])).toMatchSnapshot()
  })
  it(`should return the language code`, () => {
    expect(get()).toBe(i18next.language)
  })
})
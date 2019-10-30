import init from "lib/languageDetector/init"
import get from "lib/languageDetector/get"
import set from "lib/languageDetector/set"
import useReadyState from "lib/languageDetector/useReadyState"
import languageDetector from "lib/languageDetector"
jest.mock(`lib/languageDetector/init`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/languageDetector/get`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/languageDetector/set`, () => ({ __esModule: true, default: {} }))
jest.mock(`lib/languageDetector/useReadyState`, () => ({ __esModule: true, default: {} }))
describe(`lib/languageDetector`, () => {
  it(`should re-export its dependencies`, () => {
    expect(languageDetector.init).toBe(init)
    expect(languageDetector.get).toBe(get)
    expect(languageDetector.set).toBe(set)
    expect(languageDetector.useReadyState).toBe(useReadyState)
    expect(Object.keys(languageDetector)).toHaveLength(4)
  })
})
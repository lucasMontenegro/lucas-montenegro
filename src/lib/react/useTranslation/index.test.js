import languageDetector from "lib/languageDetector"
import useTranslation from "./index.js"
jest.mock(`lib/languageDetector`, () => ({
  __esModule: true,
  default: { get: jest.fn() },
}))
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
    describe(`t (missing translation)`, () => {
      it(`should return the default translation`, () => {
        expect(t({
          foo: () => `foo language`,
          baz: () => `baz language`,
        })).toBe(`foo language`)
      })
    })
  })
})
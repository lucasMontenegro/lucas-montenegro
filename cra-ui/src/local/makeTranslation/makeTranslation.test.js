import makeTranslation from "local/makeTranslation"
jest.mock(`local/supportedLanguages`, () => ({ __esModule: true, default: [`en`, `es`] }))
describe(`local/makeTranslation`, () => {
  it(`should create translations`, () => {
    expect(makeTranslation(languageCode => languageCode)).toEqual({ en: `en`, es: `es` })
  })
  it(`should detect missing translations`, () => {
    expect(() => makeTranslation({ en: null })).toThrow()
  })
  it(`should detect unexpected translations`, () => {
    expect(() => makeTranslation({ en: null, es: null, pt: null })).toThrow()
  })
  it(`should detect unexpected input`, () => {
    expect(() => makeTranslation(null)).toThrow()
  })
})
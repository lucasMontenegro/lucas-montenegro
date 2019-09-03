import makeTranslations from "local/makeTranslations"
jest.mock(`local/supportedLanguages`, () => ({ __esModule: true, default: [`en`, `es`] }))
describe(`local/makeTranslations`, () => {
  it(`should create translations`, () => {
    expect(makeTranslations(languageCode => languageCode)).toEqual({ en: `en`, es: `es` })
  })
  it(`should detect missing translations`, () => {
    expect(() => makeTranslations({ en: null })).toThrow()
  })
  it(`should detect unexpected translations`, () => {
    expect(() => makeTranslations({ en: null, es: null, pt: null })).toThrow()
  })
  it(`should convert to Array`, () => {
    expect(makeTranslations({ en: `en`, es: `es` }, `toArray`)).toEqual([
      { languageCode: `en`, value: `en` },
      { languageCode: `es`, value: `es` },
    ])
  })
  it(`should detect unexpected input`, () => {
    expect(() => makeTranslations(null)).toThrow()
  })
})
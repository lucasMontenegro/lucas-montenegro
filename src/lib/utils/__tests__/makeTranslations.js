import makeTranslations from "lib/utils/makeTranslations"
jest.mock(`languages/supported`, () => ({ __esModule: true, default: [`en`, `es`] }))
describe(`lib/utils/makeTranslations`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`prop-types`])).toMatchSnapshot()
  })
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
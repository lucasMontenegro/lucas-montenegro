import supportedLanguages from "local/supportedLanguages"
describe(`local/i18n`, () => {
  it(`should support all languages`, () => {
    expect([`en`, `es`]).toEqual(supportedLanguages)
  })
})
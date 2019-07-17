import supportedLanguages from "local/supportedLanguages"
describe(`local/Router`, () => {
  it(`should support all languages`, () => {
    expect([`en`, `es`]).toEqual(supportedLanguages)
  })
})
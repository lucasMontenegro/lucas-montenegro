import supportedLanguages from "local/supportedLanguages"
describe(`local/core/Router`, () => {
  it(`should support all languages`, () => {
    expect([`en`, `es`]).toEqual(supportedLanguages)
  })
})
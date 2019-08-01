import supportedLanguages from "local/supportedLanguages"
describe(`local/core/drawer`, () => {
  it(`should support all languages`, () => {
    expect([`en`, `es`]).toEqual(supportedLanguages)
  })
})
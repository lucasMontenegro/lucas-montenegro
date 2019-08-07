import supportedLanguages from "local/supportedLanguages"
describe(`local/core/NavLink`, () => {
  it(`should support all languages`, () => {
    expect([`en`, `es`]).toEqual(supportedLanguages)
  })
})
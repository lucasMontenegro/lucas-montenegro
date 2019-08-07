import supportedLanguages from "local/supportedLanguages"
describe(`local/core/Drawer`, () => {
  it(`should support all languages`, () => {
    expect([`en`, `es`]).toEqual(supportedLanguages)
  })
})
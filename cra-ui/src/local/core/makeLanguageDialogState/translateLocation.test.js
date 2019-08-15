import translateLocation from "./translateLocation"
jest.mock("local/supportedLanguages", () => ({
  __esModule: true,
  default: [`en`, `es`],
}))
describe(`local/core/makeLanguageDialogState/translateLocation`, () => {
  it(`should translate locations`, () => {
    const translators = {
      en: {
        toIntl: str => `${str} toIntl en`,
        toLocal: str => `${str} toLocal en`,
      },
      es: {
        toIntl: str => `${str} toIntl es`,
        toLocal: str => `${str} toLocal es`,
      },
    }
    expect(translateLocation(`en`, `start`, translators)).toEqual({
      en: `start`,
      es: `start toIntl en toLocal es`,
    })
    expect(translateLocation(`es`, `start`, translators)).toEqual({
      en: `start toIntl es toLocal en`,
      es: `start`,
    })
  })
})
import supportedLanguages from "local/supportedLanguages"
import translateLocation from "./translateLocation"
describe(`local/core/LanguageDialog`, () => {
  it(`should support all languages`, () => {
    expect([`en`, `es`]).toEqual(supportedLanguages)
  })
  it(`should translate locations`, () => {
    const translations = {
      en: {
        toIntl: str => `${str} toIntl en`,
        toLocal: str => `${str} toLocal en`,
      },
      es: {
        toIntl: str => `${str} toIntl es`,
        toLocal: str => `${str} toLocal es`,
      },
    }
    expect(translateLocation(`en`, `start`, translations)).toEqual({
      en: `start`,
      es: `start toIntl en toLocal es`,
    })
    expect(translateLocation(`es`, `start`, translations)).toEqual({
      en: `start toIntl es toLocal en`,
      es: `start`,
    })
  })
})
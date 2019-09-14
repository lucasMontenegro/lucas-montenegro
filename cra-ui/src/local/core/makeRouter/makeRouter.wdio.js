import supportedLanguages from "local/supportedLanguages"
import { expect } from "local/wdio/chai"
import addInputText from "local/wdio/addInputText"
function expectToRender (expected) {
  Object.keys(expected).forEach(selector => {
    expect($(selector).getText(), `${selector} getText`).to.equal(expected[selector])
  })
}
function setDetectedLanguage (str) {
  addInputText($(`#languageCode`), str)
  $(`#setDetectedLanguage`).click()
}
describe(`local/core/makeRouter`, () => {
  describe(`makeLanguageDetector`, () => {
    beforeEach(() => {
      browser.url(`/examples/core/makeRouter/makeLanguageDetector`)
    })
    it(`should initialize`, () => {
      expectToRender({
        "#detectedLanguage0 .type": `null`,
        "#detectedLanguage0 .text": ``,
        "#detectedLanguage1 .type": `string`,
      })
      {
        const selector = `#detectedLanguage1 .text`
        expect($(selector).getText(), `${selector} getText`).to.have.lengthOf.above(1)
      }
    })
    it(`should update the detected language`, () => {
      supportedLanguages.forEach(languageCode => {
        setDetectedLanguage(languageCode)
        expectToRender({ "#detectedLanguage": languageCode })
      })
    })
    it(`should store the new language`, () => {
      supportedLanguages.forEach(languageCode => {
        setDetectedLanguage(languageCode)
        browser.url(`/examples/core/makeRouter/makeLanguageDetector`)
        expectToRender({ "#detectedLanguage": languageCode })
      })
    })
    it(`should expose the detected language`, () => {
      const [firstLanguage, ...rest] = supportedLanguages
      setDetectedLanguage(firstLanguage)
      browser.url(`/examples/core/makeRouter/makeLanguageDetector`)
      const updateCount = $(`#updateCount`)
      rest.forEach(languageCode => {
        setDetectedLanguage(languageCode)
        updateCount.click()
      })
      expectToRender(supportedLanguages.reduce((expected, languageCode, i) => {
        const id = `#detectedLanguage${i + 1}`
        expected[`${id} .type`] = `string`
        expected[`${id} .text`] = languageCode
        return expected
      }, {
        "#detectedLanguage0 .type": `null`,
        "#detectedLanguage0 .text": ``,
        "#count": supportedLanguages.length.toString(),
      }))
    })
  })
})
import { expect } from "local/wdio/chai"
import supportedLanguages from "local/supportedLanguages"
import baseUrl from "local/wdio/baseUrl"
function makeUrl (languageCode, hidden, referrer) {
  return (
    `${baseUrl}/examples/clients/createNotFound/NotFoundView/${languageCode}/${hidden}/${referrer}`
  )
}
describe(`local/clients/createNotFound`, () => {
  describe(`NotFoundView`, () => {
    let expectBaseClient, expectTranslation, expectLink
    before(() => {
      expectBaseClient = function expectBaseClient () {
        expect($(`#BaseClient`).isDisplayed(), `#BaseClient isDisplayed`).to.be.true
        ;[`icons`, `subtitles`].forEach(key => supportedLanguages.forEach(languageCode => {
          const selector = `#${key}-${languageCode}`
          expect($(selector).isDisplayed(), `${selector} isDisplayed`).to.be.true
        }))
      }
      expectTranslation = function expectTranslation (selector) {
        const element = $(selector)
        expect(element.isDisplayed(), `${selector} isDisplayed`).to.be.true
        expect(element.getText(), `${selector} getText`).to.have.lengthOf.above(1)
      }
      expectLink = function expectLink (selector, value) {
        const element = $(selector)
        expect(element.isDisplayed(), `${selector} isDisplayed`).to.be.true
        expect(element.getAttribute(`href`), `${selector} getAttribute href`)
          .to.equal(`${baseUrl}${value}`)
        expect(element.getText(), `${selector} getText`).to.have.lengthOf.above(1)
      }
    })
    it(`should not render when hidden`, () => {
      supportedLanguages.forEach(languageCode => {
        ;[`nullReferrer`, `stringReferrer`].forEach(referrer => {
          browser.url(makeUrl(languageCode, `hidden`, referrer))
          expect($(`body`).isExisting(), `body isExisting`).to.be.true
          expect($(`#BaseClient`).isExisting(), `#BaseClient isExisting`).to.be.false
        })
      })
    })
    it(`should render a default message`, () => {
      supportedLanguages.forEach(languageCode => {
        browser.url(makeUrl(languageCode, `visible`, `nullReferrer`))
        expectBaseClient()
        expectTranslation(`#default-message`)
        expectLink(`#go-to-home`, `/${languageCode}/home`)
      })
    })
    it(`should render an error message`, () => {
      supportedLanguages.forEach(languageCode => {
        browser.url(makeUrl(languageCode, `visible`, `stringReferrer`))
        expectBaseClient()
        expectTranslation(`#error-message`)
        {
          const element = $(`#referrer`)
          expect(element.isDisplayed(), `#referrer isDisplayed`).to.be.true
          expect(element.getText(), `#referrer getText`).to.equal(`referrer`)
        }
        expectLink(`#close-not-found`, `/${languageCode}/notFound`)
      })
    })
  })
})
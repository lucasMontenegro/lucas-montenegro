import { expect } from "chai"
import supportedLanguages from "local/supportedLanguages"
describe(`local/core/LanguageDialog`, () => {
  it(`should render the button`, () => {
    supportedLanguages.forEach(languageCode => {
      browser.url(`/examples/core/LanguageDialog/${languageCode}`)
      const button = $(`#open-language-dialog`)
      expect(button.isDisplayed(), `#language-dialog-button isDisplayed`).to.be.true
      const msg = `#language-dialog-button getAttribute aria-label`
      expect(button.getAttribute(`aria-label`), msg).to.have.lengthOf.above(1)
    })
  })
  it(`should open`, () => {
    browser.url(`/examples/core/LanguageDialog/en`)
    const dialog = $(`#language-dialog`)
    expect(dialog.isDisplayed(), `#language-dialog isDisplayed`).to.be.false
    $(`#open-language-dialog`).click()
    dialog.waitForDisplayed(1000)
    expect(dialog.isDisplayed(), `#language-dialog isDisplayed`).to.be.true
  })
  it(`should render the dialog`, () => {
    supportedLanguages.forEach(languageCode => {
      browser.url(`/examples/core/LanguageDialog/${languageCode}`)
      $(`#open-language-dialog`).click()
      $(`#language-dialog`).waitForDisplayed(1000)
      function expectDisplayed (elem, selector) {
        elem.waitForDisplayed(1000)
        expect(elem.isDisplayed(), `${selector} isDisplayed`).to.be.true
      }
      function expectText (elem, selector) {
        expect(elem.getText(), `${selector} getText`).to.have.lengthOf.above(1)
      }
      function expectTextAttribute (elem, selector, attribute, expected) {
        const msg = `${selector} getAttribute ${attribute}`
        const { to } = expect(elem.getAttribute(attribute), msg)
        expected ? to.equal(expected) : to.have.lengthOf.above(1)
      }
      {
        const selector = `#language-dialog-title`
        const elem = $(selector)
        expectDisplayed(elem, selector)
        expectText(elem, selector)
      }
      {
        const selector = `#language-dialog-avatar`
        expectDisplayed($(selector), selector)
      }
      {
        const selector = `#close-language-dialog`
        const elem = $(selector)
        expectDisplayed(elem, selector)
        expectText(elem, selector)
      }
      const currentLanguage = languageCode
      supportedLanguages.forEach(languageCode => {
        const liSelector = `#language-link-${languageCode}`
        if (languageCode === currentLanguage) {
          const li = $(liSelector)
          expectDisplayed(li, liSelector)
          expectTextAttribute(li, liSelector, `aria-label`)
        } else {
          const selector = `${liSelector} > div > span > a`
          const anchor = $(selector)
          expectDisplayed(anchor, selector)
          const href = `/examples/core/LanguageDialog/${languageCode}`
          expectTextAttribute(anchor, selector, `href`, href)
        }
      })
    })
  })
  it(`should close from the modal`, () => {
    browser.url(`/examples/core/LanguageDialog/en`)
    const dialog = $(`#language-dialog`)
    $(`#open-language-dialog`).click()
    dialog.waitForDisplayed(1000)
    browser.keys(`Escape`)
    dialog.waitForDisplayed(1000, true)
    expect(dialog.isDisplayed(), `#language-dialog isDisplayed`).to.be.false
  })
  it(`should close from the close button`, () => {
    browser.url(`/examples/core/LanguageDialog/en`)
    const dialog = $(`#language-dialog`)
    $(`#open-language-dialog`).click()
    dialog.waitForDisplayed(1000)
    $(`#close-language-dialog`).click()
    dialog.waitForDisplayed(1000, true)
    expect(dialog.isDisplayed(), `#language-dialog isDisplayed`).to.be.false
  })
  it(`should close after clicking the link`, () => {
    supportedLanguages.forEach(languageCode => supportedLanguages.forEach(newLanguage => {
      if (newLanguage === languageCode) {
        return
      }
      browser.url(`/examples/core/LanguageDialog/${languageCode}`)
      $(`#open-language-dialog`).click()
      $(`#language-link-${newLanguage} > div > span > a`).click()
      const dialog = $(`#language-dialog`)
      dialog.waitForDisplayed(1000, true)
      expect(dialog.isDisplayed(), `#language-dialog isDisplayed`).to.be.false
    }))
  })
})
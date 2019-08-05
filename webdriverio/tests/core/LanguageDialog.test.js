const describeOrSkip = require("../describeOrSkip")
const { expect } = require("../chai")
const supportedLanguages = require("../supportedLanguages")
const baseUrl = require("../baseUrl")
const foo = Math.floor(Math.random() * 1000).toString()
const liTextSelectors = supportedLanguages.map((languageCode, i) => ({
  languageCode,
  selector: `#language-dialog-nav > ul > li:nth-child(${i + 1}) > div`,
}))
describeOrSkip(`local/core/LanguageDialog`, () => {
  it(`should support all languages`, () => {
    expect([`en`, `es`]).to.deep.equal(supportedLanguages)
  })
  it(`should render the button`, () => {
    browser.url(`/examples/core/LanguageDialog/en/${foo}`)
    supportedLanguages.forEach(languageCode => {
      $(`#go-to-${languageCode}`).click()
      const button = $(`#language-dialog-button`)
      expect(button.isDisplayed(), `#language-dialog-button isDisplayed`).to.be.true
      const msg = `#language-dialog-button getAttribute aria-label`
      expect(button.getAttribute(`aria-label`), msg).to.have.lengthOf.above(1)
    })
  })
  it(`should open, render and close`, () => {
    browser.url(`/examples/core/LanguageDialog/en/${foo}`)
    const selectors = [
      `#language-dialog`,
      `#language-dialog-title`,
      `#language-dialog-avatar`,
      `#language-dialog-nav`,
      `#close-language-dialog`,
    ]
    supportedLanguages.forEach(languageCode => {
      $(`#go-to-${languageCode}`).click()
      const button = $(`#language-dialog-button`)
      const elements = selectors.map(selector => ({ selector, elem: $(selector) }))
      const expectDisplayed = (value, msg) => elements.map(({ selector, elem }) => {
        elem.waitForDisplayed(1000, value === `false`)
        expect(elem.isDisplayed(), `${selector} isDisplayed${msg || ``}`).to.be[value]
      })
      expectDisplayed(`false`, ` (dialog initially closed)`)
      button.click()
      expectDisplayed(`true`)
      browser.keys(`Escape`)
      expectDisplayed(`false`, ` (close dialog from the modal)`)
      button.click()
      expectDisplayed(`true`)
      $(`#close-language-dialog`).click()
      expectDisplayed(`false`, ` (close dialog from the button)`)
    })
  })
  it(`should properly render the title and links`, () => {
    browser.url(`/examples/core/LanguageDialog/en/${foo}`)
    supportedLanguages.forEach(languageCode => {
      $(`#go-to-${languageCode}`).click()
      $(`#language-dialog-button`).click()
      const title = $(`#language-dialog-title`)
      title.waitForDisplayed(1000)
      expect(title.getText(), `#language-dialog-title getText`).to.have.lengthOf.above(1)
      const currentLanguage = languageCode
      liTextSelectors.forEach(({ languageCode, selector }) => {
        if (languageCode === currentLanguage) {
          const span = $(selector)
          expect(span.isDisplayed(), `${selector} ${languageCode} isDisplayed`).to.be.true
          const msg = `${selector} getAttribute aria-label`
          expect(span.getAttribute(`aria-label`), msg).to.have.lengthOf.above(1)
        } else {
          const anchorSelector = `${selector} > span > a`
          const anchor = $(anchorSelector)
          expect(anchor.isDisplayed(), `${anchorSelector} ${languageCode} isDisplayed`).to.be.true
          expect(
            anchor.getAttribute(`href`),
            `${anchorSelector} ${languageCode} getAttribute href`
          ).to.equal(`${baseUrl}/examples/core/router/${languageCode}/example/${foo}`)
        }
      })
      browser.keys(`Escape`)
    })
  })
  it(`should navigate`, () => {
    supportedLanguages.forEach(languageCode => {
      browser.url(`/examples/core/LanguageDialog/${languageCode}/${foo}`)
      const currentLanguage = languageCode
      liTextSelectors.forEach(({ languageCode, selector }) => {
        if (languageCode === currentLanguage) {
          return
        }
        $(`#language-dialog-button`).click()
        $(`${selector} > span > a`).click()
        const pathname = `/examples/core/router/${languageCode}/example/${foo}`
        expect(browser.getUrl(), `browser.getUrl`).to.equal(`${baseUrl}${pathname}`)
        const elem = $(`#router-pathname`)
        expect(elem.isDisplayed(), `#router-pathname: isDisplayed`).to.be.true
        const text = `location.pathname: ${pathname}`
        expect(elem.getText(), `#router-pathname: getText`).to.equal(text)
        browser.back()
      })
    })
  })
})
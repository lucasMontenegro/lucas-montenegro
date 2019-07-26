const describeOrSkip = require("./describeOrSkip")
const { expect } = require("./chai")
const supportedLanguages = require("./supportedLanguages")
const baseUrl = require("./baseUrl")
const n = supportedLanguages.length
const linkSelectors = supportedLanguages.map((languageCode, i) => ({
  languageCode,
  selector: `#language-menu > div:nth-child(3) > ul > li:nth-child(${i + 1}) > a`,
}))
describeOrSkip(`local/LanguageMenu`, () => {
  it(`should render`, () => {
    browser.url(`/examples/languageMenu`)
    const switchLanguage = $(`#switchLanguage`)
    for (let i = 0; i < n; i++) {
      const menu = $(`#language-menu`)
      expect(menu.isDisplayed(), `#language-menu: isDisplayed`).to.be.false
      const button = $(`#language-menu-wrapper > button`)
      expect(button.isDisplayed(), `#language-menu-wrapper > button: isDisplayed`).to.be.true
      button.click()
      expect(menu.isDisplayed(), `#language-menu: isDisplayed`).to.be.true
      linkSelectors.forEach(({ languageCode, selector }) => {
        const link = $(selector)
        expect(link.isDisplayed(), `${selector}: isDisplayed`).to.be.true
        expect(link.getAttribute(`href`), `${selector}: getAttribute href`)
          .to.equal(`${baseUrl}/examples/router/${languageCode}/example`)
      })
      browser.keys(`Escape`)
      switchLanguage.click()
    }
  })
  it(`should navigate`, () => {
    browser.url(`/examples/languageMenu`)
    const switchLanguage = $(`#switchLanguage`)
    for (let i = 0; i < n; i++) {
      for (let k = 0; k < i; k++) {
        switchLanguage.click()
      }
      const button = $(`#language-menu-wrapper > button`)
      linkSelectors.forEach(({ languageCode, selector }) => {
        button.click()
        $(selector).click()
        expect(browser.getUrl(), `browser.getUrl`)
          .to.equal(`${baseUrl}/examples/router/${languageCode}/example`)
        browser.back()
      })
    }
  })
})
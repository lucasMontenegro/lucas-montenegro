const describeOrSkip = require("../describeOrSkip")
const { expect } = require("../chai")
const supportedLanguages = require("../supportedLanguages")
const baseUrl = require("../baseUrl")
const foo = Math.floor(Math.random() * 1000).toString()
const linkSelectors = supportedLanguages.map((languageCode, i) => ({
  languageCode,
  selector: `#language-menu > div:nth-child(3) > ul > li:nth-child(${i + 1}) > a`,
}))
describeOrSkip(`local/core/LanguageMenu`, () => {
  it(`should support all languages`, () => {
    expect([`en`, `es`]).to.deep.equal(supportedLanguages)
  })
  it(`should render`, () => {
    browser.url(`/examples/core/LanguageMenu/en/${foo}`)
    supportedLanguages.forEach(languageCode => {
      $(`#go-to-${languageCode}`).click()
      const menu = $(`#language-menu`)
      expect(menu.isDisplayed(), `#language-menu: isDisplayed`).to.be.false
      const button = $(`#language-menu-wrapper > button`)
      expect(button.isDisplayed(), `#language-menu-wrapper > button: isDisplayed`).to.be.true
      button.click()
      expect(menu.isDisplayed(), `#language-menu: isDisplayed`).to.be.true
      linkSelectors.forEach(({ languageCode, selector }) => {
        const link = $(selector)
        expect(link.isDisplayed(), `${selector} ${languageCode}: isDisplayed`).to.be.true
        const url = `${baseUrl}/examples/core/routingMountPoint/${languageCode}/example/${foo}`
        expect(link.getAttribute(`href`), `${selector}: getAttribute href`).to.equal(url)
      })
      browser.keys(`Escape`)
    })
  })
  it(`should navigate`, () => {
    supportedLanguages.forEach(languageCode => {
      browser.url(`/examples/core/LanguageMenu/${languageCode}/${foo}`)
      linkSelectors.forEach(({ languageCode, selector }) => {
        $(`#language-menu-wrapper > button`).click()
        $(selector).click()
        const pathname = `/examples/core/routingMountPoint/${languageCode}/example/${foo}`
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
const { expect } = require("../chai")
const supportedLanguages = require("../supportedLanguages")
const baseUrl = require("../baseUrl")
function expectToRender (active, languageCode) {
  const liSelector = `#li-${active}-${languageCode}`
  const li = $(liSelector)
  {
    const selector = `.nav-icon-${languageCode}`
    expect(li.$(selector).isDisplayed(), `${liSelector} ${selector} isDisplayed`).to.be.true
  }
  {
    const selector = `#nav-link-${active}-${languageCode}`
    const navLink = li.$(selector)
    expect(navLink.isDisplayed(), `${liSelector} ${selector} isDisplayed`).to.be.true
    expect(
      navLink.getText(),
      `${liSelector} ${selector} getText`
    ).to.equal(`nav link ${languageCode}`)
    expect(
      navLink.getAttribute(`href`),
      `${liSelector} ${selector} getAttribute href`
    ).to.equal(`${baseUrl}/examples/core/NavLink/target`)
  }
  if (active) {
    const selector = `${liSelector} > div`
    expect(
      $(selector).getCSSProperty(`color`).parsed.hex,
      `${selector} getCSSProperty color`
    ).to.equal(`#4fc3f7`)
  }
}
describe(`local/core/NavLink`, () => {
  it(`should render`, () => {
    browser.url(`/examples/core/NavLink/example`)
    supportedLanguages.forEach(languageCode => [true, false].forEach(active => {
      expectToRender(active, languageCode)
    }))
  })
})
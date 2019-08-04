const describeOrSkip = require("../describeOrSkip")
const { expect } = require("../chai")
const supportedLanguages = require("../supportedLanguages")
const baseUrl = require("../baseUrl")
const rootPathname = `/examples/core/NavButton`
const makeTargetPathname = (languageCode, foo) => (
  `/examples/core/router/${languageCode}/example/${foo}`
)
const makeTargetUrl = (languageCode, foo) => `${baseUrl}${makeTargetPathname(languageCode, foo)}`
const selector = `#nav-list > li:first-child > div > a`
function expectToRender (languageCode, foo,) {
  const navButton = $(selector)
  expect(navButton.isDisplayed(), `${selector}: isDisplayed`).to.be.true
  const text = `EXAMPLE APP ${languageCode.toUpperCase()}`
  expect(navButton.getText(), `${selector}: getText`).to.equal(text)
  const url = makeTargetUrl(languageCode, foo)
  expect(navButton.getAttribute(`href`), `${selector}: getAttribute href`).to.equal(url)
}
describeOrSkip(`local/core/NavButton`, () => {
  it(`should support all languages`, () => {
    expect([`en`, `es`]).to.deep.equal(supportedLanguages)
  })
  it(`should render and navigate`, () => {
    browser.url(rootPathname)
    $(`#match-en-7`).click()
    expectToRender(`en`, `7`)
    $(selector).click()
    expect(browser.getUrl(), `browser.getUrl`).to.equal(makeTargetUrl(`en`, `7`))
    const elem = $(`#router-pathname`)
    expect(elem.isDisplayed(), `#router-pathname: isDisplayed`).to.be.true
    const text = `location.pathname: ${makeTargetPathname(`en`, `7`)}`
    expect(elem.getText(), `#router-pathname: getText`).to.equal(text)
  })
  it(`should update the location`, () => {
    browser.url(rootPathname)
    $(`#doNotMatch-en`).click()
    expectToRender(`en`, `0`)
    $(`#match-en-7`).click()
    expectToRender(`en`, `7`)
  })
  it(`should translate the location`, () => {
    browser.url(rootPathname)
    supportedLanguages.forEach(languageCode => {
      $(`#doNotMatch-${languageCode}`).click()
      expectToRender(languageCode, `0`)
    })
    $(`#match-en-7`).click()
    supportedLanguages.forEach(languageCode => {
      $(`#doNotMatch-${languageCode}`).click()
      expectToRender(languageCode, `7`)
    })
  })
})
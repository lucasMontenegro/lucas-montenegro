const describeOrSkip = require("../describeOrSkip")
const { expect } = require("../chai")
const supportedLanguages = require("../supportedLanguages")
const baseUrl = require("../baseUrl")
const rootPathname = `/examples/core/AppButton`
const makeTargetPathname = (languageCode, foo) => (
  `/examples/core/routingMountPoint/${languageCode}/example/${foo}`
)
const makeTargetUrl = (languageCode, foo) => `${baseUrl}${makeTargetPathname(languageCode, foo)}`
const selector = `#nav-link-wrapper > a:nth-child(1)`
function expectToRender (languageCode, foo,) {
  const appButton = $(selector)
  expect(appButton.isDisplayed(), `${selector}: isDisplayed`).to.be.true
  const text = `EXAMPLE APP ${languageCode.toUpperCase()}`
  expect(appButton.getText(), `${selector}: getText`).to.equal(text)
  const url = makeTargetUrl(languageCode, foo)
  expect(appButton.getAttribute(`href`), `${selector}: getAttribute href`).to.equal(url)
}
describeOrSkip(`local/core/AppButton`, () => {
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
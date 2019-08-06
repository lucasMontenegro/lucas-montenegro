const { expect } = require("../chai")
const supportedLanguages = require("../supportedLanguages")
const baseUrl = require("../baseUrl")
const rootPathname = `/examples/core/NavListItem`
const makeTargetPathname = (languageCode, foo) => (
  `/examples/core/router/${languageCode}/example/${foo}`
)
const makeTargetUrl = (languageCode, foo) => `${baseUrl}${makeTargetPathname(languageCode, foo)}`
const selectors = {
  icon: `#nav-list > li:first-child > div > div > div:first-child`,
  anchor: `#nav-list > li:first-child > div > div > div:nth-child(2) > span > a`,
}
function expectToRender (languageCode, foo,) {
  const anchor = $(selectors.anchor)
  expect(anchor.isDisplayed(), `Link isDisplayed`).to.be.true
  expect(anchor.getText(), `Link getText`).to.equal(`example app ${languageCode}`)
  const url = makeTargetUrl(languageCode, foo)
  expect(anchor.getAttribute(`href`), `Link getAttribute href`).to.equal(url)
  expect($(selectors.icon).isDisplayed(), `Avatar isDisplayed`).to.be.true
}
describe(`local/core/NavListItem`, () => {
  it(`should support all languages`, () => {
    expect([`en`, `es`]).to.deep.equal(supportedLanguages)
  })
  it(`should render and navigate`, () => {
    browser.url(rootPathname)
    $(`#match-en-7`).click()
    expectToRender(`en`, `7`)
    $(selectors.anchor).click()
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
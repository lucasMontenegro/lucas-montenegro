const { expect } = require("../chai")
const supportedLanguages = require("../supportedLanguages")
function makeUrl (match, languageCode, foo) {
  return `/examples/core/AppLocation/${match}/${languageCode}/${foo}`
}
function expectToRender (values) {
  const expected = {
    ...values,
    pathname: `/examples/core/router/${values.languageCode}/example/${values.savedFoo}`,
  }
  ;[
    { key: `match`, selector: `#match` },
    { key: `languageCode`, selector: `#language-code` },
    { key: `pathname`, selector: `#pathname` },
    { key: `foo`, selector: `#foo` },
  ].forEach(({ key, selector }) => {
    expect($(selector).getText(), `${selector} getText`).to.equal(expected[key])
  })
}
describe(`local/core/AppLocation`, () => {
  it(`should render the initial location`, () => {
    const foo = `123`
    const match = `false`
    supportedLanguages.forEach(languageCode => {
      browser.url(makeUrl(match, languageCode, foo))
      expectToRender({ match, languageCode, foo, savedFoo: `0` })
    })
  })
  it(`should render the matched location`, () => {
    const foo = `123`
    const match = `true`
    supportedLanguages.forEach(languageCode => {
      browser.url(makeUrl(match, languageCode, foo))
      expectToRender({ match, languageCode, foo, savedFoo: foo })
    })
  })
  it(`should update the location`, () => {
    const foo = `456`
    const match = `true`
    supportedLanguages.forEach(languageCode => {
      browser.url(makeUrl(`false`, `en`, `123`))
      $(`#${match}-${languageCode}-${foo}`).click()
      expectToRender({ match, languageCode, foo, savedFoo: foo })
    })
  })
  it(`should translate the updated location`, () => {
    const savedFoo = `456`
    supportedLanguages.forEach(initialLanguage => {
      browser.url(makeUrl(`false`, `en`, `123`))
      $(`#true-${initialLanguage}-${savedFoo}`).click()
      const foo = `789`
      const match = `false`
      supportedLanguages.forEach(languageCode => {
        $(`#${match}-${languageCode}-${foo}`).click()
        expectToRender({ match, languageCode, foo, savedFoo })
      })
    })
  })
})
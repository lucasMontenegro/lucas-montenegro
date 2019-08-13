const { expect } = require("../chai")
const supportedLanguages = require("../supportedLanguages")
function makeExamplePathname (languageCode, foo) {
  return `/examples/core/router/${languageCode}/example/${foo}`
}
function makeHomePathname (languageCode) {
  return `/examples/core/router/${languageCode}/home`
}
function expectToRender (expected) {
  Object.keys(expected).forEach(key => {
    expect($(`#${key}`).getText(), `#${key} getText`).to.equal(expected[key])
  })
}
function enterText (elem, str) {
  elem.addValue(new Array(elem.getValue().length).fill('Backspace'))
  elem.addValue(str)
}
describe(`local/core/makeAppLocation`, () => {
  let navigate, toggleMounted, match = false
  before(() => {
    browser.url(`/examples/core/makeAppLocation`)
    const elements = {
      languageCode: $(`#languageCode`),
      foo: $(`#foo`),
      navigate: $(`#navigate`),
      toggleMounted: $(`#toggleMounted`),
    }
    navigate = function navigate (values) {
      enterText(elements.foo, values.foo)
      enterText(elements.languageCode, values.languageCode)
      elements.navigate.click()
    }
    toggleMounted = function toggleMounted () {
      elements.toggleMounted.click()
    }
    toggleMounted() // initially mounted
  })
  it(`should render the initial location`, () => {
    supportedLanguages.forEach(languageCode => {
      toggleMounted() // unmount
      navigate({ foo: ``, languageCode })
      toggleMounted()
      expectToRender({
        pathname: makeHomePathname(languageCode),
        appPathname: makeExamplePathname(languageCode, `0`),
      })
    })
  })
  it(`should update the app location`, () => {
    supportedLanguages.forEach(languageCode => {
      ;[`24`, `688`].forEach(foo => {
        navigate({ foo, languageCode })
        const appPathname = makeExamplePathname(languageCode, foo)
        expectToRender({ pathname: appPathname, appPathname })
        navigate({ foo: ``, languageCode })
        expectToRender({ pathname: makeHomePathname(languageCode), appPathname })
      })
    })
  })
  it(`should translate the updated location`, () => {
    const foo = `712`
    supportedLanguages.forEach(initialLanguage => {
      supportedLanguages.forEach(languageCode => {
        navigate({ foo, languageCode: initialLanguage })
        navigate({ foo: ``, languageCode })
        expectToRender({
          pathname: makeHomePathname(languageCode),
          appPathname: makeExamplePathname(languageCode, foo),
        })
      })
    })
  })
})
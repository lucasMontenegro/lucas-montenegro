const { expect } = require("../chai")
const supportedLanguages = require("../supportedLanguages")
function makeExamplePathname (languageCode, foo) {
  return `/examples/core/integrated/${languageCode}/example/${foo}`
}
function makeHomePathname (languageCode) {
  return `/examples/core/integrated/${languageCode}/home`
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
describe(`local/core/makeClientLocation`, () => {
  let navigate, toggleMounted, match = false
  before(() => {
    browser.url(`/examples/core/makeClientLocation`)
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
        clientPathname: makeExamplePathname(languageCode, `0`),
      })
    })
  })
  it(`should update the client location`, () => {
    supportedLanguages.forEach(languageCode => {
      ;[`24`, `688`].forEach(foo => {
        navigate({ foo, languageCode })
        const clientPathname = makeExamplePathname(languageCode, foo)
        expectToRender({ pathname: clientPathname, clientPathname })
        navigate({ foo: ``, languageCode })
        expectToRender({ pathname: makeHomePathname(languageCode), clientPathname })
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
          clientPathname: makeExamplePathname(languageCode, foo),
        })
      })
    })
  })
})
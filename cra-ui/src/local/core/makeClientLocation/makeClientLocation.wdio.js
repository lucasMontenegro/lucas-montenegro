import { expect } from "local/wdio/chai"
import addInputText from "local/wdio/addInputText"
import supportedLanguages from "local/supportedLanguages"
import makePathname from "./makePathname"
function expectToRender (expected) {
  Object.keys(expected).forEach(key => {
    expect($(`#${key}`).getText(), `#${key} getText`).to.equal(expected[key])
  })
}
describe(`local/core/makeClientLocation`, () => {
  let navigate, toggleMounted, match = false
  before(() => {
    browser.url(`/examples/core/makeClientLocation`)
    {
      const button = $(`#navigate`)
      const elements = [$(`#languageCode`), $(`#foo`)]
      navigate = function navigate (...args) {
        elements.forEach((element, i) => addInputText(element, args[i]))
        button.click()
      }
    }
    toggleMounted = $(`#toggleMounted`)
  })
  it(`should render the initial location`, () => {
    supportedLanguages.forEach(languageCode => {
      toggleMounted.click() // unmount
      navigate(languageCode, ``)
      toggleMounted.click()
      expectToRender({
        pathname: makePathname.home(languageCode),
        clientPathname: makePathname.example(languageCode, `0`),
      })
    })
  })
  it(`should update the client location`, () => {
    supportedLanguages.forEach(languageCode => {
      ;[`24`, `688`].forEach(foo => {
        navigate(languageCode, foo)
        const clientPathname = makePathname.example(languageCode, foo)
        expectToRender({ pathname: clientPathname, clientPathname })
        navigate(languageCode, ``)
        expectToRender({ pathname: makePathname.home(languageCode), clientPathname })
      })
    })
  })
  it(`should translate the updated location`, () => {
    const foo = `712`
    supportedLanguages.forEach(initialLanguage => {
      supportedLanguages.forEach(languageCode => {
        navigate(initialLanguage, foo)
        navigate(languageCode, ``)
        expectToRender({
          pathname: makePathname.home(languageCode),
          clientPathname: makePathname.example(languageCode, foo),
        })
      })
    })
  })
})
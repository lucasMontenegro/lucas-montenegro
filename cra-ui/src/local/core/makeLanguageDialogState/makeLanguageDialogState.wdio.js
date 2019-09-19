import { expect } from "chai"
import addInputText from "local/wdio/addInputText"
import supportedLanguages from "local/supportedLanguages"
import makePathname from "./makePathname"
describe(`local/core/makeLanguageDialogState`, () => {
  let expectToRender, open, close, navigate
  const initialValues = {
    pathname: makePathname(`en`, `0`),
    foo: `0`,
    isOpen: `false`,
  }
  before(() => {
    browser.url(`/examples/core/makeLanguageDialogState`)
    {
      const pathname = $(`#pathname`)
      const isOpen = $(`#isOpen`)
      const translations = supportedLanguages.map(languageCode => ({
        languageCode,
        element: $(`#translation-${languageCode}`),
        message: `#translation-${languageCode} getText`,
      }))
      expectToRender = function expectToRender (expected) {
        expect(pathname.getText(), `#pathname getText`).to.equal(expected.pathname)
        expect(isOpen.getText(), `#isOpen getText`).to.equal(expected.isOpen)
        translations.forEach(({ languageCode, element, message }) => {
          expect(element.getText(), message).to.equal(makePathname(languageCode, expected.foo))
        })
      }
    }
    {
      const button = $(`#open`)
      open = function open () {
        button.click()
      }
    }
    {
      const button = $(`#close`)
      close = function close () {
        button.click()
      }
    }
    {
      const button = $(`#navigate`)
      const elements = [$(`#languageCode`), $(`#foo`)]
      navigate = function navigate (...args) {
        elements.forEach((element, i) => addInputText(element, args[i]))
        button.click()
      }
    }
  })
  it(`should render the initial values`, () => {
    expectToRender(initialValues)
  })
  it(`should open and close`, () => {
    const values = { ...initialValues, isOpen: `true` }
    open()
    expectToRender(values)
    open()
    expectToRender(values)
    close()
    expectToRender(initialValues)
    close()
    expectToRender(initialValues)
  })
  it(`should not update when closed`, () => {
    close()
    ;[`12`, `8187`].forEach(foo => {
      navigate(`en`, foo)
      expectToRender({
        ...initialValues,
        pathname: makePathname(`en`, foo)
      })
    })
  })
  it(`should update`, () => {
    supportedLanguages.forEach(languageCode => {
      ;[
        { foo: `6345`, startClosed: true },
        { foo: `983`, startClosed: false },
      ].forEach(({ foo, startClosed }) => {
        startClosed ? close() : open()
        navigate(languageCode, foo)
        startClosed && open()
        expectToRender({
          pathname: makePathname(languageCode, foo),
          foo,
          isOpen: `true`,
        })
      })
    })
  })
})
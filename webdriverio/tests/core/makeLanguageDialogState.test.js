const { expect } = require("../chai")
const supportedLanguages = require("../supportedLanguages")
function makePathname (languageCode, foo) {
  return `/examples/core/integrated/${languageCode}/example/${foo}`
}
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
      const links = supportedLanguages.map(languageCode => ({
        languageCode,
        element: $(`#pathname-${languageCode}`),
        message: `#pathname-${languageCode} getText`,
      }))
      expectToRender = function expectToRender (expected) {
        expect(pathname.getText(), `#pathname getText`).to.equal(expected.pathname)
        expect(isOpen.getText(), `#isOpen getText`).to.equal(expected.isOpen)
        links.forEach(({ languageCode, element, message }) => {
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
      const elements = { languageCode: $(`#languageCode`), foo: $(`#foo`) }
      function addValue (element, str) {
        element.addValue(new Array(element.getValue().length).fill('Backspace'))
        element.addValue(str)
      }
      navigate = function navigate (languageCode, foo) {
        addValue(elements.languageCode, languageCode)
        addValue(elements.foo, foo)
        button.click()
      }
    }
  })
  it(`should render the initial values`, () => {
    expectToRender(initialValues)
  })
  it(`should open and close`, () => {
    const openValues = { ...initialValues, isOpen: `true` }
    open()
    expectToRender(openValues)
    open()
    expectToRender(openValues)
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
        { foo: `6345`, shouldOpen: true },
        { foo: `983`, shouldOpen: false },
      ].forEach(({ foo, shouldOpen }) => {
        shouldOpen ? close() : open()
        navigate(languageCode, foo)
        shouldOpen && open()
        expectToRender({
          pathname: makePathname(languageCode, foo),
          foo,
          isOpen: `true`,
        })
      })
    })
  })
})
const supportedLanguages = require("../supportedLanguages.js")
const { expect } = require("../chai")
const clientNames = [`home`, `example`, `notFound`]
function makePathname (languageCode, clientName) {
  let pathname = `/examples/core/integrated`
  if (!languageCode) {
    return pathname
  }
  pathname = `${pathname}/${languageCode}`
  if (!clientName) {
    return pathname
  }
  let foo = ``
  if (clientName === `example`) {
    const n = Math.floor(Math.random() * 1000)
    foo = n % 2 > 0 ? `/${n}/` : `/${n}`
  }
  return `${pathname}/${clientName}${foo}`
}
describe(`local/core/makeRouter`, () => {
  let toggleMounted, expectToRender, navigate
  before(() => {
    browser.url(`/examples/core/makeRouter`)
    {
      const button = $(`#toggleMounted`)
      toggleMounted = function toggleMounted () {
        button.click()
      }
    }
    expectToRender = function expectToRender (expected) {
      if (expected === null) { // unmounted
        expect($(`#type`).isExisting(), `#type isExisting`).to.be.false
        return
      }
      Object.keys(expected).forEach(key => {
        expect($(`#${key}`).getText(), `#${key} getText`).to.equal(expected[key])
      })
    }
    {
      const button = $(`#navigate`)
      const input = $(`#input`)
      navigate = function navigate (url) {
        input.addValue(new Array(input.getValue().length).fill('Backspace'))
        input.addValue(url)
        button.click()
      }
    }
  })
  it(`should mount and unmount`, () => {
    {
      const mounted = $(`#mounted`)
      expect(mounted.isDisplayed(), `#mounted isDisplayed`).to.be.true
      expect(mounted.getText(), `#mounted getText`).to.equal(`true`)
    }
    expectToRender({ type: `redirect`, clientName: `null` })
    toggleMounted() // false
    expectToRender(null)
    toggleMounted() // true
    expectToRender({ type: `redirect`, clientName: `null` })
  })
  it(`should match the client routes`, () => {
    clientNames.forEach(clientName => supportedLanguages.forEach(languageCode => {
      const pathname = makePathname(languageCode, clientName)
      navigate(pathname)
      expectToRender({ type: `client`, clientName, languageCode, pathname })
    }))
  })
  it(`should redirect without language detection`, () => {
    supportedLanguages.forEach(languageCode => {
      navigate(makePathname(languageCode))
      expectToRender({
        type: `redirect`,
        clientName: `null`,
        languageCode,
        pathname: makePathname(languageCode, `home`),
      })
    })
    supportedLanguages.forEach(languageCode => {
      const referrer = makePathname(languageCode, `404`)
      navigate(referrer)
      expectToRender({
        type: `redirect`,
        clientName: `null`,
        languageCode,
        pathname: makePathname(languageCode, `notFound`),
        referrer,
      })
    })
  })
  it(`should save the language`, () => {
    const rootPathname = makePathname()
    clientNames.forEach(clientName => supportedLanguages.forEach(languageCode => {
      navigate(makePathname(languageCode, clientName))
      navigate(rootPathname)
      expectToRender({
        type: `redirect`,
        clientName: `null`,
        languageCode,
        pathname: makePathname(languageCode, `home`),
      })
    }))
    supportedLanguages.forEach(languageCode => {
      navigate(makePathname(languageCode))
      navigate(rootPathname)
      expectToRender({
        type: `redirect`,
        clientName: `null`,
        languageCode,
        pathname: makePathname(languageCode, `home`),
      })
    })
    supportedLanguages.forEach(languageCode => {
      navigate(makePathname(languageCode, `404`))
      navigate(rootPathname)
      expectToRender({
        type: `redirect`,
        clientName: `null`,
        languageCode,
        pathname: makePathname(languageCode, `home`),
      })
    })
  })
  it(`should detect the proper language and redirect`, () => {
    const rootPathname = makePathname()
    supportedLanguages.forEach(languageCode => {
      navigate(makePathname(languageCode, `example`))
      navigate(rootPathname)
      expectToRender({
        type: `redirect`,
        clientName: `null`,
        languageCode,
        pathname: makePathname(languageCode, `home`),
      })
      const referrer = makePathname(`404`)
      navigate(referrer)
      expectToRender({
        type: `redirect`,
        clientName: `null`,
        languageCode,
        pathname: makePathname(languageCode, `notFound`),
        referrer,
      })
    })
  })
})
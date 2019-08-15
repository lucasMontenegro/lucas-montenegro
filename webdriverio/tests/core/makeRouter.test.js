const supportedLanguages = require("../supportedLanguages.js")
const { expect } = require("../chai")
const appNames = [`home`, `example`, `notFound`]
function makePathname (languageCode, appName) {
  let pathname = `/examples/core/router`
  if (!languageCode) {
    return pathname
  }
  pathname = `${pathname}/${languageCode}`
  if (!appName) {
    return pathname
  }
  let foo = ``
  if (appName === `example`) {
    const n = Math.floor(Math.random() * 1000)
    foo = n % 2 > 0 ? `/${n}/` : `/${n}`
  }
  return `${pathname}/${appName}${foo}`
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
    expectToRender({ type: `redirect`, appName: `null` })
    toggleMounted() // false
    expectToRender(null)
    toggleMounted() // true
    expectToRender({ type: `redirect`, appName: `null` })
  })
  it(`should match the app routes`, () => {
    appNames.forEach(appName => supportedLanguages.forEach(languageCode => {
      navigate(makePathname(languageCode, appName))
      expectToRender({ type: `app`, appName, languageCode, pathname: `null` })
    }))
  })
  it(`should redirect without language detection`, () => {
    supportedLanguages.forEach(languageCode => {
      navigate(makePathname(languageCode))
      expectToRender({
        type: `redirect`,
        appName: `null`,
        languageCode,
        pathname: makePathname(languageCode, `home`),
      })
    })
    supportedLanguages.forEach(languageCode => {
      const referrer = makePathname(languageCode, `404`)
      navigate(referrer)
      expectToRender({
        type: `redirect`,
        appName: `null`,
        languageCode,
        pathname: makePathname(languageCode, `notFound`),
        referrer,
      })
    })
  })
  it(`should save the language`, () => {
    const rootPathname = makePathname()
    appNames.forEach(appName => supportedLanguages.forEach(languageCode => {
      navigate(makePathname(languageCode, appName))
      navigate(rootPathname)
      expectToRender({
        type: `redirect`,
        appName: `null`,
        languageCode,
        pathname: makePathname(languageCode, `home`),
      })
    }))
    supportedLanguages.forEach(languageCode => {
      navigate(makePathname(languageCode))
      navigate(rootPathname)
      expectToRender({
        type: `redirect`,
        appName: `null`,
        languageCode,
        pathname: makePathname(languageCode, `home`),
      })
    })
    supportedLanguages.forEach(languageCode => {
      navigate(makePathname(languageCode, `404`))
      navigate(rootPathname)
      expectToRender({
        type: `redirect`,
        appName: `null`,
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
        appName: `null`,
        languageCode,
        pathname: makePathname(languageCode, `home`),
      })
      const referrer = makePathname(`404`)
      navigate(referrer)
      expectToRender({
        type: `redirect`,
        appName: `null`,
        languageCode,
        pathname: makePathname(languageCode, `notFound`),
        referrer,
      })
    })
  })
})
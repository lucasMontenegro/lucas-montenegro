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
      ;[`type`, `appName`, `languageCode`, `pathname`].forEach(key => {
        if (key in expected) {
          expect($(`#${key}`).getText(), `#${key} getText`).to.equal(expected[key])
        }
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
      navigate(makePathname(`404`))
      expectToRender({
        type: `redirect`,
        appName: `null`,
        languageCode,
        pathname: makePathname(languageCode, `notFound`),
      })
    })
  })
})






/**
function makeAppPathname (languageCode, appName) {
  let foo = ``
  if (appName === `example`) {
    const n = Math.floor(Math.random() * 1000)
    foo = n % 2 > 0 ? `/${n}/` : `/${n}`
  }
  return `/examples/core/router/${languageCode}/${appName}${foo}`
}
const expectToRender = ({ id, appName, languageCode, pathname, referrer }) => {
  {
    const elem = $(`#router-instance-id`)
    expect(elem.isDisplayed(), `id isDisplayed`).to.be.true
    const to = expect(elem.getText(), `id getText`).to
    id ? to.equal(`id: ${id}`) : to.match(/^id: \d{1,6}$/)
  }
  expect(browser.getUrl(), `browser.getUrl`).to.equal(`${baseUrl}${pathname}`)
  const elements = {
    appName: $(`#router-app-name`),
    languageCode: $(`#router-language-code`),
    pathname: $(`#router-pathname`),
    referrer: $(`#router-referrer`),
  }
  const keys = Object.keys(elements)
  expect(
    keys.reduce((actual, key) => {
      actual[key] = elements[key].isDisplayed()
      return actual
    }, {}),
    `isDisplayed`
  ).to.deep.equal(
    keys.reduce((expected, key) => {
      expected[key] = true
      return expected
    }, {})
  )
  expect(
    keys.reduce((actual, key) => {
      actual[key] = elements[key].getText()
      return actual
    }, {}),
    `getText`
  ).to.deep.equal({
    appName: `appName: ${appName}`.trim(),
    languageCode: `languageCode: ${languageCode}`.trim(),
    pathname: `location.pathname: ${pathname}`.trim(),
    referrer: `location.state.referrer.pathname: ${referrer || ``}`.trim(),
  })
  expect($(`#url-input`).isExisting(), `input isExisting`).to.be.true
  expect($(`#nav-to-url`).isExisting(), `nav button isExisting`).to.be.true
}
const getId = () => {
  const elem = $(`#router-instance-id`)
  if (elem.isExisting()) {
    const cap = /^id: (\d{1,6})$/.exec(elem.getText())
    if (cap) {
      return cap[1]
    }
  }
}
const navto = url => {
  const input = $(`#url-input`)
  input.addValue(new Array(input.getValue().length).fill('Backspace'))
  input.addValue(url)
  $(`#nav-to-url`).click()
}
describe(`local/core/Router`, () => {
})
/**/
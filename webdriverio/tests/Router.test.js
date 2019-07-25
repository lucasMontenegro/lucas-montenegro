const describeOrSkip = require("./describeOrSkip")
const supportedLanguages = require("./supportedLanguages.js")
const { expect } = require("./chai")
const baseUrl = `http://localhost:3000`
const appNames = [`home`, `example`, `notFound`]
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
describeOrSkip(`local/Router`, () => {
  it(`should support all languages`, () => {
    expect([`en`, `es`]).to.deep.equal(supportedLanguages)
  })
  it(`should mount and unmount`, () => {
    const pathname = `/examples/router/en/home`
    browser.url(pathname)
    const expected = {
      appName: `home`,
      languageCode: `en`,
      pathname,
    }
    expectToRender(expected)
    const id1 = getId()
    navto(`/`)
    browser.back()
    expectToRender(expected)
    const id2 = getId()
    expect(id1, `IDs before/after remount`).to.not.equal(id2)
  })
  it(`should render`, () => {
    browser.url(`/examples/router`)
    const id = getId()
    appNames.forEach(appName => supportedLanguages.forEach(languageCode => {
      const pathname = `/examples/router/${languageCode}/${appName}`
      navto(pathname)
      expectToRender({ id, appName, languageCode, pathname })
    }))
  })
  it(`should redirect without language detection`, () => {
    browser.url(`/examples/router`)
    const id = getId()
    supportedLanguages.forEach(languageCode => {
      {
        const basepath = `/examples/router/${languageCode}`
        navto(basepath)
        expectToRender({
          id,
          appName: `home`,
          languageCode,
          pathname: `${basepath}/home`,
        })
      }
      {
        const basepath = `/examples/router/${languageCode}`
        const referrer = `${basepath}/404`
        navto(referrer)
        expectToRender({
          id,
          appName: `notFound`,
          languageCode,
          pathname: `${basepath}/notFound`,
          referrer,
        })
      }
    })
  })
  it(`should save the language`, () => {
    const basepath = `/examples/router`
    browser.url(basepath)
    const assert = (pathname, languageCode) => {
      navto(pathname)
      browser.url(basepath)
      expect(browser.getUrl(), `browser.getUrl`).to.equal(
        `${baseUrl}${basepath}/${languageCode}/home`
      )
    }
    appNames.forEach(appName => supportedLanguages.forEach(languageCode => {
      assert(`${basepath}/${languageCode}/${appName}`, languageCode)
    }))
    supportedLanguages.forEach(languageCode => {
      assert(`${basepath}/${languageCode}`, languageCode)
      assert(`${basepath}/${languageCode}/404`, languageCode)
    })
  })
  it(`should detect the proper language and redirect`, () => {
    const basepath = `/examples/router`
    browser.url(basepath)
    supportedLanguages.forEach(languageCode => {
      navto(`${basepath}/${languageCode}/home`)
      browser.url(basepath)
      expectToRender({
        appName: `home`,
        languageCode,
        pathname: `${basepath}/${languageCode}/home`,
      })
      const referrer = `${basepath}/404`
      browser.url(referrer)
      expectToRender({
        appName: `notFound`,
        languageCode,
        pathname: `${basepath}/${languageCode}/notFound`,
        referrer,
      })
    })
  })
})
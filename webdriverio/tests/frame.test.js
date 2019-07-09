const { expect } = require("chai")
const baseUrl = `http://localhost:3000`
const appNames = [`app1`, `app2`]
const supportedLanguageCodes = [`en`, `es`]
const make = {
  subtitle: (languageCode, appName) => `subtitle ${languageCode} ${appName}`,
  content: (languageCode, appName) => `app content ${languageCode} ${appName}`,
  menuContent: (languageCode, appName) => `menu ${languageCode} ${appName}`,
  path: (languageCode, appName) => `/examples/frame/${languageCode}/${appName}`,
  languageLinkText: (languageCode, appName) => `language link ${languageCode} ${appName}`,
  navLinkText: (languageCode, appName) => `nav link ${languageCode} ${appName}`,
}
const removeUrlHost = url => {
  const caps = /^https?:\/\/[a-z0-9.-]+(?::\d+)?($|\/$|\/.*$)/.exec(url)
  if (!caps) {
    throw Error(`${url} is not a valid HTTP URL`)
  }
  return caps[1]
}
describe(`Frame`, function () {
  // tiling window manager may have trouble resizing
  it(`Should resize`, function () {
    browser.setWindowSize(799, 300)
    expect(browser.getWindowSize()).to.deep.equal({ width: 799, height: 300 })
    browser.setWindowSize(800, 300)
    expect(browser.getWindowSize()).to.deep.equal({ width: 800, height: 300 })
  })
  it(`Should render`, function () {
    const assert = (query, size) => {
      const elem = $(`//*[text() = "${query}"]`)
      expect(elem.isDisplayed(), `"${query}" isDisplayed`).to.be.true
      expect(elem.getCSSProperty(`font-size`).value, `"${query}" font-size`).to.equal(size)
    }
    for (const appName of appNames) {
      for (const languageCode of supportedLanguageCodes) {
        browser.url(make.path(languageCode, appName))
        for (const languageCode of supportedLanguageCodes) {
          assert(make.languageLinkText(languageCode, appName), `14px`)
        }
        for (const appName of appNames) {
          assert(make.navLinkText(languageCode, appName), `14px`)
        }
        assert(`Lucas Montenegro`, `26px`)
        assert(make.subtitle(languageCode, appName), `20px`)
        assert(make.content(languageCode, appName), `16px`)
        assert(make.menuContent(languageCode, appName), `14px`)
      }
    }
  })
  it(`Should navigate`, function () {
    const last = arr => arr[arr.length - 1]
    const lastAppName = last(appNames)
    browser.url(make.path(last(supportedLanguageCodes), lastAppName))
    for (const languageCode of supportedLanguageCodes) {
      $(`//*[text() = "${make.languageLinkText(languageCode, lastAppName)}"]`).click()
      expect(removeUrlHost(browser.getUrl())).to.equal(make.path(languageCode, lastAppName))
      for (const appName of appNames) {
        $(`//*[text() = "${make.navLinkText(languageCode, appName)}"]`).click()
        expect(removeUrlHost(browser.getUrl())).to.equal(make.path(languageCode, appName))
      }
    }
  })
  it(`Should have a responsive menu`, function () {
    const assert = (query, expected) => {
      const elem = $(`//*[text() = "${query}"]`)
      const result = elem.isDisplayed()
      const msg = `"${query}" isDisplayed`
      if (expected) {
        expect(result, msg).to.be.true
      } else {
        expect(result, msg).to.be.false
      }
    }
    const languageCode = supportedLanguageCodes[0]
    const appName = appNames[0]
    browser.url(make.path(languageCode, appName))
    const menuContent = make.menuContent(languageCode, appName)
    browser.setWindowSize(800, 300)
    assert(menuContent, true)
    browser.setWindowSize(799, 300)
    assert(menuContent, false)
  })
  describe(`Menu drawer`, function () {
    before(function () {
      browser.url(make.path(supportedLanguageCodes[0], appNames[0]))
      browser.setWindowSize(799, 300)
    })
    const getSliderThumb = id => $(`${id} > span:nth-child(3) > span:nth-child(4)`)
    it(`Should have a bottom menu slider`, function () {
      const bottomSlider = $(`#bottom-slider`)
      expect(bottomSlider.isDisplayed()).to.be.true
      const bottomSliderThumb = getSliderThumb(`#bottom-slider`)
      expect(bottomSlider.isDisplayed()).to.be.true
    })
    it(`Should open`, function () {
      throw Error(`ChromeDriver 73 doesn't support mouse actions. Try upgrading to Chromium 76.`)
    })
  })
})

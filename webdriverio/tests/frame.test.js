const { expect } = require("chai")
const baseUrl = `http://localhost:3000`
const appNames = [`app1`, `app2`]
const supportedLanguageCodes = [`en`, `es`]
const make = {
  subtitle: (languageCode, appName) => `subtitle ${languageCode} ${appName}`,
  content: (languageCode, appName) => `app content ${languageCode} ${appName}`,
  path: (languageCode, appName) => `/examples/frame/${languageCode}/${appName}`,
  languageLinkText: (languageCode, appName) => `language link ${languageCode} ${appName}`,
  navLinkText: (languageCode, appName) => `nav link ${languageCode} ${appName}`,
  url: (languageCode, appName) => `${baseUrl}${make.path(languageCode, appName)}`,
}
describe(`Frame`, function () {
  it(`should render`, function () {
    const assert = (query, size) => {
      const elem = $(`//*[text() = "${query}"]`)
      expect(elem.isExisting(), `"${query}" isExisting`).to.be.true
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
      }
    }
  })
  it(`should navigate`, function () {
    const last = arr => arr[arr.length - 1]
    const lastAppName = last(appNames)
    browser.url(make.path(last(supportedLanguageCodes), lastAppName))
    for (const languageCode of supportedLanguageCodes) {
      $(`//*[text() = "${make.languageLinkText(languageCode, lastAppName)}"]`).click()
      expect(browser.getUrl()).to.equal(make.url(languageCode, lastAppName))
      for (const appName of appNames) {
        $(`//*[text() = "${make.navLinkText(languageCode, appName)}"]`).click()
        expect(browser.getUrl()).to.equal(make.url(languageCode, appName))
      }
    }
  })
})

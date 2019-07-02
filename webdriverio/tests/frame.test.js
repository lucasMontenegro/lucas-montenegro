const { expect } = require("chai")
const appNames = [`1`, `2`]
const languages = [`A`, `B`]
const make = {
  path: (lang, app) => `/examples/frame/lang${lang}/app${app}`,
  subtitle: (lang, app) => `App ${app} - Lang ${lang}`,
  content: (lang, app) => `This is the App ${app} in the Language ${lang}`,
  languageLinkText: lang => `Language ${lang}`,
  navLinkText: app => `App ${app}`,
}
describe(`Frame`, function () {
  it(`should render`, function () {
    const assert = (query, size) => {
      const elem = $(`//*[text() = "${query}"]`)
      expect(elem.isExisting(), `"${query}" isExisting`).to.be.true
      expect(elem.getCSSProperty(`font-size`).value, `"${query}" font-size`).to.equal(size)
    }
    for (const app of appNames) {
      for (const lang of languages) {
        browser.url(make.path(lang, app))
        assert(`Lucas Montenegro`, `26px`)
        assert(make.subtitle(lang, app), `20px`)
        assert(make.content(lang, app), `16px`)
      }
    }
  })
  it(`should navigate`, function () {
    let lang = languages[0]
    let app = appNames[0]
    browser.url(make.path(lang, app))
    app = appNames[1]
    $(`//*[text() = "${make.navLinkText(app)}"]`).click()
    expect(browser.getUrl()).to.equal(`http://localhost:3000${make.path(lang, app)}`)
  })
})

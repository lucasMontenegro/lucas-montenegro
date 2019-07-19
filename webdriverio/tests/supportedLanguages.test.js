const supportedLanguages = require("./supportedLanguages.js")
const { expect } = require("./chai")
describe(`local/supportedLanguages`, () => {
  it(`should match all globally supported languages`, () => {
    browser.url(`/examples/supportedLanguages`)
    const elem = $(`#supportedLanguages`)
    expect(elem.isExisting(), `isExisting`).to.be.true
    expect(elem.getText(), `getText`).to.equal(supportedLanguages.join(` `))
  })
})
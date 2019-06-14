const { expect } = require("chai")
describe(`trying out WebDriverIO`, function () {
  it(`should load the body`, function () {
    browser.url(`/examples/frame`)
    const text = $(`#root > div`).getText()
    expect(text).to.equal(`Hello, world!`)
  })
})

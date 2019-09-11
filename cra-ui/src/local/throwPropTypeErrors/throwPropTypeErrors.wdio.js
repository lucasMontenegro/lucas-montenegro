const { expect } = require("local/wdio/chai")
describe(`local/throwPropTypeErrors`, () => {
  it(`should not render`, () => {
    browser.url(`/examples/throwPropTypeErrors/it-works`)
    expect($(`#message`).isExisting(), `#message isExisting`).to.be.false
  })
})
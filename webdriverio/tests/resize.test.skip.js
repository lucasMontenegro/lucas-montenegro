const { expect } = require("./chai")
const random = () => Math.floor(Math.random() * 1200) + 100
describe(`browser`, () => {
  // tiling window managers may have trouble resizing
  it(`should resize`, () => {
    const width = random()
    const height = random()
    browser.setWindowSize(width, height)
    expect(browser.getWindowSize(), `browser.getWindowSize`).to.deep.equal({ width, height })
  })
})
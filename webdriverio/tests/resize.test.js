const describeOrSkip = require("./describeOrSkip")
const { expect } = require("./chai")
const random = () => Math.floor(Math.random() * 1200) + 100
describeOrSkip(`browser`, () => {
  // tiling window manager may have trouble resizing
  it(`should resize`, () => {
    const width = random()
    const height = random()
    browser.setWindowSize(width, height)
    expect(browser.getWindowSize(), `browser.getWindowSize`).to.deep.equal({ width, height })
  })
})
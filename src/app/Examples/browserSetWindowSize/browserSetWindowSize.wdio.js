import { expect } from "chai"
describe(`browser`, () => {
  // tiling window managers may have trouble resizing
  it(`should resize`, () => {
    browser.url(`/examples/browserSetWindowSize`)
    const sizes = [
      [360, 640],
      [411, 731],
      [411, 823],
      [320, 568],
      [375, 667],
      [414, 736],
      [375, 812],
      [768, 1024],
      [1024, 1366],
    ]
    sizes.push(...sizes.map(([width, height]) => [height, width]))
    sizes.forEach(([width, height]) => {
      browser.setWindowSize(width, height)
      expect(browser.getWindowSize(), `browser getWindowSize`).to.include({ width, height })
    })
  })
})
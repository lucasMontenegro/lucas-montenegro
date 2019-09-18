import { expect } from "local/wdio/chai"
describe(`local/core/portals/makeUniqueRef`, () => {
  function expectToRender (expected) {
    expected.forEach(({ selector, text }) => {
      const elem = $(selector)
      expect(elem.isDisplayed(), `${selector} isDisplayed`).to.be.true
      expect(elem.getText(), `${selector} getText`).to.equal(text)
    })
  }
  it(`should not render more than one instance`, () => {
    browser.url(`/examples/core/portals/makeUniqueRef/development`)
    expectToRender([
      { selector: `#boundary1`, text: `unique` },
      { selector: `#boundary2`, text: `DevelopmentExample: Only one instance is allowed` },
      { selector: `#boundary3`, text: `DevelopmentExample: Only one instance is allowed` },
    ])
  })
  it(`should not throw in production`, () => {
    browser.url(`/examples/core/portals/makeUniqueRef/production`)
    expectToRender([
      { selector: `#boundary1`, text: `unique` },
      { selector: `#boundary2`, text: `not unique` },
      { selector: `#boundary3`, text: `not unique` },
    ])
  })
})
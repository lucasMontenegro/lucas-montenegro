const { expect } = require("../chai")
describe(`local/core/useViewState`, () => {
  beforeEach(() => {
    browser.url(`/examples/core/useViewState`)
  })
  it(`should start with drawer closed`, () => {
    expect($(`#drawer-is-open`).getText(), `#drawer-is-open getText`).to.equal(`false`)
  })
  it(`should open the drawer`, () => {
    $(`#open-drawer`).click()
    expect($(`#drawer-is-open`).getText(), `#drawer-is-open getText`).to.equal(`true`)
  })
  it(`should close the drawer`, () => {
    $(`#open-drawer`).click()
    $(`#close-drawer`).click()
    expect($(`#drawer-is-open`).getText(), `#drawer-is-open getText`).to.equal(`false`)
  })
  it(`should detect the screen size`, () => {
    const isMobile = $(`#is-mobile`)
    browser.setWindowSize(800, 300)
    expect(isMobile.getText(), `#is-mobile getText`).to.equal(`false`)
    browser.setWindowSize(799, 300)
    expect(isMobile.getText(), `#is-mobile getText`).to.equal(`true`)
  })
})
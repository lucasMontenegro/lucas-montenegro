const describeOrSkip = require("../describeOrSkip")
const { expect } = require("../chai")
const supportedLanguages = require("../supportedLanguages")
const makeFoo = () => Math.floor(Math.random() * 1000000).toString()
function expectDrawer (temporary, foo) {
  const drawerSelector = temporary ? `#temporary-drawer` : `#permanent-drawer`
  const drawer = $(drawerSelector)
  temporary && drawer.waitForDisplayed(1000)
  expect(drawer.isDisplayed(), `${drawerSelector} isDisplayed`).to.be.true
  {
    const selector = `#drawer-content`
    const drawerContent = $(selector)
    expect(drawerContent.isDisplayed(), `${selector} isDisplayed`).to.be.true
    const label = drawerContent.getAttribute(`aria-label`)
    const msg = `${selector} getAttribute aria-label`
    expect(label, msg).to.be.a(`string`)
    expect(label, msg).to.have.lengthOf.above(1)
  }
  {
    const selector = `#close-temporary-drawer`
    const closeIcon = $(selector)
    if (temporary) {
      expect(closeIcon.isDisplayed(), `${selector} isDisplayed`).to.be.true
      const label = closeIcon.getAttribute(`aria-label`)
      const msg = `${selector} getAttribute aria-label`
      expect(label, msg).to.be.a(`string`)
      expect(label, msg).to.have.lengthOf.above(1)
    } else {
      expect(closeIcon.isExisting(), `${selector} isExisting`).to.be.false
    }
  }
  {
    const selector = `#close-drawer-from-app`
    expect($(selector).isDisplayed(), `${selector} isDisplayed`).to.be.true
  }
  {
    const selector = `#foo`
    const elem = $(selector)
    expect(elem.isDisplayed(), `${selector} isDisplayed`).to.be.true
    expect(elem.getText(), `${selector} getText`).to.equal(foo)
  }
}
describeOrSkip(`local/core/drawer`, () => {
  it(`should support all languages`, () => {
    expect([`en`, `es`]).to.deep.equal(supportedLanguages)
  })
  it(`should render the permanent drawer`, () => {
    browser.setWindowSize(800, 300)
    supportedLanguages.forEach(languageCode => {
      const foo = makeFoo()
      browser.url(`/examples/core/drawer/${languageCode}/${foo}`)
      expectDrawer(false, foo)
    })
  })
  it(`should open the temporary drawer`, () => {
    browser.setWindowSize(799, 300)
    browser.url(`/examples/core/drawer`)
    const drawer = $(`#temporary-drawer`)
    expect(drawer.isDisplayed(), `#temporary-drawer isDisplayed`).to.be.false
    $(`#open-drawer`).click()
    drawer.waitForDisplayed(1000)
    expect(drawer.isDisplayed(), `#temporary-drawer isDisplayed`).to.be.true
  })
  it(`should render the temporary drawer`, () => {
    browser.setWindowSize(799, 300)
    supportedLanguages.forEach(languageCode => {
      const foo = makeFoo()
      browser.url(`/examples/core/drawer/${languageCode}/${foo}`)
      $(`#open-drawer`).click()
      expectDrawer(true, foo)
    })
  })
  it(`should close from the icon button`, () => {
    browser.setWindowSize(799, 300)
    browser.url(`/examples/core/drawer`)
    $(`#open-drawer`).click()
    const drawer = $(`#temporary-drawer`)
    drawer.waitForDisplayed(1000)
    expect(drawer.isDisplayed(), `#temporary-drawer isDisplayed`).to.be.true
    $(`#close-temporary-drawer`).click()
    drawer.waitForDisplayed(1000, true)
    expect(drawer.isDisplayed(), `#temporary-drawer isDisplayed`).to.be.false
  })
  it(`should close from the app`, () => {
    browser.setWindowSize(799, 300)
    browser.url(`/examples/core/drawer`)
    $(`#open-drawer`).click()
    const drawer = $(`#temporary-drawer`)
    drawer.waitForDisplayed(1000)
    expect(drawer.isDisplayed(), `#temporary-drawer isDisplayed`).to.be.true
    $(`#close-drawer-from-app`).click()
    drawer.waitForDisplayed(1000, true)
    expect(drawer.isDisplayed(), `#temporary-drawer isDisplayed`).to.be.false
  })
  it(`should close from the modal`, () => {
    browser.setWindowSize(799, 300)
    browser.url(`/examples/core/drawer`)
    $(`#open-drawer`).click()
    const drawer = $(`#temporary-drawer`)
    drawer.waitForDisplayed(1000)
    expect(drawer.isDisplayed(), `#temporary-drawer isDisplayed`).to.be.true
    browser.keys(`Escape`)
    drawer.waitForDisplayed(1000, true)
    expect(drawer.isDisplayed(), `#temporary-drawer isDisplayed`).to.be.false
  })
})
const { expect } = require("../chai")
const supportedLanguages = require("../supportedLanguages")
const makeFoo = () => Math.floor(Math.random() * 1000000).toString()
const makeWidth = () => (Math.floor(Math.random() * 100) + 200).toString()
const makeUrl = (languageCode, isMobile, isOpen, foo, width) => (
  `/examples/core/Drawer/${languageCode}/${isMobile}/${isOpen}/${foo}/${width}`
)
function expectDrawer (languageCode, isMobile, isOpen, foo, width) {
  {
    const selector = (
      isMobile ? `#temporary-drawer > div:nth-child(3)` :
      `#permanent-drawer > div:nth-child(1)`
    )
    const element = $(selector)
    expect(element.isDisplayed(), `${selector} isDisplayed`).to.be.true
    expect(
      element.getCSSProperty(`width`).value,
      `${selector} getCSSProperty width`
    ).to.equal(`${width}px`)
    expect(
      element.getAttribute(`class`),
      `${selector} getAttribute class`
    ).to.match(/(^| )MuiPaper-root-\d+( | $)/)
  }
  {
    const selector = isMobile ? `#permanent-drawer` : `#temporary-drawer`
    expect($(selector).isDisplayed(), `${selector} isDisplayed`).to.be.false
  }
  ;[
    {
      selector: `#language-code`,
      expected: languageCode,
    },
    {
      selector: `#foo`,
      expected: foo,
    },
    {
      selector: `#count`,
      expected: `0`,
    },
    {
      selector: `#text`,
    },
    {
      selector: `#nav-link`,
      expected: `nav link`,
    },
  ].forEach(({ selector, expected }) => {
    const element = $(selector)
    expect(element.isDisplayed(), `${selector} isDisplayed`).to.be.true
    expected && expect(element.getText(), `${selector} getText`).to.equal(expected)
  })
  ;[
    isMobile ? `#close-temporary-drawer` : null, 
    `#drawer-nav`,
  ].forEach(selector => {
    if (!selector) {
      return
    }
    const element = $(selector)
    const label = element.getAttribute(`aria-label`)
    const msg = `${selector} getAttribute aria-label`
    expect(label, msg).to.have.lengthOf.above(1)
    expect(label, msg).not.to.equal(`undefined`)
  })
}
function expectCount (count) {
  expect($(`#count`).getText(), `#count getText`).to.equal(count)
}
describe(`local/core/Drawer`, () => {
  it(`should render the permanent drawer`, () => {
    supportedLanguages.forEach(languageCode => [true, false].forEach(isOpen => {
      const width = makeWidth()
      const foo = makeFoo()
      browser.url(makeUrl(languageCode, false, isOpen, foo, width))
      expectDrawer(languageCode, false, isOpen, foo, width)
    }))
  })
  it(`should not render the temporary drawer when closed`, () => {
    supportedLanguages.forEach(languageCode => {
      browser.url(makeUrl(languageCode, true, false, makeFoo(), makeWidth()))
      expect($(`#temporary-drawer`).isDisplayed(), `#temporary-drawer isDisplayed`).to.be.false
    })
  })
  it(`should render the temporary drawer when open`, () => {
    supportedLanguages.forEach(languageCode => {
      const width = makeWidth()
      const foo = makeFoo()
      browser.url(makeUrl(languageCode, true, true, foo, width))
      expectDrawer(languageCode, true, true, foo, width)
    })
  })
  it(`should close from the modal component`, () => {
    browser.url(makeUrl(`en`, true, true, makeFoo(), makeWidth()))
    browser.keys(`Escape`)
    expectCount(`1`)
    browser.keys(`Escape`)
    expectCount(`2`)
  })
  it(`should close from the button`, () => {
    browser.url(makeUrl(`en`, true, true, makeFoo(), makeWidth()))
    const button = $(`#close-temporary-drawer`)
    button.click()
    expectCount(`1`)
    button.click()
    expectCount(`2`)
  })
})
const { expect } = require("../chai")
const supportedLanguages = require("../supportedLanguages")
function navigate (languageCode, isMobile, secondaryToolbar) {
  const isMobileString = `isMobile${isMobile ? `True` : `False`}`
  const secondaryToolbarString = `secondaryToolbar${secondaryToolbar ? `True` : `False`}`
  browser.url(`/examples/core/Body/${languageCode}/${isMobileString}/${secondaryToolbarString}`)
}
describe(`local/core/Body`, () => {
  it(`should be responsive`, () => {
    ;[
      { widths: [/*300, not working*/400, 600], isMobile: true },
      { widths: [540, 700, 900, 1400], isMobile: false },
    ].forEach(({ widths, isMobile }) => (
      [true, false].forEach(secondaryToolbar => {
        navigate(`en`, isMobile, secondaryToolbar)
        expect(browser.getTitle(), `browser getTitle`).to.match(/^Lucas Montenegro - Example App/)
        widths.forEach(width => {
          browser.setWindowSize(width, 500)
          ;[
            { selector: `#open-temporary-drawer`, nonexistent: !isMobile },
            { selector: `#logo`, text: `logo` },
            { selector: `#primaryToolbar`, text: `primaryToolbar` },
            { selector: `#languageDialog`, text: `languageDialog` },
            {
              selector: `#secondaryToolbar`,
              text: `secondaryToolbar`,
              nonexistent: !secondaryToolbar,
            },
            { selector: `#count`, text: `0` },
            { selector: `h1=Lucas Montenegro` },
            { selector: `h2=EXAMPLE APP` },
          ].forEach(({ selector, text, nonexistent }) => {
            const element = $(selector)
            if (nonexistent) {
              expect(element.isExisting(), `${selector} isExisting`).to.be.false
            } else {
              expect(
                element.isDisplayedInViewport(),
                `${selector} isDisplayedInViewport`
              ).to.be.true
              text && expect(element.getText(), `${selector} getText`).to.equal(text)
            }
          })
        })
      })
    ))
  })
  it(`should be localized`, () => {
    supportedLanguages.forEach(languageCode => {
      navigate(languageCode, true, true)
      const selector = `#open-temporary-drawer`
      expect(
        $(selector).getAttribute(`aria-label`),
        `${selector} getAttribute aria-label`
      ).to.have.lengthOf.above(1)
    })
  })
  it(`should open the drawer`, () => {
    navigate(`en`, true, true)
    const button = $(`#open-temporary-drawer`)
    const count = $(`#count`)
    function expectCount (text) {
      expect(count.getText(), `#count getText`).to.equal(text)
    }
    expectCount(`0`)
    button.click()
    expectCount(`1`)
    button.click()
    expectCount(`2`)
  })
})
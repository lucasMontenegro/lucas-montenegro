import { expect } from "chai"
import supportedLanguages from "local/supportedLanguages"
function navigate (values) {
  const search = [
    `languageCode`,
    `isMobile`,
    `primaryToolbar`,
    `secondaryToolbar`,
    `responsiveToolbar`,
  ].map(key => (values[key] || `undefined`)).join(`&`)
  browser.url(`/examples/core/Body?${search}`)
}
function expectToRender (items) {
  Object.keys(items).forEach(selector => {
    const { displayed, text, label } = items[selector]
    const element = $(selector)
    if (displayed || text || label) {
      expect(element.isDisplayedInViewport(), `${selector} isDisplayedInViewport`).to.be.true
    } else {
      expect(element.isExisting(), `${selector} isExisting`).to.be.false
      return
    }
    if (text) {
      const expectTo = expect(element.getText(), `${selector} getText`).to
      if (typeof text === `number`) {
        expectTo.have.lengthOf.above(text)
      } else {
        expectTo.equal(text)
      }
    }
    if (label) {
      const expectTo = expect(
        $(selector).getAttribute(`aria-label`),
        `${selector} getAttribute aria-label`
      ).to
      if (typeof label === `number`) {
        expectTo.have.lengthOf.above(label)
      } else {
        expectTo.equal(label)
      }
    }
  })
}
const responsivity = [
  { widths: [300, 400, 600], isMobile: true },
  { widths: [540, 700, 900, 1400], isMobile: false },
]
describe(`local/core/Body`, () => {
  it(`should render`, () => {
    supportedLanguages.forEach(languageCode => {
      responsivity.forEach(({ widths, isMobile }) => {
        widths.forEach(width => {
          browser.setWindowSize(width, 500)
          navigate({
            languageCode,
            isMobile: isMobile ? `true` : `false`,
            primaryToolbar: `primaryToolbar`,
            secondaryToolbar: `secondaryToolbar`,
            responsiveToolbar: `responsiveToolbar`,
          })
          {
            const title = `${languageCode} subtitle - ${languageCode} title`
            expect(browser.getTitle().slice(0, title.length), `browser getTitle`).to.equal(title)
          }
          expectToRender({
            "#logo": { text: `logo` },
            "#title": { text: `${languageCode} title` },
            "#subtitle": { text: `${languageCode.toUpperCase()} SUBTITLE` },
            "#count": { text: `0` },
            "#open-temporary-drawer": { label: isMobile ? 1 : null },
            "#primaryToolbar": { text: `primaryToolbar` },
            "#secondaryToolbar": { text: `secondaryToolbar` },
            "#responsiveToolbar": { text: `responsiveToolbar` },
          })
        })
      })
    })
    browser.setWindowSize(800, 500)
  })
  it(`should not render an empty primary Appbar`, () => {
    navigate({
      languageCode: `en`,
      isMobile: `false`,
      secondaryToolbar: `secondaryToolbar`,
      responsiveToolbar: `responsiveToolbar`,
    })
    expectToRender({
      "#logo": { text: `logo` },
      "#primary-appbar": { displayed: false },
      "#open-temporary-drawer": { displayed: false },
      "#primaryToolbar": { displayed: false },
      "#secondaryToolbar": { text: `secondaryToolbar` },
      "#responsiveToolbar": { text: `responsiveToolbar` },
    })
  })
  it(`should not render an empty secondary toolbar`, () => {
    ;[true, false].forEach(isMobile => {
      navigate({
        languageCode: `en`,
        isMobile: isMobile ? `true` : `false`,
        primaryToolbar: `primaryToolbar`,
      })
      expectToRender({
        "#logo": { text: `logo` },
        "#open-temporary-drawer": { displayed: isMobile },
        "#primaryToolbar": { text: `primaryToolbar` },
        "#secondary-toolbar-content": { displayed: false },
        "#secondaryToolbar": { displayed: false },
        "#responsiveToolbar": { displayed: false },
      })
    })
    navigate({
      languageCode: `en`,
      isMobile: `true`,
      primaryToolbar: `primaryToolbar`,
      responsiveToolbar: `responsiveToolbar`,
    })
    expectToRender({
      "#logo": { text: `logo` },
      "#open-temporary-drawer": { displayed: true },
      "#primaryToolbar": { text: `primaryToolbar` },
      "#secondary-toolbar-content": { displayed: false },
      "#secondaryToolbar": { displayed: false },
      "#responsiveToolbar": { text: `responsiveToolbar` },
    })
  })
  it(`should open the drawer`, () => {
    navigate({ languageCode: `en`, isMobile: `true` })
    const button = $(`#open-temporary-drawer`)
    expectToRender({ "#count": { text: `0` } })
    button.click()
    expectToRender({ "#count": { text: `1` } })
    button.click()
    expectToRender({ "#count": { text: `2` } })
  })
})
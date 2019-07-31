const describeOrSkip = require("../describeOrSkip")
const { expect } = require("../chai")
const baseUrl = require("../baseUrl")
const targetPath = `/examples/core/links/TargetPage`
const expectId = id => {
  const elem = $(`#instance-id`)
  expect(elem.isDisplayed(), `#instance-id isDisplayed`).to.be.true
  const text = elem.getText()
  if (id) {
    expect(text, `#instance-id getText`).to.equal(`ID: ${id}`)
  } else {
    expect(text, `#instance-id getText`).to.match(/^ID: \d{1,6}/)
    return text.slice(4)
  }
}
const expectRenderCount = n => {
  const elem = $(`#render-count`)
  expect(elem.isDisplayed(), `#render-count isDisplayed`).to.be.true
  const text = elem.getText()
  expect(text, `#render-count getText`).to.equal(`render count: ${n}`)
}
const expectToNavigate = (selector, path) => {
  browser.url(path)
  const id = expectId()
  expectRenderCount(1)
  const link = selector()
  expect(link.isDisplayed(), `link isDisplayed`).to.be.true
  link.click()
  expect(browser.getUrl()).to.equal(`${baseUrl}${targetPath}`)
  const msg = $(`#message`)
  expect(msg.isExisting(), `#message isExisting`).to.be.true
  expect(msg.getText(), `#message getText`).to.equal(`it works`)
  browser.back()
  expect(browser.getUrl()).to.equal(`${baseUrl}${path}`)
  expectId(id)
  expectRenderCount(3)
}
describeOrSkip(`local/core/links`, () => {
  const loremIpsumSelector = () => $(`//*[text() = "lorem ipsum"]`)
  describe(`Link`, () => {
    it(`should render and navigate`, () => {
      expectToNavigate(loremIpsumSelector, `/examples/core/links/LinkExample`)
    })
  })
  describe(`LinkButton`, () => {
    it(`should render and navigate`, () => {
      expectToNavigate(loremIpsumSelector, `/examples/core/links/LinkButtonExample`)
    })
  })
  describe(`BlockLinkButton`, () => {
    it(`should render and navigate`, () => {
      expectToNavigate(loremIpsumSelector, `/examples/core/links/BlockLinkButtonExample`)
    })
  })
  describe(`MenuLink`, () => {
    const selector = () => {
      $(`#open-menu`).click()
      return loremIpsumSelector()
    }
    it(`should render and navigate`, () => {
      expectToNavigate(selector, `/examples/core/links/MenuExample`)
    })
  })
})
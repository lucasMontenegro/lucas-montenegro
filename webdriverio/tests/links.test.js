const describeOrSkip = require("./describeOrSkip")
const { expect } = require("./chai")
const baseUrl = require("./baseUrl")
const targetPath = `/examples/links/TargetPage`
const expectId = (id, equal) => {
  const elem = $(`#instance-id`)
  expect(elem.isDisplayed(), `#instance-id isDisplayed`).to.be.true
  const text = elem.getText()
  if (id) {
    if (equal) {
      expect(text, `#instance-id getText`).to.equal(`ID: ${id}`)
    } else {
      expect(text, `#instance-id getText`).to.not.equal(`ID: ${id}`)
    }
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
const expectClickCount = n => {
  const elem = $(`#click-count`)
  expect(elem.isDisplayed(), `#click-count isDisplayed`).to.be.true
  const text = elem.getText()
  expect(text, `#click-count getText`).to.equal(`click count: ${n}`)
}
const expectButton = (selector, path) => {
  browser.url(path)
  const id = expectId()
  expectRenderCount(1)
  expectClickCount(0)
  const button = selector()
  expect(button.isDisplayed(), `link isDisplayed`).to.be.true
  button.click()
  expect(browser.getUrl()).to.equal(`${baseUrl}${path}`)
  expectRenderCount(1)
  expectClickCount(1)
  expectId(id, true)
}
const expectToNavigate = (selector, path, external) => {
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
  if (external) {
    expectId(id, false)
    expectRenderCount(1)
  } else {
    expectId(id, true)
    expectRenderCount(3)
  }
}
describeOrSkip(`local/links`, () => {
  const loremIpsumSelector = () => $(`//*[text() = "lorem ipsum"]`)
  describe(`Link`, () => {
    it(`should make router-connected links`, () => {
      expectToNavigate(loremIpsumSelector, `/examples/links/LocalLink`, false)
    })
    it(`should make regular links`, () => {
      expectToNavigate(loremIpsumSelector, `/examples/links/ExternalLink`, true)
    })
  })
  describe(`Button`, () => {
    it(`should make regular buttons`, () => {
      expectButton(loremIpsumSelector, `/examples/links/SimpleButton`)
    })
    it(`should make router-connected links`, () => {
      expectToNavigate(loremIpsumSelector, `/examples/links/LocalLinkButton`, false)
    })
    it(`should make regular links`, () => {
      expectToNavigate(loremIpsumSelector, `/examples/links/ExternalLinkButton`, true)
    })
  })
  describe(`ListItem`, () => {
    it(`should make regular list items`, () => {
      expectButton(loremIpsumSelector, `/examples/links/SimpleList`)
      expectButton(loremIpsumSelector, `/examples/links/SimpleButtonList`)
    })
    it(`should make router-connected links`, () => {
      expectToNavigate(loremIpsumSelector, `/examples/links/LocalLinkList`, false)
      expectToNavigate(loremIpsumSelector, `/examples/links/LocalLinkButtonList`, false)
    })
    it(`should make regular links`, () => {
      expectToNavigate(loremIpsumSelector, `/examples/links/ExternalLinkList`, true)
      expectToNavigate(loremIpsumSelector, `/examples/links/ExternalLinkButtonList`, true)
    })
  })
  describe(`MenuItem`, () => {
    const selector = () => {
      $(`#open-menu`).click()
      return loremIpsumSelector()
    }
    it(`should make regular menu items`, () => {
      expectButton(selector, `/examples/links/SimpleMenu`)
      expectButton(selector, `/examples/links/SimpleButtonMenu`)
    })
    it(`should make router-connected links`, () => {
      expectToNavigate(selector, `/examples/links/LocalLinkMenu`, false)
      expectToNavigate(selector, `/examples/links/LocalLinkButtonMenu`, false)
    })
    it(`should make regular links`, () => {
      expectToNavigate(selector, `/examples/links/ExternalLinkMenu`, true)
      expectToNavigate(selector, `/examples/links/ExternalLinkButtonMenu`, true)
    })
  })
})
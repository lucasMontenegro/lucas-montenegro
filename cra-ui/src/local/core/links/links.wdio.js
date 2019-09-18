import { expect } from "local/wdio/chai"
import baseUrl from "local/wdio/baseUrl"
const targetPath = `/examples/core/links/TargetPage`
function expectId ({ id, external }) {
  const elem = $(`#instance-id`)
  expect(elem.isDisplayed(), `#instance-id isDisplayed`).to.be.true
  const text = elem.getText()
  if (id) {
    if (external) {
      expect(text, `#instance-id getText`).to.not.equal(`ID: ${id}`)
    } else {
      expect(text, `#instance-id getText`).to.equal(`ID: ${id}`)
    }
  } else {
    expect(text, `#instance-id getText`).to.match(/^ID: \d{1,6}/)
    return text.slice(4)
  }
}
function expectRenderCount (n) {
  const elem = $(`#render-count`)
  expect(elem.isDisplayed(), `#render-count isDisplayed`).to.be.true
  const text = elem.getText()
  expect(text, `#render-count getText`).to.equal(`render count: ${n}`)
}
function expectToNavigate ({ selector, navigate, pathname, external }) {
  browser.url(pathname)
  const id = expectId({ external })
  expectRenderCount(1)
  const link = $(`#link`)
  expect(link.isDisplayed(), `#link isDisplayed`).to.be.true
  expect(link.getText().toLowerCase(), `#link getText`).to.equal(`lorem ipsum`)
  navigate()
  expect(browser.getUrl()).to.equal(`${baseUrl}${targetPath}`)
  const msg = $(`#message`)
  expect(msg.isExisting(), `#message isExisting`).to.be.true
  expect(msg.getText(), `#message getText`).to.equal(`it works`)
  browser.back()
  expect(browser.getUrl()).to.equal(`${baseUrl}${pathname}`)
  expectId({ id, external })
  external ? expectRenderCount(1) : expectRenderCount(3)
}
function expectToFocus (pathname) {
  browser.url(pathname)
  const topButton = $(`#top-button`)
  topButton.click()
  expect(topButton.isFocused(), `#top-button isFocused`).to.be.true
  browser.keys(`Tab`)
  expect($(`#link`).isFocused(), `#link isFocused`).to.be.true
  browser.keys(`Tab`)
  expect($(`#bottom-button`).isFocused(), `#bottom-button isFocused`).to.be.true
}
function navigateWithClick () {
  $(`#link`).click()
}
function navigateWithKeyboard () {
  $(`#top-button`).click()
  browser.keys([`Tab`, `Enter`])
}
function describeSimpleList (name) {
  describe(name, () => {
    const pathname = `/examples/core/links/${name}`
    const externalPathname = `/examples/core/links/External${name}`
    it(`should render SPA links`, () => {
      expectToNavigate({ navigate: navigateWithClick, pathname })
    })
    it(`should render regular links`, () => {
      expectToNavigate({ navigate: navigateWithClick, pathname: externalPathname, external: true })
    })
    it(`should focus`, () => {
      expectToFocus(pathname)
      expectToFocus(externalPathname)
    })
    it(`should navigate with the keyboard`, () => {
      expectToNavigate({ navigate: navigateWithKeyboard, pathname })
      expectToNavigate({
        navigate: navigateWithKeyboard,
        pathname: externalPathname,
        external: true,
      })
    })
  })
}
describe(`local/core/links`, () => {
  describeSimpleList(`Link`)
})
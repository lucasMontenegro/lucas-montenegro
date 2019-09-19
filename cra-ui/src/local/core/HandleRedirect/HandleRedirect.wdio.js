import { expect } from "chai"
function expectToRender (text) {
  const message = $(`#message`)
  expect(message.isDisplayed(), `#message isDisplayed`).to.be.true
  expect(message.getText(), `#message getText`).to.equal(text)
}
describe(`local/core/HandleRedirect`, () => {
  it(`should render`, () => {
    browser.url(`/examples/core/HandleRedirect/main/client`)
    expectToRender(`did not redirect`)
  })
  it(`should redirect`, () => {
    browser.url(`/examples/core/HandleRedirect/main/redirect`)
    expectToRender(`redirected`)
  })
})
import { expect } from "chai"
describe(`lib/throwPropTypeErrors`, () => {
  it(`should not render`, () => {
    browser.url(`/throwPropTypeErrors/it-works`)
    const iframe = $(`body iframe`)
    iframe.waitForExist(20000)
    expect(iframe.isDisplayed(), `body iframe isDisplayed`).to.be.true
    browser.switchToFrame(0)
    {
      const selector = `div*=Failed prop type`
      const element = $(selector).$(selector).$(selector).$(selector)
      expect(element.isDisplayed(), `$('${selector}') isDisplayed`).to.be.true
      expect(element.getText(), `$('${selector}') getText`).to.equal(`Failed prop type: Invalid prop \`message\` of type \`string\` supplied to \`ExampleComponent\`, expected \`number\`.
    in ExampleComponent (at example.js:15)
    in Route (at example.js:13)
    in Switch (at examples.js:7)
    in Router (created by BrowserRouter)
    in BrowserRouter (at examples.js:6)`)
    }
    expect($(`#message`).isExisting(), `#message isExisting`).to.be.false
  })
})
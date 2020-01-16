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
      expect(element.getText(), `$('${selector}') getText`)
        .to.match(new RegExp(`Failed prop type: Invalid prop \`message\` of type \`string\` supplied to \`ExampleComponent\`, expected \`number\`\\.
    in ExampleComponent \\(at example\\.js:\\d+\\)
    in Route \\(at example\\.js:\\d+\\)
    in Switch \\(at examples\\.js:\\d+\\)
    in Router \\(created by BrowserRouter\\)
    in BrowserRouter \\(at examples\\.js:\\d+\\)`))
    }
    expect($(`#message`).isExisting(), `#message isExisting`).to.be.false
  })
})
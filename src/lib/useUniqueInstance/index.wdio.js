import { expect } from "chai"
describe(`lib/useUniqueInstance`, () => {
  ;[`production`, `dev`].forEach(NODE_ENV => {
    it(`should return the name for unique instances (NODE_ENV ${NODE_ENV})`, () => {
      browser.url(`/useUniqueInstance?NODE_ENV=${NODE_ENV}&unique=true`)
      expect($(`#first`).getText(), `#first getText`).to.equal(`"foo"`)
      expect($(`#second`).isExisting(), `#second isExisting`).to.be.false
    })
  })
  it(`should return null for repeated instances (NODE_ENV production)`, () => {
    browser.url(`/useUniqueInstance?NODE_ENV=production&unique=false`)
    expect($(`#first`).getText(), `#first getText`).to.equal(`"foo"`)
    expect($(`#second`).getText(), `#second getText`).to.equal(`null`)
  })
  it(`should throw an error for repeated instances (NODE_ENV dev)`, () => {
    browser.url(`/useUniqueInstance?NODE_ENV=dev&unique=false`)
    expect($(`#first`).isExisting(), `#first isExisting`).to.be.false
    expect($(`#second`).isExisting(), `#second isExisting`).to.be.false
    const iframe = $(`body iframe`)
    iframe.waitForExist(5000)
    browser.switchToFrame(0)
    {
      const selector = `div=foo: Only one instance is allowed`
      expect($(selector).isDisplayed(), `$('${selector}') isDisplayed`).to.be.true
    }
  })
})
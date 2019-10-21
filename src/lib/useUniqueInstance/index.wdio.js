import { expect } from "chai"
describe(`lib/useUniqueInstance`, () => {
  ;[`production`, `dev`].forEach(NODE_ENV => {
    it(`should return true for unique instances (NODE_ENV ${NODE_ENV})`, () => {
      browser.url(`/useUniqueInstance?NODE_ENV=${NODE_ENV}&unique=true`)
      expect($(`#first`).getText(), `#first getText`).to.equal(`true`)
      expect($(`#second`).isExisting(), `#second isExisting`).to.be.false
    })
  })
  it(`should return false in production for repeated instances`, () => {
    browser.url(`/useUniqueInstance?NODE_ENV=production&unique=false`)
    expect($(`#first`).getText(), `#first getText`).to.equal(`true`)
    expect($(`#second`).getText(), `#second getText`).to.equal(`false`)
  })
  it(`should throw an error in development for repeated instances`, () => {
    browser.url(`/useUniqueInstance?NODE_ENV=dev&unique=false`)
    expect($(`#first`).isExisting(), `#first isExisting`).to.be.false
    expect($(`#second`).isExisting(), `#second isExisting`).to.be.false
    const iframe = $(`body iframe`)
    iframe.waitForExist(5000)
    browser.switchToFrame(0)
    {
      const selector = `div*=useUniqueInstance example component`
      const element = $(selector).$(selector).$(selector).$(selector)
      expect(element.getText(), `$('${selector}') getText`)
        .to.equal(`Error: useUniqueInstance example component: Only one instance is allowed`)
    }
  })
})
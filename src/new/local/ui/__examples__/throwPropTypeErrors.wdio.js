import { expect } from "chai"
describe(`new/local/ui/throwPropTypeErrors`, () => {
  it(`should not render`, () => {
    browser.url(`/old-examples/throwPropTypeErrors/it-works`)
    expect($(`#message`).isExisting(), `#message isExisting`).to.be.false
  })
})
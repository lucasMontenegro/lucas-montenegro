import { expect } from "chai"
describe(`lib/throwPropTypeErrors`, () => {
  it(`should not render`, () => {
    browser.url(`/throwPropTypeErrors/it-works`)
    expect($(`#message`).isExisting(), `#message isExisting`).to.be.false
  })
})
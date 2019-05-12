const { expect, assert } = require("chai")

describe(`Frame`, () => {
  it(`should load`, () => {
    browser.url(`/examples/frame`)
    assert(`frame component loaded`)
  })
})

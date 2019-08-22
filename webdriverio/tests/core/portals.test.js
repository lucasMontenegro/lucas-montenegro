const { expect } = require("../chai")
function expectText (id, expected) {
  const elem = $(`#${id}`)
  if (typeof expected !== `string`) {
    expect(elem.isExisting(), `#${id} isExisting`).to.be.false
    return
  }
  if (expected === ``) {
    expect(elem.isExisting(), `#${id} isExisting`).to.be.true
  } else {
    expect(elem.isDisplayed(), `#${id} isDisplayed`).to.be.true
  }
  expect(elem.getText(), `#${id} getText`).to.equal(expected)
}
function expectInputValue (id, expected) {
  const elem = $(`#${id}`)
  expect(elem.isExisting(), `#${id} isExisting`).to.be.true
  expect(elem.getValue(), `#${id} getText`).to.equal(expected)
}
const mountingPoints = [`Left`, `Right`]
const clientNames = [`Foo`, `Bar`]
function expectToRender (expected) {
  expectText(`rootCid`, `0`)
  expectInputValue(`rootInput`, expected.rootInput)
  expect($(`#bluePortals`).isDisplayed(), `#bluePortals isDisplayed`).to.be.false
  if (!expected.clientCids) {
    expect($(`#redPortals`).isDisplayed(), `#redPortals isDisplayed`).to.be.false
    return
  }
  clientNames.forEach(clientName => {
    const cid = expected.clientCids[clientName]
    mountingPoints.forEach(mountingPoint => {
      expectText(`clientCid${mountingPoint}${clientName}`, cid)
      expectText(`rootInput${mountingPoint}${clientName}`, expected.rootInput)
      expectInputValue(
        `clientInput${mountingPoint}${clientName}`,
        expected.clientInput[mountingPoint][clientName]
      )
      expectText(
        `clientOpositeInput${mountingPoint}${clientName}`,
        expected.clientInput[mountingPoint][clientName]
      )
    })
  })
}
describe(`local/core/portals`, () => {
  describe(`main example`, () => {
    const initiallyExpected = {
      rootInput: ``,
      clientCids: { Foo: `1`, Bar: `2` },
      clientInput: {
        Left: { Foo: ``, Bar: `` },
        Right: { Foo: ``, Bar: `` },
      },
    }
    beforeEach(() => {
      browser.url(`/examples/core/portals/main`)
      $(`#dialogContents`).waitForDisplayed(1000)
    })
    it(`should mount/unmount the "blue" portals`, () => {
      expectToRender(initiallyExpected)
      $(`#toggleBluePortals`).click()
      expectToRender({ rootInput: `` })
      $(`#toggleBluePortals`).click()
      expectToRender({ ...initiallyExpected, clientCids: { Foo: `3`, Bar: `4` } })
    })
    it(`should mount/unmount the "red" portals`, () => {
      expectToRender(initiallyExpected)
      $(`#toggleRedPortals`).click()
      expectToRender({ rootInput: `` })
      $(`#toggleRedPortals`).click()
      expectToRender(initiallyExpected)
    })
    it(`should pass props down`, () => {
      expectToRender(initiallyExpected)
      const rootInput = Math.random().toString()
      $(`#rootInput`).addValue(rootInput)
      expectToRender({ ...initiallyExpected, rootInput })
    })
    it(`should share props between portals`, () => {
      const clientInput = {}
      mountingPoints.forEach(mountingPoint => {
        const obj = clientInput[mountingPoint] = {}
        clientNames.forEach(clientName => {
          const text = Math.random().toString()
          $(`#clientInput${mountingPoint}${clientName}`).addValue(text)
          obj[clientName] = text
        })
      })
      expectToRender({ ...initiallyExpected, clientInput })
    })
    it(`should let the Material UI Modal handle focus`, () => {
      const sentinel = $(`#sentinel`)
      sentinel.click()
      const selectors = [
        `#rootInput`,
        `#toggleBluePortals`,
        `#toggleRedPortals`,
        ...mountingPoints.reduce((arr, mountingPoint) => {
          arr.push(...clientNames.map(clientName => `#clientInput${mountingPoint}${clientName}`))
          return arr
        }, []),
      ].forEach(selector => {
        browser.keys(`Tab`)
        expect($(selector).isFocused(), `${selector} isFocused`).to.be.true
      })
      browser.keys([`Tab`, `Tab`])
      expect(sentinel.isFocused(), `#sentinel isFocused`).to.be.true
    })
  })
  describe(`makeUniqueRef example`, () => {
    function expectToRender (expected) {
      expected.forEach(({ selector, text }) => {
        const elem = $(selector)
        expect(elem.isDisplayed(), `${selector} isDisplayed`).to.be.true
        expect(elem.getText(), `${selector} getText`).to.equal(text)
      })
    }
    it(`should not render more than one instance`, () => {
      browser.url(`/examples/core/portals/makeUniqueRef/development`)
      expectToRender([
        { selector: `#boundary1`, text: `unique` },
        { selector: `#boundary2`, text: `DevelopmentExample: Only one instance is allowed` },
        { selector: `#boundary3`, text: `DevelopmentExample: Only one instance is allowed` },
      ])
    })
    it(`should not throw in production`, () => {
      browser.url(`/examples/core/portals/makeUniqueRef/production`)
      expectToRender([
        { selector: `#boundary1`, text: `unique` },
        { selector: `#boundary2`, text: `not unique` },
        { selector: `#boundary3`, text: `not unique` },
      ])
    })
  })
})
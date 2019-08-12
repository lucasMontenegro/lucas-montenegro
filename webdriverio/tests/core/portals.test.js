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
const appNames = [`Foo`, `Bar`]
function expectToRender (expected) {
  expectText(`rootCid`, `0`)
  expectInputValue(`rootInput`, expected.rootInput)
  expect($(`#bluePortals`).isDisplayed(), `#bluePortals isDisplayed`).to.be.false
  if (!expected.subappCids) {
    expect($(`#redPortals`).isDisplayed(), `#redPortals isDisplayed`).to.be.false
    return
  }
  appNames.forEach(appName => {
    const cid = expected.subappCids[appName]
    mountingPoints.forEach(mountingPoint => {
      expectText(`subappCid${mountingPoint}${appName}`, cid)
      expectText(`rootInput${mountingPoint}${appName}`, expected.rootInput)
      expectInputValue(
        `subappInput${mountingPoint}${appName}`,
        expected.subappInput[mountingPoint][appName]
      )
      expectText(
        `subappOpositeInput${mountingPoint}${appName}`,
        expected.subappInput[mountingPoint][appName]
      )
    })
  })
}
describe(`local/core/portals`, () => {
  describe(`main example`, () => {
    const initiallyExpected = {
      rootInput: ``,
      subappCids: { Foo: `1`, Bar: `2` },
      subappInput: {
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
      expectToRender({ ...initiallyExpected, subappCids: { Foo: `3`, Bar: `4` } })
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
      const subappInput = {}
      mountingPoints.forEach(mountingPoint => {
        const obj = subappInput[mountingPoint] = {}
        appNames.forEach(appName => {
          const text = Math.random().toString()
          $(`#subappInput${mountingPoint}${appName}`).addValue(text)
          obj[appName] = text
        })
      })
      expectToRender({ ...initiallyExpected, subappInput })
    })
    it(`should let the Material UI Modal handle focus`, () => {
      const sentinel = $(`#sentinel`)
      sentinel.click()
      const selectors = [
        `#rootInput`,
        `#toggleBluePortals`,
        `#toggleRedPortals`,
        ...mountingPoints.reduce((arr, mountingPoint) => {
          arr.push(...appNames.map(appName => `#subappInput${mountingPoint}${appName}`))
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
    it(`should not render more than 1 instance`, () => {
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
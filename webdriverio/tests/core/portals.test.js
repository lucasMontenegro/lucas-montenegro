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
  const initiallyExpected = {
    rootInput: ``,
    subappCids: { Foo: `1`, Bar: `2` },
    subappInput: {
      Left: { Foo: ``, Bar: `` },
      Right: { Foo: ``, Bar: `` },
    },
  }
  beforeEach(() => {
    browser.url(`/examples/core/portals`)
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
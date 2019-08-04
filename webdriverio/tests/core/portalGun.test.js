const describeOrSkip = require("../describeOrSkip")
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
const appNames = [`App1`, `App2`]
function expectToRender (expected) {
  expectText(`rootCid`, `0`)
  expectInputValue(`rootInput`, expected.rootInput)
  expectText(`callbackCid`, expected.callbackCid)
  if (!expected.callbackCid) {
    return
  }
  expectText(`callbackRootProp`, expected.rootInput)
  if (!expected.clientCids) {
    appNames.forEach(appName => mountingPoints.forEach(mountingPoint => (
      expectText(`clientCid${mountingPoint}${appName}`)
    )))
    return
  }
  appNames.forEach(appName => {
    const cid = expected.clientCids[appName]
    mountingPoints.forEach(mountingPoint => {
      expectText(`clientCid${mountingPoint}${appName}`, cid)
      expectText(`clientRootProp${mountingPoint}${appName}`, expected.rootInput)
      expectInputValue(
        `clientInput${mountingPoint}${appName}`,
        expected.clientInput[mountingPoint][appName]
      )
    })
    expectText(`clientPropLeft${appName}`, expected.clientInput.Right[appName])
    expectText(`clientPropRight${appName}`, expected.clientInput.Left[appName])
  })
}
describeOrSkip(`local/core/PortalGun`, () => {
  const initiallyExpected = {
    rootInput: ``,
    callbackCid: `1`,
    clientCids: { App1: `2`, App2: `3` },
    clientInput: {
      Left: { App1: ``, App2: `` },
      Right: { App1: ``, App2: `` },
    },
  }
  it(`should mount/unmount properly`, () => {
    browser.url(`/examples/core/portalGun/example1`)
    expectToRender(initiallyExpected)
    $(`#mountPortalGun`).click()
    expectToRender({
      rootInput: ``,
    })
    $(`#mountPortalGun`).click()
    expectToRender({
      ...initiallyExpected,
      callbackCid: `4`,
      clientCids: { App1: `5`, App2: `6` },
    })
  })
  it(`should preserve the client instances`, () => {
    browser.url(`/examples/core/portalGun/example1`)
    expectToRender(initiallyExpected)
    $(`#mountPortalContent`).click()
    expectToRender({
      rootInput: ``,
      callbackCid: `1`,
    })
    $(`#mountPortalContent`).click()
    expectToRender(initiallyExpected)
  })
  it(`should pass props down`, () => {
    browser.url(`/examples/core/portalGun/example1`)
    expectToRender(initiallyExpected)
    const rootInput = Math.random().toString()
    $(`#rootInput`).addValue(rootInput)
    expectToRender({ ...initiallyExpected, rootInput })
  })
  it(`should share props between portals`, () => {
    browser.url(`/examples/core/portalGun/example1`)
    const clientInput = {}
    mountingPoints.forEach(mountingPoint => {
      const obj = clientInput[mountingPoint] = {}
      appNames.forEach(appName => {
        const text = Math.random().toString()
        $(`#clientInput${mountingPoint}${appName}`).addValue(text)
        obj[appName] = text
      })
    })
    expectToRender({ ...initiallyExpected, clientInput })
  })
  it(`should allow a Material UI Drawer to handle focus`, () => {
    browser.url(`/examples/core/portalGun/example2`)
    ;[`Left`, `Right`].forEach(mountingPoint => [`Foo`, `Bar`].forEach(appName => {
      browser.keys(`Tab`)
      const selector = `#${mountingPoint}${appName}Button`
      const button = $(selector)
      expect(button.isDisplayed(), `${selector} isDisplayed`).to.be.true
      expect(button.isFocused(), `${selector} isFocused`).to.be.true
    }))
  })
})
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
const mountPoints = [`Left`, `Right`]
const appNames = [`App1`, `App2`]
function expectToRender (expected) {
  expectText(`topCid`, `0`)
  expectInputValue(`portalInput`, expected.portalInput)
  expectText(`callbackCid`, expected.callbackCid)
  if (!expected.callbackCid) {
    return
  }
  expectText(`callbackPortalProp`, expected.portalInput)
  if (!expected.clientCids) {
    appNames.forEach(appName => mountPoints.forEach(mountPoint => (
      expectText(`clientCid${mountPoint}${appName}`)
    )))
    return
  }
  appNames.forEach(appName => {
    const cid = expected.clientCids[appName]
    mountPoints.forEach(mountPoint => {
      expectText(`clientCid${mountPoint}${appName}`, cid)
      expectText(`clientPortalProp${mountPoint}${appName}`, expected.portalInput)
      expectInputValue(
        `clientInput${mountPoint}${appName}`,
        expected.clientInput[mountPoint][appName]
      )
    })
    expectText(`clientPropLeft${appName}`, expected.clientInput.Right[appName])
    expectText(`clientPropRight${appName}`, expected.clientInput.Left[appName])
  })
}
describeOrSkip(`local/core/PortalGun`, () => {
  const initiallyExpected = {
    portalInput: ``,
    callbackCid: `1`,
    clientCids: { App1: `2`, App2: `3` },
    clientInput: {
      Left: { App1: ``, App2: `` },
      Right: { App1: ``, App2: `` },
    },
  }
  it(`should mount/unmount properly`, () => {
    browser.url(`/examples/core/PortalGun`)
    expectToRender(initiallyExpected)
    $(`#mountPortal`).click()
    expectToRender({
      portalInput: ``,
    })
    $(`#mountPortal`).click()
    expectToRender({
      ...initiallyExpected,
      callbackCid: `4`,
      clientCids: { App1: `5`, App2: `6` },
    })
  })
  it(`should preserve the client instances`, () => {
    browser.url(`/examples/core/PortalGun`)
    expectToRender(initiallyExpected)
    $(`#mountCallbackContent`).click()
    expectToRender({
      portalInput: ``,
      callbackCid: `1`,
    })
    $(`#mountCallbackContent`).click()
    expectToRender(initiallyExpected)
  })
  it(`should pass props down`, () => {
    browser.url(`/examples/core/PortalGun`)
    expectToRender(initiallyExpected)
    const portalInput = Math.random().toString()
    $(`#portalInput`).addValue(portalInput)
    expectToRender({ ...initiallyExpected, portalInput })
  })
  it(`should share props between portals`, () => {
    browser.url(`/examples/core/PortalGun`)
    const clientInput = {}
    mountPoints.forEach(mountPoint => {
      const obj = clientInput[mountPoint] = {}
      appNames.forEach(appName => {
        const text = Math.random().toString()
        $(`#clientInput${mountPoint}${appName}`).addValue(text)
        obj[appName] = text
      })
    })
    expectToRender({ ...initiallyExpected, clientInput })
  })
})
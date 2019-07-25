const { expect } = require("./chai")
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
const sides = [`Left`, `Right`]
const clients = 2
function expectToRender (expected) {
  expectText(`portalCid`, `0`)
  expectInputValue(`portalInput`, expected.portalInput)
  expectText(`wrapperCid`, expected.wrapperCid)
  if (!expected.wrapperCid) {
    return
  }
  expectText(`wrapperPortalProp`, expected.portalInput)
  if (!expected.clientCids) {
    for (let i = 0; i < clients; i++) {
      for (const side of sides) {
        expectText(`clientCid${side}${i}`)
      }
    }
    return
  }
  for (let i = 0; i < clients; i++) {
    const cid = expected.clientCids[i]
    for (const side of sides) {
      expectText(`clientCid${side}${i}`, cid)
      expectText(`clientPortalProp${side}${i}`, expected.portalInput)
      expectInputValue(`clientInput${side}${i}`, expected.clientInput[side][i])
    }
    expectText(`clientPropLeft${i}`, expected.clientInput.Right[i])
    expectText(`clientPropRight${i}`, expected.clientInput.Left[i])
  }
}
describe(`local/portals`, () => {
  const portalCid = `0`
  it(`should mount/unmount properly`, () => {
    browser.url(`/examples/portals`)
    expectToRender({
      portalCid,
      portalInput: ``,
      wrapperCid: `3`,
      clientCids: [`1`, `2`],
      clientInput: {
        Left: [``, ``],
        Right: [``, ``],
      },
    })
    $(`#mountPortal`).click()
    expectToRender({
      portalCid,
      portalInput: ``,
    })
    $(`#mountPortal`).click()
    expectToRender({
      portalCid,
      portalInput: ``,
      wrapperCid: `6`,
      clientCids: [`4`, `5`],
      clientInput: {
        Left: [``, ``],
        Right: [``, ``],
      },
    })
  })
  it(`should preserve the client instances`, () => {
    browser.url(`/examples/portals`)
    const expected = {
      portalCid,
      portalInput: ``,
      wrapperCid: `3`,
      clientCids: [`1`, `2`],
      clientInput: {
        Left: [``, ``],
        Right: [``, ``],
      },
    }
    expectToRender(expected)
    $(`#mountWrapperContent`).click()
    expectToRender({
      portalCid,
      portalInput: ``,
      wrapperCid: `3`,
    })
    $(`#mountWrapperContent`).click()
    expectToRender(expected)
  })
  it(`should pass props down`, () => {
    browser.url(`/examples/portals`)
    expectToRender({
      portalCid,
      portalInput: ``,
      wrapperCid: `3`,
      clientCids: [`1`, `2`],
      clientInput: {
        Left: [``, ``],
        Right: [``, ``],
      },
    })
    const portalInput = Math.random().toString()
    $(`#portalInput`).addValue(portalInput)
    expectToRender({
      portalCid,
      portalInput,
      wrapperCid: `3`,
      clientCids: [`1`, `2`],
      clientInput: {
        Left: [``, ``],
        Right: [``, ``],
      },
    })
  })
  it(`should share props between portals`, () => {
    browser.url(`/examples/portals`)
    const clientInput = {}
    for (const side of sides) {
      const arr = clientInput[side] = []
      for (let i = 0; i < clients; i++) {
        const text = Math.random().toString()
        $(`#clientInput${side}${i}`).addValue(text)
        arr.push(text)
      }
    }
    expectToRender({
      portalCid,
      portalInput: ``,
      wrapperCid: `3`,
      clientCids: [`1`, `2`],
      clientInput,
    })
  })
})
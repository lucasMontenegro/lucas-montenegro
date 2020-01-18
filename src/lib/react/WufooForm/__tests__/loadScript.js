import globals from "lib/utils/globals"
import embedForm from "../embedForm"
import loadScript from "../loadScript"
jest.mock(`lib/utils/globals`, () => ({ __esModule: true, default: {} }))
jest.mock(`../embedForm`, () => ({ __esModule: true, default: jest.fn() }))
describe(`../loadScript`, () => {
  const script = {}
  beforeAll(() => {
    globals.document = {
      createElement: () => script,
      getElementsByTagName: () => [{
        parentNode: { insertBefore () {} },
      }],
    }
    loadScript(`hash`, `512`)
  })
  it(`should set up the script element`, () => {
    expect(script).toHaveProperty(`src`)
    expect(script).toHaveProperty(`onload`)
    expect(script).toHaveProperty(`onreadystatechange`)
    expect(script.onload).toBe(script.onreadystatechange)
  })
  it(`should not call embedForm`, () => {
    expect(embedForm.mock.calls).toEqual([])
  })
  {
    const cases = [[`incomplete`], [`loading`]]
    describe.each(cases)(`on load event handler (script.readyState %j)`, readyState => {
      beforeAll(() => {
        script.readyState = readyState
        script.onload()
      })
      it(`should not call embedForm`, () => {
        expect(embedForm.mock.calls).toEqual([])
      })
    })
  }
  {
    const cases = [[`complete`], [`loaded`], [null], [undefined]]
    describe.each(cases)(`on load event handler (script.readyState %j)`, readyState => {
      beforeAll(() => {
        script.readyState = readyState
        script.onload()
      })
      it(`should call embedForm`, () => {
        expect(embedForm.mock.calls).toEqual([[`hash`, `512`]])
        embedForm.mockClear()
      })
    })
  }
})
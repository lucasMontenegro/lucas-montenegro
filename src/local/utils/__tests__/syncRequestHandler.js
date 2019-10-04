const mockGlobals = require("local/utils/mockGlobals")
const globals = { console: { error: jest.fn() } }
const oldGlobals = mockGlobals(globals)
const syncRequestHandler = require("local/utils/syncRequestHandler")
mockGlobals(oldGlobals)
describe(`local/utils/syncRequestHandler`, () => {
  it(`should resolve promises`, async () => {
    const result = {}
    const asyncFn = async (req, res) => result
    expect(await syncRequestHandler(asyncFn)(`req`, `res`, () => {})).toBe(result)
  })
  const throwAsyncError = async (req, res) => {
    throw Error(`foo`)
  }
  function expectToThrow (fn) {
    expect(fn.mock.calls).toHaveLength(1)
    expect(fn.mock.calls[0]).toHaveLength(1)
    const error = fn.mock.calls[0][0]
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe(`foo`)
  }
  it(`should catch errors`, async () => {
    const next = jest.fn()
    await syncRequestHandler(throwAsyncError)(`req`, `res`, next)
    expectToThrow(next)
  })
  it(`should use 'console.error' as the default error handler`, async () => {
    await syncRequestHandler(throwAsyncError)(`req`, `res`)
    expectToThrow(globals.console.error)
  })
})
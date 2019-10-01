const mockEnv = require("local/helpers/mockEnv")
const syncRouteHandler = require("local/helpers/syncRouteHandler")
describe(`local/helpers/syncRouteHandler`, () => {
  it(`should resolve promises`, async () => {
    const asyncFn = jest.fn(async (req, res) => `asyncFn()`)
    const fn = syncRouteHandler(asyncFn)
    expect(fn).toBeInstanceOf(Function)
    const p = fn(`req`, `res`, () => {})
    expect(p).toBeInstanceOf(Promise)
    expect(await p).toBe(`asyncFn()`)
    expect(asyncFn.mock.calls).toEqual([[`req`, `res`]])
  })
  it(`should catch errors`, async () => {
    const asyncFn = async (req, res) => {
      throw Error(`foo`)
    }
    const next = jest.fn()
    await syncRouteHandler(asyncFn)(`req`, `res`, next)
    expect(next.mock.calls).toHaveLength(1)
    expect(next.mock.calls[0]).toHaveLength(1)
    const error = next.mock.calls[0][0]
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe(`foo`)
  })
  it(`should use 'console.error' as the default error handler`, async () => {
    const asyncFn = async (req, res) => {
      throw Error(`foo`)
    }
    const consoleError = console.error
    const consoleErrorSpy = console.error = jest.fn()
    await syncRouteHandler(asyncFn)(`req`, `res`)
    console.error = consoleError
    expect(consoleErrorSpy.mock.calls).toHaveLength(1)
    expect(consoleErrorSpy.mock.calls[0]).toHaveLength(1)
    const error = consoleErrorSpy.mock.calls[0][0]
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe(`foo`)
  })
})
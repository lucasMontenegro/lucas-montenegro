import globals from "lib/utils/globals"
import syncRequestHandler from "lib/utils/syncRequestHandler"
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: { console: { error: jest.fn() } },
}))
describe(`lib/utils/syncRequestHandler`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`express`])).toMatchSnapshot()
  })
  it(`should resolve promises`, async () => {
    const result = {}
    const asyncFn = async (req, res) => result
    expect(await syncRequestHandler(asyncFn)(`req`, `res`, () => {})).toBe(result)
  })
  {
    const error = Error(`foo`)
    const throwAsyncError = async (req, res) => {
      throw error
    }
    function expectToThrow (fn) {
      expect(fn.mock.calls).toHaveLength(1)
      expect(fn.mock.calls[0]).toHaveLength(1)
      expect(fn.mock.calls[0][0]).toBe(error)
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
  }
})
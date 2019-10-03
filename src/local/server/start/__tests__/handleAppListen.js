const mockFn = jest.fn()
const mockGlobals = require("local/utils/mockGlobals")
const globals = {
  process: { env: {}, pid: `'process.pid'` },
  console: { log: (...args) => mockFn(`console.log`, args) },
}
const oldGlobals = mockGlobals(globals)
const handleAppListen = require("local/server/start/handleAppListen")
mockGlobals(oldGlobals)
describe(`local/server/start/handleAppListen`, () => {
  afterEach(() => mockFn.mockClear())
  test.each([
    [`production`],
    [`foo`],
  ])(`should log (NODE_ENV %s)`, NODE_ENV => {
    globals.process.env.NODE_ENV = NODE_ENV
    handleAppListen(`'PORT'`)()
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})
const mockFn = jest.fn()
const mockGlobals = require("local/utils/mockGlobals")
const globals = { console: { log: (...args) => mockFn(`console.log`, args) } }
const oldGlobals = mockGlobals(globals)
const handleClusterExit = require("local/server/start/handleClusterExit")
mockGlobals(oldGlobals)
describe(`local/server/start/handleClusterExit`, () => {
  it(`should log`, () => {
    handleClusterExit({ process: { pid: `'worker.process.pid'` } }, `'code'`, `'signal'`)
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})
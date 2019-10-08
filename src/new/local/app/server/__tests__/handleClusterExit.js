const mockFn = jest.fn()
jest.mock(`new/local/utils/globals`, () => ({
  default: { console: {} },
}))
require("new/local/utils/globals").default.console.log = (...args) => mockFn(`console.log`, args)
const { default: handleClusterExit } = require("new/local/app/server/handleClusterExit")
describe(`new/local/app/server/handleClusterExit`, () => {
  it(`should log`, () => {
    handleClusterExit({ process: { pid: `'worker.process.pid'` } }, `'code'`, `'signal'`)
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})
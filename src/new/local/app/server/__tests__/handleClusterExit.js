import globals from "new/local/utils/globals"
import handleClusterExit from "new/local/app/server/handleClusterExit"
const mockFn = jest.fn()
jest.mock(`new/local/utils/globals`, () => ({
  __esModule: true,
  default: { console: {} },
}))
globals.console.log = (...args) => mockFn(`console.log`, args)
describe(`new/local/app/server/handleClusterExit`, () => {
  it(`should log`, () => {
    handleClusterExit({ process: { pid: `'worker.process.pid'` } }, `'code'`, `'signal'`)
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})
import globals from "lib/utils/globals"
import handleClusterExit from "lib/server/handleClusterExit"
const mockFn = jest.fn()
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: { console: {} },
}))
globals.console.log = (...args) => mockFn(`console.log`, args)
describe(`lib/server/handleClusterExit`, () => {
  it(`should log`, () => {
    handleClusterExit({ process: { pid: `'worker.process.pid'` } }, `'code'`, `'signal'`)
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})
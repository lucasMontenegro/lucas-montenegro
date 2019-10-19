import cluster from "cluster"
import startHttp from "lib/server/startHttp"
import globals from "lib/utils/globals"
import isProduction from "lib/utils/isProduction"
import server from "lib/server"
import cartesianProduct from "lib/utils/cartesianProduct"
const mockFn = jest.fn()
jest.mock(`cluster`, () => ({ __esModule: true, default: {} }))
;[`fork`, `on`].reduce((cluster, name) => {
  cluster[name] = (...args) => mockFn(`cluster.${name}`, args)
  return cluster
}, cluster)
jest.mock(`os`, () => ({ __esModule: true, default: { cpus: () => ({ length: 2 }) } }))
jest.mock(`lib/server/startHttp`, () => ({ __esModule: true, default: jest.fn() }))
startHttp.mockImplementation((...args) => {
  mockFn(`startHttp`, args)
  return `startHttp`
})
jest.mock(`lib/server/handleClusterExit`, () => ({
  __esModule: true,
  default: `lib/server/handleClusterExit`,
}))
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: { console: {}, process: { pid: `'process.pid'` } },
}))
globals.console.log = (...args) => mockFn(`console.log`, args)
jest.mock(`lib/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
describe(`lib/server`, () => {
  afterEach(() => mockFn.mockClear())
  {
    const msg = `should create the app (isProduction %j, cluster.isMaster %j)`
    test.each(cartesianProduct([
      [true, false],
      [true, false],
    ]))(msg, (isProductionValue, isMaster) => {
      cluster.isMaster = isMaster
      isProduction.mockReturnValueOnce(isProductionValue)
      server(`api`)
      expect(mockFn.mock.calls).toMatchSnapshot()
    })
  }
})
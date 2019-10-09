import cluster from "cluster"
import startHttp from "new/local/app/server/startHttp"
import globals from "new/local/utils/globals"
import isProduction from "new/local/utils/isProduction"
import server from "new/local/app/server"
import cartesianProduct from "new/local/utils/cartesianProduct"
const mockFn = jest.fn()
jest.mock(`cluster`, () => ({ __esModule: true, default: {} }))
;[`fork`, `on`].reduce((cluster, name) => {
  cluster[name] = (...args) => mockFn(`cluster.${name}`, args)
  return cluster
}, cluster)
jest.mock(`os`, () => ({ __esModule: true, default: { cpus: () => ({ length: 2 }) } }))
jest.mock(`new/local/app/server/startHttp`, () => ({ __esModule: true, default: jest.fn() }))
startHttp.mockImplementation((...args) => {
  mockFn(`startHttp`, args)
  return `startHttp`
})
jest.mock(`new/local/app/server/handleClusterExit`, () => ({
  __esModule: true,
  default: `new/local/app/server/handleClusterExit`,
}))
jest.mock(`new/local/utils/globals`, () => ({
  __esModule: true,
  default: { console: {}, process: { pid: `'process.pid'` } },
}))
globals.console.log = (...args) => mockFn(`console.log`, args)
jest.mock(`new/local/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
describe(`new/local/app/server`, () => {
  afterEach(() => mockFn.mockClear())
  {
    const msg = `should create the app (isProduction %j, cluster.isMaster %j)`
    test.each(cartesianProduct([
      [true, false],
      [true, false],
    ]))(msg, (isProductionValue, isMaster) => {
      cluster.isMaster = isMaster
      isProduction.mockReturnValueOnce(isProductionValue)
      server()
      expect(mockFn.mock.calls).toMatchSnapshot()
    })
  }
})
const mockFn = jest.fn()
jest.mock(`cluster`, () => ({}))
const cluster = [`fork`, `on`].reduce((cluster, name) => {
  cluster[name] = (...args) => mockFn(`cluster.${name}`, args)
  return cluster
}, require("cluster"))
jest.mock(`os`, () => ({ cpus: () => ({ length: 2 }) }))
jest.mock(`local/server/start/startHttp`, () => jest.fn())
require("local/server/start/startHttp").mockImplementation((...args) => {
  mockFn(`startHttp`, args)
  return `startHttp`
})
jest.mock(`local/server/start/handleClusterExit`, () => `local/server/start/handleClusterExit`)
const mockGlobals = require("local/utils/mockGlobals")
const globals = {
  console: { log: (...args) => mockFn(`console.log`, args) },
  process: { env: {}, pid: `'process.pid'` },
}
const oldGlobals = mockGlobals(globals)
const start = require("local/server/start")
mockGlobals(oldGlobals) // unmock
const cartesianProduct = require("local/utils/cartesianProduct")
describe(`local/server/start`, () => {
  afterEach(() => mockFn.mockClear())
  test.each(cartesianProduct([
    [`production`, `foo`],
    [true, false],
  ]))(`should create the app (NODE_ENV %s, cluster.isMaster %j)`, (NODE_ENV, isMaster) => {
    cluster.isMaster = isMaster
    globals.process.env.NODE_ENV = NODE_ENV
    start()
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})
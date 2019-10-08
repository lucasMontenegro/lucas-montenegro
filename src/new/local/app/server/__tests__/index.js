const mockFn = jest.fn()
jest.mock(`cluster`, () => ({}))
const cluster = [`fork`, `on`].reduce((cluster, name) => {
  cluster[name] = (...args) => mockFn(`cluster.${name}`, args)
  return cluster
}, require("cluster"))
jest.mock(`os`, () => ({ cpus: () => ({ length: 2 }) }))
jest.mock(`new/local/app/server/startHttp`, () => ({}))
require("new/local/app/server/startHttp").default = (...args) => {
  mockFn(`startHttp`, args)
  return `startHttp`
}
jest.mock(`new/local/app/server/handleClusterExit`, () => ({
  default: `new/local/app/server/handleClusterExit`,
}))
jest.mock(`new/local/utils/globals`, () => ({
  default: { console: {}, process: { env: {}, pid: `'process.pid'` } },
}))
const { default: globals } = require("new/local/utils/globals")
globals.console.log = (...args) => mockFn(`console.log`, args)
const { default: server } = require("new/local/app/server")
const { default: cartesianProduct } = require("new/local/utils/cartesianProduct")
describe(`new/local/app/server`, () => {
  afterEach(() => mockFn.mockClear())
  test.each(cartesianProduct([
    [`production`, `foo`],
    [true, false],
  ]))(`should create the app (NODE_ENV %s, cluster.isMaster %j)`, (NODE_ENV, isMaster) => {
    cluster.isMaster = isMaster
    globals.process.env.NODE_ENV = NODE_ENV
    server()
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})
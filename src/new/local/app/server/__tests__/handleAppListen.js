const mockFn = jest.fn()
jest.mock(`new/local/utils/globals`, () => ({
  default: {
    process: { pid: `'process.pid'` },
    console: {},
  },
}))
const { default: globals } = require("new/local/utils/globals")
globals.console.log = (...args) => mockFn(`console.log`, args)
jest.mock(`new/local/utils/isProduction`, () => ({ default: jest.fn() }))
const { default: isProduction } = require("new/local/utils/isProduction")
const { default: handleAppListen } = require("new/local/app/server/handleAppListen")
describe(`new/local/app/server/handleAppListen`, () => {
  afterEach(() => mockFn.mockClear())
  test.each([[true], [false]])(`should log (isProduction %j)`, isProductionValue => {
    isProduction.mockReturnValueOnce(isProductionValue)
    handleAppListen(`'PORT'`)()
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})
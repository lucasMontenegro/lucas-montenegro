import globals from "lib/utils/globals"
import isProduction from "lib/utils/isProduction"
import handleAppListen from "lib/server/handleAppListen"
const mockFn = jest.fn()
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: {
    process: { pid: `'process.pid'` },
    console: {},
  },
}))
globals.console.log = (...args) => mockFn(`console.log`, args)
jest.mock(`lib/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
describe(`lib/server/handleAppListen`, () => {
  afterEach(() => mockFn.mockClear())
  test.each([[true], [false]])(`should log (isProduction %j)`, isProductionValue => {
    isProduction.mockReturnValueOnce(isProductionValue)
    handleAppListen(`'PORT'`)()
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})
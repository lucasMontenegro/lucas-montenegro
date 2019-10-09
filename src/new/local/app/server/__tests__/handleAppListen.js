import globals from "new/local/utils/globals"
import isProduction from "new/local/utils/isProduction"
import handleAppListen from "new/local/app/server/handleAppListen"
const mockFn = jest.fn()
jest.mock(`new/local/utils/globals`, () => ({
  __esModule: true,
  default: {
    process: { pid: `'process.pid'` },
    console: {},
  },
}))
globals.console.log = (...args) => mockFn(`console.log`, args)
jest.mock(`new/local/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
describe(`new/local/app/server/handleAppListen`, () => {
  afterEach(() => mockFn.mockClear())
  test.each([[true], [false]])(`should log (isProduction %j)`, isProductionValue => {
    isProduction.mockReturnValueOnce(isProductionValue)
    handleAppListen(`'PORT'`)()
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})
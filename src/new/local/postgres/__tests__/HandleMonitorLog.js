const mockFn = jest.fn()
jest.mock(`new/local/postgres/saveMonitorError`, () => ({}))
require("new/local/postgres/saveMonitorError").default = (...args) => {
  mockFn(`saveMonitorError`, args)
}
jest.mock(`new/local/utils/isProduction`, () => ({ default: jest.fn() }))
const { default: isProduction } = require("new/local/utils/isProduction")
const { default: HandleMonitorLog } = require("new/local/postgres/HandleMonitorLog")
describe(`new/local/postgres/HandleMonitorLog`, () => {
  afterEach(() => mockFn.mockClear())
  test.each([
    [`not do anything`, true, `error`],
    [`hide the message`, true, `notAnError`],
    [`save the message`, false, `error`],
    [`not do anything`, false, `notAnError`],
  ])(`should %s (isProduction %j, info.event %s)`, (str, isProductionValue, event) => {
    const info = { event }
    isProduction.mockReturnValueOnce(isProductionValue)
    HandleMonitorLog()(`msg`, info)
    expect({ info, mockFnCalls: mockFn.mock.calls }).toMatchSnapshot()
  })
})
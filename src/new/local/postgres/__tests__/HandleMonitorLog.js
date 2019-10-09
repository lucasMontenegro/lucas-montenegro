import saveMonitorError from "new/local/postgres/saveMonitorError"
import isProduction from "new/local/utils/isProduction"
import HandleMonitorLog from "new/local/postgres/HandleMonitorLog"
const mockFn = jest.fn()
jest.mock(`new/local/postgres/saveMonitorError`, () => ({ __esModule: true, default: jest.fn() }))
saveMonitorError.mockImplementation((...args) => {
  mockFn(`saveMonitorError`, args)
})
jest.mock(`new/local/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
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
const mockFn = jest.fn()
jest.mock(`local/server/pg/saveMonitorError`, () => jest.fn())
require("local/server/pg/saveMonitorError").mockImplementation((...args) => {
  mockFn(`saveMonitorError`, args)
})
const mockGlobals = require("local/utils/mockGlobals")
const globals = { process: { env: {} } }
const oldGlobals = mockGlobals(globals)
const HandleMonitorLog = require("local/server/pg/HandleMonitorLog")
mockGlobals(oldGlobals)
describe(`local/server/pg/HandleMonitorLog`, () => {
  afterEach(() => mockFn.mockClear())
  test.each([
    [`not do anything`, `production`, `error`],
    [`hide the message`, `production`, `notAnError`],
    [`save the message`, `foo`, `error`],
    [`not do anything`, `foo`, `notAnError`],
  ])(`should %s (NODE_ENV %s, info.event %s)`, (str, NODE_ENV, event) => {
    const info = { event }
    globals.process.env.NODE_ENV = NODE_ENV
    HandleMonitorLog()(`msg`, info)
    expect({ info, mockFnCalls: mockFn.mock.calls }).toMatchSnapshot()
  })
})
const mockFn = jest.fn()
jest.mock(`os`, () => ({ EOL: `'os.EOL'` }))
jest.mock(`fs`, () => ({}))
require("fs").appendFile = (...args) => {
  mockFn(`fs.appendFile`, args)
}
jest.mock(`local/utils/simpleErrorCallback`, () => `local/utils/simpleErrorCallback`)
const mockGlobals = require("local/utils/mockGlobals")
const globals = { process: { env: { NODE_PATH: `/nodePath` } } }
const oldGlobals = mockGlobals(globals)
const saveMonitorError = require("local/server/pg/saveMonitorError")
mockGlobals(oldGlobals)
describe(`local/server/pg/saveMonitorError`, () => {
  afterEach(() => mockFn.mockClear())
  test.each([
    [true],
    [false],
  ])(`should save the error message (info.time %j)`, time => {
    const info = { time }
    saveMonitorError(`msg`, info)
    expect({ info, mockFnCalls: mockFn.mock.calls }).toMatchSnapshot()
  })
})
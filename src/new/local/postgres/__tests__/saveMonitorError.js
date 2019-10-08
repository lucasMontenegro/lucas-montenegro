const mockFn = jest.fn()
jest.mock(`os`, () => ({ EOL: `'os.EOL'` }))
jest.mock(`fs`, () => ({}))
require("fs").appendFile = (...args) => {
  mockFn(`fs.appendFile`, args)
}
jest.mock(`new/local/utils/simpleErrorCallback`, () => ({
  default: `new/local/utils/simpleErrorCallback`,
}))
jest.mock(`new/local/utils/globals`, () => ({
  default: {
    process: { env: { NODE_PATH: `/nodePath` } },
  },
}))
const { default: saveMonitorError } = require("new/local/postgres/saveMonitorError")
describe(`new/local/postgres/saveMonitorError`, () => {
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
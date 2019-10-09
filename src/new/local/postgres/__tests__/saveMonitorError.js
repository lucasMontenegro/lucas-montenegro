import os from "os"
import fs from "fs"
import saveMonitorError from "new/local/postgres/saveMonitorError"
const mockFn = jest.fn()
jest.mock(`os`, () => ({ __esModule: true, default: { EOL: `'os.EOL'` } }))
jest.mock(`fs`, () => ({ __esModule: true, default: {} }))
fs.appendFile = (...args) => {
  mockFn(`fs.appendFile`, args)
}
jest.mock(`new/local/utils/simpleErrorCallback`, () => ({
  __esModule: true,
  default: `new/local/utils/simpleErrorCallback`,
}))
jest.mock(`new/local/utils/globals`, () => ({
  __esModule: true,
  default: { process: { cwd: () => `/cwd` } },
}))
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
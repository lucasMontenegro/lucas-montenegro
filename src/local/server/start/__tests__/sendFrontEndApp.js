const mockFn = jest.fn()
const mockGlobals = require("local/utils/mockGlobals")
const oldGlobals = mockGlobals({ process: { env: { BUILD_PATH: `/buildPath` } } })
const sendFrontEndApp = require("local/server/start/sendFrontEndApp")
mockGlobals(oldGlobals)
describe(`local/server/start/sendFrontEndApp`, () => {
  it(`should send index.html`, () => {
    const sendFile = jest.fn()
    sendFrontEndApp(`req`, { sendFile: (...args) => mockFn(`res.sendFile`, args) })
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})
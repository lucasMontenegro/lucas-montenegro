const mockFn = jest.fn()
jest.mock(`new/local/utils/globals`, () => ({
  default: {
    process: { env: { BUILD_PATH: `/buildPath` } },
  },
}))
const { default: sendFrontEndApp } = require("new/local/app/server/sendFrontEndApp")
describe(`new/local/app/server/sendFrontEndApp`, () => {
  it(`should send index.html`, () => {
    sendFrontEndApp(`req`, { sendFile: (...args) => mockFn(`res.sendFile`, args) })
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})
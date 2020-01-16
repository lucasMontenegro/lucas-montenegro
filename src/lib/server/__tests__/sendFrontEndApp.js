import sendFrontEndApp from "lib/server/sendFrontEndApp"
const mockFn = jest.fn()
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: {
    process: { env: { BUILD_PATH: `/buildPath` } },
  },
}))
describe(`lib/server/sendFrontEndApp`, () => {
  it(`should send index.html`, () => {
    sendFrontEndApp(`req`, { sendFile: (...args) => mockFn(`res.sendFile`, args) })
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})
import sendFrontEndApp from "new/local/app/server/sendFrontEndApp"
const mockFn = jest.fn()
jest.mock(`new/local/utils/globals`, () => ({
  __esModule: true,
  default: {
    process: { env: { BUILD_PATH: `/buildPath` } },
  },
}))
describe(`new/local/app/server/sendFrontEndApp`, () => {
  it(`should send index.html`, () => {
    sendFrontEndApp(`req`, { sendFile: (...args) => mockFn(`res.sendFile`, args) })
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})
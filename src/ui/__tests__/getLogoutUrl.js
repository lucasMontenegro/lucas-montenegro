import getLogoutUrl from "../getLogoutUrl"
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: {
    window: { location: { origin: `globals.window.location.origin` } },
  },
}))
describe(`../getLogoutUrl`, () => {
  jestUtils.describeDependencies({
    deps: [
      `lib/utils/globals`,
      `../routing`, // mouting point
    ],
    relativeBasePath: __dirname,
  })
  it(`should return window.location.origin`, () => {
    expect(getLogoutUrl()).toBe(`globals.window.location.origin`)
  })
})
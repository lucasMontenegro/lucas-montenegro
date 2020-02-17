import browserHistory from "./index.js"
jest.mock(`history`, () => ({
  __esModule: true,
  createBrowserHistory () {
    return `browserHistory`
  }
}))
describe(`./index.js`, () => {
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`history`])).toMatchSnapshot()
  })
  it(`should create and export the browser history object`, () => {
    expect(browserHistory).toBe(`browserHistory`)
  })
})
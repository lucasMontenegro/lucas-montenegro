jest.mock(`new/local/ui/Routes`, () => ({
  __esModule: true,
  default: () => `new/local/ui/Routes`,
}))
describe(`new/local/ui/store`, () => {
  it(`should utilize the dependency APIs correctly`, () => {
    expect(jestUtils.getDependencies([`react`, `redux`, `react-redux`])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("new/local/ui/store")
  })
  describe(`core reducer`, () => {
    it(`should run`, () => {
      require("new/local/ui/store").reducers.core()
    })
  })
})
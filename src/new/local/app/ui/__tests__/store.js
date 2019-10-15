jest.mock(`new/local/app/ui/Routes`, () => ({
  __esModule: true,
  default: () => `new/local/app/ui/Routes`,
}))
describe(`new/local/app/ui/store`, () => {
  it(`should utilize the dependency APIs correctly`, () => {
    expect(jestUtils.getDependencies([`react`, `redux`, `react-redux`])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("new/local/app/ui/store")
  })
  describe(`core reducer`, () => {
    it(`should run`, () => {
      require("new/local/app/ui/store").reducers.core()
    })
  })
})
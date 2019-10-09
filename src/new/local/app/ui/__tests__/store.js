jest.mock(`new/local/app/ui/Routes`, () => ({
  __esModule: true,
  default: () => `new/local/app/ui/Routes`,
}))
describe(`new/local/app/ui/store`, () => {
  it(`should run`, () => {
    require("new/local/app/ui/store")
  })
  describe(`core reducer`, () => {
    it(`should run`, () => {
      require("new/local/app/ui/store").reducers.core()
    })
  })
})
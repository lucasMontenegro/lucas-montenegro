jest.mock(`new/app/ui/routes`, () => ({
  __esModule: true,
  default: `new/app/ui/routes`,
}))
describe(`new/app/ui/store`, () => {
  it(`should run`, () => {
    require("new/app/ui/store")
  })
  describe(`core reducer`, () => {
    it(`should run`, () => {
      require("new/app/ui/store").reducers.core()
    })
  })
})
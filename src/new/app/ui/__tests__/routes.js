jest.mock(`new/app/ui/App`, () => ({
  __esModule: true,
  default: () => {},
}))
describe(`new/app/ui/routes`, () => {
  it(`should run`, () => {
    require("new/app/ui/routes")
  })
})
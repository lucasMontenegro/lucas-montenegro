jest.mock(`new/local/app/ui/fontAwesome`, () => ({ __esModule: true }))
jest.mock(`new/local/app/ui/store`, () => ({
  __esModule: true,
  default: `new/local/app/ui/store`,
}))
describe(`new/local/app/ui/styling`, () => {
  it(`should run`, () => {
    require("new/local/app/ui/styling")
  })
})
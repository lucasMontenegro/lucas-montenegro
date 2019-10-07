jest.mock(`new/app/ui/fontAwesome`, () => ({ __esModule: true }))
jest.mock(`new/app/ui/store`, () => ({
  __esModule: true,
  default: `new/app/ui/store`,
}))
describe(`new/app/ui/styling`, () => {
  it(`should run`, () => {
    require("new/app/ui/styling")
  })
})
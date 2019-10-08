jest.mock(`new/local/app/ui/fontAwesome`, () => ({}))
jest.mock(`new/local/app/ui/store`, () => ({ default: `new/local/app/ui/store` }))
describe(`new/local/app/ui/styling`, () => {
  it(`should run`, () => {
    require("new/local/app/ui/styling")
  })
})
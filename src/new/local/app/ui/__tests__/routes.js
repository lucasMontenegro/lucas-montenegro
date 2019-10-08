jest.mock(`new/local/app/ui/App`, () => ({ default: () => {} }))
describe(`new/local/app/ui/routes`, () => {
  it(`should run`, () => {
    require("new/local/app/ui/routes")
  })
})
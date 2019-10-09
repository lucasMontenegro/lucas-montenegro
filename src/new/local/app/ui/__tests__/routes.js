jest.mock(`new/local/app/ui/App`, () => ({ __esModule: true, default: () => {} }))
describe(`new/local/app/ui/routes`, () => {
  it(`should run`, () => {
    require("new/local/app/ui/routes")
  })
})
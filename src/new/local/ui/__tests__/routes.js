jest.mock(`new/local/ui/App`, () => ({ __esModule: true, default: () => `new/local/ui/App` }))
describe(`new/local/ui/routes`, () => {
  it(`should utilize the dependency APIs correctly`, () => {
    expect(jestUtils.getDependencies([`react`, `react-router-dom`])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("new/local/ui/routes")
  })
})
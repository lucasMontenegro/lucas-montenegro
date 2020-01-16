jest.mock(`new/local/ui/fontAwesome`, () => ({ __esModule: true }))
jest.mock(`new/local/ui/store`, () => ({
  __esModule: true,
  default: `new/local/ui/store`,
}))
describe(`new/local/ui/styling`, () => {
  it(`should utilize the dependency APIs correctly`, () => {
    expect(jestUtils.getDependencies([
      `react`,
      `@material-ui/core`,
      `@material-ui/styles`,
      `typeface-roboto`,
    ])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("new/local/ui/styling")
  })
})
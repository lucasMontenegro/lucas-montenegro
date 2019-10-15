describe(`new/local/todo/validators`, () => {
  it(`should utilize the dependency APIs correctly`, () => {
    expect(jestUtils.getDependencies([`express-validator`])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("new/local/todo/validators")
  })
})
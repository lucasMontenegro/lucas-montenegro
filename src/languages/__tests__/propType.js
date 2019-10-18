describe(`languages/propType`, () => {
  it(`should utilize the dependency APIs correctly`, () => {
    expect(jestUtils.getDependencies([`prop-types`])).toMatchSnapshot()
  })
  it(`should run`, () => {
    require("languages/propType")
  })
})